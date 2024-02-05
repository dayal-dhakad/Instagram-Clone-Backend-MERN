const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    description: {
        type: String
        
    },
    location:{
        type:String
    }
})


module.exports = mongoose.model("posts", postSchema);