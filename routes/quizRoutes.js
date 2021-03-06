let mongoose = require('mongoose'),
express = require('express'),
router = express.Router();

let quizSchema = require('../models/quiz-model');

 //create quiz
 router.route('/createQuiz').post(function(req, res) {
    let newQuiz = new quizSchema(req.body);
    newQuiz.save()
        .then(object => {
            res.status(200).send(object.id)
            object.QuizID = object.id
            object.save()
        })
        .catch(err => {
            res.status(400).send('Error creating quiz.');
        });
});

//get all quizzes
router.route('/').get((req, res) => {
    quizSchema.find((error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  })

  // Get Single quiz
router.route('/editQuiz/:id').get((req, res) => {
  quizSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


//fetch quiz info (get quiz by id)
router.route('/:id').get(function(req, res) {
    let id = req.params.id;
    quizSchema.findById(id, function(err, object) {
        res.json(object);
    });
});

//delete quiz
router.route('/deleteQuiz/:id').delete(function(req, res){
  Object.findByIdAndDelete(req.params.id, function(err, object){
    if(!object)
      res.status(404).send('data not found')
    else
      object.QuizAnswerKey = req.body.QuizAnswerKey;
      object.QuizID = req.params.id;
      object.QuizTitle = req.body.QuizTitle;
      object.QuizBackground = req.body.QuizBackground;
      object.QuizQuestions = req.body.QuizQuestions;
      object.QuizBadgeArray = req.body.QuizBadgeArray;
      object.QuizAnswerKey = req.body.QuizAnswerKey;
      object.PlatformID = req.body.PlatformID;

      object.save().then( object => {
        res.json('Deleted Quiz')
      })
      .catch(err => {
        res.status(400).send('not deleted!')
      })

  })
})

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
          object.QuizBadgeArray = req.body.QuizBadgeArray;
          object.QuizAnswerKey = req.body.QuizAnswerKey;
          object.PlatformID = req.body.PlatformID;
        
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
