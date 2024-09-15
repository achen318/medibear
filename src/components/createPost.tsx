import React, { useState } from 'react';
import './CreatePost.css'; // Add your custom styles here

const CreatePost = ({ addPost }) => {
  const [post, setPost] = useState({ subject: '', author: '', message: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const newPost = {
      subject: post.subject,
      patient: post.author,
      date: new Date().toLocaleDateString(),
      message: post.message,
      resolved: false,
      id: Math.random().toString(36).substr(2, 9),
    };

    addPost(newPost); // Pass the new post to the parent (LoggedIn)

    // Clear the form and close the modal
    setPost({ subject: '', author: '', message: '' });
    setIsModalOpen(false);
  };

  // Open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button className="open-modal-btn" onClick={openModal}>
        +
      </button>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Create a New Post</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="author">Name:</label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={post.author}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Post Subject:</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={post.subject}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Describe Symptoms:</label>
                <textarea
                  id="message"
                  name="message"
                  value={post.message}
                  onChange={handleChange}
                  required
                  className="textarea-field"
                ></textarea>
              </div>
              <div className="modal-actions">
                <button type="submit" className="submit-btn">
                  Submit
                </button>
                <button type="button" onClick={closeModal} className="cancel-btn">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePost;
