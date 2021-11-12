const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Platform = new Schema({

    PlatformActivityCardArray:{
        type: Map,
        of: String
    },

    PlatformBadgeArray : {
        type: Map,
        of: String
    },

    PlatformColor1: {
        type: String
    },

    PlatformColor2: {
        type: String
    },

    PlatformColor2: {
        type: String
    },

    PlatformDesc: {
        type: String
    },

    PlatformID: {
        type: String
    },

    PlatformLeaderBoard: {
        type: Map,
        of: String
    },

    PlatformName: {

        type: String
    },

    PlatformPicture: {

        type: String
    },

    PlatformPoints: {
        type: Number
    },

    PlatformQuizArray: [],

    PlatformBadgeArray: [],

    PlatformSubscriberArray: [],

    ScoreBoard: []
})

module.exports = mongoose.model('Platform', Platform);