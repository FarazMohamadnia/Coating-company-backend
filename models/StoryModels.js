const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  image1: {
    type: String,
    required: true
  },
  image2: {
    type: String,
    required: true
  },
});

const ImageModels = mongoose.model('Image', imageSchema);

module.exports = ImageModels;
