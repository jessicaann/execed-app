const mongoose = require('mongoose');


//File Schema
const fileSchema = mongoose.Schema({
    title: {type: String, required: true},
    author: {
        firstName: String,
        lastName: String
    },
    yearPublished: {type: String},
    file: {type: String}
});
//File Virtuals
fileSchema.virtual('authorName').get(function() {
    return `${this.author.firstName} ${this.author.lastName}`.trim();
});
//File API Reveal
fileSchema.methods.apiRepr = function() {
    return {
        id: this.id,
        title: this.title,
        author: this.authorName,
        yearPublished: this.yearPublished,
        file: this.file
    };
}

const FileModel = mongoose.model('File', fileSchema);
module.exports={FileModel};