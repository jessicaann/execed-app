const mongoose = require('mongoose');

//Schedule Schema
const scheduleSchema = mongoose.Schema({
    title: {type: String, required: true},
    sessions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SessionModel'
    }],
    admin: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AdminModel'
    }]
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
const ScheduleModel = mongoose.model('Schedule', scheduleSchema);
module.exports = {ScheduleModel};