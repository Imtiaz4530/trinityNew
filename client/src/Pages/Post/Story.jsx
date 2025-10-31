import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import styles from "./Story.module.css";
import Loading from "../loading/Loading";
import { addStoryPart } from "../../api/storyApi";

const Story = ({ stories, loading }) => {
  const [story, setStory] = useState(null);
  const [content, setContent] = useState("");
  const [words, setWords] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [newContent, setNewContent] = useState("");

  const { id } = useParams();
  const queryClient = useQueryClient();
  const wordsPerPage = 15000;

  useEffect(() => {
    if (!loading) {
      const story = stories.find((s) => s._id === id);
      if (story) setStory(story);
    }
  }, [loading, stories, id]);

  useEffect(() => {
    if (story) {
      const fullContent = story.content.join(" ");
      setContent(fullContent);
    }
  }, [story]);

  useEffect(() => {
    if (content) {
      const wordArray = content.split(" ");
      const total = Math.ceil(wordArray.length / wordsPerPage);
      setWords(wordArray);
      setTotalPages(total);
    }
  }, [content]);

  const start = (currentPage - 1) * wordsPerPage;
  const end = start + wordsPerPage;
  const currentText = words.slice(start, end).join(" ");

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

   const handleAddPart = () => setShowModal(true);

  const mutation = useMutation({
  mutationFn: addStoryPart,
  onSuccess: () => {
    queryClient.invalidateQueries(["stories"]);
    setNewContent("");
    setShowModal(false);
  },
  onError: (error) => {
    console.error("Error submitting story:", error);
    alert("❌ Failed to post story. Please try again.");
  },
});

const handleSubmit = (e) => {
  e.preventDefault();

  if (!newContent.trim()) {
    alert("⚠️ Content field is required!");
    return;
  }

  mutation.mutate({
    title: story?.title,
    content: newContent,
  });
};


  if (loading || !story || !words.length) {
    return <Loading />
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{story?.title}</h1>
        <button className={styles.addPartBtn} onClick={handleAddPart}>
          Add Part
        </button>
      </div>

      <div className={styles.linkSection}>
        {story?.link && (
          <a
            href={story.link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.storyLink}
          >
            🔗 {story.link}
          </a>
        )}
     
      </div>

      <div className={styles.content}>{currentText}</div>

      <div className={styles.pagination}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ◀ Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next ▶
        </button>
      </div>

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Add New Part</h2>
            <form onSubmit={handleSubmit} className={styles.modalForm}>
              <input
                type="text"
                name="title"
                placeholder="Part title"
                value={story?.title}
                required
                disabled
              />
              <textarea
                name="content"
                placeholder="Write your part..."
                rows="6"
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                required
              ></textarea>

              <div className={styles.modalActions}>
                <button type="button" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Story;
