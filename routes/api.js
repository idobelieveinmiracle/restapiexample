const express = require('express');
const router = express.Router();
const Ninja = require('../models/ninja');

// get list of ninjas from database
router.get('/ninjas', function(req, res, next){
  Ninja.find({})
    .then(ninjas => res.send(ninjas))
      .catch(next);
});

// add new ninja to the db
router.post('/ninjas', function(req, res, next){
  Ninja.create(req.body)
    .then(ninja => res.send(ninja))
      .catch(next);  
});

// update a ninja in the db
router.put('/ninjas/:id', function(req, res, next){
  Ninja.findByIdAndUpdate({_id: req.params.id}, req.body)
    .then(() => Ninja.findOne({_id: req.params.id})
      .then(ninja => res.send(ninja)))
        .catch(next);
});

//  delete a ninja in the database
router.delete('/ninjas/:id', function(req, res, next){
  Ninja.findByIdAndRemove({_id: req.params.id})
    .then(ninja => res.send(ninja))
      .catch(next);
});

module.exports = router;
