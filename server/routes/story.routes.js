const router = require('express').Router();

const {getAllStories, createStory, addStory} = require('../controllers/story.controller');


router.get('/', getAllStories);
router.post('/create', createStory);
router.post('/add', addStory);

module.exports = router;