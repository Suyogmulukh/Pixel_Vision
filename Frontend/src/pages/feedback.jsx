// Beatflow-frontend/src/components/FeedbackForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

const FeedbackForm = ({ userId }) => {
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(5);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3500/api/feedback/submit', { userId, message, rating });
      alert('Thanks for your feedback!');
      setMessage('');
      setRating(5);
    } catch (err) {
      console.error(err);
      alert('Error sending feedback');
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => window.history.back()}
        style={{
          margin: '2rem auto 1rem auto',
          display: 'block',
          backgroundColor: '#e5e7eb',
          color: '#333',
          padding: '8px 18px',
          border: 'none',
          borderRadius: '6px',
          fontSize: '1rem',
          fontWeight: 'bold',
          cursor: 'pointer',
          boxShadow: '0 2px 6px rgba(0,0,0,0.07)'
        }}
      >
        &#8592; Back
      </button>
      <form
        onSubmit={handleSubmit}
        style={{
          padding: '1.5rem',
          maxWidth: '500px',
          margin: '2rem auto',
          borderRadius: '12px',
          backgroundColor: '#f9f9f9',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          fontFamily: 'Arial, sans-serif'
        }}
      >
        <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#333' }}>
          Send Us Feedback
        </h2>

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Your feedback..."
          required
          rows={4}
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc',
            marginBottom: '1rem',
            resize: 'vertical'
          }}
        />

        <div style={{ marginBottom: '1.2rem' }}>
          <label style={{ marginRight: '0.5rem', fontWeight: 'bold' }}>Rating:</label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            style={{
              padding: '8px 12px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              fontSize: '1rem'
            }}
          >
            {[1, 2, 3, 4, 5].map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: '#4f46e5',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '6px',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#4338ca'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#4f46e5'}
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default FeedbackForm;