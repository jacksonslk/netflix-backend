const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    userId: String,
    name: String,
    email: String,
    password: String,
    phoneNo: String,
    isEmailVerified: Boolean,
    isPhoneNoVerified: Boolean,
    creationDate: Date,
    role: String,
    state: String,
    profiles: [ {profileId: String, name: String} ],
    watchHistory: [{
        showId: String,
        series: [
            {
                seriesId: String,
                episodes: [
                    {
                    videoId: String,
                    watchTime: Number
                }
            ]
            }
        ]
    }]
});

module.exports = {
    userSchema
};