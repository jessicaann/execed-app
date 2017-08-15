const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {InstructorModel} = require('../models/instructor'); //Is instructor the name of the model?

//Get all instructors
router.get('/', (req, res) => {
    InstructorModel
        .find()
        .exec()
        .then(instructors => {
            res.json({
                instructors: instructors.map(
                (instructor) => instructor.apiRepr())
            });
    })
    .catch(
      err => {
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
      });
});

//Get individual instructors
router.get('/:id', (req, res) => {
    InstructorModel
        .findById(req.params.id)
        .exec()
        .then(instructor => res.json(instructor.apiRepr()))
        .catch(err => {
        console.error(err);
            res.status(500).json({message: 'Internal server error'})
    });
});
//Create new instructors
router.post('/', jsonParser, (req, res) => {
    const requiredFields = ['firstName', 'lastName', 'email'];
    for (let i=0; i<requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`
            console.error(message);
            return res.status(400).send(message);
        }
    }
    InstructorModel
    .create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email})
    .then(
    instructor => res.status(201).json(instructor.apiRepr()))
    .catch(err => {
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
    });
});
//Update instructor
router.put('/profile/:id', jsonParser, (req, res) => {
    if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    const message = (
      `Request path id (${req.params.id}) and request body id ` +
      `(${req.body.id}) must match`);
    console.error(message);
    res.status(400).json({message: message});
  }
    const toUpdate = {};
    const updateablefields = ['firstName', 'lastName', 'email'];
    
    updateablefields.forEach(field => {
        if (field in req.body && req.body[field] !== "") {
            toUpdate[field] = req.body[field];
        }
    });
    InstructorModel
        .findByIdAndUpdate(req.params.id, {$set: toUpdate})
        .exec()
        .then(instructor => res.status(200).json(toUpdate))
        .catch(err => res.status(500).json({message: 'Internal server error'}));
});

//Delete instructor
router.delete('/profile/:id', (req, res) => {
    InstructorModel
        .findByIdAndRemove(req.params.id)
        .exec()
        .then(instructor => res.status(204).end())
        .catch(err => res.status(500).json({message: 'Internal server error'}));
});

//export the router
module.exports = router;