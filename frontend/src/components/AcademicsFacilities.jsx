import React from 'react';
import classroomImg from '../assets/classroom.jpg';
import labsImg from '../assets/labs.jpg';
import studyImg from '../assets/study.jpg';
import sportsImg from '../assets/sports.jpg';
import exhibitionImg from '../assets/exhibition.jpg';
import library from "../assets/library.jpg"
import { 
  BookOpenIcon, 
  FlaskIcon, 
  TrophyIcon, 
  UsersIcon, 
  HeartHandshakeIcon, 
  LightbulbIcon, 
  TargetIcon, 
  ShieldCheckIcon,
  MessageSquareIcon,
  GlobeIcon,
  PaletteIcon,
  ArrowRightIcon,
  CheckCircleIcon
} from './Icons';

export default function AcademicsFacilities({ onOpenAdmissionModal }) {
  const verifiedFacilities = [
    {
      id: 'academics',
      title: 'Matriculation Curriculum',
      category: 'Academics',
      image: studyImg,
      alt: 'Students studying matriculation coursework at St. Annes',
      description: 'Comprehensive curriculum focused on strong foundational literacy, numeracy, science concepts, and language fluency, structured to nurture disciplined study habits.',
      tags: ['Matriculation Syllabus', 'Concept Clarity', 'Continuous Assessment'],
    },
    {
      id: 'classrooms',
      title: 'Spacious Classrooms',
      category: 'Learning Environment',
      image: classroomImg,
      alt: 'Bright and interactive classroom at St. Annes Matric School',
      description: 'Well-ventilated, well-lit classrooms equipped with modern seating and teaching aids designed to facilitate active student participation and attentive learning.',
      tags: ['Well Ventilated', 'Interactive Boards', 'Student-Centric Layout'],
    },
    {
      id: 'science-labs',
      title: 'Science Laboratories',
      category: 'Hands-on Learning',
      image: labsImg,
      alt: 'Science laboratory practicals at St. Annes Matric School',
      description: 'Equipped science laboratory providing practical demonstrations where students explore physics, chemistry, and biology through real observation and experiments.',
      tags: ['Practical Learning', 'Safety First', 'Guided Experiments'],
    },
    {
      id: 'library',
      title: 'Reading & Library Corner',
      category: 'Knowledge Hub',
      image: library,
      alt: 'Library books and reading zone',
      description: 'Curated collection of reference books, subject materials, fiction, and informative periodicals that foster a lifelong love for reading and independent research.',
      tags: ['Reference Books', 'Quiet Reading Space', 'General Knowledge'],
    },
    {
      id: 'sports',
      title: 'Sports & Physical Fitness',
      category: 'Physical Education',
      image: sportsImg,
      alt: 'Physical training and outdoor games at St. Annes Ponmeni',
      description: 'Spacious outdoor play areas and scheduled sports periods helping students stay fit, learn team spirit, develop agility, and embrace fair sportsmanship.',
      tags: ['Outdoor Games', 'Annual Sports Meet', 'Fitness & Health'],
    },
    {
      id: 'co-curricular',
      title: 'Co-Curricular & Exhibitions',
      category: 'Creativity & Culture',
      image: exhibitionImg,
      alt: 'School science and arts project exhibition',
      description: 'Regular science exhibitions, art contests, and festive cultural celebrations that give young learners an enthusiastic stage to express their innate creative talents.',
      tags: ['Science Exhibitions', 'Cultural Celebrations', 'Talent Discovery'],
    },
  ];

  const subjects = [
    {
      title: 'Languages & Communication',
      icon: <BookOpenIcon size={24} />,
      desc: 'Developing deep proficiency in Tamil and English with strong grammar foundations, extensive vocabulary, expressive reading, and confident public articulation.',
    },
    {
      title: 'Mathematics & Logic',
      icon: <TargetIcon size={24} />,
      desc: 'Building mental agility through foundational arithmetic, geometry, quantitative reasoning, and structured step-by-step problem-solving.',
    },
    {
      title: 'Science & Exploration',
      icon: <FlaskIcon size={24} />,
      desc: 'Nurturing scientific temperament across basic physics, chemistry, and biological sciences through observation, inquiry, and practical experiments.',
    },
    {
      title: 'Social Studies & World Awareness',
      icon: <GlobeIcon size={24} />,
      desc: 'Fostering historical understanding, geographical awareness, civic principles, and an appreciation of cultural diversity and environmental conservation.',
    },
    {
      title: 'Creative Arts & Expression',
      icon: <PaletteIcon size={24} />,
      desc: 'Encouraging self-expression through drawing, craftwork, music, and stage events that build aesthetic sensitivity and creative confidence.',
    },
    {
      title: 'Physical Well-being & Health',
      icon: <TrophyIcon size={24} />,
      desc: 'Promoting lifelong fitness, coordination, sportsmanship, and personal wellness through regular drill, physical education, and outdoor sports.',
    },
  ];

  const futureSkills = [
    {
      title: 'Clear Communication',
      icon: <MessageSquareIcon size={22} />,
      desc: 'Articulating thoughts respectfully, listening actively, and sharing ideas clearly in writing and speech.',
    },
    {
      title: 'Critical Thinking',
      icon: <LightbulbIcon size={22} />,
      desc: 'Evaluating questions logically, analyzing cause and effect, and forming reasoned conclusions.',
    },
    {
      title: 'Creativity & Innovation',
      icon: <PaletteIcon size={22} />,
      desc: 'Approaching challenges from fresh angles, generating ideas, and expressing individuality.',
    },
    {
      title: 'Constructive Collaboration',
      icon: <UsersIcon size={22} />,
      desc: 'Cooperating smoothly in diverse groups, dividing tasks responsibly, and celebrating shared success.',
    },
    {
      title: 'Self-Confidence',
      icon: <TrophyIcon size={22} />,
      desc: 'Believing in personal capability, standing up for positive values, and speaking before peers without hesitation.',
    },
    {
      title: 'Personal Responsibility',
      icon: <ShieldCheckIcon size={22} />,
      desc: 'Taking ownership of homework, punctuality, respecting school guidelines, and caring for others.',
    },
  ];

  return (
    <section id="academics" className="section-padding academics-section" aria-label="Academics and School Facilities">
      <div className="container">
        {/* -------------------------------------------------------------
            A. SECTION HEADER & ACADEMIC DEVELOPMENT
        ------------------------------------------------------------- */}
        <div className="section-header reveal">
          <span className="section-badge">Academic & Facilities</span>
          <h2 className="section-title">Comprehensive Learning & Modern Facilities</h2>
          <p className="section-subtitle">
            Explore our educational programs and thoughtfully organized school facilities designed to provide every learner with an enriching school journey.
          </p>
        </div>

        {/* -------------------------------------------------------------
            B. LEARNING ACROSS SUBJECTS (6 CARDS)
        ------------------------------------------------------------- */}
        <div className="content-block-spaced">
          <div className="section-header reveal">
            <span className="section-badge">Core Disciplines</span>
            <h2 className="section-title">Learning Across Key Subject Areas</h2>
            <p className="section-subtitle">
              Our curriculum fosters deep foundational understanding across all core disciplines, ensuring students grasp concepts thoroughly before advancing.
            </p>
          </div>

          <div className="content-grid-3">
            {subjects.map((sub, idx) => (
              <div key={sub.title} className={`card info-feature-card reveal delay-${(idx % 3) + 1}`}>
                <div className="card-icon-wrap">
                  {sub.icon}
                </div>
                <h3>{sub.title}</h3>
                <p>{sub.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* -------------------------------------------------------------
            C. LEARNING BEYOND TEXTBOOKS
        ------------------------------------------------------------- */}
        <div className="content-block-spaced">
          <div className="media-split-box">
            <div className="reveal-left">
              <span className="section-badge">Beyond the Classroom</span>
              <h2 className="section-title">Learning Beyond Textbooks</h2>
              <p style={{ marginBottom: '1.25rem', fontSize: '1.05rem', lineHeight: '1.7' }}>
                We believe that the most meaningful learning takes place when theory connects with active observation and practical experience. Our teachers encourage students to relate classroom topics to everyday surroundings.
              </p>
              <p style={{ marginBottom: '1.5rem', lineHeight: '1.7' }}>
                Through guided science demonstrations, creative arts, library research, and school exhibitions, students experience the joy of discovering answers firsthand, cultivating lasting intellectual curiosity that endures far beyond examinations.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                  <CheckCircleIcon size={18} style={{ color: 'var(--primary-blue)' }} />
                  <span>Hands-on science demonstrations and laboratory experiments</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                  <CheckCircleIcon size={18} style={{ color: 'var(--primary-blue)' }} />
                  <span>Interactive reading periods and library discovery</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                  <CheckCircleIcon size={18} style={{ color: 'var(--primary-blue)' }} />
                  <span>Art, craft, and science model exhibitions</span>
                </div>
              </div>
            </div>

            <div className="reveal-right">
              <img 
                src={exhibitionImg} 
                alt="Students exhibiting science and creative projects" 
                className="media-split-img"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* -------------------------------------------------------------
            D. STUDENT SKILLS FOR THE FUTURE (6 CARDS)
        ------------------------------------------------------------- */}
        <div className="content-block-spaced">
          <div className="section-header reveal">
            <span className="section-badge">Future Readiness</span>
            <h2 className="section-title">Essential Skills for Tomorrow</h2>
            <p className="section-subtitle">
              Alongside core subject knowledge, we intentionally cultivate life skills that prepare students to adapt, lead, and excel in a changing world.
            </p>
          </div>

          <div className="content-grid-3">
            {futureSkills.map((skill, idx) => (
              <div key={skill.title} className={`card info-feature-card reveal delay-${(idx % 3) + 1}`}>
                <div className="card-icon-wrap">
                  {skill.icon}
                </div>
                <h3>{skill.title}</h3>
                <p>{skill.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* -------------------------------------------------------------
            E. VERIFIED SCHOOL FACILITIES GRID
        ------------------------------------------------------------- */}
        <div className="content-block-spaced">
          <div className="section-header reveal">
            <span className="section-badge">Verified Campus Infrastructure</span>
            <h2 className="section-title">Our School Facilities</h2>
            <p className="section-subtitle">
              Carefully organized learning spaces and campus infrastructure that provide a supportive, well-maintained setting for academic work and student life.
            </p>
          </div>

          <div className="academics-grid">
            {verifiedFacilities.map((item, index) => (
              <div 
                key={item.id} 
                className={`facility-card reveal delay-${(index % 3) + 1}`}
              >
                <div className="facility-card-image-wrap">
                  <img 
                    src={item.image} 
                    alt={item.alt} 
                    className="facility-card-img"
                    loading="lazy"
                  />
                  <span className="facility-category-badge">{item.category}</span>
                </div>
                <div className="facility-card-body">
                  <h3 className="facility-card-title">{item.title}</h3>
                  <p className="facility-card-desc">{item.description}</p>
                  <div className="facility-highlights-list">
                    {item.tags.map((tag) => (
                      <span key={tag} className="facility-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* -------------------------------------------------------------
            F & G. SAFE ENVIRONMENT & BUILDING GOOD HABITS
        ------------------------------------------------------------- */}
        <div className="content-block-spaced">
          <div className="content-grid-2">
            <div className="card" style={{ padding: '2.25rem', borderLeft: '4px solid var(--primary-blue)' }}>
              <div className="reveal">
                <span className="section-badge">Safe Campus</span>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '0.85rem' }}>A Safe & Respectful Environment</h3>
                <p style={{ fontSize: '0.975rem', lineHeight: '1.65', marginBottom: '1rem' }}>
                  Safety, cleanliness, and mutual courtesy are central to our daily routines. We maintain well-monitored campus premises, tidy classrooms, and clear expectations for responsible student conduct.
                </p>
                <p style={{ fontSize: '0.975rem', lineHeight: '1.65' }}>
                  Teachers and staff supervise students during class intervals, sports periods, and dismissals, fostering an atmosphere of trust, security, and orderly care.
                </p>
              </div>
            </div>

            <div className="card" style={{ padding: '2.25rem', borderLeft: '4px solid #10B981' }}>
              <div className="reveal">
                <span className="section-badge" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10B981', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
                  Character & Habits
                </span>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '0.85rem' }}>Building Lifelong Habits</h3>
                <p style={{ fontSize: '0.975rem', lineHeight: '1.65', marginBottom: '1rem' }}>
                  Success in academics and character relies on steady, daily habits. From morning assembly to evening dismissal, we emphasize punctuality, organized notebooks, daily reading, and neat personal presentation.
                </p>
                <p style={{ fontSize: '0.975rem', lineHeight: '1.65' }}>
                  By learning to organize their time, respect deadlines, and keep workspaces clean, students develop self-discipline that benefits them throughout life.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* -------------------------------------------------------------
            H. SUPPORTING INDIVIDUAL GROWTH
        ------------------------------------------------------------- */}
        <div className="content-block-spaced">
          <div className="section-header reveal">
            <span className="section-badge">Encouraging Progress</span>
            <h2 className="section-title">Supporting Individual Growth & Effort</h2>
            <p className="section-subtitle">
              Every child has strengths to celebrate and challenges to overcome. We believe consistent encouragement unlocks potential.
            </p>
          </div>

          <div className="content-grid-3">
            <div className="card info-feature-card reveal delay-1">
              <div className="card-icon-wrap">
                <HeartHandshakeIcon size={22} />
              </div>
              <h4>Constructive Feedback</h4>
              <p>Teachers offer supportive guidance, helping students understand errors constructively and improve with clear next steps.</p>
            </div>

            <div className="card info-feature-card reveal delay-2">
              <div className="card-icon-wrap">
                <TrophyIcon size={22} />
              </div>
              <h4>Valuing Effort & Grit</h4>
              <p>We honor sustained effort, persistence, and positive attitudes just as warmly as final marks and exam scores.</p>
            </div>

            <div className="card info-feature-card reveal delay-3">
              <div className="card-icon-wrap">
                <ShieldCheckIcon size={22} />
              </div>
              <h4>Confidence Through Practice</h4>
              <p>Regular practice, revision, and gradual mastery give students the assurance to tackle unfamiliar problems calmly.</p>
            </div>
          </div>
        </div>

        {/* -------------------------------------------------------------
            I. CALL TO ACTION BANNER
        ------------------------------------------------------------- */}
        <div className="section-cta-banner reveal">
          <span className="section-badge">Admissions Desk</span>
          <h3>Ready to Learn More About St. Annes?</h3>
          <p>
            Explore our vibrant photo gallery to see daily moments from our campus, or submit an admission enquiry to connect directly with our office.
          </p>
          <div className="cta-buttons-row">
            <button 
              type="button" 
              className="btn btn-primary"
              onClick={onOpenAdmissionModal}
            >
              <span>Submit Admission Enquiry</span>
              <ArrowRightIcon size={18} />
            </button>
            <a href="#gallery" className="btn btn-secondary">
              View School Gallery
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
