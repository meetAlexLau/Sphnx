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

    QuizUserAnswers: {

        type: Map,
        of: String
    }
})