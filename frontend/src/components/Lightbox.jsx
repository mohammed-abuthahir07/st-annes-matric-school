import React, { useEffect } from 'react';
import { CloseIcon, ChevronLeftIcon, ChevronRightIcon } from './Icons';

export default function Lightbox({ images, currentIndex, onClose, onNavigate }) {
  const currentImage = images[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        onNavigate((currentIndex - 1 + images.length) % images.length);
      } else if (e.key === 'ArrowRight') {
        onNavigate((currentIndex + 1) % images.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.classList.add('modal-open');

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.classList.remove('modal-open');
    };
  }, [currentIndex, images.length, onClose, onNavigate]);

  if (!currentImage) return null;

  const handlePrev = (e) => {
    e.stopPropagation();
    onNavigate((currentIndex - 1 + images.length) % images.length);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    onNavigate((currentIndex + 1) % images.length);
  };

  return (
    <div 
      className="lightbox-backdrop" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image Lightbox Viewer"
    >
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          type="button"
          className="lightbox-close-btn"
          onClick={onClose}
          aria-label="Close Lightbox (Press Escape)"
        >
          <CloseIcon size={22} />
        </button>

        {/* Previous Button */}
        <button
          type="button"
          className="lightbox-nav-btn lightbox-prev-btn"
          onClick={handlePrev}
          aria-label="Previous image (Left arrow)"
        >
          <ChevronLeftIcon size={24} />
        </button>

        {/* Active Image */}
        <div className="lightbox-image-wrap">
          <img
            src={currentImage.src}
            alt={currentImage.alt}
            className="lightbox-img"
          />
        </div>

        {/* Next Button */}
        <button
          type="button"
          className="lightbox-nav-btn lightbox-next-btn"
          onClick={handleNext}
          aria-label="Next image (Right arrow)"
        >
          <ChevronRightIcon size={24} />
        </button>

        {/* Captions & Counter */}
        <div className="lightbox-info">
          <p className="lightbox-title">{currentImage.title}</p>
          <span className="lightbox-counter">
            {currentIndex + 1} of {images.length} • {currentImage.category}
          </span>
        </div>
      </div>
    </div>
  );
}
