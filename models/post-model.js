const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Post = new Schema({
    PostText: {
        type: String
    },
    PostID: {
        type: String
    },
    PlatformID: {
        type: String
    }
})