const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
let Badge = new Schema({

    BadgeID: String,
    BadgeTitle: String,
    BadgePicture: String,
    BadgeMaxTime: Number,
    BadgeMinScore: Number,
    BadgeType: Number,
    BadgeHostQuiz: String,
    BadgeHostPlatform: String
})

module.exports = mongoose.model('Badge', Badge);
