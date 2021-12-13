let mongoose = require('mongoose'),
express = require('express'),
router = express.Router();

let postSchema = require('../models/post-model');

 //create post
 router.route('/createPost').post(function(req, res) {
    let newPost = new postSchema(req.body);
    newPost.save()
        .then(object => {
            res.status(200).send(object.id)
            object.PostID = object.id
            object.save()
        })
        .catch(err => {
            res.status(400).send('Error creating post.');
        });
});

//get all posts
router.route('/').get((req, res) => {
  postSchema.find((error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  })


//fetch post info (get post by id)
router.route('/:id').get(function(req, res) {
    let id = req.params.id;
    postSchema.findById(id, function(err, object) {
        res.json(object);
    });
});

//delete post
router.route('/deletePost/:id').delete(function(req, res){
  Object.findByIdAndDelete(req.params.id, function(err, object){
    if(!object)
      res.status(404).send('data not found')
    else
      object.PostDesc = req.body.PostDesc;
      object.PostID = req.params.id;
      object.PostTitle = req.body.PostTitle;
      object.PostPicture = req.body.PostPicture;

      object.save().then( object => {
        res.json('Deleted Post')
      })
      .catch(err => {
        res.status(400).send('not deleted!')
      })

  })
})

//update post
router.route('/updatePost/:id').put((req, res) => {
  postSchema.findById(req.params.id, function(err, object) {
      if(!object)
          res.status(404).send("Error Object not found")
      else  
          object.PostDesc = req.body.PostDesc;
          object.PostID = req.params.id;
          object.PostTitle = req.body.PostTitle;
          object.PostPicture = req.body.PostPicture;
      
        
        
          object.save()
            .then(object => {
                res.json("post has been updated")
            })
            .catch(err => {
                res.status(400).send("Error occurred when updating post.")
            })
    })
  })

  
  module.exports = router;
