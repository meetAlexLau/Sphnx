const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
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
        data: Buffer,
        contentType: String
    },

    UserBackgroundPicture: {
        data: Buffer,
        contentType: String
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

    UserCoins: {
        type: Number
    }
})

module.exports = mongoose.model("Users", UserSchema)