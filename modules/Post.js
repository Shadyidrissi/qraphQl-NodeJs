const mongoose = require('mongoose')
const { Schema } = mongoose;

const postSchema = new Schema({
  title: String,
  contant: String,
  userId: String,
});

const Post = mongoose.model('Post', postSchema);
module.exports=Post