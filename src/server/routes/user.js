var router = require('express').Router();
var jwt = require('jsonwebtoken');
var User = require('../models/user');

var authentication = require('../utils/authentication');

router.post('/user', function (req, res) {
  console.log('create user ', req.body);
  var user = new User({
    email: req.body.email,
    password: req.body.password,
    token: jwt.sign({email: req.body.email, password: req.body.password}, 'secret', {expiresIn: '1h'})
  });
  user.save(function (err, doc) {
    if (err) {
      res.status(400).send({error: err});
    } else {
      res.send({token: doc.token});
    }
  });
});

router.put('/login', function (req, res) {
  console.log('login ', req.body);
  var reqUser = {email: req.body.email, password: req.body.password};
  console.log(req.body);
  User.findOneAndUpdate(reqUser, {
    $set: {
      token: jwt.sign(reqUser, 'secret', {expiresIn: '1h'})
    }
  }, {new: true}, function (err, user) {
    if (err) {
      res.status(400).send({
        error: "Error occured: " + err
      });
    } else {
      if (user) {
        res.send({
          token: user.token
        });
      } else {
        res.status(400).send({
          error: "Incorrect email or password"
        });
      }
    }
  });
});

router.get('/me', authentication, function (req, res) {
  res.json("sucess");
});


module.exports = router;

//////////////



