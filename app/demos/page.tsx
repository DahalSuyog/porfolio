"use client";

import React, { Suspense, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactModal from "../components/ContactModal";
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

const CATEGORIES = ["All", "Deep Learning", "Systems & Games"];

const DEFAULT_PROJECTS: Project[] = [
  {
    id: "dave-rl",
    title: "RL Dangerous Dave",
    category: "Deep Learning",
    description: "A DQN agent that learns to play a custom platformer environment.",
    longDescription:
      "I built a custom OpenAI Gym environment for the classic platformer 'Dangerous Dave' and trained a DQN agent against it. Using experience replay, target networks, and a dueling architecture, the agent learns to avoid hazards and complete levels — reaching a 95% completion rate within 500 episodes.",
    tech: ["PyTorch", "Gymnasium", "OpenCV", "NumPy"],
    mediaUrl: "/demo_gifs/dangerous_dave_rl-gif.gif",
    specs: {
      "Neural network": "3-layer CNN with dueling heads",
      "Optimizer": "AdamW (lr = 3e-4)",
      "Experience replay": "100,000 samples",
      "Target sync": "every 1,000 steps",
      "Average level time": "24.5 seconds",
      "Completion rate": "95.6% at 500 episodes",
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
        return int(np.prod(o.size()))`,
  },
  {
    id: "rag-llm",
    title: "RAG System with LLMs",
    category: "Deep Learning",
    description: "Retrieval-augmented generation with LangChain and local models.",
    longDescription:
      "A retrieval-augmented generation pipeline that grounds language model answers in source documents. Documents are chunked, embedded, and indexed locally, then retrieved at query time so the model can answer factually without fine-tuning. Built with LangChain and open-source embeddings.",
    tech: ["LangChain", "Chroma DB", "Hugging Face", "Sentence Transformers"],
    specs: {
      "Vector store": "Chroma DB / FAISS",
      "Embeddings model": "bge-large-en-v1.5",
      "Chunking": "Recursive, 500 tokens with 50 overlap",
      "Search metric": "Cosine similarity",
      "Model integration": "Llama 3 8B Instruct / GPT-4o API",
    },
    codeSnippet: `from langchain_community.vectorstores import FAISS
from langchain_core.prompts import ChatPromptTemplate
from langchain_huggingface import HuggingFaceEmbeddings

def initialize_rag(documents):
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=500, chunk_overlap=50
    )
    chunks = text_splitter.split_documents(documents)

    embeddings = HuggingFaceEmbeddings(model_name="BAAI/bge-large-en-v1.5")
    db = FAISS.from_documents(chunks, embeddings)
    return db.as_retriever(search_kwargs={"k": 3})

def run_pipeline(query, retriever, llm_chain):
    relevant_chunks = retriever.get_relevant_documents(query)
    context = "\\n\\n".join([c.page_content for c in relevant_chunks])
    return llm_chain.run(context=context, question=query)`,
  },
  {
    id: "traffic-opt",
    title: "Traffic System Optimization",
    category: "Systems & Games",
    description: "Real-time vehicle detection with R-CNN and fuzzy logic.",
    longDescription:
      "An R-CNN model detects vehicle density in live traffic footage, feeding fuzzy logic rules that propose signal timing adjustments. A custom Streamlit interface lets you watch detection and the fuzzy reasoning happen in real time.",
    tech: ["PyTorch", "Streamlit", "Fuzzy Logic"],
    specs: {
      "Detection model": "R-CNN (PyTorch)",
      "Input": "Live traffic video stream",
      "Decision layer": "Fuzzy inference on density",
      "Visualization": "Streamlit dashboard",
    },
    codeSnippet: `import torch
from torchvision.models.detection import fasterrcnn_resnet50_fpn

model = fasterrcnn_resnet50_fpn(pretrained=True)
model.eval()

def detect_vehicles(frame, threshold=0.7):
    tensor = to_tensor(frame).unsqueeze(0)
    with torch.no_grad():
        preds = model(tensor)[0]
    boxes = preds["boxes"]
    scores = preds["scores"]
    keep = scores > threshold
    return boxes[keep].tolist()`,
  },
  {
    id: "maze-runner",
    title: "Maze-Runner",
    category: "Systems & Games",
    description: "A 2D maze game written from scratch in C.",
    longDescription:
      "A 2D interactive maze game built in raw C, handling keyboard input, a render loop, and grid-based collision logic directly against the terminal. A study in low-level systems programming and game loop design.",
    tech: ["C", "Low-level graphics"],
    specs: {
      "Language": "C (no game frameworks)",
      "Rendering": "Terminal framebuffer",
      "Collision": "Grid-based tile checks",
      "Controls": "Arrow keys",
    },
    codeSnippet: `int move_player(Game *g, int dx, int dy) {
    int nx = g->player.x + dx;
    int ny = g->player.y + dy;

    if (g->map[ny][nx] == WALL)
        return 0; // blocked

    g->player.x = nx;
    g->player.y = ny;
    if (g->map[ny][nx] == EXIT) {
        g->state = LEVEL_COMPLETE;
    }
    return 1;
}`,
  },
];

export default function DemosPage() {
  const [showContactModal, setShowContactModal] = useState(false);

  return (
    <div className={styles.page}>
      <Navbar onContactClick={() => setShowContactModal(true)} activePage="demos" />

      <Suspense
        fallback={
          <main className="flex-grow max-w-7xl mx-auto w-full px-6">
            <p className={styles.suspenseFallback}>Loading projects…</p>
          </main>
        }
      >
        <DemosContent />
      </Suspense>

      <Footer onContactClick={() => setShowContactModal(true)} />

      {showContactModal && <ContactModal onClose={() => setShowContactModal(false)} />}
    </div>
  );
}

function DemosContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [selectedId, setSelectedId] = useState<string>("dave-rl");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeTab, setActiveTab] = useState<"overview" | "details" | "code">("overview");

  const requestedProject = DEFAULT_PROJECTS.find((p) => p.id === searchParams.get("project"));
  const activeProjectId = requestedProject ? requestedProject.id : selectedId;

  const filteredProjects = DEFAULT_PROJECTS.filter((p) => {
    if (activeCategory === "All") return true;
    return p.category === activeCategory;
  });

  const activeProject =
    DEFAULT_PROJECTS.find((p) => p.id === activeProjectId) || DEFAULT_PROJECTS[0];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(activeProject.codeSnippet);
    alert("Code copied to clipboard.");
  };

  const selectProject = (id: string) => {
    setSelectedId(id);
    setActiveTab("overview");
    router.replace(`/demos?project=${id}`, { scroll: false });
  };

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    const filtered = DEFAULT_PROJECTS.filter(
      (p) => cat === "All" || p.category === cat
    );
    if (filtered.length > 0) {
      setActiveTab("overview");
      setSelectedId(filtered[0].id);
      router.replace(`/demos?project=${filtered[0].id}`, { scroll: false });
    }
  };

  return (
    <main className="flex-grow max-w-7xl mx-auto w-full px-6">
        <div className={styles.header}>
          <h1 className={styles.pageTitle}>Projects</h1>
          <p className={styles.pageDesc}>
            Live demos, technical details, and code for selected projects. Pick a
            project to get started.
          </p>
        </div>

        <div className={styles.categoriesBar}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`${styles.catBtn} ${
                activeCategory === cat ? styles.catBtnActive : styles.catBtnInactive
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className={styles.dashboard}>
          <div className={styles.viewer}>
            <div className={styles.tabBar}>
              {(
                [
                  ["overview", "Overview"],
                  ["details", "Details"],
                  ["code", "Code"],
                ] as const
              ).map(([tab, label]) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`${styles.tabBtn} ${
                    activeTab === tab ? styles.tabBtnActive : styles.tabBtnInactive
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className={styles.workspace}>
              <div>
                <div className={styles.projectMeta}>
                  {activeProject.tech.map((t) => (
                    <span key={t} className={styles.projectTech}>
                      {t}
                    </span>
                  ))}
                </div>
                <h2 className={styles.projectName}>{activeProject.title}</h2>
                <p className={styles.projectDesc}>{activeProject.longDescription}</p>
              </div>

              <div className={styles.body}>
                {activeTab === "overview" && (
                  <div>
                    {activeProject.mediaUrl ? (
                      <div className={styles.demoFrame}>
                        <Image
                          src={activeProject.mediaUrl}
                          alt={activeProject.title}
                          fill
                          unoptimized
                          sizes="(min-width: 1024px) 60vw, 100vw"
                          style={{ objectFit: "contain" }}
                        />
                      </div>
                    ) : (
                      <div className={styles.demoFrameEmpty}>
                        <div className={styles.emptyIconBox}>
                          <span className="material-symbols-outlined text-4xl">
                            description
                          </span>
                        </div>
                        <div>
                          <h4 className={styles.emptyTitle}>
                            No recorded video
                          </h4>
                          <p className={styles.emptyDesc}>
                            There is no visual recording for this project yet. See
                            the Details and Code tabs for the full breakdown.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "details" && (
                  <div className={styles.specsPanel}>
                    {Object.entries(activeProject.specs).map(([key, val]) => (
                      <div key={key} className={styles.specsRow}>
                        <span className={styles.specsKey}>{key}</span>
                        <span className={styles.specsVal}>{val}</span>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "code" && (
                  <div className={styles.codePanel}>
                    <div className={styles.codeFrame}>
                      <div className={styles.codeHeader}>
                        <span>{activeProject.title.toLowerCase().replace(/\s+/g, "-")}.py</span>
                        <button onClick={handleCopyCode} className={styles.copyCodeBtn}>
                          <span className="material-symbols-outlined text-sm">
                            content_copy
                          </span>
                          Copy
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
            <div className={styles.projectList}>
              <div className={styles.projectListHeader}>
                <h3 className={styles.projectListTitle}>All projects</h3>
                <span className={styles.projectCount}>
                  {filteredProjects.length} shown
                </span>
              </div>

              {filteredProjects.map((proj) => {
                const isActive = proj.id === activeProjectId;
                return (
                  <button
                    key={proj.id}
                    onClick={() => selectProject(proj.id)}
                    className={`${styles.projectItem} ${
                      isActive ? styles.projectItemActive : styles.projectItemInactive
                    }`}
                  >
                    <span className={styles.projCategory}>{proj.category}</span>
                    <span className={styles.projName}>{proj.title}</span>
                    <span className={styles.projDesc}>{proj.description}</span>
                  </button>
                );
              })}

              {filteredProjects.length === 0 && (
                <p className={styles.emptyState}>No projects in this category.</p>
              )}
            </div>
          </div>
        </div>
    </main>
  );
}
