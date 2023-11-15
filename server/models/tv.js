let mongoose = require('mongoose');

//Schema for entry in the collection
let tvModel = mongoose.Schema({
    name: String,
    creator: String,
    genres: String,
    episodes: Number,
    certification: String,
    status: String,
    release: String,
    description: String,
    watching: String,
    watched: String,
    rating: String
},
{
    collection: "tv"
});
module.exports = mongoose.model('Show', tvModel);