/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';  // Import PropTypes for validation
import { formateDate } from '../../utils/formateDate';
import { AiFillStar } from 'react-icons/ai';
import FeedbackForm from './FeedbackForm';

// Single Review component for better separation of concerns
const Review = ({ review }) => {
  const stars = [...Array(review?.rating).keys()];  // Store star icons in a variable
  return (
    <div className="flex justify-between gap-10 mb-[30px]">
      <div className="flex gap-3">
        <figure className='w-10 h-10 rounded-full'>
          <img className='w-full' src={review?.user?.photo} alt={`${review?.user?.name}'s profile`} loading="lazy" />
        </figure>
        <div>
          <h5 className='text-[16px] leading-6 text-primaryColor font-bold'>{review?.user?.name}</h5>
          <p className='text-[14px] leading-6 text-textColor'>{formateDate(review?.createdAt)}</p>
          <p className='text__para mt-3 font-medium text-[15px]'>{review.reviewText}</p> 
        </div>
      </div>

      <div className='flex gap-1' aria-label={`${review?.rating} out of 5 stars`}>
        {stars.map((_, index) => <AiFillStar key={index} color='#0067FF' />)}
      </div>
    </div>
  );
};

Review.propTypes = {
  review: PropTypes.shape({
    user: PropTypes.shape({
      name: PropTypes.string,
      photo: PropTypes.string,
    }),
    rating: PropTypes.number,
    createdAt: PropTypes.string,
    reviewText: PropTypes.string,
  }).isRequired,
};

const Feedback = ({ reviews, totalRating, onReviewSubmitted }) => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  return (
    <div>
      <div className="mb-[50px]">
        <h4 className='text-[20px] leading-[30px] font-bold text-headingColor mb-[30px]'>
          All reviews ({totalRating})
        </h4>

        {/* Handle case where there are no reviews */}
        {reviews?.length ? reviews.map((review, index) => (
          <Review key={index} review={review} />
        )) : <p>No reviews yet. Be the first to leave feedback!</p>}

        {/* Feedback Form Toggle */}
        <div className='text-center'>
          <button className="btn" onClick={() => setShowFeedbackForm(!showFeedbackForm)}>
            {showFeedbackForm ? "Hide Feedback Form" : "Give Feedback"}
          </button>
        </div>

        {/* Pass onReviewSubmitted to FeedbackForm to trigger refetch after submission */}
        {showFeedbackForm && <FeedbackForm onReviewSubmitted={onReviewSubmitted} />}
      </div>
    </div>
  );
};

// Add prop types validation for Feedback
Feedback.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      user: PropTypes.shape({
        name: PropTypes.string,
        photo: PropTypes.string,
      }),
      rating: PropTypes.number,
      createdAt: PropTypes.string,
      reviewText: PropTypes.string,
    })
  ).isRequired,
  totalRating: PropTypes.number.isRequired,
  onReviewSubmitted: PropTypes.func.isRequired,  // Validation for onReviewSubmitted
};

export default Feedback;
