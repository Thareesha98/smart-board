import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaUser, FaTrash, FaTimes, FaChevronLeft, FaChevronRight, FaImages } from 'react-icons/fa';

// ✅ FIX 1: Correct Import Path
import { useAuth } from '../../../context/student/StudentAuthContext';
import StudentService from '../../../api/student/StudentService';

const ReviewsList = ({ boardingId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // ✅ FIX 2: Check context existence
  const auth = useAuth();
  const currentUser = auth?.currentUser;

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);

  // Gallery Modal State
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryPhotos, setGalleryPhotos] = useState([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  // ✅ FIX 3: Load Reviews from Backend instead of LocalStorage
  const loadReviews = async () => {
    try {
        setLoading(true);
        // Ensure boardingId is valid before calling API
        if (!boardingId) return;

        const data = await StudentService.getBoardingReviews(boardingId);
        
        // Transform data if necessary (depends on your backend DTO)
        // Assuming backend returns: [{ id, userName, userAvatar, rating, comment, date, photos: [] }]
        // If backend returns differently, map it here.
        setReviews(data || []);
    } catch (error) {
        console.error("Failed to load reviews", error);
        // Fallback to empty array to prevent crash
        setReviews([]);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, [boardingId]);

  // Gallery Logic
  const openGallery = (photos, index = 0) => {
    if (!photos || photos.length === 0) return;
    setGalleryPhotos(photos);
    setCurrentPhotoIndex(index);
    setGalleryOpen(true);
  };

  const nextPhoto = (e) => {
    e.stopPropagation();
    setCurrentPhotoIndex((prev) => (prev + 1) % galleryPhotos.length);
  };

  const prevPhoto = (e) => {
    e.stopPropagation();
    setCurrentPhotoIndex((prev) => (prev - 1 + galleryPhotos.length) % galleryPhotos.length);
  };

  const handleDeleteClick = (review) => {
    setReviewToDelete(review);
    setShowDeleteModal(true);
  };

  // ✅ FIX 4: Delete logic (Mock or Backend)
  const confirmDelete = async () => {
    if (!reviewToDelete) return;

    // Ideally call backend: await StudentService.deleteReview(reviewToDelete.id);
    // For now, optimistic update:
    setReviews(prev => prev.filter(r => r.id !== reviewToDelete.id));
    
    setShowDeleteModal(false);
    setReviewToDelete(null);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Recently';

    // 1. Check if it's the Java string format "yyyy-MM-dd HH:mm"
    if (typeof dateString === 'string' && dateString.includes(' ')) {
        const isoString = dateString.replace(' ', 'T');
        const date = new Date(isoString);
        if (!isNaN(date.getTime())) {
             return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        }
    }

    // 2. Standard fallback
    const date = new Date(dateString);
    return isNaN(date.getTime()) 
        ? 'Recently' 
        : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  if (loading) return <div className="text-sm text-text-muted mt-4">Loading reviews...</div>;
  if (!reviews || reviews.length === 0) return <div className="text-sm text-text-muted mt-4 italic">No reviews yet. Be the first to review!</div>;

  return (
    <div className="space-y-3 sm:space-y-4 mt-6">
      <h3 className="text-base sm:text-lg font-bold text-text-dark">
        Recent Reviews ({reviews.length})
      </h3>
      
      <div className="space-y-3 sm:space-y-4">
        {reviews.map((review, index) => (
          <motion.div
            key={review.id || index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-background-light rounded-xl p-3 sm:p-4 border border-gray-100 relative group"
          >
            {/* Header: User & Rating */}
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
                  <p className="text-xs text-text-muted">{formatDate(review.date || review.timestamp)}</p>
                </div>
              </div>
              
              <div className="flex flex-col items-end gap-2">
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

                  {currentUser?.id === review.userId && (
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
            <p className="text-text-dark text-sm sm:text-base leading-relaxed mb-2">
              {review.comment || review.review}
            </p>

            {/* Photos Button */}
            {review.photos && review.photos.length > 0 && (
              <div className="mt-2">
                <button
                  onClick={() => openGallery(review.photos, 0)}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-200/50 hover:bg-gray-200 text-accent font-semibold text-xs transition-colors"
                >
                  <FaImages className="text-sm" />
                  <span>View {review.photos.length} Photo{review.photos.length > 1 ? 's' : ''}</span>
                </button>
              </div>
            )}

          </motion.div>
        ))}
      </div>

      {/* Delete Modal */}
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
              <p className="text-text-muted mb-6">Are you sure you want to delete this review?</p>
              <div className="flex gap-3 justify-end">
                <button onClick={() => setShowDeleteModal(false)} className="px-4 py-2 rounded-lg text-text-dark hover:bg-gray-100 font-semibold transition-colors">Cancel</button>
                <button onClick={confirmDelete} className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 font-semibold shadow-lg transition-colors">Delete</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Gallery Modal */}
      <AnimatePresence>
        {galleryOpen && (
          <div 
            className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
            onClick={() => setGalleryOpen(false)}
          >
            <button 
              className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors p-2 bg-white/10 rounded-full hover:bg-white/20 z-50"
              onClick={() => setGalleryOpen(false)}
            >
              <FaTimes size={24} />
            </button>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-5xl w-full h-full max-h-[85vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {galleryPhotos.length > 1 && (
                <button 
                  className="absolute left-2 sm:-left-12 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full hover:bg-white/10 transition-all z-10"
                  onClick={prevPhoto}
                >
                  <FaChevronLeft size={30} />
                </button>
              )}

              <img 
                src={galleryPhotos[currentPhotoIndex]} 
                alt={`Gallery ${currentPhotoIndex + 1}`} 
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl" 
              />

              {galleryPhotos.length > 1 && (
                <button 
                  className="absolute right-2 sm:-right-12 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full hover:bg-white/10 transition-all z-10"
                  onClick={nextPhoto}
                >
                  <FaChevronRight size={30} />
                </button>
              )}

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm">
                {currentPhotoIndex + 1} / {galleryPhotos.length}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default ReviewsList;