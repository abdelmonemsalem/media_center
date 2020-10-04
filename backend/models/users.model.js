const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  type: { type: String, required: false },
  name: { type: String, required: true },
  password: { type: String, required: true },
  confirmed: { type: Boolean, required: false },
}, 
{
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;