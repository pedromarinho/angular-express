var router = require('express').Router();
var jwt = require('jsonwebtoken');
var User = require('../models/user');

var authentication = require('../utils/authentication');

router.get('/user', authentication, function (req, res) {
  User.find(function (err, user) {
    if (err) return console.error(err);
    res.send(user);
  });
});

router.post('/register', function (req, res) {
  console.log('create user ', req.body);
  var newUser = req.body;
  newUser.token = jwt.sign(newUser, 'secret', {expiresIn: '1h'});
  var user = new User(newUser);
  user.save(function (err, doc) {
    if (err) {
      res.status(400).send({error: err});
    } else {
      res.send({email: doc.email, token: doc.token});
    }
  });
});

router.put('/login', function (req, res) {
  console.log('login ', req.body);
  User.findOneAndUpdate(req.body, {
    $set: {
      token: jwt.sign(req.body, 'secret', {expiresIn: '1h'})
    }
  }, {new: true}, function (err, user) {
    if (err) {
      res.status(400).send({
        error: "Error occured: " + err
      });
    } else {
      if (user) {
        res.send({
          email: user.email, token: user.token
        });
      } else {
        res.status(400).send({
          error: "Incorrect email or password"
        });
      }
    }
  });
});

router.put('/logout', authentication, function (req, res) {
  console.log('logout ', req.headers['email']);
  User.findOneAndUpdate({email: req.headers['email']}, {
    $set: {
      token: ''
    }
  }, {new: true}, function (err, user) {
    if (user) {
      res.end();
    }
  });
});

router.delete('/user/:id', authentication, function (req, res) {
  User.remove({_id: req.params.id}, function (err) {
    if (err) {
      res.sendStatus(404);
    } else {
      res.send();
    }
  });
});

router.get('/me', authentication, function (req, res) {
  res.json("sucess");
});


module.exports = router;

//////////////



