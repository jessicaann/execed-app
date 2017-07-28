const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {fileModel} = require('./models/file'); //Is file the name of the model?

//Get all files
router.get('/', (req, res) => {
    fileModel
        .find()
        .exec()
        .then(files => {
            res.json({
                files: files.map(
                (file) => file.apiRepr())
            });
    })
    .catch(
      err => {
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
      });
});

//Get individual files
router.get('/:id', (req, res) => {
    fileModel
        .findById(req.params.id)
        .exec()
        .then(file => res.json(file.apiRepr()))
        .catch(err => {
        console.error(err);
            res.status(500).json({message: 'Internal server error'})
    });
});
//Create new files
router.post('/', (req, res) => {
    const requiredFields = ['title', 'author', 'yearPublished', 'file'];
    for (let i=0; i<requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`
            console.error(message);
            return res.status(400).send(message);
        }
    }
    fileModel
    .create({
        title: req.body.title,
        author: req.body.author,
        yearPublished: req.body.yearPublished,
        file: req.body.file})
    .then(
    file => res.status(201).json(file.apiRepr()))
    .catch(err => {
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
    });
});
//Update file
router.put('/:id', (req, res) => {
    if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    const message = (
      `Request path id (${req.params.id}) and request body id ` +
      `(${req.body.id}) must match`);
    console.error(message);
    res.status(400).json({message: message});
  }
    const toUpdate = {};
    const updateablefields = ['title', 'author', 'yearPublished', 'file'];
    
    updateablefields.forEach(field => {
        if (field in req.body) {
            toUpdate[field] = req.body[field];
        }
    });
    fileModel
        .findByIdAndUpdate(req.params.id, {$set: toUpdate})
        .exec()
        .then(file => res.status(204).end())
        .catch(err => res.status(500).json({message: 'Internal server error'}));
});

//Delete file
router.delete('/:id', (req, res) => {
    fileModel
        .findByIdAndRemove(req.params.id)
        .exec()
        .then(file => res.status(204).end())
        .catch(err => res.status(500).json({message: 'Internal server error'}));
});

//export the router
module.exports = router;