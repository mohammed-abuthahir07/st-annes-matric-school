import React, { useState, useEffect } from 'react';
import { GraduationCapIcon, SunIcon, MoonIcon, MenuIcon, CloseIcon, ArrowRightIcon } from './Icons';
import '../styles/navbar.css';

export default function Navbar({ currentTheme, onToggleTheme, onOpenAdmissionModal }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Track scroll position for navbar shadow & active section
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Detect active section
      const sections = ['home', 'about', 'academics', 'gallery', 'contact'];
      const scrollPos = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle Escape key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Academic & Facilities', href: '#academics', id: 'academics' },
    { label: 'Gallery', href: '#gallery', id: 'gallery' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        {/* Brand */}
        <a 
          href="#home" 
          className="navbar-brand"
          onClick={(e) => handleNavClick(e, '#home')}
          aria-label="St. Annes Matric School, Ponmeni - Return to top"
        >
          <div className="brand-icon-wrapper">
            <GraduationCapIcon size={26} />
          </div>
          <div className="brand-text">
            <span className="brand-title">ST. ANNES MATRIC SCHOOL</span>
            <span className="brand-subtitle">PONMENI</span>
          </div>
        </a>

        {/* Desktop Nav Items */}
        <nav aria-label="Main Navigation">
          <ul className="nav-menu">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Actions */}
        <div className="navbar-actions">
          {/* Theme Toggle Button */}
          <button
            type="button"
            className="theme-toggle-btn"
            onClick={onToggleTheme}
            aria-label={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} theme`}
            title={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} theme`}
          >
            {currentTheme === 'light' ? <MoonIcon size={20} /> : <SunIcon size={20} />}
          </button>

          {/* Admission Enquiry Button */}
          <button
            type="button"
            className="btn btn-primary btn-nav-enquiry desktop-only"
            onClick={onOpenAdmissionModal}
          >
            Admission Enquiry
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            className="hamburger-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div 
        className={`mobile-menu-overlay ${mobileMenuOpen ? 'open' : ''}`} 
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden={!mobileMenuOpen}
      />
      <div 
        className={`mobile-menu-drawer ${mobileMenuOpen ? 'open' : ''}`}
        aria-hidden={!mobileMenuOpen}
      >
        <ul className="mobile-nav-list">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={link.href}
                className={`mobile-nav-link ${activeSection === link.id ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                <span>{link.label}</span>
                <ArrowRightIcon size={18} />
              </a>
            </li>
          ))}
        </ul>

        <div className="mobile-nav-actions">
          <div className="mobile-theme-row">
            <span>Theme: {currentTheme === 'light' ? 'Light Mode' : 'Dark Mode'}</span>
            <button
              type="button"
              className="theme-toggle-btn"
              onClick={onToggleTheme}
              aria-label={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} theme`}
            >
              {currentTheme === 'light' ? <MoonIcon size={20} /> : <SunIcon size={20} />}
            </button>
          </div>

          <button
            type="button"
            className="btn btn-primary btn-block"
            style={{ width: '100%' }}
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenAdmissionModal();
            }}
          >
            Admission Enquiry
          </button>
        </div>
      </div>
    </header>
  );
}
