import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Menu, X, Github, Linkedin, ExternalLink, 
  Terminal, ShieldCheck, Cpu, Layout, Layers 
} from 'lucide-react';

function App() {
  const [projects, setProjects] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Relative path works on both localhost (via proxy) and VPS (via Nginx)
    axios.get('/api/projects/')
      .then(res => setProjects(res.data))
      .catch(err => console.error("API Error:", err));
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      
      {/* --- 1. TECH STACK BANNER --- */}
      <div className="bg-slate-900 border-b border-slate-800 py-2 w-full">
        <div className="container mx-auto px-6 flex justify-center items-center space-x-4 text-[10px] md:text-xs font-bold tracking-widest text-slate-400 uppercase">
          <span className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-slate-300">System Status: Online</span>
          </span>
          <span className="hidden md:inline text-slate-700">•</span>
          <span>Stack: Django + React + Tailwind + PostgreSQL</span>
          <span className="hidden md:inline text-slate-700">•</span>
          <span>Deployed via Gunicorn & Nginx</span>
        </div>
      </div>

      {/* --- 2. HEADER --- */}
      <header className="sticky top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-slate-100">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="bg-slate-900 text-white p-1.5 rounded-lg">
              <Terminal size={20} />
            </div>
            <span className="font-bold text-xl tracking-tighter uppercase">Kierandev.com</span>
          </div>
          
          <nav className="hidden md:flex space-x-8 font-medium text-sm">
            <button onClick={() => scrollToSection('about')} className="hover:text-blue-600 transition-colors uppercase tracking-wider">About</button>
            <button onClick={() => scrollToSection('projects')} className="hover:text-blue-600 transition-colors uppercase tracking-wider">Projects</button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-blue-600 transition-colors uppercase tracking-wider">Contact</button>
          </nav>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-slate-900">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Slide-out */}
        <div className={`fixed inset-y-0 right-0 w-64 bg-slate-900 text-white transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out md:hidden shadow-2xl z-[60]`}>
          <div className="flex flex-col p-12 space-y-8 text-lg font-semibold pt-20">
            <button onClick={() => scrollToSection('about')} className="text-left">About</button>
            <button onClick={() => scrollToSection('projects')} className="text-left">Projects</button>
            <button onClick={() => scrollToSection('contact')} className="text-left">Contact</button>
          </div>
        </div>
      </header>

      {/* --- 3. HERO SECTION --- */}
      <section id="about" className="pt-20 pb-20 px-6">
        <div className="container mx-auto max-w-5xl text-center md:text-left">
          <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold mb-6">
            <ShieldCheck size={14} />
            <span>FULL STACK SOFTWARE ENGINEER - PYTHON</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
            Building robust, <span className="text-blue-600">scalable</span> software.
          </h1>
          <div className="text-lg md:text-xl text-slate-600 max-w-3xl leading-relaxed mb-10 space-y-4 mx-auto md:mx-0">
            <p><b>Software Engineer with 3 years industry experience.</b></p>
            <p>
              Independently designed and developed the test automation software for 
              <b> British Telecom's (BT)</b> call centres—securing government-grade telephony workflows.
            </p>
            <p>
              <b>Note:</b> Currently on a Working-Holiday Visa in Australia.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <a href="https://github.com/kieran123123" target="_blank" rel="noreferrer" className="flex items-center space-x-2 bg-slate-900 text-white px-6 py-3 rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
              <Github size={20} />
              <span>GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/kieran-smith-624433170/" target="_blank" rel="noreferrer" className="flex items-center space-x-2 border border-slate-200 px-6 py-3 rounded-xl hover:bg-slate-50 transition-all">
              <Linkedin size={20} className="text-blue-700" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </section>

      {/* --- 4. NEW SKILLS GRID (Includes Frontend) --- */}
      <section className="bg-slate-50 py-16 border-y border-slate-100 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Frontend Mastery */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-blue-300 transition-all">
              <Layout className="text-blue-600 mb-4" size={28} />
              <h3 className="font-bold text-base mb-2">Frontend Engineering</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                React.js, Tailwind CSS, and UX design. Focused on creating 
                responsive, performant, and accessible user interfaces.
              </p>
            </div>

            {/* Backend & Systems */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-blue-300 transition-all">
              <Cpu className="text-blue-600 mb-4" size={28} />
              <h3 className="font-bold text-base mb-2">Backend Architecture</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Python/Django, PostgreSQL, and REST API design. Experience in 
                optimizing SIP/RTP protocols for high-load systems.
              </p>
            </div>

            {/* DevOps & Cloud */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-blue-300 transition-all">
              <Layers className="text-blue-600 mb-4" size={28} />
              <h3 className="font-bold text-base mb-2">DevOps & Cloud</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Nginx, Gunicorn, Docker, AWS EC2 and Jenkins. Skilled in deploying 
                secure Linux environments and CI/CD pipelines.
              </p>
            </div>

            {/* Quality Assurance */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-blue-300 transition-all">
              <ShieldCheck className="text-blue-600 mb-4" size={28} />
              <h3 className="font-bold text-base mb-2">Automation</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Automated telephony testing, Wireshark packet analysis, and 
                defence-level reliability callflows for BT.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* --- NEW: EXPERIENCE TIMELINE --- */}
      <section id="experience" className="py-24 px-6 border-t border-slate-100">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Professional History</h2>
            <div className="h-1 w-20 bg-blue-600 mt-2 rounded-full"></div>
          </div>

          <div className="space-y-12">
            {/* Origin8tive */}
            <div className="relative pl-8 border-l-2 border-slate-200">
              <div className="absolute -left-[9px] top-0 w-4 h-4 bg-blue-600 rounded-full border-4 border-white"></div>
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900">Software Engineer</h3>
                  <p className="text-blue-600 font-bold">Origin8tive | Cheltenham, UK</p>
                </div>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1 md:mt-0">April 2024 — Oct 2025</p>
              </div>
              <p className="text-slate-600 leading-relaxed mb-4">
                Independently engineered a custom <b>SIP Adapter</b> for British Telecom’s (BT) GTAS ecosystem. 
                I was responsible for automating mission-critical testing for government-grade telephony workflows, 
                securing systems that manage millions in annual revenue.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Python', 'SIP/RTP', 'Wireshark', 'Docker', 'AWS'].map(tech => (
                  <span key={tech} className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-[10px] font-bold uppercase">{tech}</span>
                ))}
              </div>
            </div>

            {/* Noriker Power */}
            <div className="relative pl-8 border-l-2 border-slate-200">
              <div className="absolute -left-[9px] top-0 w-4 h-4 bg-slate-300 rounded-full border-4 border-white"></div>
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900">Junior Software Engineer</h3>
                  <p className="text-blue-600 font-bold">Noriker Power | Cheltenham, UK</p>
                </div>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1 md:mt-0">Nov 2022 — April 2024</p>
              </div>
              <p className="text-slate-600 leading-relaxed mb-4">
                Worked within an Agile team of 5 to develop industrial monitoring and control tools for 
                <b> National Grid</b> infrastructure. We built the software that allowed electrical engineers 
                to analyze and send real-time instructions to site-specific grid controllers and enabled 
                the trading team to execute power trades on the UK national market.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Django', 'VueJS', 'Tailwind', 'Linux (Sudo/Root)', 'Jenkins', 'PostgreSQL'].map(tech => (
                  <span key={tech} className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-[10px] font-bold uppercase">{tech}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 5. PROJECTS TABLE --- */}
      <section id="projects" className="py-24 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Project Registry</h2>
            <div className="h-1 w-20 bg-blue-600 mt-2 rounded-full"></div>
          </div>

          <div className="border border-slate-200 rounded-3xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left bg-white border-collapse">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-widest text-slate-400">System / Architecture</th>
                    <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-widest text-slate-400">Environment</th>
                    <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-right">Access</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {projects.map((p) => (
                    <tr key={p.id} className="hover:bg-blue-50/40 transition-colors group">
                      <td className="px-6 py-6">
                        <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{p.title}</div>
                        <div className="text-xs text-slate-500 mt-1 line-clamp-1">{p.description}</div>
                      </td>
                      <td className="px-6 py-6">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200 uppercase">
                          {p.technology}
                        </span>
                      </td>
                      <td className="px-6 py-6 text-right">
                        <div className="flex justify-end space-x-3">
                          {p.github_link && <a href={p.github_link} className="text-slate-400 hover:text-slate-900"><Github size={18} /></a>}
                          {p.live_link && <a href={p.live_link} className="text-slate-400 hover:text-blue-600"><ExternalLink size={18} /></a>}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {projects.length === 0 && (
                <div className="py-24 text-center flex flex-col items-center">
                  <div className="w-10 h-10 border-4 border-slate-100 border-t-blue-600 rounded-full animate-spin mb-4"></div>
                  <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Awaiting API Payload...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* --- 6. FOOTER --- */}
      <footer id="contact" className="bg-slate-900 text-white py-20 px-6">
        <div className="container mx-auto text-center max-w-2xl">
          <h2 className="text-3xl font-bold mb-6 italic">Ready to scale?</h2>
          <p><b>kieran-smith-@outlook.com</b></p>
          <p className="text-slate-400 mb-10 text-sm">Actively seeking roles in Software Engineering & DevOps.</p>
          <div className="pt-8 border-t border-slate-800 text-slate-500 text-[10px] uppercase tracking-widest font-bold">
            &copy; 2026 Kieran Dev • Full Stack Software Engineer
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;