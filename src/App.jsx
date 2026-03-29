import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Download, Mail, Linkedin, Github, ExternalLink, ChevronDown, Moon, Sun } from 'lucide-react';

// --- IMPORTS FOR 3D ANIMATION ---
import { Canvas, useFrame } from '@react-three/fiber';
import { Sparkles, Stars } from '@react-three/drei';

// ─── LIGHT MODE PALETTE (injected as a style tag) ────────────────────────────
// bg:        #f0f2f7  (cool blue-tinted off-white — calm, not blinding)
// surface:   #e4e8f2  (slightly deeper cool surface for cards)
// inner:     #ffffff  (pure white for inner cards — nice contrast layer)
// text-main: #1a1f36  (deep navy-slate — rich, not harsh black)
// text-sub:  #4a5280  (muted indigo-slate for secondary text)
// border:    #c8cfe8  (soft indigo-tinted border)
// ─────────────────────────────────────────────────────────────────────────────

const LIGHT_STYLES = `
  .lm-bg       { background-color: #f0f2f7; }
  .lm-nav      { background-color: rgba(240,242,247,0.96); border-color: #c8cfe8; }
  .lm-card     { background-color: #e4e8f2; }
  .lm-inner    { background-color: #ffffff; }
  .lm-text     { color: #1a1f36; }
  .lm-sub      { color: #4a5280; }
  .lm-border   { border-color: #c8cfe8; }
  .lm-input    { background-color: #ffffff; border-color: #c8cfe8; color: #1a1f36; }
  .lm-input::placeholder { color: #8892b8; }
  .lm-social   { background-color: rgba(200,207,232,0.7); }
  .lm-social:hover { background-color: rgba(180,190,220,0.9); }
  .lm-mobile-btn { color: #1a1f36; }
  .lm-mobile-btn:hover { background-color: #d8ddf0; }
  .lm-footer-social { background-color: #d0d6ee; }
  .lm-footer-social:hover { background-color: #b8c0e0; }
  .lm-nav-link { color: #2d3561; }
  .lm-nav-link:hover { color: #6366f1; }
  .lm-chevron  { color: #4a5280; }
  .lm-tag      { color: #2d3561; }
  .lm-project-code { background-color: #ffffff; color: #1a1f36; }
  .lm-project-code:hover { background-color: #e4e8f2; }
`;

// --- 3D COMPONENT: DIGITAL PARTICLES ---
const CodingBackground = ({ isDarkMode }) => {
  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Sparkles
        count={200}
        scale={12}
        size={3}
        speed={0.4}
        opacity={0.7}
        color={isDarkMode ? "#38bdf8" : "#7c3aed"}
      />
      <Sparkles
        count={1500}
        scale={20}
        size={1}
        speed={0.2}
        opacity={0.3}
        color={isDarkMode ? "#ffffff" : "#64748b"}
      />
    </group>
  );
};

