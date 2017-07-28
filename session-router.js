const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {sessionModel} = require('./models/session'); //Is session the name of the model?


//Get individual sessions
router.get('/:id', (req, res) => {
    sessionModel
        .findById(req.params.id)
        .exec()
        .then(session => res.json(session.apiRepr()))
        .catch(err => {
        console.error(err);
            res.status(500).json({message: 'Internal server error'})
    });
});
//Create new sessions
router.post('/', (req, res) => {
    const requiredFields = ['title', 'instructor', 'startTime', 'endTime', 'date', 'preWork'];
    for (let i=0; i<requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`
            console.error(message);
            return res.status(400).send(message);
        }
    }
    sessionModel
    .create({
        title: req.body.title,
        instructor: req.body.instructor,
        date: req.body.date,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        preWork: req.body.preWork})
    .then(
    session => res.status(201).json(session.apiRepr()))
    .catch(err => {
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
    });
});
//Update session
router.put('/:id', (req, res) => {
    if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    const message = (
      `Request path id (${req.params.id}) and request body id ` +
      `(${req.body.id}) must match`);
    console.error(message);
    res.status(400).json({message: message});
  }
    const toUpdate = {};
    const updateablefields = ['title', 'instructor', 'startTime', 'endTime', 'date', 'preWork'];
    
    updateablefields.forEach(field => {
        if (field in req.body) {
            toUpdate[field] = req.body[field];
        }
    });
    sessionModel
        .findByIdAndUpdate(req.params.id, {$set: toUpdate})
        .exec()
        .then(session => res.status(204).end())
        .catch(err => res.status(500).json({message: 'Internal server error'}));
});

//Delete session
router.delete('/:id', (req, res) => {
    sessionModel
        .findByIdAndRemove(req.params.id)
        .exec()
        .then(session => res.status(204).end())
        .catch(err => res.status(500).json({message: 'Internal server error'}));
});

//export the router
module.exports = router;