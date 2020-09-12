const router = require('express').Router();
let Media = require('../models/media.model');

router.route('/').get((req, res) => {
  Media.find()
    .then(media => res.json(media))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const date = req.body.date;
  const imgUrl = req.body.imgUrl;
  const type = req.body.type;
  const title = req.body.title;
  const description = req.body.description;

  const newMedia = new Media({
    date,
    imgUrl,
    type,
    title,
    description,
  });

  newMedia.save()
  .then(() => res.json('Media added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Media.findById(req.params.id)
    .then(media => res.json(media))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Media.findByIdAndDelete(req.params.id)
    .then(() => res.json('Media deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Media.findById(req.params.id)
    .then(media => {
      media.date = req.body.date;
      media.imgUrl = req.body.imgUrl;
      media.type = req.body.type;
      media.title = req.body.title;
      media.description = req.body.description;
      
      media.save()
        .then(() => res.json('Media updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;