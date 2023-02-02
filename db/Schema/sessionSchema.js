const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const sessionSchema = new Schema({
    userID: String,
    token: String,
});

module.exports = {
    sessionSchema
};