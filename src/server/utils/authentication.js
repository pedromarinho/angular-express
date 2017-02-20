var jwt = require('jsonwebtoken');
var User = require('../models/user');

function isAuthorized(req, res, next) {
  console.log('isAuthorized ', 'email: ', req.headers['email'], ' token: ', req.headers['token']);

  jwt.verify(req.headers['token'], 'secret', function (err) {
    if (err) {
      res.status(401).send("invalid token");
    } else {
      User.findOne({email: req.headers['email'], token: req.headers['token']}, function (err, doc) {
        if (doc) {
          next();
        } else {
          res.status(401).send("invalid user token");
        }
      });
    }
  });
}

module.exports = isAuthorized;
