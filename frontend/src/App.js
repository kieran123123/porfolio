import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Menu, X, Github, Linkedin, Mail, ExternalLink, Terminal, ShieldCheck, Cpu } from 'lucide-react';

function App() {
  const [projects, setProjects] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Fetches from your Django local server
    axios.get('http://43.224.181.220:8000/api/projects/')
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
      
      {/* --- 1. TECH STACK BANNER (Top-most) --- */}
      <div className="bg-slate-900 border-b border-slate-800 py-2 w-full">
        <div className="container mx-auto px-6 flex justify-center items-center space-x-4 text-[10px] md:text-xs font-bold tracking-widest text-slate-400 uppercase">
          <span className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-slate-300">System Status: Online</span>
          </span>
          <span className="hidden md:inline text-slate-700">•</span>
          <span>Stack: Django + React + PostgreSQL</span>
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
            <span className="font-bold text-xl tracking-tighter uppercase">Kieran.Dev</span>
          </div>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8 font-medium text-sm">
            <button onClick={() => scrollToSection('about')} className="hover:text-blue-600 transition-colors uppercase tracking-wider">About</button>
            <button onClick={() => scrollToSection('projects')} className="hover:text-blue-600 transition-colors uppercase tracking-wider">Projects</button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-blue-600 transition-colors uppercase tracking-wider">Contact</button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-slate-900">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Slide-out Menu Overlay */}
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
        <div className="container mx-auto max-w-5xl">
          <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold mb-6">
            <ShieldCheck size={14} />
            <span>FULL STACK SOFTWARE ENGINEER - PYTHON</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
            Building secure, <span className="text-blue-600">automated</span> infrastructure.
          </h1>
          <div className="text-lg md:text-xl text-slate-600 max-w-3xl leading-relaxed mb-10 space-y-4">
            <p>
              <b>Software Engineer with 3 years industry experience.</b>
            </p>
            <p>
              Independently designed and developed the test automation software for 
              <b> British Telecom's (BT)</b> call centres—a solution generating millions 
              in revenue (GBP) and securing government-grade telephony workflows.
            </p>
            <p>
              Proficient in Python, CI/CD pipelines, and Docker, with a primary focus 
              on high-reliability Linux server environments.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="flex items-center space-x-2 bg-slate-900 text-white px-6 py-3 rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
              <Github size={20} />
              <span>GitHub</span>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="flex items-center space-x-2 border border-slate-200 px-6 py-3 rounded-xl hover:bg-slate-50 transition-all">
              <Linkedin size={20} className="text-blue-700" />
              <span>LinkedIn</span>
            </a>
            <a href="mailto:your.email@example.com" className="flex items-center space-x-2 border border-slate-200 px-6 py-3 rounded-xl hover:bg-slate-50 transition-all">
              <Mail size={20} className="text-red-500" />
              <span>Email</span>
            </a>
          </div>
        </div>
      </section>

      {/* --- 4. SKILLS GRID --- */}
      <section className="bg-slate-50 py-16 border-y border-slate-100 px-6">
        <div className="container mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <Cpu className="text-blue-600 mb-4" size={32} />
            <h3 className="font-bold text-lg mb-2">Development</h3>
            <p className="text-sm text-slate-500 leading-relaxed">Python, Node.js, Django, React, and SIP/RTP Protocol optimization for telecoms.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <ShieldCheck className="text-blue-600 mb-4" size={32} />
            <h3 className="font-bold text-lg mb-2">DevOps & Linux</h3>
            <p className="text-sm text-slate-500 leading-relaxed">Jenkins CI/CD, Docker orchestration, AWS EC2, Nginx, and Secure Linux Hosting.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <Terminal className="text-blue-600 mb-4" size={32} />
            <h3 className="font-bold text-lg mb-2">Automation</h3>
            <p className="text-sm text-slate-500 leading-relaxed">Automated telephony testing workflows, Wireshark analysis, and Jira automation scripts.</p>
          </div>
        </div>
      </section>

      {/* --- 5. PROJECTS TABLE --- */}
      <section id="projects" className="py-24 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Project Registry</h2>
            <div className="h-1 w-20 bg-blue-600 mt-2 rounded-full"></div>
            <p className="text-slate-500 mt-4">Live data synchronization with Django REST API</p>
          </div>

          <div className="border border-slate-200 rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/60">
            <div className="overflow-x-auto">
              <table className="w-full text-left bg-white border-collapse">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-slate-400">System / Architecture</th>
                    <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-slate-400">Environment</th>
                    <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-slate-400 text-right">Access</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {projects.map((p) => (
                    <tr key={p.id} className="hover:bg-blue-50/40 transition-colors group">
                      <td className="px-6 py-6">
                        <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{p.title}</div>
                        <div className="text-xs text-slate-500 mt-1 line-clamp-1 max-w-md">{p.description}</div>
                      </td>
                      <td className="px-6 py-6">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200 uppercase tracking-tight">
                          {p.technology}
                        </span>
                      </td>
                      <td className="px-6 py-6 text-right">
                        <div className="flex justify-end space-x-3">
                          {p.github_link && (
                            <a href={p.github_link} target="_blank" rel="noreferrer" className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                              <Github size={18} />
                            </a>
                          )}
                          {p.live_link && (
                            <a href={p.live_link} target="_blank" rel="noreferrer" className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
                              <ExternalLink size={18} />
                            </a>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {/* Empty / Loading State */}
              {projects.length === 0 && (
                <div className="py-24 text-center flex flex-col items-center">
                  <div className="w-12 h-12 border-4 border-slate-100 border-t-blue-600 rounded-full animate-spin mb-4"></div>
                  <p className="text-slate-400 font-medium tracking-tight uppercase text-xs">Awaiting API Payload...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* --- 6. FOOTER --- */}
      <footer id="contact" className="bg-slate-900 text-white py-24 px-6">
        <div className="container mx-auto text-center max-w-2xl">
          <h2 className="text-3xl font-bold mb-6">Ready to scale your next deployment?</h2>
          <p className="text-slate-400 mb-10 leading-relaxed">
            Actively seeking roles in Software Engineering, DevOps, or Linux Infrastructure. 
            Let's build something reliable.
          </p>
          
          <div className="flex justify-center space-x-6 mb-16">
            <a href="https://github.com" className="p-4 bg-slate-800 rounded-2xl hover:bg-blue-600 transition-all"><Github size={24} /></a>
            <a href="https://linkedin.com" className="p-4 bg-slate-800 rounded-2xl hover:bg-blue-600 transition-all"><Linkedin size={24} /></a>
            <a href="mailto:your.email@example.com" className="p-4 bg-slate-800 rounded-2xl hover:bg-blue-600 transition-all"><Mail size={24} /></a>
          </div>

          <div className="pt-8 border-t border-slate-800 text-slate-500 text-xs uppercase tracking-widest font-bold">
            &copy; 2026 Kieran Dev • Fully Decoupled Architecture
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;