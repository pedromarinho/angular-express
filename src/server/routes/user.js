var router = require('express').Router();
var jwt = require('jsonwebtoken');
var User = require('../models/user');

var authentication = require('../utils/authentication');

router.post('/create', function (req, res) {
  var user = new User({
    email: req.body.email,
    password: req.body.password,
    token: jwt.sign({email: req.body.email, password: req.body.password}, 'secret', {expiresIn: '1h'})
  });
  user.save(function (err, doc) {
    if (err) {
      res.send({error: err.code});
    } else {
      res.send({token: doc.token});
    }
  });
});

router.put('/login', function (req, res) {
  var reqUser = {email: req.body.email, password: req.body.password};
  console.log(req.body);
  User.findOneAndUpdate(reqUser, {
    $set: {
      token: jwt.sign(reqUser, 'secret', {expiresIn: '1h'})
    }
  }, {new: true}, function (err, user) {
    if (err) {
      res.send({
        error: "Error occured: " + err
      });
    } else {
      if (user) {
        res.send({
          token: user.token
        });
      } else {
        res.send({
          error: "Incorrect email/password"
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



