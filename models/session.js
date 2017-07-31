const mongoose = require('mongoose');

//Session Schema
const sessionSchema = mongoose.Schema({
    title: {type: String, required: true},
    instructors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'InstructorModel',
        required: true
    }],
    startTime: {type: Date, required: true},
    endTime: {type: Date, required: true},
    preWork: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'FileModel'
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

const SessionModel = mongoose.model('Session', sessionSchema);

module.exports={SessionModel};