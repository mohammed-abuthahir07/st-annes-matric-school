import React from 'react';
import { GraduationCapIcon, MapPinIcon, MailIcon, ClockIcon } from './Icons';
import { RECIPIENT_EMAIL } from '../services/emailService';
import '../styles/footer.css';

export default function Footer({ onOpenAdmissionModal }) {
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-main-grid">
          {/* Col 1: School Brand */}
          <div className="footer-brand">
            <div className="footer-logo-row">
              <div className="brand-icon-wrapper" style={{ width: 40, height: 40 }}>
                <GraduationCapIcon size={22} />
              </div>
              <div>
                <span className="footer-brand-title">ST. ANNES MATRIC SCHOOL</span>
              </div>
            </div>
            <p className="footer-tagline">
              Inspiring young minds, nurturing strong moral values, and preparing students for lifelong success.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-links-list">
              <li>
                <a href="#home" className="footer-link" onClick={(e) => handleNavClick(e, 'home')}>
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="footer-link" onClick={(e) => handleNavClick(e, 'about')}>
                  About School
                </a>
              </li>
              <li>
                <a href="#academics" className="footer-link" onClick={(e) => handleNavClick(e, 'academics')}>
                  Academic & Facilities
                </a>
              </li>
              <li>
                <a href="#gallery" className="footer-link" onClick={(e) => handleNavClick(e, 'gallery')}>
                  Photo Gallery
                </a>
              </li>
              <li>
                <a href="#contact" className="footer-link" onClick={(e) => handleNavClick(e, 'contact')}>
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Admissions & Offerings */}
          <div className="footer-col">
            <h4 className="footer-col-title">Admissions</h4>
            <ul className="footer-links-list">
              <li>
                <button
                  type="button"
                  className="footer-link"
                  onClick={onOpenAdmissionModal}
                  style={{ textAlign: 'left', padding: 0 }}
                >
                  Online Enquiry Form
                </button>
              </li>
              <li>
                <a href="#academics" className="footer-link" onClick={(e) => handleNavClick(e, 'academics')}>
                  Matriculation Program
                </a>
              </li>
              <li>
                <a href="#academics" className="footer-link" onClick={(e) => handleNavClick(e, 'academics')}>
                  Science Labs & Library
                </a>
              </li>
              <li>
                <a href="#academics" className="footer-link" onClick={(e) => handleNavClick(e, 'academics')}>
                  Sports & Activities
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Campus Information */}
          <div className="footer-col">
            <h4 className="footer-col-title">Campus Desk</h4>
            <div className="footer-contact-item">
              <span className="footer-contact-icon"><MapPinIcon size={18} /></span>
              <span>Ponmeni, Madurai, Tamil Nadu, India</span>
            </div>
            <div className="footer-contact-item">
              <span className="footer-contact-icon"><MailIcon size={18} /></span>
              <a href={`mailto:${RECIPIENT_EMAIL}`} className="footer-link">{RECIPIENT_EMAIL}</a>
            </div>
            <div className="footer-contact-item">
              <span className="footer-contact-icon"><ClockIcon size={18} /></span>
              <span>Mon – Sat: 9:00 AM – 4:30 PM</span>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom">
          <p>© 2026 St. Annes Matric School, Ponmeni. All rights reserved.</p>
          <button 
            type="button" 
            className="back-to-top-btn" 
            onClick={scrollToTop}
            aria-label="Back to top of page"
          >
            ↑ Back to Top
          </button>
        </div>
      </div>
    </footer>
  );
}
