import API from "./axios";

// 🟢 Fetch all stories
export const fetchStories = async () => {
  const res = await API.get("/story");
  return res.data;
};

// // 🟢 Fetch a single story by ID
// export const fetchStoryById = async (id) => {
//   const res = await API.get(`/stories/${id}`);
//   return res.data;
// };

// 🟢 Create a new story
export const createStory = async (storyData) => {
  const res = await API.post("/story/create", storyData);
  return res.data;
};

// 🟢 Add a new part to a story
export const addStoryPart = async (storyData) => {
  const res = await API.post("/story/add", storyData);
  return res.data;
};
