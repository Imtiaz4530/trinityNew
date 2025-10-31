import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom"; 

import { createStory } from "../../api/storyApi";
import styles from "./PostStory.module.css";

const PostStory = () => {
  const [formData, setFormData] = useState({
    title: "",
    link: "",
    content: "",
  });

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createStory,
    onSuccess: () => {
      queryClient.invalidateQueries(["stories"]);

      setFormData({ title: "", link: "", content: "" });
      navigate("/");
    },
    onError: () => {
      alert("❌ Failed to post story. Please try again.");
    },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const storyData = {
      title: formData.title,
      link: formData.link,
      content: [formData.content],
    };

    mutate(storyData); 
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.heading}>✍️ Post Your Story</h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="title">Story Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter your story title"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="link">Real Story Link</label>
            <input
              type="url"
              id="link"
              name="link"
              value={formData.link}
              onChange={handleChange}
              placeholder="Enter the reference link (optional)"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="content">Story</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write your story here..."
              rows="10"
              required
            ></textarea>
          </div>

          <button type="submit" className={styles.submitBtn}>
            Publish Story 🚀
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostStory;
