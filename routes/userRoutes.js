let mongoose = require('mongoose'),
express = require('express'),
router = express.Router();

//User model
let userSchema = require('../models/user-model');

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

router.route('/:id').get(function(req, res) {
    let id = req.params.id;
    userSchema.findById(id, function(err, object) {
        res.json(object);
    });
});

router.route('/').get(function(req, res) {
    userSchema.find(function(err, platforms){
        if(err) {
            console.log(err)
        }
        else{
            res.json(platforms);
        }
    })
})

router.route('/UserID/:UserID').get(function(req, res) {
    let UserID = req.params.UserID;
    userSchema.find({UserID: UserID}, function(err, user) {
        res.json(user);
    });
});


//update user info
router.route('/:id').put((req, res) => {
    userSchema.findOne({_id: req.params.id}, function(err, object) {
      if(!object)
          res.status(404).send("Error Object not found")
      else  
          
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
          object.UserPrimaryColor = req.body.UserPrimaryColor;
          object.UserSecondaryColor = req.body.UserSecondaryColor;
        
          object.save()
            .then(object => {
                res.json("User has been updated")
                res.send()
            })
            .catch(err => {
                res.status(400).send("Error occurred when updating User.")
            })
    })
  })

  
  module.exports = router;
