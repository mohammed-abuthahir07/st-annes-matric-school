
import React, { useState } from 'react';
import Lightbox from './Lightbox';
import { ArrowRightIcon, GraduationCapIcon } from './Icons';
import { SCHOOL_GALLERY } from '../school_gallery_data';
import '../styles/gallery.css';

export default function Gallery({ onOpenAdmissionModal }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Use the existing school_gallery_data.js file.
  // Map its data into the structure expected by this component.
  const galleryData = SCHOOL_GALLERY.map((item, index) => ({
    id: item.id ?? index + 1,
    src: item.image ?? item.src,
    title: item.title,
    primaryCategory: item.category,
    categories: [item.category],
    alt: item.alt || item.title,
  }));

  const categories = [
    'All',
    'AllSchool',
    'CampusClassrooms & Learning',
    'Sports & Activities',
    'Activities & Events',
  ];

  const filteredImages =
    selectedCategory === 'All'
      ? galleryData
      : galleryData.filter((item) =>
          item.categories.includes(selectedCategory)
        );

  return (
    <section
      id="gallery"
      className="section-padding gallery-section"
      aria-label="ST. ANNES MATRIC SCHOOL photo gallery"
    >
      <div className="container">
        {/* Section Header */}
        <div className="section-header reveal">
          <span className="section-badge">Life at St. Annes</span>

          <h2 className="section-title">Moments & Memories</h2>

          <p className="section-subtitle">
            Explore ST. ANNES MATRIC SCHOOL through our gallery,
            featuring the school environment, classrooms and learning,
            sports activities, and special school events.
          </p>
        </div>

        {/* Category Filters */}
        <div className="gallery-filters reveal">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={`gallery-filter-btn ${
                selectedCategory === category ? 'active' : ''
              }`}
              onClick={() => {
                setSelectedCategory(category);
                setLightboxIndex(null);
              }}
              aria-pressed={selectedCategory === category}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="gallery-grid">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              className="gallery-item reveal delay-1"
              onClick={() => setLightboxIndex(index)}
              onKeyDown={(event) => {
                if (
                  event.key === 'Enter' ||
                  event.key === ' '
                ) {
                  event.preventDefault();
                  setLightboxIndex(index);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`View enlarged photo: ${image.title}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="gallery-img"
                loading="lazy"
              />

              <div className="gallery-item-overlay">
                <span className="gallery-item-badge">
                  {image.primaryCategory}
                </span>

                <p className="gallery-item-title">
                  {image.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Admission Call to Action */}
        <div className="section-cta-banner reveal">
          <span className="section-badge">Join Our Family</span>

          <h3>
            Experience ST. ANNES MATRIC SCHOOL Firsthand
          </h3>

          <p>
            Interested in learning more about our school?
            Submit an admission enquiry to discuss educational
            opportunities for your child.
          </p>

          <div className="cta-buttons-row">
            <button
              type="button"
              className="btn btn-primary"
              onClick={onOpenAdmissionModal}
            >
              <GraduationCapIcon size={18} />
              <span>Submit Admission Enquiry</span>
              <ArrowRightIcon size={18} />
            </button>

            <a href="#contact" className="btn btn-secondary">
              Contact School Office
            </a>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={filteredImages}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </section>
  );
}
