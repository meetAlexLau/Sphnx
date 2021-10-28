const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Question = new Schema({

    QuestionID: {
        type: String
    },

    QuestionText: {
        type: String
    },

    QuestionOptions: {
        type: Map,
        of: String
    }
})

module.exports = mongoose.model('Question', Question);