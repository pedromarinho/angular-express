var jwt = require('jsonwebtoken');
var User = require('../models/user');

function isAuthorized(req, res, next) {
  // console.log(permission);

  jwt.verify(req.headers['token'], 'secret', function (err) {
    if (err) {
      res.sendStatus(401);
    } else {
      User.findOne({token: req.headers['token']}, function (err, doc) {
        if (doc) {
          next();
        } else {
          res.sendStatus(401);
        }
      });
    }
  });
}

module.exports = isAuthorized;
