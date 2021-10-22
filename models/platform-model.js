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

    PlatformColor: {
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

        data: Buffer,
        contentType: String
    },

    PlatformPoints: {
        type: Number
    },

    PlatformQuizArray: {
        type: Map,
        of: String
    },

    PlatformSubscriberArray: {
        type: Map,
        of: String
    }
})