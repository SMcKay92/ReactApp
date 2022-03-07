var mongoose = require('mongoose');

const bandSchema = new mongoose.Schema({
    Name: {type: String, unique: true, required: true},
    Genre: {type: [String], enum: {values: ["Prog Rock", "Hard Rock", "Heavy Metal", "Speed Metal", "Doom Metal", "Thrash Metal", "Blues", "Rock", "Jazz", "Pop"]}, required: true},
    numberOfAlbums: {type: Number, required: false},
    founded: 
    {
        city: {type: String, required: false},
        country: {type: String, required: false},
        year: {type: Number, min: 1950, max: 2022, required: false},
     }, 
    photo: {type: String, required: false},


}, {collection: "bands"});


module.exports = mongoose.model('Band', bandSchema)