import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaStar, FaCheckCircle, FaCamera, FaPaperPlane, FaChevronDown, FaChevronUp, FaTimes, FaSpinner, FaEdit } from 'react-icons/fa';
import { useAuth } from '../../../context/student/StudentAuthContext';
import StudentService from '../../../api/student/StudentService';

const ReviewForm = ({ boardingId, onSubmitSuccess }) => {
  const { currentUser } = useAuth();
  
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState('');
  
  const [selectedFiles, setSelectedFiles] = useState([]); 
  const [previews, setPreviews] = useState([]); 

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false); 
  const [isEditing, setIsEditing] = useState(false); // ✅ Restore Editing State
  
  const fileInputRef = useRef(null);

  // ✅ RESTORED: Check Database for existing review
  useEffect(() => {
    const checkExistingReview = async () => {
      if (currentUser?.id && boardingId) {
        try {
          // Fetch all reviews for this boarding
          const reviews = await StudentService.getBoardingReviews(boardingId);
          
          // Find if THIS user has already written one
          // Note: Ensure your backend DTO returns 'userId' or 'studentId'
          const myReview = reviews.find(r => r.userId === currentUser.id || r.studentId === currentUser.id);

          if (myReview) {
            setRating(myReview.rating);
            setReview(myReview.comment || myReview.review);
            
            // If backend returns image URLs, show them
            if (myReview.imageUrls && myReview.imageUrls.length > 0) {
                setPreviews(myReview.imageUrls);
            }
            
            setIsEditing(true); 
            // We don't auto-expand on load to keep UI clean, user can click to edit
          }
        } catch (error) {
          console.error("Error checking existing review", error);
        }
      }
    };
    
    checkExistingReview();
  }, [currentUser, boardingId]);

  const handleStarClick = (star) => {
    setRating(star);
    setIsExpanded(true); 
  };

  const handlePhotoSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + selectedFiles.length > 3) {
        alert("You can only upload up to 3 photos.");
        return;
    }
    setSelectedFiles(prev => [...prev, ...files]);
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPreviews(prev => [...prev, ...newPreviews]);
  };

  const removePhoto = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0 || !review.trim()) {
        alert("Please provide a rating and a comment.");
        return;
    }
    if (!currentUser?.id) {
        alert("You must be logged in to submit a review.");
        return;
    }

    setIsSubmitting(true);
    
    try {
      let uploadedImageUrls = [];

      // 1. Upload new photos if selected
      if (selectedFiles.length > 0) {
        uploadedImageUrls = await StudentService.uploadReviewImages(selectedFiles);
      } else {
        // Keep existing photos if no new ones selected (logic depends on your needs)
        // For now, if editing and no new files, we might keep old URLs in `previews`
        // filtered for strings (URLs) vs blobs.
        uploadedImageUrls = previews.filter(p => typeof p === 'string' && p.startsWith('http'));
      }

      const reviewData = {
        userId: currentUser.id,
        boardingId: boardingId,
        rating: rating,
        review: review.trim(),
        imageUrls: uploadedImageUrls 
      };

      await StudentService.submitReview(reviewData);

      setIsSubmitting(false);
      setIsSuccess(true);
      
      setTimeout(() => {
        setIsSuccess(false);
        setIsExpanded(false); 
        if (onSubmitSuccess) onSubmitSuccess(); 
      }, 1500);

    } catch (error) {
      console.error("Failed to submit review:", error);
      alert("Failed to submit review.");
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      layout
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6"
    >
      {/* Header */}
      <div className="p-4 flex flex-col items-center justify-center bg-gray-50/50">
        <div className="flex justify-between items-center w-full mb-2">
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide flex items-center gap-2">
                {isEditing ? <><FaEdit /> Edit Your Review</> : "Rate Your Stay"}
            </h3>
            <button onClick={() => setIsExpanded(!isExpanded)} className="text-gray-400 hover:text-green-600 text-xs">
                {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
            </button>
        </div>

        {isSuccess ? (
          <div className="text-green-500 font-bold text-sm flex items-center gap-2 py-2">
            <FaCheckCircle /> {isEditing ? "Updated Successfully!" : "Submitted Successfully!"}
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
                <FaStar className={`text-2xl transition-colors ${star <= (hoveredRating || rating) ? 'text-yellow-400' : 'text-gray-300'}`} />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Form */}
      <AnimatePresence>
        {isExpanded && !isSuccess && (
          <motion.form
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-4 pb-4"
            onSubmit={handleSubmit}
          >
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Write your experience here..."
              rows={3}
              className="w-full mt-3 p-3 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:bg-white transition-all resize-none"
            />

            <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => fileInputRef.current.click()}
                        className="text-gray-500 hover:text-green-600 transition p-2 bg-gray-100 rounded-full"
                    >
                        <FaCamera />
                    </button>
                    <input type="file" ref={fileInputRef} onChange={handlePhotoSelect} accept="image/*" multiple className="hidden" />

                    <div className="flex gap-2">
                        {previews.map((src, index) => (
                            <div key={index} className="relative w-10 h-10 rounded-lg overflow-hidden border border-gray-300 group">
                                <img src={src} alt="preview" className="w-full h-full object-cover" />
                                <button type="button" onClick={() => removePhoto(index)} className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition"><FaTimes size={12} /></button>
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting || !review.trim()}
                    className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-bold text-white transition-all shadow-sm ${isSubmitting || !review.trim() ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 hover:shadow-md'}`}
                >
                    {isSubmitting ? <><FaSpinner className="animate-spin" /> {isEditing ? "Updating..." : "Posting..."}</> : <><FaPaperPlane size={12} /> {isEditing ? "Update Review" : "Post Review"}</>}
                </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ReviewForm;