const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = new Schema({

    UserID: {
        type: String
    },

    UserName: {
        type: String
    },

    UserEmail: {
        type: String
    },

    UserPicture: {
        type: String,
    },

    UserBackgroundPicture: {
        type: String
    },

    UserBadgeArray: {
        type: Map,
        of: String
    },
    
    UserPlatformArray: {
        type: Map,
        of: String
    },

    UserSubscribedPlatformArray: {
        type: Map,
        of: String
    },

    UserFriendsArray: {
        type: Map,
        of: String
    },

    UserPoints: {
        type: Number
    },

    UserCoints: {
        type: Number
    }
})