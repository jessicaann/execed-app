const mongoose = require('mongoose');

// Schedule Schema
const scheduleSchema = mongoose.Schema({
  title: { type: String, required: true },
  dates: { type: String, required: true },
  sessions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Session',
  }],
  admin: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
  }],
});
// Schedule API Reveal
scheduleSchema.methods.apiRepr = function () {
  console.log(this.sessions);
  const sessions = this.sessions !== null ? this.sessions.map(session => session.apiRepr()) : [];
  return {
    id: this.id,
    dates: this.dates,
    title: this.title,
    sessions,
    admin: this.admin,
  };
};
scheduleSchema.methods.apiCreatedRepr = function () {
  return {
    id: this.id,
    dates: this.dates,
    title: this.title,
    sessions: this.sessions,
    admin: this.admin,
  };
};

const ScheduleModel = mongoose.model('Schedule', scheduleSchema);
module.exports = { ScheduleModel };
