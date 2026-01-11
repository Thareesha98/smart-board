import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaUser, FaImages, FaTimes, FaChevronLeft, FaChevronRight, FaTrash } from 'react-icons/fa';
import { useAuth } from '../../../context/student/StudentAuthContext';
import StudentService from '../../../api/student/StudentService';

const ReviewsList = ({ boardingId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [averageRating, setAverageRating] = useState(0);
  const { currentUser } = useAuth();

  // Gallery State
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // ✅ Delete State
  const [reviewToDelete, setReviewToDelete] = useState(null);

  const loadReviews = async () => {
    try {
        setLoading(true);
        if (!boardingId) return;

        const data = await StudentService.getBoardingReviews(boardingId);
        const safeData = Array.isArray(data) ? data : [];
        
        safeData.sort((a, b) => new Date(b.createdAt || b.timestamp) - new Date(a.createdAt || a.timestamp));
        setReviews(safeData);

        if (safeData.length > 0) {
            const total = safeData.reduce((acc, curr) => acc + (curr.rating || 0), 0);
            setAverageRating((total / safeData.length).toFixed(1));
        }
    } catch (error) {
        console.error("Failed to load reviews", error);
        setReviews([]);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, [boardingId]);

  // --- Gallery Logic ---
  const openGallery = (images, index = 0) => {
    setGalleryImages(images);
    setCurrentImageIndex(index);
    setGalleryOpen(true);
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  // ✅ Delete Logic
  const handleDeleteClick = (review) => {
    setReviewToDelete(review);
  };

  const confirmDelete = async () => {
    if (!reviewToDelete) return;
    try {
        await StudentService.deleteReview(reviewToDelete.id);
        // Optimistic UI update
        setReviews(prev => prev.filter(r => r.id !== reviewToDelete.id));
        setReviewToDelete(null);
    } catch (error) {
        console.error("Failed to delete review", error);
        alert("Failed to delete review.");
    }
  };

  if (loading) return <div className="text-sm text-gray-400 mt-4 text-center animate-pulse">Loading reviews...</div>;
  
  if (reviews.length === 0) return (
    <div className="text-sm text-gray-400 mt-6 text-center italic border border-dashed border-gray-200 p-6 rounded-xl">
        No reviews yet. Be the first to share your experience!
    </div>
  );

  return (
    <div className="space-y-6 mt-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <h3 className="text-lg font-bold text-gray-800">
            Recent Reviews ({reviews.length})
        </h3>
        {reviews.length > 0 && (
            <div className="flex items-center gap-2 text-yellow-500 font-bold bg-yellow-50 px-3 py-1.5 rounded-lg">
                <span className="text-2xl">{averageRating}</span> 
                <div className="flex flex-col text-[10px] text-yellow-600/80 leading-tight"><span>OUT OF</span><span>5 STARS</span></div>
            </div>
        )}
      </div>
      
      {/* List */}
      <div className="space-y-6">
        {reviews.map((review, index) => {
          const images = review.imageUrls || review.photos || []; 
          const date = review.createdAt || review.timestamp;
          
          // Check if current user owns this review
          // Handle backend field naming (userId vs studentId)
          const isMyReview = currentUser?.id === (review.userId || review.studentId);

          return (
            <motion.div
              key={review.id || index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white group relative" // relative for delete button positioning
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 overflow-hidden">
                      {review.userAvatar ? (
                          <img src={review.userAvatar} alt="user" className="w-full h-full object-cover"/>
                      ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <FaUser />
                          </div>
                      )}
                  </div>
                  
                  <div>
                    <p className="font-bold text-gray-800 text-sm">
                      {review.userName || review.studentName || 'Resident'}
                    </p>
                    <p className="text-xs text-gray-400">
                      {date ? new Date(date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : 'Recently'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                    <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                        key={star}
                        className={`text-xs ${
                            star <= review.rating ? 'text-yellow-400' : 'text-gray-200'
                        }`}
                        />
                    ))}
                    </div>
                    
                    {/* ✅ DELETE BUTTON (Only visible to owner) */}
                    {isMyReview && (
                        <button 
                            onClick={() => handleDeleteClick(review)}
                            className="text-gray-300 hover:text-red-500 transition-colors p-1"
                            title="Delete Review"
                        >
                            <FaTrash size={12} />
                        </button>
                    )}
                </div>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                {review.comment || review.review}
              </p>

              {/* Photos Section */}
              {images.length > 0 && (
                <div className="flex gap-2 mt-3">
                    {images.slice(0, 3).map((img, i) => (
                        <div 
                            key={i} 
                            onClick={() => openGallery(images, i)}
                            className="relative w-16 h-16 rounded-lg overflow-hidden cursor-pointer border border-gray-100 hover:opacity-90 transition-opacity group"
                        >
                            <img src={img} alt="review" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/20 hidden group-hover:flex items-center justify-center text-white">
                                <FaImages size={12} />
                            </div>
                        </div>
                    ))}
                    {images.length > 3 && (
                        <button 
                            onClick={() => openGallery(images, 3)}
                            className="w-16 h-16 rounded-lg bg-gray-50 border border-gray-200 flex flex-col items-center justify-center text-gray-500 text-xs font-medium hover:bg-gray-100 transition-colors"
                        >
                            <span>+{images.length - 3}</span>
                            <span>More</span>
                        </button>
                    )}
                </div>
              )}

              {/* Divider line */}
              {index < reviews.length - 1 && <div className="h-px bg-gray-100 mt-6" />}

            </motion.div>
          );
        })}
      </div>

      {/* ✅ DELETE CONFIRMATION MODAL */}
      <AnimatePresence>
        {reviewToDelete && (
            <div className="fixed inset-0 z-[3000] bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm">
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-white rounded-xl p-6 w-full max-w-sm shadow-2xl"
                >
                    <h3 className="text-lg font-bold text-gray-800 mb-2">Delete Review?</h3>
                    <p className="text-sm text-gray-500 mb-6">Are you sure you want to delete this review? This action cannot be undone.</p>
                    <div className="flex justify-end gap-3">
                        <button 
                            onClick={() => setReviewToDelete(null)}
                            className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-100 transition"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={confirmDelete}
                            className="px-4 py-2 rounded-lg text-sm font-semibold bg-red-500 text-white hover:bg-red-600 shadow-md transition"
                        >
                            Delete
                        </button>
                    </div>
                </motion.div>
            </div>
        )}
      </AnimatePresence>

      {/* Gallery Modal */}
      <AnimatePresence>
        {galleryOpen && (
          <div className="fixed inset-0 z-[3000] bg-black/95 flex items-center justify-center p-4" onClick={() => setGalleryOpen(false)}>
            <button className="absolute top-6 right-6 text-white/70 hover:text-white p-2 bg-white/10 rounded-full transition-all" onClick={() => setGalleryOpen(false)}><FaTimes size={24} /></button>
            <motion.img key={currentImageIndex} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} src={galleryImages[currentImageIndex]} alt="Full size" className="max-h-[85vh] max-w-full rounded-lg shadow-2xl object-contain" onClick={(e) => e.stopPropagation()} />
            {galleryImages.length > 1 && (
                <>
                    <button className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 bg-white/10 rounded-full transition-all" onClick={prevImage}><FaChevronLeft size={24} /></button>
                    <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 bg-white/10 rounded-full transition-all" onClick={nextImage}><FaChevronRight size={24} /></button>
                </>
            )}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/20 text-white px-4 py-1 rounded-full text-sm backdrop-blur-sm">{currentImageIndex + 1} / {galleryImages.length}</div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReviewsList;