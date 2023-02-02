const mongoose = require('mongoose');
const UserSchema = require('../Schema/userSchema.js').userSchema;

const Users = mongoose.model('users', UserSchema);

module.exports = {

    Users

};