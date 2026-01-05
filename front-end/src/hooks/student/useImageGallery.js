import { useState, useEffect } from 'react';

export const useImageGallery = (images = []) => {

  const safeImages = Array.isArray(images) ? images : [];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [safeImages]);

  const nextImage = () => {
    if (safeImages.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % safeImages.length);
  };

  const prevImage = () => {
    if (safeImages.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + safeImages.length) % safeImages.length);
  };

  const selectImage = (index) => {
    if (index >= 0 && index < safeImages.length) {
      setCurrentIndex(index);
    }
  };

  return {
    // Return the specific image or null if array is empty
    currentImage: safeImages.length > 0 ? safeImages[currentIndex] : null,
    currentIndex,
    nextImage,
    prevImage,
    selectImage
  };
};