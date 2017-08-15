const mongoose = require('mongoose');


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
        instructorName: this.instructorName,
        email: this.email
    };
}
const InstructorModel = mongoose.model('Instructor', instructorSchema);
module.exports = {InstructorModel};