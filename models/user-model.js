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
        type: String,
    },

    UserBackgroundPicture: {
        type: String
    },

    UserBadgeArray: [],
    
    UserPlatformArray: [],

    UserSubscribedPlatformArray: [],

    UserFriendArray: [],

    UserPoints: {
        type: Number
    },

    UserCoins: {
        type: Number
    },

    UserPrimaryColor: {
        type: String
    },

    UserSecondaryColor: {
        type: String
    }
})


module.exports = mongoose.model('User', UserSchema);
