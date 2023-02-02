const mongoose = require('mongoose');
const { Schema } = mongoose;


const ShowSchema = new Schema({

    showId: String,
    name: String,
    releaseDate: String,
    rating: String,
    noOfRatings: Number,
    series: [
        {
        seriesId: String,
        name: String,
        releaseDate: String,
        rating: Number,
        noOfRatings: Number,
        episodes: [
            {
                videoId: String,
                title: String,
                videoPath: String,
                thumbnailPath: String,
                rating: Number,
                noOfRatings: Number
            }
        ]
    }
],

});

module.exports = {
    ShowSchema
};