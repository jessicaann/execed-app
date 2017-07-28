const mongoose = require('mongoose');

//User Schema
const userSchema = mongoose.Schema({
    firstName: {type: String, required:  true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    courses: {
        type: [{}],
        default: undefined,
        required: true
    }
});
//User API Reveal
userSchema.methods.apiRepr = function() {
    return {
        id: this.id,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        courses: this.courses
    };
}
//Admin Schema
const adminSchema = mongoose.Schema({
    firstName: {type: String, required:  true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true}
});
//Admin API Reveal
adminSchema.methods.apiRepr = function() {
    return {
        id: this.id,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email
    };
}
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
//Instructor Schema
const instructorSchema = mongoose.Schema({
    firstName: {type: String, required:  true},
    lastName: {type: String, required: true},
    email: {type: String, required: true}
});
//Instructor Virtuals
instructorSchema.virtual('instructorName').get(function() {
    return `${this.firstName} ${this.lastName}`.trim();
});
//Instructor API Reveal
instructorSchema.methods.apiRepr = function() {
    return {
        id: this.id,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email
    };
}
//Schedule Schema
const scheduleSchema = mongoose.Schema({
    title: {type: String, required: true},
    sessions: {
        type: [{}],
        default: undefined
    },
    admin: { //is this correct for a admin reference?
        type: [{}],
        default: undefined
    }
});
//Schedule API Reveal
scheduleSchema.methods.apiRepr = function(){
    return {
        id: this.id,
        title: this.title,
        sessions: this.sessions,
        admin: this.admin
    };
}
//Session Schema
const sessionSchema = mongoose.Schema({
    title: {type: String, required: true},
    instructors: {
        type: [{}],
        default: undefined
    },
    date: {type: Date},
    startTime: {type: Date}, //since Date type can store time, is this the right way to store it?
    endTime: {type: Date},
    preWork: {
        type: [],
        default: undefined
    }
});
//Session API Reveal
sessionSchema.methods.apiRepr = function(){
    return {
        id: this.id,
        title: this.title,
        instructor: this.instructor,
        date: this.date,
        startTime: this.startTime,
        endTime: this.endTime,
        preWork: this.preWork
    };
}

const userModel = mongoose.model('userModel', userSchema);
const adminModel = mongoose.model('adminModel', adminSchema);
const fileModel = mongoose.model('fileModel', fileSchema);
const instructorModel = mongoose.model('instructorModel', instructorSchema);
const scheduleModel = mongoose.model('scheduleModel', scheduleSchema);
const sessionModel = mongoose.model('sessionModel', sessionSchema);

module.exports={userModel, adminModel, fileModel, instructorModel, scheduleModel, sessionModel};