const mongoose = require('mongoose');

//User Schema
const userSchema = mongoose.Schema({
    firstName: {type: String, required:  true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ScheduleModel',
        required: true
    }]
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
const UserModel = mongoose.model('User', userSchema);

module.exports = {UserModel};

//import {UserModel} from './models/user';
//import UserModel from './models/user';