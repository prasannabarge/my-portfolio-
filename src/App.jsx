import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import { ArrowUpRight, Check, Download, Github, Linkedin, Mail, Menu, Moon, Sun, X } from 'lucide-react';

const navItems = ['Home', 'About', 'Skills', 'Experience', 'Projects', 'Resume', 'Contact'];
const roles = ['Business Analyst', 'Product Owner', 'Product Analyst', 'Product Manager', 'Data Analyst'];

const skills = [
  ['Business analysis', 'Requirements Gathering', 'User Stories', 'Acceptance Criteria', 'Process Mapping', 'Workflow Diagrams', 'Use Case Modeling'],
  ['Agile practice', 'Agile', 'Scrum', 'SDLC', 'Sprint Planning', 'Backlog Refinement', 'Daily Stand-ups'],
  ['Data & analytics', 'SQL', 'Python (Data Analysis)', 'MS Excel (Pivot Tables, VLOOKUP)', 'Power BI'],
  ['Technical toolkit', 'JSON', 'XML', 'JIRA', 'Confluence', 'Figma', 'Draw.io', 'Eraser.io', 'MS Office Suite'],
  ['Ways of working', 'Stakeholder Communication', 'Problem Solving', 'Analytical Thinking', 'Attention to Detail', 'Time Management', 'Collaboration', 'Adaptability'],
];

const projects = [
  {
    number: '01',
    title: 'Customer Churn Analysis & Retention Strategy',
    description: 'Analyzed customer behavior and churn patterns to surface retention opportunities and translate findings into a clear, decision-ready business story.',
    tools: ['Power BI', 'SQL', 'Excel', 'Python'],
    kind: 'churn',
  },
  {
    number: '02',
    title: 'E-Commerce Sales Performance Dashboard',
    description: 'Built a focused view of sales performance and business KPIs, helping turn transactional data into a more readable monthly performance narrative.',
    tools: ['Excel', 'Power BI', 'SQL'],
    kind: 'sales',
  },
];

function BackgroundAnimation({ isDarkMode }) {
  return (
    <div className="hero-canvas" aria-hidden="true">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 5] }}>
        <Sparkles count={isDarkMode ? 450 : 260} scale={18} size={isDarkMode ? 1.5 : 1.2} speed={0.16} opacity={isDarkMode ? 0.36 : 0.18} color={isDarkMode ? '#8ac8ff' : '#5366cf'} />
      </Canvas>
    </div>
  );
}

function SectionHeading({ eyebrow, title, text }) {
  return (
    <header className="section-heading reveal">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </header>
  );
}