// --- BACKGROUND WRAPPER ---
const BackgroundAnimation = ({ isDarkMode }) => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <CodingBackground isDarkMode={isDarkMode} />
      </Canvas>
    </div>
  );
};

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState('home');

  // -------------------------
  // Typing animation (roles)
  // -------------------------
  const roles = [
    "Business Analyst",
    "Product Owner",
    "Product Analyst",
    "Process Analyst",
    "Agile BA",
  ];

  const [currentRole, setCurrentRole] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!isDeleting && subIndex === roles[roleIndex].length + 1) {
      const t = setTimeout(() => setIsDeleting(true), 900);
      return () => clearTimeout(t);
    }
    if (isDeleting && subIndex === 0) {
      setIsDeleting(false);
      setRoleIndex((r) => (r + 1) % roles.length);
      return;
    }
    const speed = isDeleting ? 40 : 110;
    const timeout = setTimeout(() => {
      setSubIndex((s) => s + (isDeleting ? -1 : 1));
    }, speed);
    return () => clearTimeout(timeout);
  }, [subIndex, roleIndex, isDeleting]);

  useEffect(() => {
    setCurrentRole(roles[roleIndex].substring(0, subIndex));
  }, [subIndex, roleIndex]);

  // -------------------------
  // Active section on scroll
  // -------------------------
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'resume', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  // Skills data
  const skillsCategories = [
    {
      title: "Business Analysis",
      skills: ["Requirements Gathering", "User Stories", "Acceptance Criteria", "Process Mapping", "Workflow Diagrams", "Use Case Modeling"]
    },
    {
      title: "Agile & Methodologies",
      skills: ["Agile", "Scrum", "SDLC", "Sprint Planning", "Backlog Refinement", "Daily Stand-ups"]
    },
    {
      title: "Data & Analytics",
      skills: ["SQL", "Python (Data Analysis)", "MS Excel (Pivot Tables, VLOOKUP)"]
    },
    {
      title: "Data Visualization",
      skills: ["Power BI"]
    },
    {
      title: "Technical & Integration",
      skills: ["JSON", "XML"]
    },
    {
      title: "Tools",
      skills: ["JIRA", "Confluence", "Figma", "Draw.io", "Eraser.io", "MS Office Suite"]
    },
    {
      title: "Soft Skills",
      skills: ["Stakeholder Communication", "Problem Solving", "Analytical Thinking", "Attention to Detail", "Time Management", "Collaboration", "Adaptability"]
    }
  ];

  // Projects data
  const projects = [
    {
      title: "Customer Churn Analysis & Retention Strategy",
      overview: "Developed comprehensive analytics dashboard to track sales metrics, customer behavior, and inventory management for an e-commerce platform.",
      tools: ["Power BI", "SQL", "Excel", "Python"],
      github: "#",
      demo: "#"
    },
    {
      title: "E-Commerce-Sales-Dashboard",
      overview: "Conducted end-to-end analysis of business processes, identified bottlenecks, and proposed solutions resulting in improved workflow efficiency.",
      tools: ["Excel", "Power BI", "SQL"],
      github: "#",
      demo: "#"
    }
  ];

  // -------------------------
  // Neon, cursor-reactive shadow for profile image
  // -------------------------
  const profileRef = useRef(null);

  const handleMouseMove = (e) => {
    const el = profileRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const dx = (x - cx) / cx;
    const dy = (y - cy) / cy;
    const rotateX = (-dy) * 8;
    const rotateY = dx * 8;
    const shadowOffsetX = (-dx) * 20;
    const shadowOffsetY = (-dy) * 20;
    const neonBlue = 'rgba(59,130,246,0.85)';
    const neonPurple = 'rgba(139,92,246,0.7)';
    const boxShadow = `${shadowOffsetX}px ${shadowOffsetY}px 30px 6px ${neonBlue}, ${-shadowOffsetX}px ${-shadowOffsetY}px 60px 18px ${neonPurple}`;
    el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(8px)`;
    el.style.boxShadow = boxShadow;
    el.style.transition = 'transform 120ms ease, box-shadow 120ms ease';
  };

  const handleMouseLeave = () => {
    const el = profileRef.current;
    if (!el) return;
    el.style.transform = 'none';
    el.style.boxShadow = '';
    el.style.transition = 'transform 300ms ease, box-shadow 300ms ease';
  };

  return (
    <>
      {/* Inject light mode CSS palette */}
      <style>{LIGHT_STYLES}</style>

      <div
        className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-white' : 'lm-text'}`}
        style={!isDarkMode ? { backgroundColor: '#f0f2f7' } : {}}
      >
        {/* Navigation */}
        <nav
          className={`fixed top-0 w-full z-50 transition-all duration-300 ${
            isDarkMode
              ? 'bg-gray-900/95 backdrop-blur-md border-b border-gray-800'
              : 'lm-nav backdrop-blur-md border-b'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                PrasannaBarge
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex space-x-8">
                {['Home', 'About', 'Skills', 'Experience', 'Projects', 'Resume', 'Contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className={`transition-colors duration-300 ${
                      activeSection === item.toLowerCase()
                        ? 'text-blue-500'
                        : isDarkMode
                          ? 'text-gray-300 hover:text-blue-500'
                          : 'lm-nav-link'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-blue-100'}`}
                >
                  {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className={isDarkMode ? 'md:hidden bg-gray-800' : 'md:hidden lm-card'}>
              <div className="px-2 pt-2 pb-3 space-y-1">
                {['Home', 'About', 'Skills', 'Experience', 'Projects', 'Resume', 'Contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
                      isDarkMode ? 'hover:bg-gray-700 text-gray-200' : 'lm-mobile-btn'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <section id="home" className="relative min-h-screen flex items-center justify-center px-4 pt-16 overflow-hidden">
          <BackgroundAnimation isDarkMode={isDarkMode} />

          <div className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-5xl md:text-7xl font-bold leading-tight h-20">
                {currentRole}
                <span className="border-r-4 border-blue-500 ml-1 animate-pulse" />
              </h1>
              <p className={`text-xl md:text-2xl ${isDarkMode ? 'text-gray-400' : 'lm-sub'}`}>
                Transforming data into actionable insights
              </p>
              <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'lm-text'}`}>
                Passionate about bridging the gap between business needs and technical solutions through analytical thinking and strategic problem-solving.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => scrollToSection('contact')}
                  className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105 text-white"
                >
                  Get In Touch
                </button>
                <button
                  onClick={() => scrollToSection('projects')}
                  className={`px-8 py-3 border-2 rounded-lg font-semibold transition-all duration-300 backdrop-blur-sm bg-opacity-20 ${
                    isDarkMode
                      ? 'border-gray-700 hover:border-blue-500 text-gray-200'
                      : 'lm-text hover:border-blue-500'
                  }`}
                  style={!isDarkMode ? { borderColor: '#c8cfe8' } : {}}
                >
                  View Work
                </button>
              </div>
              <div className="flex space-x-4 pt-4">
                <a
                  href="mailto:prasannabarge.dev@gmail.com"
                  className={`p-3 rounded-lg transition-colors ${isDarkMode ? 'bg-gray-800/80 hover:bg-gray-700' : 'lm-social'}`}
                >
                  <Mail size={24} />
                </a>
                <a
                  href="https://www.linkedin.com/in/prasanna-barge--/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-lg transition-colors ${isDarkMode ? 'bg-gray-800/80 hover:bg-gray-700' : 'lm-social'}`}
                >
                  <Linkedin size={24} />
                </a>
                <a
                  href="https://github.com/prasannabarge"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-lg transition-colors ${isDarkMode ? 'bg-gray-800/80 hover:bg-gray-700' : 'lm-social'}`}
                >
                  <Github size={24} />
                </a>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-2xl opacity-30 animate-pulse"></div>
                <div
                  ref={profileRef}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  style={{ transition: 'transform 0.15s ease, box-shadow 0.15s ease', willChange: 'transform, box-shadow' }}
                  className={`relative w-80 h-80 rounded-full border-4 shadow-2xl overflow-hidden cursor-pointer ${
                    isDarkMode ? 'border-gray-800' : 'border-white'
                  }`}
                >
                  <img
                    src="/PrasannaBarge.jpg"
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
            <ChevronDown size={32} className={isDarkMode ? 'text-gray-400' : 'lm-sub'} />
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="min-h-screen flex items-center px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">About Me</h2>
            <div
              className={`rounded-2xl p-8 md:p-12 space-y-6 shadow-xl ${isDarkMode ? 'bg-gray-800' : 'lm-card'}`}
              style={!isDarkMode ? { boxShadow: '0 8px 32px rgba(99,102,241,0.10), 0 2px 8px rgba(0,0,0,0.07)' } : {}}
            >
              <p className={`text-lg leading-relaxed ${isDarkMode ? '' : 'lm-text'}`}>
                I am a passionate and detail-oriented Business Analyst with a strong foundation in translating business requirements into actionable solutions. My analytical mindset and problem-solving abilities enable me to bridge the gap between stakeholders and technical teams effectively.
              </p>
              <p className={`text-lg leading-relaxed ${isDarkMode ? '' : 'lm-text'}`}>
                With expertise in requirements gathering, process mapping, and data analysis, I am committed to driving business value through strategic insights and continuous improvement. I thrive in collaborative environments where I can contribute to product development and process optimization.
              </p>
              <p className={`text-lg leading-relaxed ${isDarkMode ? '' : 'lm-text'}`}>
                Currently building strong foundations in business analysis through real-world projects and continuous learning. I am actively seeking full-time opportunities where I can apply my analytical skills and contribute to meaningful business outcomes.
              </p>
              <div className="grid md:grid-cols-3 gap-6 pt-6">
                <div
                  className={`rounded-xl p-6 text-center ${isDarkMode ? 'bg-gray-700' : 'lm-inner'}`}
                  style={!isDarkMode ? { boxShadow: '0 2px 12px rgba(99,102,241,0.08)' } : {}}
                >
                  <div className="text-3xl font-bold text-blue-500 mb-2">Analysis</div>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'lm-sub'}`}>Data-Driven Decisions</p>
                </div>
                <div
                  className={`rounded-xl p-6 text-center ${isDarkMode ? 'bg-gray-700' : 'lm-inner'}`}
                  style={!isDarkMode ? { boxShadow: '0 2px 12px rgba(99,102,241,0.08)' } : {}}
                >
                  <div className="text-3xl font-bold text-purple-500 mb-2">Solutions</div>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'lm-sub'}`}>Strategic Problem Solving</p>
                </div>
                <div
                  className={`rounded-xl p-6 text-center ${isDarkMode ? 'bg-gray-700' : 'lm-inner'}`}
                  style={!isDarkMode ? { boxShadow: '0 2px 12px rgba(99,102,241,0.08)' } : {}}
                >
                  <div className="text-3xl font-bold text-green-500 mb-2">Growth</div>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'lm-sub'}`}>Continuous Learning</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="min-h-screen flex items-center px-4 py-20">
          <div className="max-w-7xl mx-auto w-full">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Skills & Expertise</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skillsCategories.map((category, idx) => (
                <div
                  key={idx}
                  className={`rounded-xl p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${isDarkMode ? 'bg-gray-800' : 'lm-card'}`}
                  style={!isDarkMode ? { boxShadow: '0 4px 16px rgba(99,102,241,0.09)' } : {}}
                >
                  <h3 className="text-xl font-bold mb-4 text-blue-500">{category.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIdx) => (
                      <span
                        key={skillIdx}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${isDarkMode ? 'bg-gray-700 text-gray-200' : ''}`}
                        style={!isDarkMode ? { color: '#2d3561', backgroundColor: '#fff', boxShadow: '0 1px 4px rgba(99,102,241,0.10)' } : {}}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="min-h-screen flex items-center px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Experience</h2>
            <div
              className={`rounded-2xl p-12 ${isDarkMode ? 'bg-gray-800' : 'lm-card'}`}
              style={!isDarkMode ? { boxShadow: '0 8px 32px rgba(99,102,241,0.10)' } : {}}
            >
              <div className="mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl">🚀</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">Ready to Launch My Career</h3>
                <p className={`text-lg mb-6 ${isDarkMode ? 'text-gray-400' : 'lm-sub'}`}>
                  Currently seeking full-time Business Analyst opportunities where I can contribute to impactful projects and grow professionally.
                </p>
                <p className={isDarkMode ? 'text-gray-400' : 'lm-sub'}>
                  Open to internships, projects, and training roles that will allow me to apply my analytical skills and learn from experienced professionals.
                </p>
              </div>
              <div
                className="mt-8 pt-8 border-t"
                style={!isDarkMode ? { borderColor: '#c8cfe8' } : { borderColor: '#374151' }}
              >
                <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'lm-sub'}`}>
                  • Add your experience here as you gain professional roles •
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="min-h-screen flex items-center px-4 py-20">
          <div className="max-w-7xl mx-auto w-full">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Projects</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project, idx) => (
                <div
                  key={idx}
                  className={`rounded-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 ${isDarkMode ? 'bg-gray-800' : 'lm-card'}`}
                  style={!isDarkMode ? { boxShadow: '0 4px 20px rgba(99,102,241,0.10)' } : {}}
                >
                  <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                  <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'lm-sub'}`}>
                    {project.overview}
                  </p>
                  <div className="mb-6">
                    <h4 className={`text-sm font-semibold mb-2 ${isDarkMode ? 'text-gray-400' : 'lm-sub'}`}>Tools Used:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tools.map((tool, toolIdx) => (
                        <span
                          key={toolIdx}
                          className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-full text-sm border border-blue-500/30"
                          style={!isDarkMode ? { color: '#2d3561', fontWeight: 500 } : {}}
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <a
                      href={project.github}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                        isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' : 'lm-project-code'
                      }`}
                      style={!isDarkMode ? { backgroundColor: '#fff', boxShadow: '0 1px 4px rgba(99,102,241,0.10)' } : {}}
                    >
                      <Github size={18} />
                      <span>Code</span>
                    </a>
                    <a
                      href={project.demo}
                      className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:shadow-lg transition-all text-white"
                    >
                      <ExternalLink size={18} />
                      <span>Demo</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
            <p className={`text-center mt-8 ${isDarkMode ? 'text-gray-500' : 'lm-sub'}`}>More projects coming soon...</p>
          </div>
        </section>

        {/* Resume Section */}
        <section id="resume" className="min-h-screen flex items-center px-4 py-20">
          <div className="max-w-4xl mx-auto text-center w-full">
            <h2 className="text-4xl md:text-5xl font-bold mb-12">Resume</h2>
            <div
              className={`rounded-2xl p-12 ${isDarkMode ? 'bg-gray-800' : 'lm-card'}`}
              style={!isDarkMode ? { boxShadow: '0 8px 32px rgba(99,102,241,0.10)' } : {}}
            >
              <div className="mb-8">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Download size={40} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Download My Resume</h3>
                <p className={`mb-8 ${isDarkMode ? 'text-gray-400' : 'lm-sub'}`}>
                  Get a comprehensive overview of my skills, education, and projects.
                </p>
              </div>
              <button
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = '/assets/resume/Prasanna_Resume.pdf';
                  link.download = 'Prasanna_Resume.pdf';
                  link.click();
                }}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105 inline-flex items-center space-x-2 text-white"
              >
                <Download size={20} />
                <span>Download Resume</span>
              </button>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="min-h-screen flex items-center px-4 py-20">
          <div className="max-w-4xl mx-auto w-full">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Get In Touch</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold mb-6">Let's Connect</h3>
                <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'lm-sub'}`}>
                  I'm always open to discussing new opportunities, projects, or just having a conversation about business analysis and technology.
                </p>

                <div className="space-y-4">
                  <a
                    href="mailto:prasannabarge.dev@gmail.com"
                    className={`flex items-center space-x-4 p-4 rounded-lg transition-colors ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'lm-card hover:brightness-95'}`}
                    style={!isDarkMode ? { boxShadow: '0 2px 8px rgba(99,102,241,0.08)' } : {}}
                  >
                    <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                      <Mail size={24} className="text-white" />
                    </div>
                    <div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'lm-sub'}`}>Email</p>
                      <p className="font-semibold">prasannabarge.dev@gmail.com</p>
                    </div>
                  </a>

                  <a
                    href="https://www.linkedin.com/in/prasanna-barge--/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center space-x-4 p-4 rounded-lg transition-colors ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'lm-card hover:brightness-95'}`}
                    style={!isDarkMode ? { boxShadow: '0 2px 8px rgba(99,102,241,0.08)' } : {}}
                  >
                    <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                      <Linkedin size={24} className="text-white" />
                    </div>
                    <div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'lm-sub'}`}>LinkedIn</p>
                      <p className="font-semibold">Connect with me</p>
                    </div>
                  </a>

                  <a
                    href="https://github.com/prasannabarge"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center space-x-4 p-4 rounded-lg transition-colors ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'lm-card hover:brightness-95'}`}
                    style={!isDarkMode ? { boxShadow: '0 2px 8px rgba(99,102,241,0.08)' } : {}}
                  >
                    <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                      <Github size={24} className="text-white" />
                    </div>
                    <div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'lm-sub'}`}>GitHub</p>
                      <p className="font-semibold">View my projects</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Contact Form */}
              <div
                className={`rounded-xl p-8 ${isDarkMode ? 'bg-gray-800' : 'lm-card'}`}
                style={!isDarkMode ? { boxShadow: '0 4px 20px rgba(99,102,241,0.10)' } : {}}
              >
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Name</label>
                    <input
                      type="text"
                      className={`w-full px-4 py-3 rounded-lg border focus:border-blue-500 focus:outline-none transition-colors ${
                        isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'lm-input border'
                      }`}
                      style={!isDarkMode ? { borderColor: '#c8cfe8' } : {}}
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Email</label>
                    <input
                      type="email"
                      className={`w-full px-4 py-3 rounded-lg border focus:border-blue-500 focus:outline-none transition-colors ${
                        isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'lm-input border'
                      }`}
                      style={!isDarkMode ? { borderColor: '#c8cfe8' } : {}}
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Message</label>
                    <textarea
                      rows="4"
                      className={`w-full px-4 py-3 rounded-lg border focus:border-blue-500 focus:outline-none transition-colors ${
                        isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'lm-input border'
                      }`}
                      style={!isDarkMode ? { borderColor: '#c8cfe8' } : {}}
                      placeholder="Your message..."
                    ></textarea>
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      alert('Thank you for your message! This is a demo form.');
                    }}
                    className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 text-white"
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer
          className={`py-8 ${isDarkMode ? 'bg-gray-800 border-t border-gray-700' : 'lm-card border-t'}`}
          style={!isDarkMode ? { borderColor: '#c8cfe8' } : {}}
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  Business Analyst Portfolio
                </h3>
                <p className={isDarkMode ? 'text-gray-400' : 'lm-sub'}>
                  Transforming data into actionable insights
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <div className="space-y-2">
                  {['About', 'Skills', 'Projects', 'Contact'].map((item) => (
                    <button
                      key={item}
                      onClick={() => scrollToSection(item.toLowerCase())}
                      className={`block transition-colors hover:text-blue-500 ${isDarkMode ? 'text-gray-400' : 'lm-sub'}`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Connect</h4>
                <div className="flex space-x-4">
                  <a
                    href="mailto:prasannabarge.dev@gmail.com"
                    className={`p-3 rounded-lg transition-colors ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'lm-footer-social'}`}
                  >
                    <Mail size={20} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/prasanna-barge--/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-lg transition-colors ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'lm-footer-social'}`}
                  >
                    <Linkedin size={20} />
                  </a>
                  <a
                    href="https://github.com/prasannabarge"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-lg transition-colors ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'lm-footer-social'}`}
                  >
                    <Github size={20} />
                  </a>
                </div>
              </div>
            </div>
            <div
              className="text-center pt-8 border-t"
              style={!isDarkMode ? { borderColor: '#c8cfe8' } : { borderColor: '#374151' }}
            >
              <p className={isDarkMode ? 'text-gray-400' : 'lm-sub'}>
                © 2026 All rights reserved. Built with React & Tailwind CSS
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default App;