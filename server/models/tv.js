let mongoose = require('mongoose');

//Schema for entry in the collection
let tvModel = mongoose.Schema({
    name: String,
    creator: String,
    genres: String,
    episodes: String,
    certification: String,
    },
    {
        collection: "tv"
    }
);
module.exports = mongoose.model('Show', tvModel);