let mongoose = require('mongoose'),
express = require('express'),
router = express.Router();

let quizSchema = require('../models/quiz-model');

 //create quiz
 router.route('/createQuiz').post(function(req, res) {
    let newQuiz = new quizSchema(req.body);
    newQuiz.save()
        .then(object => {
            res.status(200).send('Quiz successfully created')
        })
        .catch(err => {
            res.status(400).send('Error creating quiz.');
        });
});

//fetch quiz info
router.route('/:id').get(function(req, res) {
    let id = req.params.id;
    quizSchema.findById(id, function(err, object) {
        res.json(object);
    });
});

//update quiz
router.route('/updateQuiz/:id').put((req, res) => {
    quizSchema.findById(req.params.id, function(err, object) {
      if(!object)
          res.status(404).send("Error Object not found")
      else  
          object.QuizAnswerKey = req.body.QuizAnswerKey;
          object.QuizID = req.params.id;
          object.QuizTitle = req.body.QuizTitle;
          object.QuizBackground = req.body.QuizBackground;
          object.QuizQuestions = req.body.QuizQuestions;
        
        
          object.save()
            .then(object => {
                res.json("quiz has been updated")
            })
            .catch(err => {
                res.status(400).send("Error occurred when updating quiz.")
            })
    })
  })

  
  module.exports = router;