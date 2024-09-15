import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { getConsultById, getMessageById } from "../../convex/myFunctions";

export default function Consult() {
  const location = useLocation();
  const { id } = location.state; // The ID of the consult to fetch
  const [consult, setConsult] = useState(null);   // For storing consult details
  const [messages, setMessages] = useState([]);   // For storing related messages
  const [loading, setLoading] = useState(true);   // For showing a loading state
  const [error, setError] = useState(null);       // For capturing any errors
  
  // Fetch consult data and associated messages based on id
  useEffect(() => {
    const fetchConsult = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch the consult by its ID
        const consultData = await getConsultById({ id });  // Now using the imported function
        setConsult(consultData);
        
        // Fetch the associated messages
        if (consultData && consultData.message) {
          const messageData = await Promise.all(
            consultData.message.map((messageId) => getMessageById({ id: messageId }))
          );
          setMessages(messageData);
        }
      } catch (err) {
        console.error('Error fetching consult:', err);
        setError('Failed to fetch consult details.');
      } finally {
        setLoading(false);
      }
    };

    fetchConsult();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>{consult.title}</h1>
      <p>Resolved: {consult.resolved ? "Yes" : "No"}</p>
      <h2>Messages:</h2>
      {messages.length > 0 ? (
        messages.map((message, index) => (
          <div key={index}>
            <p>Author: {message.author}</p>
            <p>Text: {message.text}</p>
            <div>
              {message.images.map((image, i) => (
                <img key={i} src={image} alt={`message-${index}-image-${i}`} />
              ))}
            </div>
          </div>
        ))
      ) : (
        <p>No messages found.</p>
      )}
    </div>
  );
}
