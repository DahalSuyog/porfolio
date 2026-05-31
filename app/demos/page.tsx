"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import styles from "./demos.module.css";

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
    <div className={styles.page}>
      
      <div className={styles.bgGlow} style={{ top: '-10%', left: '-10%', width: '50%', height: '50%' }} />
      <div className={styles.bgGlow} style={{ bottom: '-10%', right: '-10%', width: '50%', height: '50%', opacity: 0.5 }} />

      <Navbar onContactClick={() => setShowContactModal(true)} activePage="demos" />

      <main className="flex-grow max-w-7xl mx-auto w-full px-6">
        <div className={styles.header}>
          <div className={styles.headerStatus}>
            <div>HOST_AGENT: ANTIGRAVITY_3.5</div>
            <div>STATUS: FULLY_OPERATIONAL</div>
          </div>
          <h1 className={styles.pageTitle}>
            Neural Showcase
          </h1>
          <p className={styles.pageDesc}>
            Engineering specifications, algorithm core pipelines, and telemetry loops. Select a project below to inspect its architecture.
          </p>
        </div>

        <div className={styles.categoriesBar}>
          {["All Systems", "Deep Learning", "Systems & Games"].map(cat => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                const filtered = defaultProjects.filter(p => cat === "All Systems" || p.category === cat);
                if (filtered.length > 0) {
                  setActiveProjectId(filtered[0].id);
                }
              }}
              className={`${styles.catBtn} ${activeCategory === cat ? styles.catBtnActive : styles.catBtnInactive}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className={styles.dashboard}>
          
          <div className={styles.viewer}>
            <div className={styles.tabBar}>
              <div className={styles.tabGroup}>
                <button
                  onClick={() => setActiveTab("demo")}
                  className={`${styles.tabBtn} ${activeTab === "demo" ? styles.tabBtnActive : styles.tabBtnInactive}`}
                >
                  [ Live Telemetry ]
                </button>
                <button
                  onClick={() => setActiveTab("specs")}
                  className={`${styles.tabBtn} ${activeTab === "specs" ? styles.tabBtnActive : styles.tabBtnInactive}`}
                >
                  [ Specifications ]
                </button>
                <button
                  onClick={() => setActiveTab("code")}
                  className={`${styles.tabBtn} ${activeTab === "code" ? styles.tabBtnActive : styles.tabBtnInactive}`}
                >
                  [ Pipeline Code ]
                </button>
              </div>

              <div className="flex items-center gap-2">
                <span className={styles.telemetryDot}></span>
                <span className={styles.telemetryLabel}>
                  TELEMETRY_ONLINE
                </span>
              </div>
            </div>

            <div className={styles.workspace}>
              
              <div>
                <div className={styles.projectMeta}>
                  <span className={styles.projectCat}>
                    {activeProject.category}
                  </span>
                  {activeProject.tech.map(t => (
                    <span key={t} className={styles.projectTech}>
                      {t}
                    </span>
                  ))}
                </div>
                <h2 className={styles.projectName}>
                  {activeProject.title}
                </h2>
                <p className={styles.projectDesc}>
                  {activeProject.longDescription}
                </p>
              </div>

              <div className="flex-grow flex flex-col justify-center">
                
                {activeTab === "demo" && (
                  <div className="w-full">
                    {activeProject.mediaUrl ? (
                      <div className={styles.demoFrame}>
                        <div className={`${styles.scanline}`} />
                        <div className={styles.vignette} />
                        
                        <img
                          src={activeProject.mediaUrl}
                          alt={activeProject.title}
                          className={styles.mediaImage}
                        />
                      </div>
                    ) : (
                      <div className={styles.demoFrameEmpty}>
                        <div className={`${styles.scanline} ${styles.scanlineEmpty}`} />
                        <div className={styles.emptyIconBox}>
                          <span className={`material-symbols-outlined ${styles.emptyIcon}`}>
                            videocam_off
                          </span>
                        </div>
                        <div>
                          <h4 className={styles.emptyTitle}>
                            SPECIFICATION SHEET ACTIVE
                          </h4>
                          <p className={styles.emptyDesc}>
                            No visual telemetry loop has been recorded for this node yet. Use the specifications and code tabs to inspect architectural layouts.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "specs" && (
                  <div className={styles.specsPanel}>
                    <h3 className={styles.specsHeader}>
                      <span className="material-symbols-outlined text-[16px]">rule</span>
                      System Configuration Telemetry
                    </h3>
                    <div className="flex flex-col gap-3">
                      {Object.entries(activeProject.specs).map(([key, val]) => (
                        <div key={key} className={styles.specsRow}>
                          <span className={styles.specsKey}>{key}:</span>
                          <span className={styles.specsVal}>{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "code" && (
                  <div className={styles.codePanel}>
                    <div className={styles.codeFrame}>
                      <div className={styles.codeHeader}>
                        <span>CORE ALGORITHM BLOCK</span>
                        <button
                          onClick={handleCopyCode}
                          className={styles.copyCodeBtn}
                        >
                          <span className="material-symbols-outlined text-[12px]">content_copy</span>
                          COPY_RAW
                        </button>
                      </div>
                      <pre className={styles.codeBlock}>
                        <code>{activeProject.codeSnippet}</code>
                      </pre>
                    </div>
                  </div>
                )}

              </div>

            </div>
          </div>

          <div className={styles.sidebar}>
            
            <div className={styles.inventoryCard}>
              <div className={styles.inventoryHeader}>
                <h3 className={styles.inventoryTitle}>
                  Systems Inventory
                </h3>
                <span className={styles.inventoryCount}>
                  {filteredProjects.length} NODES
                </span>
              </div>

              <div className={styles.projectList}>
                {filteredProjects.map(proj => {
                  const isActive = proj.id === activeProjectId;
                  return (
                    <div
                      key={proj.id}
                      onClick={() => {
                        setActiveProjectId(proj.id);
                        setActiveTab("demo");
                      }}
                      className={`${styles.projectItem} ${isActive ? styles.projectItemActive : styles.projectItemInactive}`}
                    >
                      <div className={styles.projTop}>
                        <div>
                          <span className={styles.projCategory}>
                            {proj.category}
                          </span>
                          <h4 className={styles.projName}>
                            {proj.title}
                          </h4>
                        </div>
                        
                        <div className={styles.projStatus}>
                          <span className={`${styles.projStatusDot} ${proj.mediaUrl ? styles.projStatusDotActive : styles.projStatusDotInactive}`} />
                          <span className={styles.projStatusLabel}>
                            {proj.mediaUrl ? "GIF_ACTIVE" : "SPECS_ONLY"}
                          </span>
                        </div>
                      </div>

                      <p className={styles.projDesc}>
                        {proj.description}
                      </p>
                    </div>
                  );
                })}

                {filteredProjects.length === 0 && (
                  <div className={styles.emptyState}>
                    NO ACTIVE NODES DETECTED IN THIS LAYER
                  </div>
                )}
              </div>
            </div>

            <div className={styles.diagCard}>
              <div className={styles.diagTitle}>
                <span className="material-symbols-outlined text-[16px] text-primary">analytics</span>
                Neural Diagnostics
              </div>
              <div className="flex flex-col gap-2 leading-relaxed">
                <div className={styles.diagRow}>
                  <span>TOTAL_PROJECT_NODES:</span>
                  <span className={styles.diagVal}>{defaultProjects.length}</span>
                </div>
                <div className={styles.diagRow}>
                  <span>VISUAL_TELEMETRY:</span>
                  <span className={styles.diagVal}>
                    {defaultProjects.filter(p => p.mediaUrl).length} ACTIVE
                  </span>
                </div>
                <div className={styles.diagRow}>
                  <span>DOCUMENTED_SPECS:</span>
                  <span className={styles.diagVal}>100% COMPLETE</span>
                </div>
              </div>
              <div className={styles.diagFooter}>
                Double DQN update weights, Fuzzy control parameters, and vector cosine similarity structures are static specification references.
              </div>
            </div>

          </div>

        </div>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerLinks}>
            <a className={styles.footerLink} href="https://github.com" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a className={styles.footerLink} href="https://linkedin.com/in/suyog-dahal" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <button
              onClick={() => setShowContactModal(true)}
              className={styles.footerLink}
            >
              Contact Me
            </button>
          </div>
          <div className={styles.footerCopyright}>
            © {new Date().getFullYear()} Suyog Dahal. Engineered for Machine Intelligence.
          </div>
        </div>
      </footer>

      {showContactModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button
              onClick={() => setShowContactModal(false)}
              className={styles.modalClose}
            >
              <span className={`material-symbols-outlined ${styles.modalCloseIcon}`}>close</span>
            </button>

            <div className={styles.modalIconBox}>
              <span className={`material-symbols-outlined ${styles.modalIcon}`}>contact_mail</span>
            </div>

            <h3 className={styles.modalTitle}>
              Decrypted Comm-Link
            </h3>
            <p className={styles.modalSubtitle}>
              SUYOG_DAHAL_CONNECT
            </p>

            <div className={styles.emailBox}>
              <span className={styles.emailLabel}>
                Primary Gmail Node
              </span>
              <span className={styles.emailAddress}>
                sonofdahal@gmail.com
              </span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText("sonofdahal@gmail.com");
                  alert("Gmail copied to neural clipboard!");
                }}
                className={styles.copyBtn}
              >
                <span className={`material-symbols-outlined ${styles.copyBtnIcon}`}>content_copy</span>
                Copy Address
              </button>
            </div>

            <div className={styles.socialSection}>
              <span className={styles.socialLabel}>
                Professional Network
              </span>
              <a
                href="https://linkedin.com/in/suyog-dahal"
                target="_blank"
                rel="noreferrer"
                className={styles.socialLink}
                title="Open LinkedIn Profile"
              >
                <svg
                  className={styles.socialIcon}
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
