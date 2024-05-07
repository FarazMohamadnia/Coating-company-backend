const mongoose = require('mongoose');

const ColorData = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  type:{
    type :String,
    required: true
  },
  colorCode:{
    type :String,
  },
  Photo:{
    type :String,
    required: true
  }
});

const ColorModel = mongoose.model('cardColor', ColorData);

module.exports = ColorModel;
