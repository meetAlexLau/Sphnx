const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Quiz = new Schema({

    QuizAnswerKey:{
        type: Map,
        of: String
    },
    QuizID: {
        type: String
    },

    QuizTitle: {
        type: String
    },

    QuizBackground:{
        type: String
    },

    QuizQuestions: {
        type: Map,
        of: String
    }
})

module.exports = mongoose.model('Quiz', Quiz);