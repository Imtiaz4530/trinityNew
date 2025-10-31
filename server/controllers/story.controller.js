const Story = require('../models/Story.model');

const createStory = async (req, res) => {
    const { title, content, link } = req.body;

    try {

        if (!title || !content) {
            return res.status(400).json({ message: 'Title and content are required' });
        }

        if (link) {
            const existStoryLink = await Story.findOne({link});
            
            if (existStoryLink) {
                return res.status(409).json({ message: 'Story with the same link already exists' });
            }
        }

        const existStory = await Story.findOne({title});

        if (existStory) {
            return res.status(409).json({ message: 'Story with the same title already exists' });
        }

        const storyData = { title, content, link };

        const story = await Story.create(storyData);
        res.status(201).json({ story, message: 'Story added successfully' });

    } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'Server Error' });
    }
}

const addStory = async (req, res) => {
    const { title, content } = req.body;

    try {
        
        if (!title || !content) {
            return res.status(400).json({ message: 'Title and content are required' });
        }

        const existStory = await Story.findOne({title});

        if (!existStory) {
            return res.status(404).json({ message: 'Story not found' });
        }

        existStory.content.push(content)
        await existStory.save();

        res.status(200).json({ story: existStory, message: 'New part added successfully!' });

    } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'Server Error' });
    }
}

const getAllStories = async (req, res) => {
    try {
        const stories = await Story.find();
        res.status(200).json(stories);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'Server Error' });
    }
    
}


module.exports = { createStory, addStory, getAllStories };