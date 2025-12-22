import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaUser, FaTrash } from 'react-icons/fa';
import { useAuth } from '../../../context/student/AuthContext.jsx';

const ReviewsList = ({ boardingId }) => {
  const [reviews, setReviews] = useState([]);
  const { currentUser } = useAuth();
  
  // ✅ State for delete modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);

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

  useEffect(() => {
    loadReviews();
    // Listen for storage changes (in case reviews are added in another tab)
    window.addEventListener('storage', loadReviews);
    return () => window.removeEventListener('storage', loadReviews);
  }, [boardingId]);

  // ✅ Handle Delete Logic
  const handleDeleteClick = (review) => {
    setReviewToDelete(review);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (!reviewToDelete) return;

    const existingReviews = JSON.parse(localStorage.getItem('boardingReviews') || '{}');
    if (existingReviews[boardingId]) {
      // Filter out the review to delete
      existingReviews[boardingId] = existingReviews[boardingId].filter(
        r => r.userId !== reviewToDelete.userId || r.timestamp !== reviewToDelete.timestamp
      );
      localStorage.setItem('boardingReviews', JSON.stringify(existingReviews));
      loadReviews(); // Refresh list
    }
    setShowDeleteModal(false);
    setReviewToDelete(null);
  };

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
            className="bg-background-light rounded-xl p-3 sm:p-4 border border-gray-100 relative group"
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
              
              <div className="flex flex-col items-end gap-2">
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

                  {/* ✅ Delete Button (Only for current user) */}
                  {currentUser?.studentId === review.userId && (
                    <button 
                      onClick={() => handleDeleteClick(review)}
                      className="text-red-400 hover:text-red-600 transition-colors p-1"
                      title="Delete Review"
                    >
                      <FaTrash className="text-sm" />
                    </button>
                  )}
              </div>
            </div>

            {/* Review Text */}
            <p className="text-text-dark text-sm sm:text-base leading-relaxed">
              {review.review}
            </p>
          </motion.div>
        ))}
      </div>

      {/* ✅ Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl"
            >
              <h3 className="text-xl font-bold text-text-dark mb-2">Delete Review?</h3>
              <p className="text-text-muted mb-6">
                Are you sure you want to delete this review? This action cannot be undone.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 rounded-lg text-text-dark hover:bg-gray-100 font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 font-semibold shadow-lg shadow-red-500/30 transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReviewsList;