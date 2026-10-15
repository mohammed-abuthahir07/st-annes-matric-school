import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import AcademicsFacilities from './components/AcademicsFacilities';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdmissionModal from './components/AdmissionModal';
import useScrollReveal from './hooks/useScrollReveal';

export default function App() {
  // Theme state: defaults to 'light', persists in localStorage
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('st_annes_theme');
      return saved === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  // Modal open state: automatically opens on page load/refresh; dismissal resets on refresh
  const [isAdmissionModalOpen, setIsAdmissionModalOpen] = useState(false);

  // Form data state: preserved across modal close and reopen
  const [admissionFormData, setAdmissionFormData] = useState({
    studentName: '',
    dob: '',
    gender: '',
    classApplying: '',
    parentName: '',
    contactNumber: '',
    streetAddress: '',
    city: 'Madurai',
    state: 'Tamil Nadu',
    country: 'India',
    pincode: '',
    remarks: '',
  });

  // Activate scroll-reveal IntersectionObserver
  useScrollReveal();

  // Apply theme to document element and persist in localStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('st_annes_theme', theme);
    } catch (e) {
      console.warn('Unable to persist theme to localStorage', e);
    }
  }, [theme]);

  // Initial load behavior:
  // 1. Scroll window to top (Home section)
  // 2. Automatically open the admission enquiry modal after entrance animation begins
  useEffect(() => {
    // Scroll to top immediately on fresh page load or refresh
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // Auto-open admission enquiry popup (no permanent suppression in storage)
    const autoOpenTimer = setTimeout(() => {
      setIsAdmissionModalOpen(true);
    }, 750);

    return () => clearTimeout(autoOpenTimer);
  }, []);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleOpenAdmissionModal = () => {
    setIsAdmissionModalOpen(true);
  };

  const handleCloseAdmissionModal = () => {
    setIsAdmissionModalOpen(false);
  };

  return (
    <div className="app-root">
      {/* Global Navbar */}
      <Navbar
        currentTheme={theme}
        onToggleTheme={handleToggleTheme}
        onOpenAdmissionModal={handleOpenAdmissionModal}
      />

      <main id="main-content">
        {/* Home Page Hero Section */}
        <Hero onOpenAdmissionModal={handleOpenAdmissionModal} />

        {/* About School Section */}
        <About />

        {/* Academic & Facilities Section */}
        <AcademicsFacilities onOpenAdmissionModal={handleOpenAdmissionModal} />

        {/* Gallery Section */}
        <Gallery onOpenAdmissionModal={handleOpenAdmissionModal} />

        {/* Contact & Admissions Desk Section */}
        <Contact onOpenAdmissionModal={handleOpenAdmissionModal} />
      </main>

      {/* Footer */}
      <Footer onOpenAdmissionModal={handleOpenAdmissionModal} />

      {/* Automatic & Triggerable Admission Enquiry Popup Modal */}
      <AdmissionModal
        isOpen={isAdmissionModalOpen}
        onClose={handleCloseAdmissionModal}
        formData={admissionFormData}
        setFormData={setAdmissionFormData}
      />
    </div>
  );
}