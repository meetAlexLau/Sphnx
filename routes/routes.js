let mongoose = require('mongoose'),
express = require('express'),
router = express.Router();

//User model
let userSchema = require('../models/user-model');
//Platform model
let platformSchema = require('../models/platform-model');
//quiz model
let quizSchema = require('../models/quiz-model');
//question model
let questionSchema = require('../models/question-model')


// create new profile

router.route('/signUp').post(function(req, res) {
    let newUser = new userSchema(req.body);
    newUser.save()
        .then(object => {
            res.status(200).send('User successfully created')
        })
        .catch(err => {
            res.status(400).send('Error creating user');
        });
});

//fetch user info
router.route('users/:id').get(function(req, res) {
    let id = req.params.id;
    userSchema.findById(id, function(err, object) {
        res.json(object);
    });
});


//update user info
router.route('/updateUser/:id').post((req, res) => {
    userSchema.findById(req.params.id, function(err, object) {
      if(!object)
          res.status(404).send("Error Object not found")
      else  
          object.UserID = req.params.id;
          object.UserName = req.body.UserName;
          object.UserEmail = req.body.UserEmail;
          object.UserPicture = req.body.UserPicture;
          object.UserBackgroundPicture = req.body.UserBackgroundPicture;
          object.UserBadgeArray = req.body.UserBadgeArray;
          object.UserPlatformArray = req.body.UserPlatformArray;
          object.UserFriendsArray = req.body.UserFriendsArray;
          object.UserPoints = req.body.UserPoints;
          object.UserCoints = req.body.UserCoints;
          object.UserColor1 = req.body.UserColor1;
          object.UserColor2 = req.body.UserColor2;
        
          object.save()
            .then(object => {
                res.json("User has been updated")
            })
            .catch(err => {
                res.status(400).send("Error occurred when updating User.")
            })
    })
  })


//create platform
router.route('/createPlatform').post(function(req, res) {
    let newPlatform = new platformSchema(req.body);
    newPlatform.save()
        .then(object => {
            res.status(200).send('Platform successfully created')
        })
        .catch(err => {
            res.status(400).send('Error creating platform');
        });
});

//fetch platform info
router.route('/platforms/:id').get(function(req, res) {
    let id = req.params.id;
    platformSchema.findById(id, function(err, object) {
        res.json(object);
    });
});

//update platform
router.route('/updatePlatform/:id').post((req, res) => {
    platformSchema.findById(req.params.id, function(err, object) {
      if(!object)
          res.status(404).send("Error Object not found")
      else  
          object.PlatformActivityCardArray = req.body.PlatformActivityCardArray;
          object.PlatformBadgeArray = req.body.PlatformBadgeArray;
          object.PlatformColor = req.body.PlatformColor;
          object.PlatformDesc = req.body.PlatformDesc;
          object.PlatformID = req.params.id;
          object.PlatformLeaderBoard = req.body.PlatformLeaderBoard;
          object.PlatformName = req.body.PlatformName;
          object.PlatformPicture = req.body.PlatformPicture;
          object.PlatformPoints = req.body.PlatformPoints;
          object.PlatformQuizArray = req.body.PlatformQuizArray;
          object.platformSubscriberArray = req.body.PlatformQuizArray;
        
        
          object.save()
            .then(object => {
                res.json("platform has been updated")
            })
            .catch(err => {
                res.status(400).send("Error occurred when updating platform.")
            })
    })
  })

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
router.route('/quizzes/:id').get(function(req, res) {
    let id = req.params.id;
    quizSchema.findById(id, function(err, object) {
        res.json(object);
    });
});

//update quiz
router.route('/updateQuiz/:id').post((req, res) => {
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

//update question
router.route('/updateQuiz/:id').post((req, res) => {
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



