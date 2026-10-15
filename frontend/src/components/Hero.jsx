import React from 'react';
import heroBgImage from '../assets/background.jpg';
import students1Img from '../assets/students1.jpg';
import schoolImg from '../assets/school.jpg';
import supportImg from "../assets/support.jpg"
import { 
  ArrowRightIcon, 
  GraduationCapIcon, 
  SparklesIcon, 
  ShieldCheckIcon, 
  UsersIcon, 
  BookOpenIcon,
  HeartHandshakeIcon,
  LightbulbIcon,
  TargetIcon,
  MessageSquareIcon
} from './Icons';
import '../styles/hero.css';

export default function Hero({ onOpenAdmissionModal }) {
  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="home">
      {/* -------------------------------------------------------------
          1. HERO BANNER (Preserved exactly as existing)
      ------------------------------------------------------------- */}
      <section 
        className="hero-section"
        style={{ backgroundImage: `url(${heroBgImage})` }}
        aria-label="Welcome to St. Annes Matric School, Ponmeni"
      >
        <div className="hero-overlay" />
        
        <div className="container hero-content">
          {/* School Label / Badge */}
          <div className="hero-badge">
            <GraduationCapIcon size={18} />
            <span>ST. ANNES MATRIC SCHOOL, PONMENI</span>
          </div>

          {/* Main Heading */}
          <h1 className="hero-title">
            Inspiring Young Minds. <br />
            <span className="text-gradient">Building Bright Futures.</span>
          </h1>

          {/* Supporting Subtitle */}
          <p className="hero-subtitle">
            Discover a welcoming learning environment where education, values, creativity, and confidence help students prepare for the future.
          </p>

          {/* Action Buttons */}
          <div className="hero-actions">
            <button 
              type="button" 
              className="btn btn-primary"
              onClick={onOpenAdmissionModal}
            >
              <span>Admission Enquiry</span>
              <ArrowRightIcon size={18} />
            </button>
            
            <a 
              href="#about" 
              className="btn btn-outline-white"
              onClick={(e) => scrollToSection(e, 'about')}
            >
              Explore Our School
            </a>
          </div>

          {/* Core Highlights Pills */}
          <div className="hero-highlights">
            <div className="highlight-pill">
              <span className="highlight-icon"><SparklesIcon size={18} /></span>
              <span>Value-Based Education</span>
            </div>
            <div className="highlight-pill">
              <span className="highlight-icon"><UsersIcon size={18} /></span>
              <span>Dedicated Faculty</span>
            </div>
            <div className="highlight-pill">
              <span className="highlight-icon"><BookOpenIcon size={18} /></span>
              <span>Holistic Development</span>
            </div>
            <div className="highlight-pill">
              <span className="highlight-icon"><ShieldCheckIcon size={18} /></span>
              <span>Safe & Caring Campus</span>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          2. EXPANDED HOME CONTENT BLOCKS
      ------------------------------------------------------------- */}
      
      {/* Block A: Welcome to ST. ANNES MATRIC SCHOOL */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="container">
          <div className="media-split-box">
            <div className="reveal-left">
              <span className="section-badge">Welcome to Our School</span>
              <h2 className="section-title">A Warm, Dedicated Community for Young Learners</h2>
              <p style={{ marginBottom: '1.25rem', fontSize: '1.05rem', lineHeight: '1.7' }}>
                At St. Annes Matric School, Ponmeni, we believe that education is an empowering journey that shapes character, ignites curiosity, and builds lasting confidence. Every child arrives with unique strengths, innate wonder, and boundless potential waiting to be cultivated.
              </p>
              <p style={{ marginBottom: '1.75rem', lineHeight: '1.7' }}>
                Our educational environment balances academic structure with personal care, ensuring that students develop discipline, moral values, and cooperative teamwork while acquiring essential foundational skills across language, mathematics, science, and the humanities.
              </p>
              <a 
                href="#about" 
                className="btn btn-secondary"
                onClick={(e) => scrollToSection(e, 'about')}
              >
                <span>Read More About Our Ethos</span>
                <ArrowRightIcon size={18} />
              </a>
            </div>

            <div className="reveal-right">
              <img 
                src={students1Img} 
                alt="Students of St. Annes Matric School learning together" 
                className="media-split-img"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Block B: Why Choose Our School? (6 Cards) */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-header reveal">
            <span className="section-badge">Why Families Choose St. Annes</span>
            <h2 className="section-title">Built on Care, Values & Academic Strength</h2>
            <p className="section-subtitle">
              We focus on providing a balanced, positive educational experience where children feel encouraged to participate, learn, and grow every single day.
            </p>
          </div>

          <div className="content-grid-3">
            <div className="card info-feature-card reveal delay-1">
              <div className="card-icon-wrap">
                <BookOpenIcon size={24} />
              </div>
              <h3>Learning-Focused Environment</h3>
              <p>
                Structured, attentive classrooms designed to help students concentrate, grasp concepts thoroughly, and cultivate healthy study routines without undue pressure.
              </p>
            </div>

            <div className="card info-feature-card reveal delay-2">
              <div className="card-icon-wrap">
                <UsersIcon size={24} />
              </div>
              <h3>Student Confidence & Voice</h3>
              <p>
                Every learner is encouraged to ask questions, voice ideas, and participate actively in discussions, building self-assurance from an early age.
              </p>
            </div>

            <div className="card info-feature-card reveal delay-3">
              <div className="card-icon-wrap">
                <TargetIcon size={24} />
              </div>
              <h3>Solid Academic Foundations</h3>
              <p>
                Methodical delivery of the matriculation curriculum emphasizing deep conceptual clarity, linguistic ability, and mathematical problem-solving skills.
              </p>
            </div>

            <div className="card info-feature-card reveal delay-1">
              <div className="card-icon-wrap">
                <ShieldCheckIcon size={24} />
              </div>
              <h3>Discipline & Responsibility</h3>
              <p>
                Instilling moral consciousness, punctuality, respect for peers, and personal accountability as fundamental pillars of everyday school life.
              </p>
            </div>

            <div className="card info-feature-card reveal delay-2">
              <div className="card-icon-wrap">
                <LightbulbIcon size={24} />
              </div>
              <h3>Creativity & Curiosity</h3>
              <p>
                Encouraging young minds to explore beyond rote memorization through creative tasks, science observations, reading, and collaborative projects.
              </p>
            </div>

            <div className="card info-feature-card reveal delay-3">
              <div className="card-icon-wrap">
                <HeartHandshakeIcon size={24} />
              </div>
              <h3>Parent-School Partnership</h3>
              <p>
                Maintaining open, respectful communication with parents, recognizing that a child's optimal growth flourishes through collaborative support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Block C: A Place to Learn and Grow */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="container">
          <div className="media-split-box reverse">
            <div className="reveal-left">
              <img 
                src={supportImg} 
                alt="St. Annes Matric School Campus, Ponmeni" 
                className="media-split-img"
                loading="lazy"
              />
            </div>

            <div className="reveal-right">
              <span className="section-badge">A Place to Learn & Grow</span>
              <h2 className="section-title">Supporting Every Step of Your Child’s Growth</h2>
              <p style={{ marginBottom: '1.25rem', fontSize: '1.05rem', lineHeight: '1.7' }}>
                A child’s school years form the bedrock of their character and intellectual curiosity. Our campus in Ponmeni provides a calm, safe, and respectful environment where students feel at home and motivated to learn.
              </p>
              <p style={{ marginBottom: '1.5rem', lineHeight: '1.7' }}>
                Through guided classroom interaction, peer collaboration, physical sports, and value education, we help students develop positive social skills, resilience, emotional balance, and a genuine respect for their community.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a 
                  href="#academics" 
                  className="btn btn-secondary"
                  onClick={(e) => scrollToSection(e, 'academics')}
                >
                  Explore Academics & Facilities
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Block D: Our Educational Approach */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-header reveal">
            <span className="section-badge">Educational Principles</span>
            <h2 className="section-title">How We Guide Young Minds</h2>
            <p className="section-subtitle">
              Our educational approach centers on student understanding, practical inquiry, and the cultivation of independent, thoughtful learners.
            </p>
          </div>

          <div className="content-grid-4">
            <div className="card info-feature-card reveal delay-1">
              <div className="card-icon-wrap">
                <LightbulbIcon size={22} />
              </div>
              <h4>Understanding Concepts</h4>
              <p>Prioritizing core conceptual comprehension over mechanical memorization so students can apply knowledge confidently.</p>
            </div>

            <div className="card info-feature-card reveal delay-2">
              <div className="card-icon-wrap">
                <MessageSquareIcon size={22} />
              </div>
              <h4>Asking Questions</h4>
              <p>Fostering an open classroom atmosphere where questions are welcomed and intellectual curiosity is actively celebrated.</p>
            </div>

            <div className="card info-feature-card reveal delay-3">
              <div className="card-icon-wrap">
                <UsersIcon size={22} />
              </div>
              <h4>Active Participation</h4>
              <p>Encouraging every child to engage in hands-on tasks, class discussions, and school events to develop collaborative teamwork.</p>
            </div>

            <div className="card info-feature-card reveal delay-4">
              <div className="card-icon-wrap">
                <TargetIcon size={22} />
              </div>
              <h4>Independent Thinking</h4>
              <p>Equipping students with analytical reasoning and problem-solving skills that serve them well throughout their educational journey.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Block E: Explore Our School (Navigation Cards) */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="container">
          <div className="section-header reveal">
            <span className="section-badge">Navigation Overview</span>
            <h2 className="section-title">Explore St. Annes Matric School</h2>
            <p className="section-subtitle">
              Discover key areas of our school community, educational philosophy, campus facilities, and admissions desk.
            </p>
          </div>

          <div className="content-grid-4">
            <a 
              href="#about" 
              className="explore-nav-card reveal delay-1"
              onClick={(e) => scrollToSection(e, 'about')}
            >
              <div>
                <div className="nav-card-icon">
                  <GraduationCapIcon size={24} />
                </div>
                <h4>About Our School</h4>
                <p>Learn about our background, educational vision, mission, and core values that guide our educators.</p>
              </div>
              <span className="nav-card-link-text">
                <span>View About Section</span>
                <ArrowRightIcon size={16} />
              </span>
            </a>

            <a 
              href="#academics" 
              className="explore-nav-card reveal delay-2"
              onClick={(e) => scrollToSection(e, 'academics')}
            >
              <div>
                <div className="nav-card-icon">
                  <BookOpenIcon size={24} />
                </div>
                <h4>Academic & Facilities</h4>
                <p>Explore our curriculum focus, classrooms, laboratory, library corner, and sports activities.</p>
              </div>
              <span className="nav-card-link-text">
                <span>Explore Facilities</span>
                <ArrowRightIcon size={16} />
              </span>
            </a>

            <a 
              href="#gallery" 
              className="explore-nav-card reveal delay-3"
              onClick={(e) => scrollToSection(e, 'gallery')}
            >
              <div>
                <div className="nav-card-icon">
                  <SparklesIcon size={24} />
                </div>
                <h4>School Gallery</h4>
                <p>Browse through photographs of campus life, science exhibitions, celebrations, and sports events.</p>
              </div>
              <span className="nav-card-link-text">
                <span>Browse Gallery</span>
                <ArrowRightIcon size={16} />
              </span>
            </a>

            <div 
              className="explore-nav-card reveal delay-4"
              onClick={onOpenAdmissionModal}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onOpenAdmissionModal();
                }
              }}
            >
              <div>
                <div className="nav-card-icon">
                  <HeartHandshakeIcon size={24} />
                </div>
                <h4>Admission Enquiry</h4>
                <p>Submit student and parent details to connect directly with our admissions coordinator.</p>
              </div>
              <span className="nav-card-link-text">
                <span>Open Enquiry Form</span>
                <ArrowRightIcon size={16} />
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
