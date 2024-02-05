const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },

  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  gender: {
    type: String,
  },

  password: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: Number,
  },

  profileImg: {
    type: String,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
    },
  ],
  followers: {
    type: Number,
  },
  following: {
    type: Number,
  },
});

module.exports = mongoose.model("user", userSchema);

// const mongoose = require('mongoose')

// const userSchema = new mongoose.Schema({
//     name:{
//         type: String,
//         required: true,
//         trim: true
//     },
//     email:{
//         type: String,
//         required: true,
//         trim: true
//     },
//     password:{
//         type: String,
//         required: true
//     },
//     role:{
//         type: String,
//         enum:["Admin", "Student", "Visitor"]
//     }
// })

// module.exports = mongoose.model("user", userSchema);
