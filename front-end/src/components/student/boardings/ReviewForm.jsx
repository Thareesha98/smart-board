import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaCheckCircle } from 'react-icons/fa';
import { useAuth } from '../../../context/student/StudentAuthContext.jsx';

const ReviewForm = ({ boardingId, onSubmitSuccess }) => {
  const { currentUser } = useAuth();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false); // ✅ Track edit mode

  // ✅ Check for existing review on mount
  useEffect(() => {
    if (currentUser?.studentId && boardingId) {
      const existingReviews = JSON.parse(localStorage.getItem('boardingReviews') || '{}');
      const boardReviews = existingReviews[boardingId] || [];
      const myReview = boardReviews.find(r => r.userId === currentUser.studentId);
      
      if (myReview) {
        setRating(myReview.rating);
        setReview(myReview.review);
        setIsEditing(true);
      }
    }
  }, [currentUser, boardingId]);

  const validateForm = () => {
    const newErrors = {};
    if (rating === 0) {
      newErrors.rating = 'Please select a rating';
    }
    if (!review.trim()) {
      newErrors.review = 'Please write a review';
    } else if (review.trim().length < 10) {
      newErrors.review = 'Review must be at least 10 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const reviewData = {
        boardingId,
        rating,
        review: review.trim(),
        timestamp: new Date().toISOString(),
        userId: currentUser?.studentId || 'guest'
      };
      
      // Store user data separately for dynamic updates
      const userData = {
        [currentUser?.studentId]: {
          userName: `${currentUser.firstName} ${currentUser.lastName}`,
          userAvatar: currentUser.avatar
        }
      };
      
      // Save review
      const existingReviews = JSON.parse(localStorage.getItem('boardingReviews') || '{}');
      if (!existingReviews[boardingId]) {
        existingReviews[boardingId] = [];
      }

      if (isEditing) {
        // ✅ Update existing review
        existingReviews[boardingId] = existingReviews[boardingId].map(r => 
          r.userId === currentUser.studentId ? reviewData : r
        );
      } else {
        // ✅ Add new review (Prevent duplicates check)
        const hasReviewed = existingReviews[boardingId].some(r => r.userId === currentUser.studentId);
        if (!hasReviewed) {
           existingReviews[boardingId].push(reviewData);
        } else {
           // Fallback update if state missed it
           existingReviews[boardingId] = existingReviews[boardingId].map(r => 
            r.userId === currentUser.studentId ? reviewData : r
          );
        }
      }

      localStorage.setItem('boardingReviews', JSON.stringify(existingReviews));
      
      // Save/update user data
      const existingUsers = JSON.parse(localStorage.getItem('reviewUsers') || '{}');
      localStorage.setItem('reviewUsers', JSON.stringify({...existingUsers, ...userData}));
      
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Reset form after 2 seconds
      setTimeout(() => {
        // Don't clear form if editing, keep the data visible
        if (!isEditing) {
            setRating(0);
            setReview('');
        }
        setIsSuccess(false);
        if (onSubmitSuccess) onSubmitSuccess();
      }, 2000);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 shadow-sm border border-gray-100"
    >
      <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4 sm:mb-6">
        {isEditing ? 'Edit Your Review' : 'Write a Review'} {/* ✅ Dynamic Title */}
      </h2>

      {isSuccess ? (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col items-center justify-center py-8 sm:py-12"
        >
          <FaCheckCircle className="text-5xl sm:text-6xl text-green-500 mb-4" />
          <h3 className="text-lg sm:text-xl font-bold text-text-dark mb-2">
            {isEditing ? 'Review Updated!' : 'Review Submitted!'}
          </h3>
          <p className="text-sm sm:text-base text-text-muted text-center">
            Thank you for your feedback
          </p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {/* Rating Section */}
          <div>
            <label className="block text-sm font-semibold text-text-dark mb-2 sm:mb-3">
              Your Rating *
            </label>
            <div className="flex gap-1 sm:gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-transform hover:scale-110 focus:outline-none"
                >
                  <FaStar
                    className={`text-2xl sm:text-3xl md:text-4xl transition-colors ${
                      star <= (hoveredRating || rating)
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
            {errors.rating && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.rating}</p>
            )}
          </div>

          {/* Review Text Section */}
          <div>
            <label
              htmlFor="review"
              className="block text-sm font-semibold text-text-dark mb-2 sm:mb-3"
            >
              Your Review *
            </label>
            <textarea
              id="review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Share your experience with this boarding..."
              rows={4}
              className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent transition-all resize-none ${
                errors.review ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            <div className="flex justify-between items-center mt-1 sm:mt-2">
              {errors.review && (
                <p className="text-red-500 text-xs sm:text-sm">{errors.review}</p>
              )}
              <p className="text-xs sm:text-sm text-text-muted ml-auto">
                {review.length} characters
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            className={`w-full py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base transition-all ${
              isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-accent hover:bg-primary text-white shadow-lg hover:shadow-xl'
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-4 w-4 sm:h-5 sm:w-5"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                {isEditing ? 'Updating...' : 'Submitting...'}
              </span>
            ) : (
              isEditing ? 'Update Review' : 'Submit Review'
            )}
          </motion.button>
        </form>
      )}
    </motion.div>
  );
};

export default ReviewForm;