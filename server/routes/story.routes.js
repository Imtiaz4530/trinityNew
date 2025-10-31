const router = require('express').Router();

const {dummyRoute} = require('../controllers/story.controller');


router.get('/', dummyRoute);
// router.get('/', getAllStories);
// router.post('/create', createStory);
// router.post('/add', addStory);

module.exports = router;