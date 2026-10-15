import { 
  MapPinIcon, 
  MailIcon, 
  ClockIcon, 
  ArrowRightIcon 
} from './Icons';
import { RECIPIENT_EMAIL } from '../services/emailService';

export default function Contact({ onOpenAdmissionModal }) {
  return (
    <section id="contact" className="section-padding contact-section" aria-label="Contact and Admissions Information">
      <div className="container">
        {/* Section Header */}
        <div className="section-header reveal">
          <span className="section-badge">Get in Touch</span>
          <h2 className="section-title">Admissions & Campus Visit</h2>
          <p className="section-subtitle">
            We welcome prospective parents and guardians to visit our campus, meet our educators, and explore the learning opportunities awaiting your child.
          </p>
        </div>

        {/* Contact Layout */}
        <div className="contact-layout">
          {/* Left Cards */}
          <div className="contact-info-cards reveal-left">
            {/* Campus Address Card */}
            <div className="contact-card">
              <div className="contact-card-icon">
                <MapPinIcon size={24} />
              </div>
              <div className="contact-card-details">
                <h4>Campus Location</h4>
                <p>
                  St. Annes Matric School<br />
                  Ponmeni, Madurai,<br />
                  Tamil Nadu, India
                </p>
              </div>
            </div>

            {/* Admissions Email Card */}
            <div className="contact-card">
              <div className="contact-card-icon">
                <MailIcon size={24} />
              </div>
              <div className="contact-card-details">
                <h4>Admissions Email</h4>
                <p>For admission enquiries and prospectus queries:</p>
                <a href={`mailto:${RECIPIENT_EMAIL}`}>{RECIPIENT_EMAIL}</a>
              </div>
            </div>

            {/* School Office Timings Card */}
            <div className="contact-card">
              <div className="contact-card-icon">
                <ClockIcon size={24} />
              </div>
              <div className="contact-card-details">
                <h4>Office & Visiting Hours</h4>
                <p>
                  Monday – Friday: 9:00 AM – 4:30 PM<br />
                  Saturday: 9:00 AM – 1:00 PM<br />
                  Sunday & Public Holidays: Closed
                </p>
              </div>
            </div>
          </div>

          {/* Right Admission Action Box */}
          <div className="contact-cta-box reveal-right">
            <h3>Start Your Child’s Journey</h3>
            <p>
              Admissions are open for the upcoming academic year. Submit our online admission enquiry to connect directly with our admissions office.
            </p>

            <ul className="enquiry-steps">
              <li className="enquiry-step-item">
                <span className="step-num">1</span>
                <span>Fill out the Online Admission Enquiry Form</span>
              </li>
              <li className="enquiry-step-item">
                <span className="step-num">2</span>
                <span>Our Admissions Desk reviews your application</span>
              </li>
              <li className="enquiry-step-item">
                <span className="step-num">3</span>
                <span>Campus tour, document verification & seat confirmation</span>
              </li>
            </ul>

            <button
              type="button"
              className="btn btn-primary"
              style={{ width: '100%' }}
              onClick={onOpenAdmissionModal}
            >
              <span>Open Admission Enquiry Form</span>
              <ArrowRightIcon size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
