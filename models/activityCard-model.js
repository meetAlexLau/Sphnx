const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ActivityCard = new Schema({

    ActivityCardID: {
        type: String
    },

    ActivityCardReferenceID: {
        type: String
    }
    
})