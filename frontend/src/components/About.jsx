import React from 'react';
import schoolImg from '../assets/school.jpg';
import morningPrayerImg from '../assets/morning prayer.jpg';
import groupImg from '../assets/group.jpg';
import { 
  SparklesIcon, 
  BookOpenIcon, 
  HeartHandshakeIcon, 
  ShieldCheckIcon, 
  TrophyIcon, 
  UsersIcon,
  LightbulbIcon,
  TargetIcon,
  MessageSquareIcon,
  GlobeIcon
} from './Icons';

export default function About() {
  return (
    <section id="about" className="section-padding about-section" aria-label="About St. Annes Matric School">
      <div className="container">
        {/* -------------------------------------------------------------
            A. SECTION HEADER & MAIN PROFILE INTRODUCTION
        ------------------------------------------------------------- */}
        <div className="section-header reveal">
          <span className="section-badge">About Our School</span>
          <h2 className="section-title">Nurturing Excellence, Character & Knowledge</h2>
          <p className="section-subtitle">
            St. Annes Matric School, Ponmeni is committed to delivering a balanced education that inspires students to achieve academic milestones while developing sound character and life skills.
          </p>
        </div>

        {/* Main Grid: Content + Photos */}
        <div className="about-main-grid">
          {/* Left Text Column */}
          <div className="about-intro-text reveal-left">
            <h3 style={{ fontSize: '1.75rem', marginBottom: '1.25rem' }}>
              A Welcoming & Inclusive Learning Community
            </h3>
            <p>
              Located in Ponmeni, St. Annes Matric School provides a wholesome educational atmosphere where each student receives personal attention, guidance, and encouragement. We believe that true education extends beyond textbooks into the development of ethics, compassion, and discipline.
            </p>
            <p>
              Our matriculation curriculum is thoughtfully delivered through interactive teaching methodologies, promoting analytical thinking, creative curiosity, and collaborative learning among young minds.
            </p>

            {/* Core Pillars */}
            <div className="about-pillars">
              <div className="pillar-item">
                <span className="pillar-icon"><BookOpenIcon size={22} /></span>
                <div>
                  <h4 className="pillar-title">Strong Academics</h4>
                  <p className="pillar-desc">Comprehensive curriculum laying deep conceptual clarity and confidence.</p>
                </div>
              </div>

              <div className="pillar-item">
                <span className="pillar-icon"><HeartHandshakeIcon size={22} /></span>
                <div>
                  <h4 className="pillar-title">Moral & Ethical Values</h4>
                  <p className="pillar-desc">Cultivating humility, mutual respect, discipline, and civic responsibility.</p>
                </div>
              </div>

              <div className="pillar-item">
                <span className="pillar-icon"><UsersIcon size={22} /></span>
                <div>
                  <h4 className="pillar-title">Caring Teachers</h4>
                  <p className="pillar-desc">Supportive educators dedicated to mentoring every individual student.</p>
                </div>
              </div>

              <div className="pillar-item">
                <span className="pillar-icon"><TrophyIcon size={22} /></span>
                <div>
                  <h4 className="pillar-title">Holistic Growth</h4>
                  <p className="pillar-desc">Active participation in physical games, science, arts, and cultural events.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image Composition */}
          <div className="about-images-wrapper reveal-right">
            <img 
              src={schoolImg} 
              alt="St. Annes Matric School Campus Building, Ponmeni" 
              className="about-main-image"
              loading="lazy"
            />
            <div className="about-floating-card">
              <img 
                src={morningPrayerImg} 
                alt="Morning Assembly and Prayer at St. Annes Matric School" 
                className="about-floating-image"
                loading="lazy"
              />
              <p className="about-floating-caption">Daily Assembly & Value Education</p>
            </div>
          </div>
        </div>

        {/* -------------------------------------------------------------
            B & C. VISION & MISSION CARDS
        ------------------------------------------------------------- */}
        <div className="vision-mission-grid content-block-spaced">
          <div className="card vm-card reveal delay-1">
            <div className="vm-icon-header">
              <div className="vm-icon-circle">
                <SparklesIcon size={24} />
              </div>
              <h3 className="vm-title">Our Vision</h3>
            </div>
            <p>
              To inspire and empower every child to reach their highest potential as informed, compassionate, and responsible citizens equipped to face future global challenges with confidence and integrity.
            </p>
          </div>

          <div className="card vm-card reveal delay-2">
            <div className="vm-icon-header">
              <div className="vm-icon-circle">
                <ShieldCheckIcon size={24} />
              </div>
              <h3 className="vm-title">Our Mission</h3>
            </div>
            <p>
              To provide quality matriculation education in a disciplined, supportive environment that nurtures intellectual curiosity, emotional well-being, moral values, and social consciousness in every student.
            </p>
          </div>
        </div>

        {/* -------------------------------------------------------------
            D. OUR EDUCATIONAL VALUES (6 CARDS)
        ------------------------------------------------------------- */}
        <div className="content-block-spaced">
          <div className="section-header reveal">
            <span className="section-badge">Core Principles</span>
            <h2 className="section-title">Our Educational Values</h2>
            <p className="section-subtitle">
              These fundamental values guide daily interactions, student mentoring, and our collective school culture.
            </p>
          </div>

          <div className="content-grid-3">
            <div className="card info-feature-card reveal delay-1">
              <div className="card-icon-wrap">
                <HeartHandshakeIcon size={22} />
              </div>
              <h3>Respect</h3>
              <p>Treating teachers, elders, classmates, and oneself with genuine consideration, courtesy, and empathetic understanding.</p>
            </div>

            <div className="card info-feature-card reveal delay-2">
              <div className="card-icon-wrap">
                <ShieldCheckIcon size={22} />
              </div>
              <h3>Responsibility</h3>
              <p>Guiding students to take ownership of their learning, academic commitments, school property, and daily duties.</p>
            </div>

            <div className="card info-feature-card reveal delay-3">
              <div className="card-icon-wrap">
                <TargetIcon size={22} />
              </div>
              <h3>Integrity</h3>
              <p>Upholding truthfulness, honesty in schoolwork, and moral fairness in all interpersonal engagements and sportsmanship.</p>
            </div>

            <div className="card info-feature-card reveal delay-1">
              <div className="card-icon-wrap">
                <LightbulbIcon size={22} />
              </div>
              <h3>Curiosity</h3>
              <p>Encouraging eager questioning, creative thinking, and an enduring desire to read, discover, and comprehend the world.</p>
            </div>

            <div className="card info-feature-card reveal delay-2">
              <div className="card-icon-wrap">
                <UsersIcon size={22} />
              </div>
              <h3>Cooperation</h3>
              <p>Fostering teamwork, shared learning, constructive listening, and mutual assistance in classroom and playground activities.</p>
            </div>

            <div className="card info-feature-card reveal delay-3">
              <div className="card-icon-wrap">
                <TrophyIcon size={22} />
              </div>
              <h3>Perseverance</h3>
              <p>Developing grit, viewing mistakes as valuable stepping stones, and maintaining steady effort to overcome learning challenges.</p>
            </div>
          </div>
        </div>

        {/* -------------------------------------------------------------
            E. HOLISTIC STUDENT DEVELOPMENT
        ------------------------------------------------------------- */}
        <div className="content-block-spaced">
          <div className="section-header reveal">
            <span className="section-badge">Well-Rounded Education</span>
            <h2 className="section-title">Holistic Student Development</h2>
            <p className="section-subtitle">
              True educational development addresses the mind, body, character, and social consciousness of each child.
            </p>
          </div>

          <div className="content-grid-4">
            <div className="card info-feature-card reveal delay-1">
              <div className="card-icon-wrap">
                <BookOpenIcon size={22} />
              </div>
              <h4>Academic Intellect</h4>
              <p>Deep foundational literacy, numeracy, logical reasoning, and structured study methods that foster intellectual clarity.</p>
            </div>

            <div className="card info-feature-card reveal delay-2">
              <div className="card-icon-wrap">
                <MessageSquareIcon size={22} />
              </div>
              <h4>Communication</h4>
              <p>Encouraging articulative speech, attentive listening, reading confidence, and clear written expression.</p>
            </div>

            <div className="card info-feature-card reveal delay-3">
              <div className="card-icon-wrap">
                <TrophyIcon size={22} />
              </div>
              <h4>Physical Health</h4>
              <p>Regular physical exercises, sports sessions, and outdoor activities to develop agility, strength, and team spirit.</p>
            </div>

            <div className="card info-feature-card reveal delay-4">
              <div className="card-icon-wrap">
                <GlobeIcon size={22} />
              </div>
              <h4>Social Awareness</h4>
              <p>Instilling empathy, community awareness, civic duty, and environmental responsibility from young ages.</p>
            </div>
          </div>
        </div>

        {/* -------------------------------------------------------------
            F. A SUPPORTIVE LEARNING ENVIRONMENT
        ------------------------------------------------------------- */}
        <div className="content-block-spaced">
          <div className="media-split-box">
            <div className="reveal-left">
              <span className="section-badge">Campus Life</span>
              <h2 className="section-title">A Supportive Learning Environment</h2>
              <p style={{ marginBottom: '1.25rem', fontSize: '1.05rem', lineHeight: '1.7' }}>
                Children learn best when they feel safe, respected, and valued. At St. Annes Matric School, Ponmeni, our campus is designed to be an encouraging space where every student is welcomed warmly each morning.
              </p>
              <p style={{ lineHeight: '1.7' }}>
                Our staff fosters a positive tone in classrooms, hallways, and outdoor grounds. By replacing fear of failure with constructive guidance, we allow children to develop healthy self-esteem, active curiosity, and comfortable social rapport with teachers and peers.
              </p>
            </div>

            <div className="reveal-right">
              <img 
                src="https://content3.jdmagicbox.com/v2/comp/chennai/93/044p7032993/catalogue/st-anns-matriculation-higher-secondary-school-mugalivakkam-chennai-english-medium-schools-n9segvljr5.jpg" 
                alt="Supportive community of teachers and students at St. Annes" 
                className="media-split-img"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* -------------------------------------------------------------
            G. WORKING TOGETHER WITH PARENTS
        ------------------------------------------------------------- */}
        <div className="content-block-spaced">
          <div className="card" style={{ padding: '2.5rem', borderLeft: '4px solid var(--primary-blue)' }}>
            <div className="reveal">
              <span className="section-badge">Home & School</span>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Working Together with Parents</h3>
              <p style={{ fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '1.25rem' }}>
                We believe that education is a shared partnership between parents and teachers. When home and school work in harmony, students receive the consistent encouragement, structure, and emotional reassurance they need to thrive.
              </p>
              <p style={{ lineHeight: '1.7' }}>
                Through scheduled parent-teacher meetings, periodic progress reports, and open channels of communication, we ensure that parents remain well-informed about their child’s academic achievements, personal growth, and daily school experience.
              </p>
            </div>
          </div>
        </div>

        {/* -------------------------------------------------------------
            H. OUR COMMITMENT TO EVERY STUDENT
        ------------------------------------------------------------- */}
        <div className="content-block-spaced">
          <div className="section-header reveal">
            <span className="section-badge">Our Promise</span>
            <h2 className="section-title">Our Commitment to Every Student</h2>
            <p className="section-subtitle">
              Every learner progresses along their own path. Our commitment is to walk beside them with patience, enthusiasm, and steadfast dedication.
            </p>
          </div>

          <div className="content-grid-3">
            <div className="card info-feature-card reveal delay-1">
              <div className="card-icon-wrap">
                <TargetIcon size={22} />
              </div>
              <h4>Individual Pace</h4>
              <p>Recognizing and respecting differences in learning speed, providing timely help where needed and enrichment where mastered.</p>
            </div>

            <div className="card info-feature-card reveal delay-2">
              <div className="card-icon-wrap">
                <LightbulbIcon size={22} />
              </div>
              <h4>Interest Discovery</h4>
              <p>Offering opportunities in arts, science, sports, and reading so every student discovers areas where they feel inspired.</p>
            </div>

            <div className="card info-feature-card reveal delay-3">
              <div className="card-icon-wrap">
                <TrophyIcon size={22} />
              </div>
              <h4>Confidence Building</h4>
              <p>Celebrating earnest effort, small milestones, and character growth to cultivate lifelong self-belief and optimism.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
