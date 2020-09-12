const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mediaSchema = new Schema({
  date: { type: String, required: true },
  imgUrl: { type: String, required: true },
  type: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
}, 
{
  timestamps: true,
});

const Media = mongoose.model('Media', mediaSchema);

module.exports = Media;