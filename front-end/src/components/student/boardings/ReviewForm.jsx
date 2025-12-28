import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaStar, FaCheckCircle, FaCamera, FaTimes, FaPaperPlane, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useAuth } from '../../../context/student/AuthContext.jsx';

const ReviewForm = ({ boardingId, onSubmitSuccess }) => {
  const { currentUser } = useAuth();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState('');
  const [photos, setPhotos] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false); // ✅ Controls visibility
  const [isEditing, setIsEditing] = useState(false);
  
  const fileInputRef = useRef(null);

  // Load existing review
  useEffect(() => {
    if (currentUser?.studentId && boardingId) {
      const existingReviews = JSON.parse(localStorage.getItem('boardingReviews') || '{}');
      const boardReviews = existingReviews[boardingId] || [];
      const myReview = boardReviews.find(r => r.userId === currentUser.studentId);
      
      if (myReview) {
        setRating(myReview.rating);
        setReview(myReview.review);
        setPhotos(myReview.photos || []);
        setIsEditing(true);
        setIsExpanded(false); // Keep collapsed even if edited, let user open it
      }
    }
  }, [currentUser, boardingId]);

  const handleStarClick = (star) => {
    setRating(star);
    setIsExpanded(true); // ✅ Auto-expand when user rates
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    if (photos.length + files.length > 3) return alert("Max 3 photos allowed.");

    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => setPhotos(prev => [...prev, reader.result]);
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (index) => setPhotos(prev => prev.filter((_, i) => i !== index));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0 || !review.trim()) return;

    setIsSubmitting(true);
    
    setTimeout(() => {
      // (Mock API Logic - same as before)
      const reviewData = {
        boardingId, rating, review: review.trim(), photos,
        timestamp: new Date().toISOString(), userId: currentUser?.studentId
      };
      
      // Save to LocalStorage logic...
      const existingReviews = JSON.parse(localStorage.getItem('boardingReviews') || '{}');
      if (!existingReviews[boardingId]) existingReviews[boardingId] = [];
      
      // Update or Push logic
      const userIndex = existingReviews[boardingId].findIndex(r => r.userId === currentUser.studentId);
      if (userIndex > -1) existingReviews[boardingId][userIndex] = reviewData;
      else existingReviews[boardingId].push(reviewData);

      localStorage.setItem('boardingReviews', JSON.stringify(existingReviews));
      
      setIsSubmitting(false);
      setIsSuccess(true);
      
      setTimeout(() => {
        setIsSuccess(false);
        setIsExpanded(false); // Collapse on success
        if (onSubmitSuccess) onSubmitSuccess();
      }, 1500);
    }, 1000);
  };

  return (
    <motion.div 
      layout
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
    >
      {/* Header & Stars Section (Always Visible) */}
      <div className="p-4 flex flex-col items-center justify-center bg-gray-50/50">
        <div className="flex justify-between items-center w-full mb-2">
            <h3 className="text-sm font-bold text-text-dark uppercase tracking-wide">
                {isEditing ? 'Edit Review' : 'Rate Your Stay'}
            </h3>
            <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-text-muted hover:text-accent text-xs"
            >
                {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
            </button>
        </div>

        {isSuccess ? (
          <div className="text-green-500 font-bold text-sm flex items-center gap-2 py-2">
            <FaCheckCircle /> Submitted Successfully!
          </div>
        ) : (
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleStarClick(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="focus:outline-none transition-transform hover:scale-110"
              >
                <FaStar
                  className={`text-2xl transition-colors ${
                    star <= (hoveredRating || rating) ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Expandable Form Content */}
      <AnimatePresence>
        {isExpanded && !isSuccess && (
          <motion.form
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-4 pb-4"
            onSubmit={handleSubmit}
          >
            {/* Text Area */}
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Write your experience here..."
              rows={3}
              className="w-full mt-3 p-3 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-accent focus:bg-white transition-all resize-none"
            />

            {/* Photos & Actions Row */}
            <div className="mt-3 flex items-center justify-between">
              
              {/* Photo Upload Area */}
              <div className="flex items-center gap-2">
                 <button
                   type="button"
                   onClick={() => fileInputRef.current.click()}
                   className="text-text-muted hover:text-accent p-2 rounded-full hover:bg-gray-100 transition-colors"
                   title="Add Photos"
                 >
                   <FaCamera />
                 </button>
                 <input type="file" ref={fileInputRef} onChange={handlePhotoUpload} accept="image/*" className="hidden" multiple />
                 
                 {/* Mini Thumbnails */}
                 <div className="flex gap-2">
                   {photos.map((photo, index) => (
                     <div key={index} className="relative w-8 h-8 rounded-md overflow-hidden group border border-gray-200">
                       <img src={photo} alt="mini" className="w-full h-full object-cover" />
                       <button
                         type="button"
                         onClick={() => removePhoto(index)}
                         className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 text-[8px]"
                       >
                         ✕
                       </button>
                     </div>
                   ))}
                 </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || !review.trim()}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-bold text-white transition-all shadow-sm ${
                    isSubmitting || !review.trim() 
                    ? 'bg-gray-300 cursor-not-allowed' 
                    : 'bg-accent hover:bg-primary hover:shadow-md'
                }`}
              >
                {isSubmitting ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                ) : (
                    <>
                        <FaPaperPlane size={10} /> 
                        {isEditing ? 'Update' : 'Post'}
                    </>
                )}
              </button>
            </div>
            
            <div className="text-[10px] text-text-muted mt-2 text-right">
                {review.length} characters • Public Review
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ReviewForm;