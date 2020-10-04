const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mediaItemSchema = new Schema({
  date: { type: String, required: true },
  imgUrl: { type: String, required: true },
  type: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  fav: { type: Boolean, required: false },
}, 
{
  timestamps: true,
});

const MediaItem = mongoose.model('MediaItem', mediaItemSchema);

module.exports = MediaItem;