import { useState } from 'react';

export const useImageGallery = (images) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const selectImage = (index) => {
    setCurrentIndex(index);
  };

  return {
    currentImage: images[currentIndex],
    currentIndex,
    nextImage,
    prevImage,
    selectImage
  };
};