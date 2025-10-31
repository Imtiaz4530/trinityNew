const mongoose = require('mongoose');

const StorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
 content: {
    type: [String], 
    required: true,
  },
  link: {
    type: String,
    trim: true
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Story', StorySchema);