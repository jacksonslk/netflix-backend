const mongoose = require('mongoose');
const sessionSchema = require('../Schema/sessionSchema.js');

const Sessions = mongoose.model("sessions", sessionSchema);

module.exports = {

    Sessions

};
