"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  tech: string[];
  mediaUrl?: string;
  specs: Record<string, string>;
  codeSnippet: string;
}

export default function DemosPage() {
  // --- STATE ---
  const [activeProjectId, setActiveProjectId] = useState<string>("dave-rl");
  const [activeCategory, setActiveCategory] = useState<string>("All Systems");
  const [activeTab, setActiveTab] = useState<"demo" | "specs" | "code">("demo");
  const [showContactModal, setShowContactModal] = useState(false);

  // --- DEFAULT PROJECTS SEED ---
  const defaultProjects: Project[] = [
    {
      id: "dave-rl",
      title: "RL Dangerous Dave",
      category: "Deep Learning",
      description: "Autonomous Deep Q-Network agent navigating a custom platformer game space.",
      longDescription: "Created a Reinforcement Learning agent to play the classic platformer 'Dangerous Dave' by building a custom game environment. Optimized a DQN agent using target networks, experience replay, and double DQN modifications to achieve automated hazard avoidance and dynamic path optimization.",
      tech: ["PyTorch", "Gymnasium", "OpenCV", "NumPy", "Double DQN"],
      mediaUrl: "/demo_gifs/dangerous_dave_rl-gif.gif",
      specs: {
        "Neural Network": "3-layer CNN + Dueling Heads",
        "Optimizer": "AdamW (lr=3e-4)",
        "Experience Replay Size": "100,000 samples",
        "Target Sync Frequency": "1,000 steps",
        "Average Level Time": "24.5 seconds",
        "Completion Rate": "95.6% @ 500 episodes"
      },
      codeSnippet: `import torch
import torch.nn as nn

class DuelingDQN(nn.Module):
    def __init__(self, input_shape, num_actions):
        super().__init__()
        self.conv = nn.Sequential(
            nn.Conv2d(input_shape[0], 32, kernel_size=8, stride=4),
            nn.ReLU(),
            nn.Conv2d(32, 64, kernel_size=4, stride=2),
            nn.ReLU(),
            nn.Conv2d(64, 64, kernel_size=3, stride=1),
            nn.ReLU()
        )
        conv_out_size = self._get_conv_out(input_shape)
        
        self.value_stream = nn.Sequential(
            nn.Linear(conv_out_size, 512),
            nn.ReLU(),
            nn.Linear(512, 1)
        )
        self.advantage_stream = nn.Sequential(
            nn.Linear(conv_out_size, 512),
            nn.ReLU(),
            nn.Linear(512, num_actions)
        )

    def forward(self, state):
        features = self.conv(state).view(state.size(0), -1)
        values = self.value_stream(features)
        advantages = self.advantage_stream(features)
        return values + (advantages - advantages.mean(dim=1, keepdim=True))

    def _get_conv_out(self, shape):
        o = self.conv(torch.zeros(1, *shape))
        return int(np.prod(o.size()))`
    },
    {
      id: "rag-llm",
      title: "RAG System with LLMs",
      category: "Deep Learning",
      description: "Retrieval-Augmented Generation pipeline visualizer detailing chunking and inference.",
      longDescription: "Developed a Retrieval-Augmented Generation (RAG) dashboard highlighting vector DB matching and response synthesis. Features dense document indexing via FAISS and local embedding alignment, allowing robust factual querying without fine-tuning LLMs directly.",
      tech: ["LangChain", "Chroma DB", "Hugging Face", "Sentence Transformers", "LlamaIndex"],
      specs: {
        "Vector Store": "Chroma Vector DB / FAISS Local",
        "Embeddings Model": "bge-large-en-v1.5",
        "Chunking Strategy": "RecursiveCharacter (500 tokens, 50 overlap)",
        "Search Metric": "Cosine Similarity / Inner Product",
        "Model Integration": "Llama 3 8B Instruct / GPT-4o API"
      },
      codeSnippet: `from langchain_community.vectorstores import FAISS
from langchain_core.prompts import ChatPromptTemplate
from langchain_huggingface import HuggingFaceEmbeddings

def initialize_rag(documents):
    # 1. Chunk documents
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
    chunks = text_splitter.split_documents(documents)
    
    # 2. Embed and Index
    embeddings = HuggingFaceEmbeddings(model_name="BAAI/bge-large-en-v1.5")
    db = FAISS.from_documents(chunks, embeddings)
    return db.as_retriever(search_kwargs={"k": 3})

def execute_rag_pipeline(query, retriever, llm_chain):
    # 3. Retrieve relevant pieces
    relevant_chunks = retriever.get_relevant_documents(query)
    context = "\\n\\n".join([c.page_content for c in relevant_chunks])
    
    # 4. Generate query
    return llm_chain.run(context=context, question=query)`
    }
  ];

  // --- INITIALIZATION ---
  useEffect(() => {
    // Check query params for starting project
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const proj = params.get("project");
      if (proj && defaultProjects.some(p => p.id === proj)) {
        setActiveProjectId(proj);
      }
    }
  }, []);

  // --- FILTERS & GET ACTIVE PROJECT ---
  const filteredProjects = defaultProjects.filter(p => {
    if (activeCategory === "All Systems") return true;
    return p.category === activeCategory;
  });

  const activeProject = defaultProjects.find(p => p.id === activeProjectId) || defaultProjects[0];

  const handleCopyCode = () => {
    if (activeProject) {
      navigator.clipboard.writeText(activeProject.codeSnippet);
      alert("Pipeline code copied to neural clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-[#070b0c] text-slate-100 font-sans flex flex-col selection:bg-cyan-500/30 selection:text-primary relative overflow-x-clip pt-32 pb-20">
      
      {/* Background radial glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-950/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-950/10 blur-[120px] pointer-events-none" />

      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-3 w-[95%] max-w-6xl mx-auto bg-[#171c1d]/40 backdrop-blur-xl rounded-full mt-4 shadow-[0_20px_50px_rgba(0,229,255,0.05)] border border-white/5">
        <Link href="/" className="text-xl font-black tracking-tighter text-slate-100 uppercase hover:text-primary transition-colors flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px] text-primary">arrow_back</span>
          Suyog.AI
        </Link>
        <div className="flex items-center gap-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-primary border border-primary/20 text-xs font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
            NEURAL_LABS_ONLINE
          </span>
          <button
            onClick={() => setShowContactModal(true)}
            className="bg-primary text-on-primary px-5 py-1.5 rounded-full font-sans text-xs font-bold tracking-wider hover:brightness-125 transition-all duration-300 scale-95 active:scale-90 cursor-pointer animate-pulse"
          >
            Contact
          </button>
        </div>
      </nav>

      <main className="flex-grow max-w-7xl mx-auto w-full px-6">
        {/* Page Header */}
        <div className="mb-10 text-left border-b border-white/5 pb-8 relative">
          <div className="absolute right-0 top-0 text-[10px] font-mono text-slate-500 hidden md:block leading-relaxed text-right">
            <div>HOST_AGENT: ANTIGRAVITY_3.5</div>
            <div>STATUS: FULLY_OPERATIONAL</div>
          </div>
          <h1 className="font-headline text-4xl md:text-5xl font-black tracking-tight text-on-surface uppercase mb-3">
            Neural Showcase
          </h1>
          <p className="text-on-surface-variant max-w-3xl font-light text-base md:text-lg">
            Engineering specifications, algorithm core pipelines, and telemetry loops. Select a project below to inspect its architecture.
          </p>
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-white/5 pb-6">
          {["All Systems", "Deep Learning", "Systems & Games"].map(cat => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                // Select first item of filtered list
                const filtered = defaultProjects.filter(p => cat === "All Systems" || p.category === cat);
                if (filtered.length > 0) {
                  setActiveProjectId(filtered[0].id);
                }
              }}
              className={`px-5 py-2 rounded-full font-sans text-xs tracking-wider uppercase font-bold transition-all border cursor-pointer ${
                activeCategory === cat
                  ? "bg-primary text-on-primary border-primary shadow-[0_0_15px_rgba(0,229,255,0.25)]"
                  : "bg-surface-container/60 hover:bg-surface-container border-white/5 text-slate-400 hover:text-slate-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dashboard Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT SIDE: Project Showcase Viewer */}
          <div className="lg:col-span-8 bg-surface-container rounded-[2.5rem] border border-white/5 overflow-hidden flex flex-col glow-box min-h-[640px]">
            {/* Tab Controller */}
            <div className="flex justify-between items-center bg-[#0d1213] px-6 py-4 border-b border-white/5">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab("demo")}
                  className={`px-4 py-2 rounded-lg font-mono text-xs uppercase tracking-widest font-bold transition-colors cursor-pointer ${
                    activeTab === "demo" ? "bg-primary/10 text-primary border border-primary/20" : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  [ Live Telemetry ]
                </button>
                <button
                  onClick={() => setActiveTab("specs")}
                  className={`px-4 py-2 rounded-lg font-mono text-xs uppercase tracking-widest font-bold transition-colors cursor-pointer ${
                    activeTab === "specs" ? "bg-primary/10 text-primary border border-primary/20" : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  [ Specifications ]
                </button>
                <button
                  onClick={() => setActiveTab("code")}
                  className={`px-4 py-2 rounded-lg font-mono text-xs uppercase tracking-widest font-bold transition-colors cursor-pointer ${
                    activeTab === "code" ? "bg-primary/10 text-primary border border-primary/20" : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  [ Pipeline Code ]
                </button>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
                <span className="font-mono text-[10px] text-cyan-400 tracking-wider font-bold">
                  TELEMETRY_ONLINE
                </span>
              </div>
            </div>

            {/* Viewer Workspace */}
            <div className="p-8 flex-grow flex flex-col justify-between gap-6">
              
              {/* Title & Description */}
              <div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="px-3 py-1 bg-slate-800 text-[10px] font-mono text-primary rounded-full uppercase tracking-wider font-bold border border-white/5">
                    {activeProject.category}
                  </span>
                  {activeProject.tech.map(t => (
                    <span key={t} className="px-3 py-1 bg-surface-container/50 text-[10px] font-sans text-slate-400 rounded-full border border-white/5">
                      {t}
                    </span>
                  ))}
                </div>
                <h2 className="text-3xl font-black text-slate-100 uppercase tracking-tight mb-3">
                  {activeProject.title}
                </h2>
                <p className="text-sm text-on-surface-variant font-light leading-relaxed max-w-4xl">
                  {activeProject.longDescription}
                </p>
              </div>

              {/* Dynamic Workspace Tabs */}
              <div className="flex-grow flex flex-col justify-center">
                
                {/* TAB 1: Live Telemetry (Loops GIF or shows static HUD blueprint) */}
                {activeTab === "demo" && (
                  <div className="w-full">
                    {activeProject.mediaUrl ? (
                      <div className="w-full bg-[#050809] rounded-3xl border border-white/10 overflow-hidden relative group aspect-video flex items-center justify-center shadow-2xl">
                        {/* Interactive scanline and grid overlay */}
                        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,229,255,0.015)_1px,transparent_1px)] bg-[size:100%_8px] pointer-events-none z-10" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050809]/50 via-transparent to-transparent pointer-events-none z-10" />
                        
                        <img
                          src={activeProject.mediaUrl}
                          alt={activeProject.title}
                          className="w-full h-full object-contain block relative z-0"
                        />
                      </div>
                    ) : (
                      <div className="w-full bg-[#050809] rounded-3xl border border-white/5 overflow-hidden relative group aspect-video flex flex-col items-center justify-center p-8 text-center gap-4 shadow-inner">
                        {/* Interactive scanline and grid overlay */}
                        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none" />
                        <div className="w-16 h-16 rounded-full bg-cyan-950/20 border border-cyan-400/20 flex items-center justify-center text-cyan-400/40">
                          <span className="material-symbols-outlined text-[32px] animate-pulse">
                            videocam_off
                          </span>
                        </div>
                        <div>
                          <h4 className="text-xs font-mono tracking-widest text-slate-300 uppercase font-bold mb-1">
                            SPECIFICATION SHEET ACTIVE
                          </h4>
                          <p className="text-[11px] text-slate-500 max-w-sm font-sans leading-relaxed">
                            No visual telemetry loop has been recorded for this node yet. Use the specifications and code tabs to inspect architectural layouts.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* TAB 2: Specifications Table */}
                {activeTab === "specs" && (
                  <div className="w-full bg-[#080c0d] rounded-2xl border border-white/5 p-6 font-mono text-xs text-slate-300">
                    <h3 className="text-xs tracking-wider uppercase font-bold text-primary mb-4 pb-2 border-b border-white/5 flex items-center gap-2">
                      <span className="material-symbols-outlined text-[16px]">rule</span>
                      System Configuration Telemetry
                    </h3>
                    <div className="flex flex-col gap-3">
                      {Object.entries(activeProject.specs).map(([key, val]) => (
                        <div key={key} className="flex justify-between py-2 border-b border-white/5 last:border-b-0">
                          <span className="text-slate-500 uppercase tracking-wider">{key}:</span>
                          <span className="text-primary font-bold">{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB 3: Pipeline Code */}
                {activeTab === "code" && (
                  <div className="w-full flex flex-col gap-4">
                    <div className="bg-[#050809] rounded-2xl border border-white/10 overflow-hidden relative font-mono text-xs">
                      {/* Code controller header */}
                      <div className="bg-[#0d1213] px-4 py-2.5 border-b border-white/5 flex justify-between items-center text-[10px] text-slate-500">
                        <span>CORE ALGORITHM BLOCK</span>
                        <button
                          onClick={handleCopyCode}
                          className="hover:text-primary transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[12px]">content_copy</span>
                          COPY_RAW
                        </button>
                      </div>
                      <pre className="p-6 text-slate-300 overflow-x-auto max-h-[350px] leading-relaxed select-text">
                        <code>{activeProject.codeSnippet}</code>
                      </pre>
                    </div>
                  </div>
                )}

              </div>

            </div>
          </div>

          {/* RIGHT SIDE: Navigation Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Sidebar list of projects */}
            <div className="bg-surface-container rounded-[2.5rem] border border-white/5 p-6 flex flex-col gap-4">
              <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-2">
                <h3 className="font-headline text-lg font-bold text-slate-100 uppercase tracking-tight">
                  Systems Inventory
                </h3>
                <span className="bg-slate-800 text-slate-400 border border-white/10 px-2 py-0.5 rounded text-[10px] font-mono font-bold">
                  {filteredProjects.length} NODES
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {filteredProjects.map(proj => {
                  const isActive = proj.id === activeProjectId;
                  return (
                    <div
                      key={proj.id}
                      onClick={() => {
                        setActiveProjectId(proj.id);
                        setActiveTab("demo");
                      }}
                      className={`group p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between min-h-[110px] ${
                        isActive
                          ? "bg-primary/5 border-primary/30 shadow-[0_0_15px_rgba(0,229,255,0.08)]"
                          : "bg-surface/50 border-white/5 hover:bg-surface-container hover:border-slate-800"
                      }`}
                    >
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <span className="text-[9px] font-mono text-primary font-bold uppercase tracking-widest block mb-1">
                            {proj.category}
                          </span>
                          <h4 className="text-sm font-bold text-slate-200 group-hover:text-slate-100 tracking-tight leading-normal">
                            {proj.title}
                          </h4>
                        </div>
                        
                        {/* Status light */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            proj.mediaUrl ? "bg-primary animate-pulse" : "bg-slate-600"
                          }`} />
                          <span className="font-mono text-[9px] text-slate-500 font-bold uppercase">
                            {proj.mediaUrl ? "GIF_ACTIVE" : "SPECS_ONLY"}
                          </span>
                        </div>
                      </div>

                      <p className="text-[11px] text-slate-500 group-hover:text-slate-400 line-clamp-2 mt-2 leading-relaxed">
                        {proj.description}
                      </p>
                    </div>
                  );
                })}

                {filteredProjects.length === 0 && (
                  <div className="p-8 text-center text-xs font-mono text-slate-600 border border-dashed border-white/5 rounded-2xl">
                    NO ACTIVE NODES DETECTED IN THIS LAYER
                  </div>
                )}
              </div>
            </div>

            {/* Showcase Details Side-Card */}
            <div className="bg-[#0b1011] rounded-[2.5rem] border border-white/5 p-6 flex flex-col gap-4 font-mono text-[10px] text-slate-400">
              <div className="text-white font-bold uppercase tracking-wider border-b border-white/5 pb-2 mb-1 flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-primary">analytics</span>
                Neural Diagnostics
              </div>
              <div className="flex flex-col gap-2 leading-relaxed">
                <div className="flex justify-between">
                  <span>TOTAL_PROJECT_NODES:</span>
                  <span className="text-primary font-bold">{defaultProjects.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>VISUAL_TELEMETRY:</span>
                  <span className="text-primary font-bold">
                    {defaultProjects.filter(p => p.mediaUrl).length} ACTIVE
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>DOCUMENTED_SPECS:</span>
                  <span className="text-primary font-bold">100% COMPLETE</span>
                </div>
              </div>
              <div className="border-t border-white/5 pt-3 text-[9px] text-slate-500 leading-normal">
                Double DQN update weights, Fuzzy control parameters, and vector cosine similarity structures are static specification references.
              </div>
            </div>

          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-16 bg-[#0f1415] border-t border-white/5 mt-16">
        <div className="w-full px-12 flex flex-col md:flex-row justify-between items-center gap-8 max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-6 font-sans text-[11px] uppercase tracking-[0.2em] font-light">
            <a className="text-slate-500 hover:text-cyan-300 transition-colors duration-500" href="https://github.com" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a className="text-slate-500 hover:text-cyan-300 transition-colors duration-500" href="https://linkedin.com/in/suyog-dahal" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <button
              onClick={() => setShowContactModal(true)}
              className="text-slate-500 hover:text-cyan-300 transition-colors duration-500 cursor-pointer font-sans text-[11px] uppercase tracking-[0.2em] font-light"
            >
              Contact Me
            </button>
          </div>
          <div className="font-sans text-[11px] uppercase tracking-[0.2em] font-light text-slate-500 text-center">
            © {new Date().getFullYear()} Suyog Dahal. Engineered for Machine Intelligence.
          </div>
        </div>
      </footer>

      {/* Contact Me Overlay Modal */}
      {showContactModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#0b1011] border border-cyan-500/20 rounded-[2.5rem] w-full max-w-sm p-8 shadow-[0_20px_50px_rgba(0,229,255,0.15)] relative flex flex-col items-center text-center animate-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button
              onClick={() => setShowContactModal(false)}
              className="absolute top-5 right-5 text-slate-500 hover:text-slate-200 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>

            {/* Icon Header */}
            <div className="w-16 h-16 rounded-full bg-cyan-950/30 border border-cyan-500/20 flex items-center justify-center text-primary mb-6 shadow-[0_0_15px_rgba(0,229,255,0.1)]">
              <span className="material-symbols-outlined text-[28px] animate-pulse">contact_mail</span>
            </div>

            {/* Headers */}
            <h3 className="font-headline text-xl font-black tracking-tight text-slate-100 uppercase mb-1">
              Decrypted Comm-Link
            </h3>
            <p className="text-xs text-slate-500 font-mono uppercase tracking-widest mb-6">
              SUYOG_DAHAL_CONNECT
            </p>

            {/* Email Box */}
            <div className="w-full bg-[#12181a] border border-white/5 p-4 rounded-2xl flex flex-col gap-2 items-center mb-6">
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block">
                Primary Gmail Node
              </span>
              <span className="text-sm font-mono text-cyan-400 font-bold select-all">
                sonofdahal@gmail.com
              </span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText("sonofdahal@gmail.com");
                  alert("Gmail copied to neural clipboard!");
                }}
                className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 hover:text-primary transition-colors flex items-center gap-1 cursor-pointer mt-1"
              >
                <span className="material-symbols-outlined text-[12px]">content_copy</span>
                Copy Address
              </button>
            </div>

            {/* Social Connection Link */}
            <div className="w-full flex flex-col gap-2 items-center">
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider">
                Professional Network
              </span>
              <a
                href="https://linkedin.com/in/suyog-dahal"
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 rounded-full bg-[#0077b5]/10 hover:bg-[#0077b5]/20 border border-[#0077b5]/30 hover:border-[#0077b5]/50 flex items-center justify-center text-[#0077b5] transition-all hover:scale-110 active:scale-95 shadow-md group cursor-pointer"
                title="Open LinkedIn Profile"
              >
                <svg
                  className="w-5 h-5 fill-current group-hover:text-cyan-300 transition-colors"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
