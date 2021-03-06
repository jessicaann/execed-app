const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

const { ScheduleModel } = require('../models/schedule'); // Is schedule the name of the model?

// Get all schedules
router.get('/', (req, res) => {
  ScheduleModel
    .find()
    .exec()
    .then((schedules) => {
      console.log(schedules);
      res.json({
        schedules: schedules.map(schedule => schedule.apiCreatedRepr()),
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

// Get individual schedules
router.get('/:id', (req, res) => {
  ScheduleModel
    .findById(req.params.id)
    .populate({
      path: 'sessions',
      populate: {
        path: 'instructors preWork',
      },
    })
    .exec()
    .then(schedule => res.json(schedule.apiRepr()))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

// Get schedules by Admin Reference
router.get('/admin/:admin', (req, res) => {
  ScheduleModel
    .find({ admin: mongoose.Types.ObjectId(req.params.admin) })
    .populate({
      path: 'sessions',
      populate: {
        path: 'instructors preWork',
      },
    })
    .exec()
    .then((schedules) => {
      res.json({
        schedules: schedules.map(schedule => schedule.apiRepr()),
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

// Create new schedules
router.post('/', jsonParser, (req, res) => {
  const requiredFields = ['title', 'sessions', 'admin'];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }
  ScheduleModel
    .create({
      title: req.body.title,
      dates: req.body.dates,
      sessions: req.body.sessions,
      admin: req.body.admin,
    })
    .then(schedule => res.status(201).json(schedule.apiCreatedRepr()))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});
// Update schedule
router.put('/:id', jsonParser, (req, res) => {
  if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    const message = (
      `Request path id (${req.params.id}) and request body id ` +
      `(${req.body.id}) must match`);
    console.error(message);
    res.status(400).json({ message });
  }
  const toUpdate = {};
  const updateablefields = ['title', 'sessions', 'dates', 'admin'];

  updateablefields.forEach((field) => {
    if (field in req.body) {
      toUpdate[field] = req.body[field];
    }
  });
  ScheduleModel
    .findByIdAndUpdate(req.params.id, { $set: toUpdate })
    .exec()
    .then(schedule => res.status(200).json(toUpdate))
    .catch(err => res.status(500).json({ message: 'Internal server error' }));
});

// Delete schedule
router.delete('/:id', (req, res) => {
  ScheduleModel
    .findByIdAndRemove(req.params.id)
    .exec()
    .then(schedule => res.status(204).end())
    .catch(err => res.status(500).json({ message: 'Internal server error' }));
});

// export the router
module.exports = router;
