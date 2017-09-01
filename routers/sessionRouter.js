const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {SessionModel} = require('../models/session');

//Get all sessions
router.get('/', (req, res) => {
    SessionModel
        .find()
        .populate('instructors preWork')
        .exec()
        .then(sessions => {
            res.json({
                sessions: sessions.map(
                (session) => session.apiRepr())
            });
    })
    .catch(
      err => {
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
      });
});

//Get sessions by Admin Reference
router.get('/admin/:admin', (req, res) => {
    ScheduleModel
        .find({"admin._id": mongoose.Types.ObjectId(req.params.admin)})
        .populate('instructor preWork')
        .exec()
        .then(sessions => {
            res.json({
                sessions: schedules.map(
                (session) => schedule.apiRepr())
            });
    })
        .catch(err => {
        console.error(err);
            res.status(500).json({message: 'Internal server error'})
    });
});
//Get individual sessions
router.get('/:id', (req, res) => {
    SessionModel
        .findById(req.params.id)
        .populate('instructors preWork')
        .exec()
        .then(session => res.json(session.apiRepr()))
        .catch(err => {
        console.error(err);
            res.status(500).json({message: 'Internal server error'})
    });
});
//Create new sessions
router.post('/', jsonParser, (req, res) => {
    const requiredFields = ['title', 'instructors', 'startTime', 'endTime', 'preWork'];
    for (let i=0; i<requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`
            console.error(message);
            return res.status(400).send(message);
        }
    }
    SessionModel
    .create({
        title: req.body.title,
        instructors: req.body.instructors,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        preWork: req.body.preWork})
    .then(
    session => {
        res.status(201).json(session.apiCreatedRepr())
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
    });
});
//Update session
router.put('/:id', jsonParser, (req, res) => {
    if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    const message = (
      `Request path id (${req.params.id}) and request body id ` +
      `(${req.body.id}) must match`);
    console.error(message);
    res.status(400).json({message: message});
  }
    const toUpdate = {};
    const updateablefields = ['title', 'instructors', 'startTime', 'endTime', 'preWork'];
    
    updateablefields.forEach(field => {
        if (field in req.body) {
            toUpdate[field] = req.body[field];
        }
    });
    SessionModel
        .findByIdAndUpdate(req.params.id, {$set: toUpdate})
        .exec()
        .then(session => res.status(200).json(toUpdate))
        .catch(err => res.status(500).json({message: 'Internal server error'}));
});

//Delete session
router.delete('/:id', (req, res) => {
    SessionModel
        .findByIdAndRemove(req.params.id)
        .exec()
        .then(session => res.status(204).end())
        .catch(err => res.status(500).json({message: 'Internal server error'}));
});

//export the router
module.exports = router;