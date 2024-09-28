/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import { BASE_URL, token } from '../../config';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';  // Import PropTypes for validation

const FeedbackForm = ({ onReviewSubmitted }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      if (!rating || !reviewText) {
        setLoading(false);
        return toast.error('Vous devez d\'abord cocher les étoiles et remplir le formulaire');
      }
  
      const res = await fetch(`${BASE_URL}/tutors/${id}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ rating, reviewText }),
      });
  
      const result = await res.json();
  
      if (!res.ok) {
        throw new Error(result.message);
      }
  
      setLoading(false);
      toast.success(result.message);
  
      // Reset the form after successful submission
      setRating(0);
      setReviewText('');
  
      // Call the callback function to refetch the tutor data
      if (onReviewSubmitted) {
        onReviewSubmitted();
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };
  

  return (
    <form onSubmit={handleSubmitReview}>
      {/* Rating stars */}
      <div>
        {[...Array(5).keys()].map((_, index) => {
          index += 1;
          return (
            <button
              key={index}
              type="button"
              className={`${index <= (hover || rating) ? 'text-yellowColor' : 'text-gray-400'} bg-transparent border-none outline-none text-[22px] cursor-pointer`}
              onClick={() => setRating(index)}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(rating)}
            >
              <AiFillStar />
            </button>
          );
        })}
      </div>

      {/* Review text */}
      <textarea
        rows="10"  // Increases vertical size
        className="w-full h-32 p-3 border rounded-lg" // Adjusts width and height with padding
        placeholder="Write your message"
        onChange={(e) => setReviewText(e.target.value)}
        required
      />


      <button type="submit" className="btn" disabled={loading}>
        {loading ? 'Submitting...' : 'Envoyer votre feedback'}
      </button>
    </form>
  );
};

// Add prop types validation for onReviewSubmitted
FeedbackForm.propTypes = {
  onReviewSubmitted: PropTypes.func, // Add PropTypes validation
};

export default FeedbackForm;
