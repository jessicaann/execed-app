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
    startTime: {type: Date},
    endTime: {type: Date},
    preWork: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'FileModel',
    }]
});
//Session API Reveal
sessionSchema.methods.apiRepr = function(){
    return {
        id: this.id,
        title: this.title,
        instructor: this.instructor,
        startTime: this.startTime,
        endTime: this.endTime,
        preWork: this.preWork
    };
}

const UserModel = mongoose.model('User', userSchema); //<-- 'name' refers to collection in db
const AdminModel = mongoose.model('Admin', adminSchema);
const FileModel = mongoose.model('File', fileSchema);
const InstructorModel = mongoose.model('Instructor', instructorSchema);
const ScheduleModel = mongoose.model('Schedule', scheduleSchema);
const SessionModel = mongoose.model('Session', sessionSchema);

module.exports={UserModel, AdminModel, FileModel, InstructorModel, ScheduleModel, SessionModel};