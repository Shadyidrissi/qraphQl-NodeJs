const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  gmail: {
    type:String,
    unique:true,
  },
  password: String,
});

const User = mongoose.model('Users', userSchema);
module.exports=User