function ProjectPreview({ kind }) {
  return (
    <div className={`project-preview ${kind}`} aria-hidden="true">
      <div className="preview-top"><span /> <span /> <span /></div>
      <div className="preview-body">
        {kind === 'churn' ? (
          <>
            <div className="metric-row"><b>Retention view</b><strong>+ insights</strong></div>
            <div className="line-chart"><i /><i /><i /><i /><i /></div>
            <div className="preview-bars"><span /><span /><span /><span /></div>
          </>
        ) : (
          <>
            <div className="metric-row"><b>Sales overview</b><strong>KPIs</strong></div>
            <div className="sales-grid"><span /><span /><span /><span /><span /><span /></div>
            <div className="preview-bars"><span /><span /><span /><span /><span /></div>
          </>
        )}
      </div>
    </div>
  );
}

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [role, setRole] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    const fullRole = roles[roleIndex];
    const complete = role === fullRole;
    const empty = role.length === 0;
    const timer = window.setTimeout(() => {
      if (complete && !isDeleting) setIsDeleting(true);
      else if (empty && isDeleting) { setIsDeleting(false); setRoleIndex((index) => (index + 1) % roles.length); }
      else setRole(fullRole.slice(0, role.length + (isDeleting ? -1 : 1)));
    }, complete && !isDeleting ? 1300 : isDeleting ? 45 : 95);
    return () => window.clearTimeout(timer);
  }, [role, roleIndex, isDeleting]);

  useEffect(() => {
    const sections = navItems.map((item) => item.toLowerCase());
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && setActiveSection(entry.target.id)), { rootMargin: '-25% 0px -65% 0px' });
    sections.forEach((id) => { const section = document.getElementById(id); if (section) observer.observe(section); });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')), { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
    return () => revealObserver.disconnect();
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const subject = encodeURIComponent(`Portfolio enquiry from ${formState.name}`);
    const body = encodeURIComponent(`${formState.message}\n\nReply to: ${formState.email}`);
    window.location.href = `mailto:prasannabarge.dev@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className={isDarkMode ? 'site dark' : 'site light'}>
      <nav className="nav" aria-label="Primary navigation">
        <button className="wordmark" onClick={() => scrollToSection('home')} aria-label="Back to top"><span>PB</span> / Portfolio</button>
        <div className="desktop-nav">{navItems.map((item) => <button key={item} className={activeSection === item.toLowerCase() ? 'active' : ''} onClick={() => scrollToSection(item.toLowerCase())}>{item}</button>)}</div>
        <div className="nav-actions">
          <button className="icon-button" onClick={() => setIsDarkMode((value) => !value)} aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} theme`}>{isDarkMode ? <Sun size={18} /> : <Moon size={18} />}</button>
          <button className="icon-button menu-toggle" onClick={() => setIsMenuOpen((value) => !value)} aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}>{isMenuOpen ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
        {isMenuOpen && <div className="mobile-nav">{navItems.map((item) => <button key={item} onClick={() => scrollToSection(item.toLowerCase())}>{item}</button>)}</div>}
      </nav>

      <main>
        <section id="home" className="hero section-shell">
          <BackgroundAnimation isDarkMode={isDarkMode} />
          <div className="hero-copy reveal"><p className="eyebrow">Business analysis · Data · Product thinking</p><h1>I make sense of <em>complex</em> things.</h1><p className="hero-role"><span>Currently exploring as a </span><strong>{role}</strong><i /></p><p className="hero-intro">I bridge business needs and technical possibilities to turn questions into clear, actionable solutions.</p><div className="hero-actions"><button className="button primary" onClick={() => scrollToSection('contact')}>Let&apos;s talk <ArrowUpRight size={17} /></button><button className="text-link" onClick={() => scrollToSection('projects')}>Explore my work <ArrowUpRight size={16} /></button></div><div className="social-row"><a href="mailto:prasannabarge.dev@gmail.com" aria-label="Email Prasanna"><Mail size={17} /></a><a href="https://www.linkedin.com/in/prasanna-barge--/" target="_blank" rel="noreferrer" aria-label="LinkedIn profile"><Linkedin size={17} /></a><a href="https://github.com/prasannabarge" target="_blank" rel="noreferrer" aria-label="GitHub profile"><Github size={17} /></a></div></div>
          <div className="hero-portrait reveal"><div className="portrait-ring"><img src="/PrasannaBarge.jpg" alt="Portrait of Prasanna Barge" /></div><span className="portrait-note">Based in India<br /><b>Open to opportunities</b></span></div>
          <div className="scroll-note">Scroll to explore <span>↓</span></div>
        </section>

        <section id="about" className="section-shell about"><SectionHeading eyebrow="01 / About" title="The space between business and technology is where I work best." text="A curious, detail-oriented analyst with a practical bias toward clarity, collaboration, and useful outcomes." /><div className="about-layout"><div className="about-copy reveal"><p>I am a passionate Business Analyst focused on translating business requirements into actionable solutions. My analytical mindset helps me ask better questions, find the signal in data, and make complex work easier for teams to move forward.</p><p>Through requirements gathering, process mapping, and data analysis, I enjoy connecting stakeholder intent with technical execution. I am currently building on real-world projects and continuous learning while seeking opportunities to contribute to meaningful business outcomes.</p></div><div className="principles reveal"><div><span>01</span><b>Listen closely</b><p>Good solutions begin with the right questions.</p></div><div><span>02</span><b>Find the signal</b><p>Turn scattered information into a shared point of view.</p></div><div><span>03</span><b>Make it useful</b><p>Clarity matters when decisions need to happen.</p></div></div></div></section>

        <section id="skills" className="section-shell skills"><SectionHeading eyebrow="02 / Capabilities" title="A toolkit built for clarity." text="The methods, tools, and habits I bring to analytical and collaborative work." /><div className="skills-list">{skills.map(([title, ...items], index) => <article className="skill-group reveal" key={title}><div className="skill-index">0{index + 1}</div><h3>{title}</h3><div className="skill-chips">{items.map((item) => <span key={item}>{item}</span>)}</div></article>)}</div></section>

        <section id="experience" className="section-shell experience"><SectionHeading eyebrow="03 / Experience" title="Learning by doing." /><article className="experience-item reveal"><div className="experience-meta"><span className="eyebrow">Jan 2026 — Feb 2026</span><span>Remote · India</span></div><div className="experience-content"><p className="kicker">CodeAlpha</p><h3>Business Data Analyst Intern</h3><ul><li>Gathered and documented business requirements from stakeholders, translating objectives into structured data collection tasks; achieved 95%+ data accuracy using Python (BeautifulSoup, Scrapy).</li><li>Conducted exploratory data analysis (EDA) to surface key trends and data quality issues, enabling 30% faster insight generation and accelerating stakeholder decision-making cycles.</li><li>Designed interactive Power BI dashboards transforming raw data into business narratives, improving stakeholder comprehension of KPIs by 50% and supporting monthly performance reviews.</li></ul></div></article></section>

        <section id="projects" className="section-shell projects"><SectionHeading eyebrow="04 / Selected work" title="Questions, turned into useful views." text="A small selection of analytical work. Each project starts with a business question and ends with a clearer way to act." /><div className="project-list">{projects.map((project) => <article className="project-item reveal" key={project.title}><ProjectPreview kind={project.kind} /><div className="project-copy"><span className="project-number">{project.number}</span><h3>{project.title}</h3><p>{project.description}</p><div className="tool-list">{project.tools.map((tool) => <span key={tool}>{tool}</span>)}</div><span className="availability"><Check size={14} /> Case study available on request</span></div></article>)}</div></section>

        <section id="resume" className="section-shell resume"><div className="resume-panel reveal"><div><span className="eyebrow">05 / Resume</span><h2>Want the concise version?</h2><p>The resume PDF is not available in the current project assets. Reach out directly and I&apos;ll be happy to share the latest version.</p></div><a className="button secondary" href="mailto:prasannabarge.dev@gmail.com?subject=Resume%20request">Request resume <ArrowUpRight size={17} /></a></div></section>

        <section id="contact" className="section-shell contact"><SectionHeading eyebrow="06 / Contact" title="Let&apos;s make something clearer." text="Whether you have an opportunity, a project, or simply a good question, my inbox is open." /><div className="contact-layout"><div className="contact-details reveal"><a href="mailto:prasannabarge.dev@gmail.com"><Mail size={18} /> prasannabarge.dev@gmail.com <ArrowUpRight size={16} /></a><a href="https://www.linkedin.com/in/prasanna-barge--/" target="_blank" rel="noreferrer"><Linkedin size={18} /> LinkedIn <ArrowUpRight size={16} /></a><a href="https://github.com/prasannabarge" target="_blank" rel="noreferrer"><Github size={18} /> GitHub <ArrowUpRight size={16} /></a></div><form className="contact-form reveal" onSubmit={handleSubmit}><label>Name<input required value={formState.name} onChange={(e) => setFormState({ ...formState, name: e.target.value })} /></label><label>Email<input required type="email" value={formState.email} onChange={(e) => setFormState({ ...formState, email: e.target.value })} /></label><label>Message<textarea required rows="4" value={formState.message} onChange={(e) => setFormState({ ...formState, message: e.target.value })} /></label><button className="button primary" type="submit">Open email draft <ArrowUpRight size={17} /></button></form></div></section>
      </main>

      <footer className="footer"><span>© 2026 Prasanna Barge</span><span>Business analysis · Data · Product thinking</span><button onClick={() => scrollToSection('home')}>Back to top ↑</button></footer>
    </div>
  );
}

export default App;
