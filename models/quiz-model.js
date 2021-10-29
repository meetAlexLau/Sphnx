const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Quiz = new Schema({
    QuizTitle: {
        type: String
    },
    QuizID: {
        type: String
    },
    QuizBackground:{
        type: String
    },
    QuizQuestions:[[]],
    QuizAnswerKey:{ type : Array , "default" : [] }
})

module.exports = mongoose.model('Quiz', Quiz);