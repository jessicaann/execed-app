const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {FileModel} = require('../models/file'); //Is file the name of the model?

//Get all files
router.get('/', (req, res) => {
    FileModel
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
    FileModel
        .findById(req.params.id)
        .exec()
        .then(file => res.json(file.apiIdRepr()))
        .catch(err => {
        console.error(err);
            res.status(500).json({message: 'Internal server error'})
    });
});
//Create new files
router.post('/', (req, res) => {
    console.log(req.body, req.form);
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        console.log('file uploading', fields, files);
        const temp = files.file.path,
            fileSize = files.file.size,
            fileExt = files.file.name.split('.').pop(),
            index = temp.lastIndexOf('/') + 1,
            fileName = temp.substr(index);
        const filePath = path.join(process.env.PWD, 'public/uploads', fileName + '.' + fileExt);
        fs.readFile(temp, (err, data) => {
            fs.writeFile(filePath, data, err => {
                if(err){
                    res.status(500).json({success: false, err});
                }
                const requiredFields = ['title', 'firstName', 'lastName', 'yearPublished'];
                for (let i=0; i<requiredFields.length; i++) {
                    const field = requiredFields[i];
                    if (!(field in fields)) {
                        const message = `Missing \`${field}\` in request body`
                        console.error(message);
                        return res.status(400).send(message);
                    }
                }
                FileModel
                .create({
                    title: fields.title,
                    author: {
                        firstName: fields.firstName,
                        lastName: fields.lastName
                    },
                    yearPublished: fields.yearPublished,
                    file: `${fileName}.${fileExt}`
                })
                .then(file => res.status(201).json(file.apiRepr()))
                .catch(err => {
                    console.error(err);
                    res.status(500).json({message: 'Internal server error'});
                });
            })
        });
    });
});

//Update file
router.put('/profile/:id', jsonParser, (req, res) => {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        console.log('file uploading', fields, files);
        if(!files.file){
            if (!(req.params.id && fields.id && req.params.id === fields.id)) {
                const message = (
                `Request path id (${req.params.id}) and request body id ` + `(${fields.id}) must match`);
                console.error(message);
                res.status(400).json({message: message});
            }
            const toUpdate = {};
            const updateablefields = ['title', 'author', 'yearPublished'];
            updateablefields.forEach(field => {
                if (field in fields && fields[field] !== "") {
                    toUpdate[field] = fields[field];
                }
            });
            FileModel
            .findByIdAndUpdate(req.params.id, {$set: toUpdate})
            .exec()
            .then(schedule => res.status(200).json(toUpdate))
            .catch(err => res.status(500).json({message: 'Internal server error'}));
            return
        }
        const temp = files.file.path,
            fileSize = files.file.size,
            fileExt = files.file.name.split('.').pop(),
            index = temp.lastIndexOf('/') + 1,
            fileName = temp.substr(index);
        const filePath = path.join(process.env.PWD, 'public/uploads', fileName + '.' + fileExt);
        fs.readFile(temp, (err, data) => {
            fs.writeFile(filePath, data, err => {
                if(err){
                    res.status(500).json({success: false, err});
                }
                const requiredFields = ['title', 'firstName', 'lastName', 'yearPublished'];
                for (let i=0; i<requiredFields.length; i++) {
                    const field = requiredFields[i];
                    if (!(field in fields)) {
                        const message = `Missing \`${field}\` in request body`
                        console.error(message);
                        return res.status(400).send(message);
                    }
                }
                if (!(req.params.id && fields.id && req.params.id === fields.id)) {
                const message = (
                `Request path id (${req.params.id}) and request body id ` + `(${fields.id}) must match`);
                console.error(message);
                res.status(400).json({message: message});
                }
                const toUpdate = {};
                const updateablefields = ['title', 'author', 'yearPublished'];
                 updateablefields.forEach(field => {
                    if (field in fields && fields[field] !== "") {
                    toUpdate[field] = fields[field];
                    }
                });
                toUpdate.file = `${fileName}.${fileExt}`;

                console.log(toUpdate);

                FileModel
                .findByIdAndUpdate(req.params.id, {$set: toUpdate})
                .then(file => res.status(201).json(file.apiRepr()))
                .catch(err => {
                    console.error(err);
                    res.status(500).json({message: 'Internal server error'});
                
                })
            });
        });
    });
});

//Delete file
router.delete('/profile/:id', (req, res) => {
    FileModel
        .findByIdAndRemove(req.params.id)
        .exec()
        .then(file => res.status(204).end())
        .catch(err => res.status(500).json({message: 'Internal server error'}));
});

//export the router
module.exports = router;