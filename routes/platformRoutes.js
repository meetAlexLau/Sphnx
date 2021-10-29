let mongoose = require('mongoose'),
express = require('express'),
router = express.Router();

let platformSchema = require('../models/platform-model');

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
<<<<<<< HEAD
router.route('/platforms/:id').get(function(req, res) {
=======
router.route('/:id').get(function(req, res) {
>>>>>>> local-testing
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

  module.exports = router;