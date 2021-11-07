const mongoose = require("mongoose");

var CardImage = new mongoose.Schema({
    img:
    {
        data: Buffer,
        contentType: String
    }
});

module.exports = new mongoose.model('Image', CardImage);