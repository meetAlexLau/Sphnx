const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Post = new Schema({
    PostTitle: {
        type: String
    },
    PostID: {
        type: String
    },
    PostDesc: {
        type: String
    },
    PostPicture: {

        type: String
    },
    PlatformID: {
        type: String
    }
})

module.exports = mongoose.model('Post', Post);