const mongoose = require('mongoose');

//User Schema
const userSchema = mongoose.Schema({
    firstName: {type: String, required:  true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    schedules: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Schedule',
        required: true
    }]
});
//User API Reveal
userSchema.methods.apiRepr = function() {
    const schedules = this.schedules !== null ? this.schedules.map(schedule => schedule.apiRepr()) : [];
    return {
        id: this.id,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        fullName: this.fullName,
        schedules: schedules
    };
}

userSchema.methods.simpleApiRepr = function(){
    return {
        id: this.id,
        email: this.email,
        fullName: this.fullName
    };
}

userSchema.virtual('fullName').get(function() {
    return `${this.firstName} ${this.lastName}`.trim()
});
const UserModel = mongoose.model('User', userSchema);

module.exports = {UserModel};

