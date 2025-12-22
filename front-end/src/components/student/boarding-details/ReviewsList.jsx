import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaUser } from 'react-icons/fa';
import { useAuth } from '../../../context/student/AuthContext.jsx';

const ReviewsList = ({ boardingId }) => {
  const [reviews, setReviews] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    // Update current user's data in reviewUsers whenever they change their profile
    if (currentUser?.studentId) {
      const existingUsers = JSON.parse(localStorage.getItem('reviewUsers') || '{}');
      existingUsers[currentUser.studentId] = {
        userName: `${currentUser.firstName} ${currentUser.lastName}`,
        userAvatar: currentUser.avatar
      };
      localStorage.setItem('reviewUsers', JSON.stringify(existingUsers));
    }
  }, [currentUser]);

  useEffect(() => {
    // Load reviews from localStorage
    const loadReviews = () => {
      const existingReviews = JSON.parse(localStorage.getItem('boardingReviews') || '{}');
      const reviewUsers = JSON.parse(localStorage.getItem('reviewUsers') || '{}');
      
      const boardingReviews = existingReviews[boardingId] || [];
      
      // Merge reviews with current user data
      const reviewsWithUserData = boardingReviews.map(review => ({
        ...review,
        userName: reviewUsers[review.userId]?.userName || 'Anonymous User',
        userAvatar: reviewUsers[review.userId]?.userAvatar || null
      }));
      
      setReviews(reviewsWithUserData.reverse()); // Show newest first
    };

    loadReviews();

    // Listen for storage changes (in case reviews are added in another tab)
    window.addEventListener('storage', loadReviews);
    return () => window.removeEventListener('storage', loadReviews);
  }, [boardingId]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    
    if (diffInDays < 30) {
      const weeks = Math.floor(diffInDays / 7);
      return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    }
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  if (reviews.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3 sm:space-y-4 mt-6">
      <h3 className="text-base sm:text-lg font-bold text-text-dark">
        Recent Reviews ({reviews.length})
      </h3>
      
      <div className="space-y-3 sm:space-y-4">
        {reviews.map((review, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-background-light rounded-xl p-3 sm:p-4 border border-gray-100"
          >
            {/* User Info & Rating */}
            <div className="flex items-start justify-between gap-2 mb-2 sm:mb-3">
              <div className="flex items-center gap-2 sm:gap-3">
                {review.userAvatar ? (
                  <img 
                    src={review.userAvatar} 
                    alt={review.userName}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-accent/30 flex-shrink-0"
                  />
                ) : (
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <FaUser className="text-accent text-sm sm:text-base" />
                  </div>
                )}
                <div>
                  <p className="font-semibold text-text-dark text-sm sm:text-base">
                    {review.userName || 'Anonymous User'}
                  </p>
                  <p className="text-xs text-text-muted">{formatDate(review.timestamp)}</p>
                </div>
              </div>
              
              {/* Rating Stars */}
              <div className="flex gap-0.5 flex-shrink-0">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className={`text-sm sm:text-base ${
                      star <= review.rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Review Text */}
            <p className="text-text-dark text-sm sm:text-base leading-relaxed">
              {review.review}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsList;