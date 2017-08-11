const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {AdminModel} = require('../models/admin');

//Admin Login - Create a Session
router.post('/session', jsonParser, (req, res) => {
    console.log(req.body);
    const requiredFields = ['email', 'password'];
    for (let i=0; i<requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`
            console.error(message);
            return res.status(400).send(message);
        }
    }
    AdminModel
    .findOne({email: req.body.email})
    .exec()
    .then(admin => {
        if(admin) {
            //validate the password
            if(admin.password !== req.body.password) {
                res.status(404).json({message: 'Invalid login'})
            }
            else {
                //create the session
                res.status(200).json({accessToken: admin.id, username: admin.fullName})
            }
        }
        else {
            res.status(404).json({message: 'Invalid login'})
        }
    })
})
//Delete the Session
router.delete('/session', (req, res) => {
    res.status(204).send
})

//Get all admin accounts
router.get('/', (req, res) => {
    AdminModel
        .find()
        .exec()
        .then(admins => {
            res.json({
                admins: admins.map(
                (admin) => admin.apiRepr())
            });
    })
    .catch(
      err => {
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
      });
});

//Get individual admin accounts
router.get('/:id', (req, res) => {
    AdminModel
        .findById(req.params.id)
        .exec()
        .then(admin => res.json(admin.apiRepr()))
        .catch(err => {
        console.error(err);
            res.status(500).json({message: 'Internal server error'})
    });
});
//Create new admin accounts
router.post('/', jsonParser, (req, res) => {
    const requiredFields = ['firstName', 'lastName', 'email', 'password'];
    for (let i=0; i<requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`
            console.error(message);
            return res.status(400).send(message);
        }
    }
    AdminModel
    .create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password})
    .then(
    admin => res.status(201).json(admin.apiRepr()))
    .catch(err => {
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
    });
});
//Update admin accounts
router.put('/:id', jsonParser, (req, res) => {
    if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    const message = (
      `Request path id (${req.params.id}) and request body id ` +
      `(${req.body.id}) must match`);
    console.error(message);
    res.status(400).json({message: message});
  }
    const toUpdate = {};
    const updateablefields = ['firstName', 'lastName', 'email', 'password'];
    
    updateablefields.forEach(field => {
        if (field in req.body) {
            toUpdate[field] = req.body[field];
        }
    });
    AdminModel
        .findByIdAndUpdate(req.params.id, {$set: toUpdate})
        .exec()
        .then(user => res.status(200).json(toUpdate))
        .catch(err => res.status(500).json({message: 'Internal server error'}));
});

//Delete Admin Accounts
router.delete('/:id', (req, res) => {
    AdminModel
        .findByIdAndRemove(req.params.id)
        .exec()
        .then(admin => res.status(204).end())
        .catch(err => res.status(500).json({message: 'Internal server error'}));
});

//export the router
module.exports = router;