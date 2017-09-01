const mongoose = require('mongoose');

//Session Schema
const sessionSchema = mongoose.Schema({
    title: {type: String, required: true},
    instructors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Instructor',
        required: true
    }],
    startTime: {type: Date, required: true},
    endTime: {type: Date, required: true},
    preWork: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'File'
    }],
    admin: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Admin'
    }]
});
//Session API Reveal
sessionSchema.methods.apiRepr = function(){
    console.log(this.preWork);
    return {
        id: this.id,
        title: this.title,
        instructors: this.instructors !== null ? this.instructors.map(instructor => instructor.apiRepr()) : [],
        startTime: this.startTime,
        endTime: this.endTime,
        preWork: this.preWork !== null ? this.preWork.map(file => file.apiRepr()) : []
    };
}
sessionSchema.methods.apiCreatedRepr = function(){
    return {
        id: this.id,
        title: this.title,
        instructors: this.instructors,
        startTime: this.startTime,
        endTime: this.endTime,
        preWork: this.preWork
    };
}

const SessionModel = mongoose.model('Session', sessionSchema);

module.exports={SessionModel};