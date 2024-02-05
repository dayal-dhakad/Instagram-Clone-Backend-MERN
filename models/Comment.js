const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    // likes: {
    //     type: Number,
    //     default: 0
    // }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
