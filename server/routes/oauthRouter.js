const express = require('express');
const oauthController = require('../controllers/oauthController');
const router = express.Router();

// router.use(express.json());
// router.use(express.urlencoded({ extended: true }));

router.get('/github', (req, res) => {
  console.log('Here is the code github sent back: ', req);
  console.log(req.originalUrl);
  res.status(200).json('Cool');
});

module.exports = router;
