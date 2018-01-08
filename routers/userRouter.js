const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

const { UserModel } = require('../models/user');


// User Login - Create a Session
router.post('/session', jsonParser, (req, res) => {
  console.log(req.body);
  const requiredFields = ['email', 'password'];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }
  UserModel
    .findOne({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user) {
        // validate the password
        if (user.password !== req.body.password) {
          res.status(404).json({ message: 'Invalid login' });
        } else {
          // create the session
          res.status(200).json({ accessToken: user.id, username: user.fullName });
        }
      } else {
        res.status(404).json({ message: 'Invalid login' });
      }
    });
});
// Delete the Session
router.delete('/session', (req, res) => {
  res.status(204).send;
});

// Get all user accounts
router.get('/', (req, res) => {
  UserModel
    .find()

    .exec()
    .then((users) => {
      res.json(users.map(user => user.simpleApiRepr()));
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

// Get individual user accounts
router.get('/:id', (req, res) => {
  UserModel
    .findById(req.params.id)
    .populate({
      path: 'schedules',
      populate: {
        path: 'sessions',
        populate: {
          path: 'instructors preWork',
        },
      },
    })
    .exec()
    .then(user => res.json(user.apiRepr()))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

// Create new user accounts
router.post('/', jsonParser, (req, res) => {
  const requiredFields = ['firstName', 'lastName', 'email', 'password', 'schedules'];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }
  // make sure an account with the same email address doesn't already exist
  UserModel
    .findOne({ email: req.body.email })
    .exec((err, found_userAccount) => {
      if (err) { return next(err); }
      if (found_userAccount) {
        res.status(400).json({ message: 'An account already exists using this email address.' });
      } else {
        UserModel
          .create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            schedules: req.body.schedules,
          })
          .then((user) => {
            res.status(201).json(user.apiRepr());
          })
          .catch((err) => {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
          });
      }
    });
});

// Update user accounts
router.put('/:id', jsonParser, (req, res) => {
  if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    const message = (
      `Request path id (${req.params.id}) and request body id ` +
      `(${req.body.id}) must match`);
    console.error(message);
    res.status(400).json({ message });
  }
  const toUpdate = {};
  const updateablefields = ['firstName', 'lastName', 'email', 'password', 'schedules'];

  updateablefields.forEach((field) => {
    if (field in req.body && req.body[field] !== '') {
      toUpdate[field] = req.body[field];
    }
  });
  UserModel
    .findByIdAndUpdate(req.params.id, { $set: toUpdate })
    .exec()
    .then(user => res.status(200).json(toUpdate))
    .catch(err => res.status(500).json({ message: 'Internal server error' }));
});

// Delete user Accounts
router.delete('/:id', (req, res) => {
  UserModel
    .findByIdAndRemove(req.params.id)
    .exec()
    .then(user => res.status(204).end())
    .catch(err => res.status(500).json({ message: 'Internal server error' }));
});

// export the router
module.exports = router;
