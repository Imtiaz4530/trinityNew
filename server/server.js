require('dotenv').config();
const express = require('express');
const cors = require('cors');

const connectDB = require('./db/connectDB');
const storyRoutes = require('./routes/story.routes');

const app = express();

app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL, 
  credentials: true,
}));
connectDB();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use("/api/story", storyRoutes)

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

