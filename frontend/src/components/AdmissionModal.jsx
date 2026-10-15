import React, { useState, useEffect, useRef } from 'react';
import AdmissionForm from './AdmissionForm';
import { CloseIcon, GraduationCapIcon } from './Icons';
import '../styles/admission.css';

export default function AdmissionModal({ isOpen, onClose, formData, setFormData }) {
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  const [isRendered, setIsRendered] = useState(isOpen);
  const [isClosing, setIsClosing] = useState(false);
  const dialogRef = useRef(null);

  // Sync state during render when isOpen changes
  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) {
      setIsRendered(true);
      setIsClosing(false);
    }
  }

  // Handle exit animation timing & body scroll locking
  useEffect(() => {
    let timer;
    let exitTimer;
    if (isOpen) {
      document.body.classList.add('modal-open');
    } else if (isRendered) {
      exitTimer = setTimeout(() => {
        setIsClosing(true);
      }, 0);
      timer = setTimeout(() => {
        setIsRendered(false);
        setIsClosing(false);
        document.body.classList.remove('modal-open');
      }, 300);
    }

    return () => {
      if (exitTimer) clearTimeout(exitTimer);
      if (timer) clearTimeout(timer);
    };
  }, [isOpen, isRendered]);

  // Handle Escape key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.classList.remove('modal-open');
    };
  }, [isOpen, onClose]);

  if (!isRendered) return null;

  const handleBackdropClick = (e) => {
    if (dialogRef.current && !dialogRef.current.contains(e.target)) {
      onClose();
    }
  };

  return (
    <div
      className={`modal-backdrop ${isOpen && !isClosing ? 'open' : ''} ${isClosing ? 'closing' : ''}`}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="admission-modal-title"
    >
      <div 
        className="modal-dialog" 
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-header-text">
            <span className="modal-school-badge">St. Annes Matric School, Ponmeni</span>
            <h3 id="admission-modal-title">
              <GraduationCapIcon size={24} style={{ color: 'var(--primary-blue)' }} />
              Admission Enquiry
            </h3>
            <p>
              Please submit student and parent details below. Our admissions coordinator will reach out with prospectus information.
            </p>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close Admission Enquiry modal"
            title="Close (Press Escape)"
          >
            <CloseIcon size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          <AdmissionForm
            formData={formData}
            setFormData={setFormData}
            onSuccess={() => {
              // Optionally do not immediately close so parent can read the confirmation
            }}
          />
        </div>
      </div>
    </div>
  );
}
