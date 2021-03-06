var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  address: {
    type: String
  },
  phone: {
    type: String
  },
  token: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('User', UserSchema);
