let mongoose = require('mongoose'),
express = require('express'),
router = express.Router();

let badgeSchema = require('../models/badge-model')

router.route('/createBadge').post(function(req, res) {
    let newBadge = new badgeSchema(req.body);
    newBadge.save()
        .then(object => {
            res.status(200).send(object.id)
            object.BadgeID = object.id
            object.save()
        })
        .catch(err => {
            res.status(400).send('Error creating badge.')
        })
})

router.route('/').get((req, res) => {
    badgeSchema.find((error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
})

router.route('/:id').get(function(req, res) {
    let id = req.params.id;
    badgeSchema.findById(id, function(err, object) {
        res.json(object);
    });
});


module.exports = router;