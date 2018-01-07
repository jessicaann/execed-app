const mongoose = require('mongoose');


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
        fullName: this.fullName,
        email: this.email
    };
}

adminSchema.virtual('fullName').get(function() {
    return `${this.firstName} ${this.lastName}`.trim()
});

const AdminModel = mongoose.model('Admin', adminSchema);
module.exports= {AdminModel};