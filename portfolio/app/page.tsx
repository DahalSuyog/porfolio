

export default function Home() {
  return (
    <>
      {/* TopNavBar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-3 w-[95%] max-w-6xl mx-auto bg-[#171c1d]/40 dark:bg-[#171c1d]/40 backdrop-blur-xl rounded-full mt-4 shadow-[0_20px_50px_rgba(0,229,255,0.05)] border border-white/5">
        <div className="text-xl font-black tracking-tighter text-slate-100 dark:text-slate-100 uppercase">
          Suyog.AI
        </div>
        <div className="hidden md:flex items-center gap-8 font-sans tracking-tight text-sm font-medium">
          <a className="text-cyan-400 font-bold border-b-2 border-cyan-400 pb-1" href="#about">
            Neural Labs
          </a>
          <a className="text-slate-400 hover:text-slate-100 transition-colors" href="#stack">
            Stack
          </a>
          <a className="text-slate-400 hover:text-slate-100 transition-colors" href="#archive">
            Archive
          </a>
          <a className="text-slate-400 hover:text-slate-100 transition-colors" href="#experience">
            History
          </a>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-slate-400 hover:text-cyan-300 transition-colors scale-95 active:scale-90 hidden sm:block">
            <span className="material-symbols-outlined text-[20px]">terminal</span>
          </button>
          <a href="mailto:sonofdahal@gmail.com" className="bg-primary text-on-primary px-6 py-2 rounded-full font-sans text-sm font-bold tracking-wider hover:brightness-125 transition-all duration-300 scale-95 active:scale-90">
            Contact Me
          </a>
        </div>
      </nav>

      <main className="flex-grow pt-32">
        {/* Hero Section */}
        <section className="relative min-h-[85vh] flex items-center tech-grid" id="about">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background pointer-events-none z-0"></div>
          <div className="w-full max-w-7xl mx-auto px-6 md:px-12 z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 flex flex-col items-start gap-8">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-surface-container text-primary font-label text-xs uppercase tracking-widest ghost-border shadow-lg">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                System Online
              </div>
              <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tighter text-on-surface uppercase">
                THE <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400 glow-text">
                  AI ENGINEER
                </span>
              </h1>
              <p className="font-body text-xl text-on-surface-variant max-w-2xl leading-relaxed font-light">
                Aspiring AI Researcher & Software Engineer. Building robust machine intelligence and full-stack solutions, with a deep passion for Reinforcement Learning and Neural Architecture.
              </p>
              <div className="flex gap-4 mt-4">
                <a href="#archive" className="bg-primary text-on-primary px-8 py-4 rounded-full font-label font-bold uppercase tracking-wider hover:brightness-110 transition-all shadow-[0_0_20px_rgba(0,229,255,0.3)]">
                  View Models
                </a>
                <a href="https://github.com" target="_blank" rel="noreferrer" className="bg-surface-container border border-outline text-primary px-8 py-4 rounded-full font-label uppercase tracking-wider hover:bg-surface-container/80 transition-all flex items-center gap-2">
                  <span>GitHub Repository</span>
                </a>
              </div>
            </div>
            
            <div className="lg:col-span-5 relative hidden md:block">
              {/* Abstract geometric visualization */}
              <div className="aspect-square rounded-[3rem] bg-surface-container ghost-border relative overflow-hidden flex items-center justify-center glow-box">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-50"></div>
                {/* Fallback pattern block if no image is present */}
                <div className="w-full h-full opacity-80 mix-blend-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900 via-surface to-background flex items-center justify-center">
                   <div className="w-64 h-64 border-[1px] border-cyan-800 rounded-full animate-[spin_10s_linear_infinite] flex items-center justify-center">
                     <div className="w-48 h-48 border-[1px] border-cyan-500 rounded-full border-dashed animate-[spin_15s_linear_infinite_reverse]"></div>
                   </div>
                </div>
                
                {/* Floating Tech Nodes */}
                <div className="absolute top-1/4 left-1/4 bg-surface/80 p-3 rounded-2xl ghost-border shadow-lg backdrop-blur-md">
                  <span className="material-symbols-outlined text-primary">polyline</span>
                </div>
                <div className="absolute bottom-1/3 right-1/4 bg-surface/80 p-3 rounded-2xl ghost-border shadow-lg backdrop-blur-md">
                  <span className="material-symbols-outlined text-primary">network_node</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Architecture */}
        <section className="py-32 bg-background relative overflow-hidden" id="stack">
          <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div>
                <h2 className="font-headline text-sm text-primary tracking-[0.3em] uppercase mb-4 font-bold">
                  Core Competencies
                </h2>
                <h3 className="font-headline text-4xl md:text-5xl font-bold text-on-surface tracking-tight">
                  Neural Infrastructure
                </h3>
              </div>
              <p className="font-body text-on-surface-variant max-w-md text-right hidden md:block font-light">
                Specialized stacks engineered for high-performance agent training, web systems, and environment simulation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Skill Node 1 */}
              <div className="bg-surface-container p-8 rounded-[2.5rem] ghost-border hover:bg-surface-container/80 transition-colors group relative overflow-hidden">
                <div className="w-14 h-14 bg-surface rounded-full flex items-center justify-center mb-8 shadow-inner border border-white/5">
                  <span className="material-symbols-outlined text-primary text-2xl">code</span>
                </div>
                <h4 className="font-headline text-xl font-bold mb-3 tracking-tight">Core Languages</h4>
                <p className="text-sm text-on-surface-variant mb-8 font-body font-light leading-relaxed">
                  Low-level performance handling with C/C++ alongside rapid iteration in Python & JS.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 bg-surface text-primary text-xs font-label rounded-full border border-white/5">C / C++</span>
                  <span className="px-3 py-1.5 bg-surface text-primary text-xs font-label rounded-full border border-white/5">Python</span>
                  <span className="px-3 py-1.5 bg-surface text-primary text-xs font-label rounded-full border border-white/5">JavaScript</span>
                </div>
              </div>

              {/* Skill Node 2 */}
              <div className="bg-surface-container p-8 rounded-[2.5rem] ghost-border hover:bg-surface-container/80 transition-colors group relative overflow-hidden">
                <div className="w-14 h-14 bg-surface rounded-full flex items-center justify-center mb-8 shadow-inner border border-white/5">
                  <span className="material-symbols-outlined text-primary text-2xl">webhook</span>
                </div>
                <h4 className="font-headline text-xl font-bold mb-3 tracking-tight">Web Architecture</h4>
                <p className="text-sm text-on-surface-variant mb-8 font-body font-light leading-relaxed">
                  Building full-stack systems, dynamic dashboards, and bespoke interfaces.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 bg-surface text-primary text-xs font-label rounded-full border border-white/5">React/Next.js</span>
                  <span className="px-3 py-1.5 bg-surface text-primary text-xs font-label rounded-full border border-white/5">Tailwind CSS</span>
                  <span className="px-3 py-1.5 bg-surface text-primary text-xs font-label rounded-full border border-white/5">Node.js / PHP</span>
                </div>
              </div>

              {/* Skill Node 3 */}
              <div className="bg-surface-container p-8 rounded-[2.5rem] ghost-border hover:bg-surface-container/80 transition-colors group relative overflow-hidden lg:col-span-2">
                <div className="w-14 h-14 bg-surface rounded-full flex items-center justify-center mb-8 shadow-inner border border-white/5">
                  <span className="material-symbols-outlined text-primary text-2xl">memory</span>
                </div>
                <h4 className="font-headline text-xl font-bold mb-3 tracking-tight">Deep / Reinforcement Learning</h4>
                <p className="text-sm text-on-surface-variant mb-8 font-body font-light max-w-xl leading-relaxed">
                  Implementation and tuning of state-of-the-art AI algorithms. From Deep-Q networks in simulated environments to custom RAG ingestion pipelines and object detection architectures.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 bg-surface text-primary text-xs font-label rounded-full border border-white/5">PyTorch</span>
                  <span className="px-3 py-1.5 bg-surface text-primary text-xs font-label rounded-full border border-white/5">LangChain</span>
                  <span className="px-3 py-1.5 bg-surface text-primary text-xs font-label rounded-full border border-white/5">Deep-Q Learning</span>
                  <span className="px-3 py-1.5 bg-surface text-primary text-xs font-label rounded-full border border-white/5">R-CNN</span>
                  <span className="px-3 py-1.5 bg-surface text-primary text-xs font-label rounded-full border border-white/5">LLMs / RAG</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Project Gallery (Bento Layout) */}
        <section className="py-32 bg-surface" id="archive">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="mb-16">
              <h2 className="font-headline text-sm text-primary tracking-[0.3em] uppercase mb-4 font-bold">
                Case Studies
              </h2>
              <h3 className="font-headline text-4xl md:text-6xl font-bold text-on-surface tracking-tight">
                Applied Intelligence
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[auto]">
              
              {/* Project 1 (Large) */}
              <div className="md:col-span-8 bg-surface-container rounded-[3rem] ghost-border overflow-hidden relative group min-h-[450px]">
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20 z-10"></div>
                <div className="absolute bottom-0 left-0 p-10 z-20 w-full flex flex-col justify-end">
                  <div className="flex gap-2 mb-6">
                    <span className="px-3 py-1.5 bg-surface/80 backdrop-blur text-primary text-xs font-label rounded-full border border-primary/30 uppercase tracking-wider">
                      Reinforcement Learning
                    </span>
                    <span className="px-3 py-1.5 bg-surface/80 backdrop-blur text-on-surface text-xs font-label rounded-full border border-outline uppercase tracking-wider">
                      OpenAI Gym
                    </span>
                  </div>
                  <h4 className="font-headline text-3xl md:text-4xl font-bold mb-4 tracking-tight">
                    RL Dangerous Dave
                  </h4>
                  <p className="text-on-surface-variant font-body max-w-2xl mb-8 font-light leading-relaxed">
                    Created a Reinforcement Learning agent to play the classic platformer 'Dangerous Dave' by building a custom game environment. Optimized a DQN agent to achieve a 95% success rate in level completion within 500 training episodes through trial-and-error learning and effective reward structure design.
                  </p>
                  <button className="bg-primary text-on-primary px-6 py-3 rounded-full font-label font-bold text-sm uppercase tracking-widest w-fit hover:brightness-110 transition-all flex items-center gap-2">
                    View Artifact <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              </div>

              {/* Project 2 (Small Vertical) */}
              <div className="md:col-span-4 bg-surface-container rounded-[3rem] ghost-border overflow-hidden relative group min-h-[450px]">
                <div className="p-10 h-full flex flex-col justify-between z-20 relative">
                  <div>
                    <div className="w-14 h-14 bg-surface rounded-full flex items-center justify-center mb-8 shadow-inner border border-white/5">
                      <span className="material-symbols-outlined text-primary text-2xl">search_insights</span>
                    </div>
                    <h4 className="font-headline text-2xl font-bold mb-4 tracking-tight">
                      RAG System with LLMs
                    </h4>
                    <p className="text-sm text-on-surface-variant font-body font-light leading-relaxed">
                      Developed a Retrieval-Augmented Generation (RAG) system to enhance language model responses via LangChain & Hugging Face. Implemented document processing workflows and integrated open-source models for contextual query inference.
                    </p>
                  </div>
                  <div className="mt-8">
                    <div className="flex flex-wrap gap-2 mb-8">
                      <span className="px-3 py-1.5 bg-surface text-primary text-xs font-label rounded-full border border-white/5">LangChain</span>
                      <span className="px-3 py-1.5 bg-surface text-primary text-xs font-label rounded-full border border-white/5">LLMs</span>
                    </div>
                    <button className="bg-surface border border-outline text-on-surface hover:text-primary px-6 py-3 rounded-full font-label font-bold text-sm uppercase tracking-widest w-full transition-all flex items-center justify-center gap-2">
                      View Artifact <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Project 3 (Small Horizontal) */}
              <div className="md:col-span-6 bg-surface-container rounded-[3rem] ghost-border overflow-hidden relative group min-h-[350px]">
                <div className="p-10 h-full flex flex-col justify-between z-20 relative">
                  <div>
                    <h4 className="font-headline text-2xl font-bold mb-4 tracking-tight">
                      Traffic System Optimization
                    </h4>
                    <p className="text-sm text-on-surface-variant font-body font-light leading-relaxed">
                      Implemented an R-CNN model using PyTorch to detect vehicle density in real-time. Built a custom UI in Streamlit to observe traffic footage on which image detection and fuzzy logic are actively visualized.
                    </p>
                  </div>
                  <div className="mt-8 flex justify-between items-center">
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1.5 bg-surface text-primary text-xs font-label rounded-full border border-white/5">PyTorch</span>
                      <span className="px-3 py-1.5 bg-surface text-primary text-xs font-label rounded-full border border-white/5">Fuzzy Logic</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project 4 & 5 Combined */}
              <div className="md:col-span-6 bg-surface-container rounded-[3rem] ghost-border overflow-hidden relative group min-h-[350px] flex flex-col justify-between p-10">
                 <div>
                    <h4 className="font-headline text-2xl font-bold mb-2 tracking-tight">Class Portal</h4>
                    <p className="text-sm text-on-surface-variant font-body font-light mb-6">
                      Full-stack web app tailored for Administrators, Teachers, and Students using PHP and MySQL.
                    </p>
                    <h4 className="font-headline text-2xl font-bold mb-2 tracking-tight">Maze-Runner</h4>
                    <p className="text-sm text-on-surface-variant font-body font-light">
                      A 2D interactive maze game written in raw C, deploying collision logic and UI loops.
                    </p>
                  </div>
                  <div className="mt-8 flex gap-4">
                     <span className="px-3 py-1.5 bg-surface text-primary text-xs font-label rounded-full border border-white/5">Full-Stack</span>
                     <span className="px-3 py-1.5 bg-surface text-primary text-xs font-label rounded-full border border-white/5">Systems C</span>
                  </div>
              </div>

            </div>
          </div>
        </section>

        {/* Experience Timeline */}
        <section className="py-32 bg-background border-t border-surface" id="experience">
          <div className="max-w-5xl mx-auto px-6 md:px-12">
            <div className="mb-24 text-center">
              <h2 className="font-headline text-sm text-primary tracking-[0.3em] uppercase mb-4 font-bold">
                Operational History
              </h2>
              <h3 className="font-headline text-4xl md:text-5xl font-bold text-on-surface tracking-tight">
                Education & Experience
              </h3>
            </div>

            <div className="relative pl-8 md:pl-0">
              {/* Timeline Line */}
              <div className="absolute left-[39px] md:left-1/2 top-0 bottom-0 w-px bg-surface-container hidden md:block"></div>
              <div className="absolute left-0 top-0 bottom-0 w-px bg-surface-container md:hidden"></div>

              {/* Event 1 */}
              <div className="relative mb-24 md:flex justify-between items-center w-full">
                <div className="md:w-[45%] text-left md:text-right pr-0 md:pr-12 mb-8 md:mb-0 ml-8 md:ml-0 bg-surface-container p-8 rounded-[2rem] ghost-border md:bg-transparent md:border-none md:p-0">
                  <h4 className="font-headline text-2xl font-bold text-on-surface mb-2 tracking-tight">
                    BE in Computer Engineering
                  </h4>
                  <p className="font-label text-primary uppercase tracking-wider text-sm mb-4">
                    Purbanchal University
                  </p>
                  <p className="font-body text-on-surface-variant text-sm font-light leading-relaxed">
                    Formal training in Data Structures & Algorithms, Computational Theory, Artificial Intelligence, Computer Networks, and DBMS.
                  </p>
                </div>
                {/* Timeline Node */}
                <div className="absolute left-[-5px] md:left-1/2 top-8 md:top-1/2 md:-translate-y-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-primary shadow-[0_0_15px_rgba(0,229,255,0.6)] border-[3px] border-background z-10"></div>
                <div className="md:w-[45%] text-left pl-8 md:pl-12 hidden md:block">
                  <div className="inline-block px-4 py-2 bg-surface-container font-label text-xs text-on-surface rounded-full border border-white/5 uppercase tracking-widest">
                    Jan 2021 - Aug 2025
                  </div>
                </div>
              </div>

              {/* Event 2 */}
              <div className="relative mb-24 md:flex flex-row-reverse justify-between items-center w-full">
                <div className="md:w-[45%] text-left pl-0 md:pl-12 mb-8 md:mb-0 ml-8 md:ml-0 bg-surface-container p-8 rounded-[2rem] ghost-border md:bg-transparent md:border-none md:p-0">
                  <h4 className="font-headline text-2xl font-bold text-on-surface mb-2 tracking-tight">
                    Real World Availability
                  </h4>
                  <p className="font-label text-primary uppercase tracking-wider text-sm mb-4">
                    Actively Seeking Opportunities
                  </p>
                  <p className="font-body text-on-surface-variant text-sm font-light leading-relaxed">
                    Ready to deploy skills into an internship or entry-level software/AI engineering role. Looking forward to tackling practical challenges.
                  </p>
                </div>
                {/* Timeline Node */}
                <div className="absolute left-[-5px] md:left-1/2 top-8 md:top-1/2 md:-translate-y-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-surface-container border-[3px] border-primary z-10"></div>
                <div className="md:w-[45%] text-left md:text-right pr-0 md:pr-12 ml-8 md:ml-0 hidden md:block">
                  <div className="inline-block px-4 py-2 bg-surface-container font-label text-xs text-on-surface rounded-full border border-white/5 uppercase tracking-widest">
                    Present
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-16 bg-[#0f1415] dark:bg-[#0f1415] border-t-0 mt-16">
        <div className="w-full px-12 flex flex-col md:flex-row justify-between items-center gap-8 max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-6 font-sans text-[11px] uppercase tracking-[0.2em] font-light">
            <a className="text-slate-500 hover:text-cyan-300 transition-colors duration-500" href="https://github.com" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a className="text-slate-500 hover:text-cyan-300 transition-colors duration-500" href="https://linkedin.com" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a className="text-slate-500 hover:text-cyan-300 transition-colors duration-500" href="mailto:sonofdahal@gmail.com">
              Email Contact
            </a>
          </div>
          <div className="font-sans text-[11px] uppercase tracking-[0.2em] font-light text-slate-500 text-center">
            © {new Date().getFullYear()} Suyog Dahal. Engineered for Machine Intelligence.
          </div>
        </div>
      </footer>
    </>
  );
}
