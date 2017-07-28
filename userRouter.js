const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {userModel} = require('./models/user'); //Is user the name of the model?

//Get all user accounts
router.get('/', (req, res) => {
    userModel
        .find()
        .exec()
        .then(users => {
            res.json({
                users: users.map(
                (user) => user.apiRepr())
            });
    })
    .catch(
      err => {
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
      });
});

//Get individual user accounts
router.get('/:id', (req, res) => {
    userModel
        .findById(req.params.id)
        .exec()
        .then(user => res.json(user.apiRepr()))
        .catch(err => {
        console.error(err);
            res.status(500).json({message: 'Internal server error'})
    });
});
//Create new user accounts
router.post('/', (req, res) => {
    const requiredFields = ['firstName', 'lastName', 'email', 'password', 'courses'];
    for (let i=0; i<requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`
            console.error(message);
            return res.status(400).send(message);
        }
    }
    userModel
    .create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        courses: req.body.courses})
    .then(
    user => res.status(201).json(user.apiRepr()))
    .catch(err => {
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
    });
});
//Update user accounts
router.put('/:id', (req, res) => {
    if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    const message = (
      `Request path id (${req.params.id}) and request body id ` +
      `(${req.body.id}) must match`);
    console.error(message);
    res.status(400).json({message: message});
  }
    const toUpdate = {};
    const updateablefields = ['firstName', 'lastName', 'email', 'password', 'courses'];
    
    updateablefields.forEach(field => {
        if (field in req.body) {
            toUpdate[field] = req.body[field];
        }
    });
    userModel
        .findByIdAndUpdate(req.params.id, {$set: toUpdate})
        .exec()
        .then(user => res.status(204).end())
        .catch(err => res.status(500).json({message: 'Internal server error'}));
});

//Delete user Accounts
router.delete('/:id', (req, res) => {
    userModel
        .findByIdAndRemove(req.params.id)
        .exec()
        .then(user => res.status(204).end())
        .catch(err => res.status(500).json({message: 'Internal server error'}));
});

//export the router
module.exports = router;