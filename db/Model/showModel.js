const mongoose = require('mongoose');
const ShowSchema = require('../Schema/showSchema').ShowSchema;

const ShowModel = mongoose.model('shows', ShowSchema);

module.exports = {
    ShowModel
};