import React, { useState } from 'react';
import './CreatePost.css'; // Add your custom styles here
import { useMutation } from 'convex/react'; // Import Convex hooks

const CreatePost = ({ addPost }) => {
  const [post, setPost] = useState({ subject: '', author: '', message: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const createMessage = useMutation('createMessage'); // Mutation to create a new message

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the new message object
    const newMessage = {
      author: post.author,
      images: [], // Add logic to handle images if necessary
      text: post.message,
      replies: [], // Empty replies for now
    };

    // Call the mutation to save the message to the database
    const savedMessage = await createMessage(newMessage);

    // Add the new message to the front-end state
    addPost({
      subject: post.subject,
      patient: post.author,
      date: new Date().toLocaleDateString(),
      message: post.message,
      resolved: false,
      id: savedMessage._id, // Use the ID from the database
    });

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
