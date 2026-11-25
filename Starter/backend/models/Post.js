const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    //Added title field with String type, required validation, trim, and minlength
    title: {type: String, Required: true, Trim: true, minlength: 4},
    //Added content field with String type, required validation, trim, and minlength
    content: {type: String, Required: true, Trim: true, minlength: 8},
    //Added author field with String type, required validation, and trim
    author: {type: String, Required: true, Trim: true}
  },
  {
    //Enabled timestamps to track creation and update times
    timestamps: true
  }
);

module.exports = mongoose.model('Post', postSchema);