import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Download, Mail, Linkedin, Github, ExternalLink, ChevronDown, Moon, Sun } from 'lucide-react';

// --- IMPORTS FOR 3D ANIMATION ---
import { Canvas, useFrame } from '@react-three/fiber';
import { Sparkles, Stars } from '@react-three/drei';

// --- 3D COMPONENT: DIGITAL PARTICLES ---
// This replaces the "bubble" with a "data field" effect
const CodingBackground = ({ isDarkMode }) => {
  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      {/* Primary Data Particles (Close & Fast) */}
      <Sparkles 
        count={200} 
        scale={12} 
        size={3} 
        speed={0.4} 
        opacity={0.7}
        color={isDarkMode ? "#38bdf8" : "#7c3aed"} // Cyan in Dark, Purple in Light
      />
      {/* Secondary Background Noise (Far & Slow) */}
      <Sparkles 
        count={1500} 
        scale={20} 
        size={1} 
        speed={0.2} 
        opacity={0.3}
        color={isDarkMode ? "#ffffff" : "#64748b"} // White dust in Dark, Gray in Light
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
    "Data Analyst",
    "Risk Analyst",
    "Process Analyst",
    "Agile BA",
  ];

  const [currentRole, setCurrentRole] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    // If finished typing the word, pause then start deleting
    if (!isDeleting && subIndex === roles[roleIndex].length + 1) {
      const t = setTimeout(() => setIsDeleting(true), 900);
      return () => clearTimeout(t);
    }

    // If finished deleting, move to next word
    if (isDeleting && subIndex === 0) {
      setIsDeleting(false);
      setRoleIndex((r) => (r + 1) % roles.length);
      return;
    }

    const speed = isDeleting ? 40 : 110; // typing speed
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
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isDarkMode ? 'bg-gray-900/95 backdrop-blur-md border-b border-gray-800' : 'bg-white/95 backdrop-blur-md border-b border-gray-200'}`}>
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
                  className={`transition-colors duration-300 hover:text-blue-500 ${activeSection === item.toLowerCase() ? 'text-blue-500' : ''}`}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <button
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={`md:hidden ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['Home', 'About', 'Skills', 'Experience', 'Projects', 'Resume', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full text-left px-3 py-2 rounded-md hover:bg-gray-700 transition-colors"
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
        
        {/* --- ADDED: 3D PARTICLE/CODING BACKGROUND --- */}
        <BackgroundAnimation isDarkMode={isDarkMode} />

        <div className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight h-20">
              {currentRole}
              <span className="border-r-4 border-blue-500 ml-1 animate-pulse" />
            </h1>
            <p className="text-xl md:text-2xl text-gray-400">
              Transforming data into actionable insights
            </p>
            <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Passionate about bridging the gap between business needs and technical solutions through analytical thinking and strategic problem-solving.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105"
              >
                Get In Touch
              </button>
              <button
                onClick={() => scrollToSection('projects')}
                className={`px-8 py-3 border-2 ${isDarkMode ? 'border-gray-700 hover:border-blue-500' : 'border-gray-300 hover:border-blue-500'} rounded-lg font-semibold transition-all duration-300 backdrop-blur-sm bg-opacity-20`}
              >
                View Work
              </button>
            </div>
            <div className="flex space-x-4 pt-4">
              <a href="mailto:prasannabarge.dev@gmail.com" className="p-3 rounded-lg bg-gray-800/80 hover:bg-gray-700 transition-colors backdrop-blur-md">
                <Mail size={24} />
              </a>
              <a href="https://www.linkedin.com/in/prasanna-barge--/" target="_blank" rel="noopener noreferrer" className="p-3 rounded-lg bg-gray-800/80 hover:bg-gray-700 transition-colors backdrop-blur-md">
                <Linkedin size={24} />
              </a>
              <a href="https://github.com/prasannabarge" target="_blank" rel="noopener noreferrer" className="p-3 rounded-lg bg-gray-800/80 hover:bg-gray-700 transition-colors backdrop-blur-md">
                <Github size={24} />
              </a>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-2xl opacity-30 animate-pulse"></div>

              {/* PROFILE IMAGE */}
              <div
                ref={profileRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ transition: 'transform 0.15s ease, box-shadow 0.15s ease', willChange: 'transform, box-shadow' }}
                className="relative w-80 h-80 rounded-full border-4 border-gray-800 shadow-2xl overflow-hidden cursor-pointer"
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
          <ChevronDown size={32} className="text-gray-400" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">About Me</h2>
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-2xl p-8 md:p-12 space-y-6 shadow-xl`}>
            <p className="text-lg leading-relaxed">
              I am a passionate and detail-oriented Business Analyst with a strong foundation in translating business requirements into actionable solutions. My analytical mindset and problem-solving abilities enable me to bridge the gap between stakeholders and technical teams effectively.
            </p>
            <p className="text-lg leading-relaxed">
              With expertise in requirements gathering, process mapping, and data analysis, I am committed to driving business value through strategic insights and continuous improvement. I thrive in collaborative environments where I can contribute to product development and process optimization.
            </p>
            <p className="text-lg leading-relaxed">
              Currently building strong foundations in business analysis through real-world projects and continuous learning. I am actively seeking full-time opportunities where I can apply my analytical skills and contribute to meaningful business outcomes.
            </p>
            <div className="grid md:grid-cols-3 gap-6 pt-6">
              <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-white'} rounded-xl p-6 text-center`}>
                <div className="text-3xl font-bold text-blue-500 mb-2">Analysis</div>
                <p className="text-sm text-gray-400">Data-Driven Decisions</p>
              </div>
              <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-white'} rounded-xl p-6 text-center`}>
                <div className="text-3xl font-bold text-purple-500 mb-2">Solutions</div>
                <p className="text-sm text-gray-400">Strategic Problem Solving</p>
              </div>
              <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-white'} rounded-xl p-6 text-center`}>
                <div className="text-3xl font-bold text-green-500 mb-2">Growth</div>
                <p className="text-sm text-gray-400">Continuous Learning</p>
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
                className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-xl p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
              >
                <h3 className="text-xl font-bold mb-4 text-blue-500">{category.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIdx) => (
                    <span
                      key={skillIdx}
                      className={`px-3 py-1 ${isDarkMode ? 'bg-gray-700' : 'bg-white'} rounded-full text-sm`}
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
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-2xl p-12`}>
            <div className="mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl">🚀</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Ready to Launch My Career</h3>
              <p className="text-lg text-gray-400 mb-6">
                Currently seeking full-time Business Analyst opportunities where I can contribute to impactful projects and grow professionally.
              </p>
              <p className="text-gray-400">
                Open to internships, projects, and training roles that will allow me to apply my analytical skills and learn from experienced professionals.
              </p>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-700">
              <p className="text-sm text-gray-500">
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
                className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:scale-105`}
              >
                <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {project.overview}
                </p>
                <div className="mb-6">
                  <h4 className="text-sm font-semibold mb-2 text-gray-400">Tools Used:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tools.map((tool, toolIdx) => (
                      <span
                        key={toolIdx}
                        className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-full text-sm border border-blue-500/30"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex space-x-4">
                  <a
                    href={project.github}
                    className={`flex items-center space-x-2 px-4 py-2 ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-200'} rounded-lg transition-colors`}
                  >
                    <Github size={18} />
                    <span>Code</span>
                  </a>
                  <a
                    href={project.demo}
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:shadow-lg transition-all"
                  >
                    <ExternalLink size={18} />
                    <span>Demo</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-500 mt-8">More projects coming soon...</p>
        </div>
      </section>

      {/* Resume Section */}
      <section id="resume" className="min-h-screen flex items-center px-4 py-20">
        <div className="max-w-4xl mx-auto text-center w-full">
          <h2 className="text-4xl md:text-5xl font-bold mb-12">Resume</h2>
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-2xl p-12`}>
            <div className="mb-8">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Download size={40} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Download My Resume</h3>
              <p className="text-gray-400 mb-8">
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
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105 inline-flex items-center space-x-2"
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
              <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                I'm always open to discussing new opportunities, projects, or just having a conversation about business analysis and technology.
              </p>

              <div className="space-y-4">
                <a href="mailto:prasannabarge.dev@gmail.com" className={`flex items-center space-x-4 p-4 ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'} rounded-lg transition-colors`}>
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p className="font-semibold">prasannabarge.dev@gmail.com</p>
                  </div>
                </a>

                <a href="https://www.linkedin.com/in/prasanna-barge--/" target="_blank" rel="noopener noreferrer" className={`flex items-center space-x-4 p-4 ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'} rounded-lg transition-colors`}>
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                    <Linkedin size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">LinkedIn</p>
                    <p className="font-semibold">Connect with me</p>
                  </div>
                </a>

                <a href="https://github.com/prasannabarge" target="_blank" rel="noopener noreferrer" className={`flex items-center space-x-4 p-4 ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'} rounded-lg transition-colors`}>
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                    <Github size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">GitHub</p>
                    <p className="font-semibold">View my projects</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-xl p-8`}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Name</label>
                  <input
                    type="text"
                    className={`w-full px-4 py-3 rounded-lg ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} border focus:border-blue-500 focus:outline-none transition-colors`}
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    className={`w-full px-4 py-3 rounded-lg ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} border focus:border-blue-500 focus:outline-none transition-colors`}
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Message</label>
                  <textarea
                    rows="4"
                    className={`w-full px-4 py-3 rounded-lg ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} border focus:border-blue-500 focus:outline-none transition-colors`}
                    placeholder="Your message..."
                  ></textarea>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Thank you for your message! This is a demo form.');
                  }}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`${isDarkMode ? 'bg-gray-800 border-t border-gray-700' : 'bg-gray-100 border-t border-gray-300'} py-8`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                Business Analyst Portfolio
              </h3>
              <p className="text-gray-400">
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
                    className="block text-gray-400 hover:text-blue-500 transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <a href="mailto:prasannabarge.dev@gmail.com" className="p-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">
                  <Mail size={20} />
                </a>
                <a href="https://www.linkedin.com/in/prasanna-barge--/" target="_blank" rel="noopener noreferrer" className="p-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">
                  <Linkedin size={20} />
                </a>
                <a href="https://github.com/prasannabarge" target="_blank" rel="noopener noreferrer" className="p-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">
                  <Github size={20} />
                </a>
              </div>
            </div>
          </div>
          <div className="text-center pt-8 border-t border-gray-700">
            <p className="text-gray-400">
              © 2026 All rights reserved. Built with React & Tailwind CSS
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;