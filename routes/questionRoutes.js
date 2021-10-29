let mongoose = require('mongoose'),
express = require('express'),
router = express.Router();

//question model
let questionSchema = require('../models/question-model')

//create question
router.route('/createQuestion').post(function(req, res) {
    let newQuestion = new questionSchema(req.body);
    newQuestion.save()
        .then(object => {
            res.status(200).send('Question successfully created')
        })
        .catch(err => {
            res.status(400).send('Error creating question');
        });
});

<<<<<<< HEAD
=======
//fetch question
router.route('/:id').get(function(req, res) {
    let id = req.params.id;
    questionSchema.findById(id, function(err, object) {
        res.json(object);
    });
});

>>>>>>> local-testing
//update question
router.route('/updateQuiz/:id').put((req, res) => {
    questionSchema.findById(req.params.id, function(err, object) {
      if(!object)
          res.status(404).send("Error Object not found")
      else  
          object.QuestionID = req.params.id;
          object.QuestionText = req.body.QuestionText;
          object.QuestionOptions = req.body.QuestionOptions;
        
          object.save()
            .then(object => {
                res.json("question has been updated")
            })
            .catch(err => {
                res.status(400).send("Error occurred when updating question.")
            })
    })
  })




  module.exports = router;