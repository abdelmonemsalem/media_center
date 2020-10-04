const router = require('express').Router();
let MediaItem = require('../models/mediaItems.model');

router.route('/').get((req, res) => {
  MediaItem.find()
    .then(mediaItem => res.json(mediaItem))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const date = req.body.date;
  const imgUrl = req.body.imgUrl;
  const type = req.body.type;
  const title = req.body.title;
  const description = req.body.description;
  const fav = req.body.fav 

  const newMediaItem = new MediaItem({
    date,
    imgUrl,
    type,
    title,
    description,
    fav
  });

  newMediaItem.save()
  .then(() => res.json('MediaItem added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  MediaItem.findById(req.params.id)
    .then(mediaItem => res.json(mediaItem))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  MediaItem.findByIdAndDelete(req.params.id)
    .then(() => res.json('MediaItem deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  MediaItem.findById(req.params.id)
    .then(mediaItem => {
      mediaItem.date = req.body.date;
      mediaItem.imgUrl = req.body.imgUrl;
      mediaItem.type = req.body.type;
      mediaItem.title = req.body.title;
      mediaItem.description = req.body.description;
      mediaItem.fav = req.body.fav
      
      mediaItem.save()
        .then(() => res.json('MediaItem updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;