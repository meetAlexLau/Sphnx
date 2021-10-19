const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Badge = new Schema({

    BadgeDesc: String,
    BadgeID: Number,
    BadgeName: String,
    BadgePicture:{
        data: Buffer,
        contentType: String
    }
})