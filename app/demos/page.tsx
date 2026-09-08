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
  /** Scoped accent color used only inside this project's detail panel */
  accent: string;
  description: string;
  longDescription: string;
  tech: string[];
  mediaUrl?: string;
  specs: Record<string, string>;
  codeSnippet: string;
}

const CATEGORIES = ["All", "Deep Learning"];

const DEFAULT_PROJECTS: Project[] = [
  {
    id: "dave-rl",
    title: "RL Dangerous Dave",
    category: "Deep Learning",
    accent: "#e05a3a",
    description:
      "A curiosity-driven PPO agent for a PyGame Dangerous Dave environment.",
    longDescription:
      "A playable PyGame re-creation of Dangerous Dave, the 1990 DOS platformer, wrapped as a Gymnasium environment and solved with PPO augmented by Random Network Distillation. A frozen target network and a trainable predictor turn prediction error on novel frames into intrinsic curiosity, so the agent explores well beyond what the score reward alone would teach it. Observations are 4-frame stacks of grayscale captures (with text and grid modes available), training runs on parallel vectorized environments, and every evaluation is automatically exported to video with ffmpeg.",
    tech: ["PyTorch", "Gymnasium", "Stable-Baselines3", "PyGame", "NumPy"],
    mediaUrl: "/demo_gifs/dangerous_dave_rl-gif.gif",
    specs: {
      "Algorithm": "PPO + Random Network Distillation (RND)",
      "Curiosity reward": "Prediction error against a frozen target network",
      "Network": "Shared CNN trunk, actor + extrinsic/intrinsic value heads",
      "Action space": "Discrete(7): movement, diagonal jumps, no-op",
      "Observations": "4 stacked grayscale frames; text and grid modes",
      "Reward shaping": "Score delta per step, -0.1 step penalty",
      "Training setup": "4 parallel envs, 1,000-step rollouts, annealed lr",
    },
    codeSnippet: `from torch.distributions.categorical import Categorical
from algos.utils import layer_init

class Agent(nn.Module):
    def __init__(self, envs):
        super().__init__()
        self.network = nn.Sequential(
            layer_init(nn.Conv2d(4, 32, 8, stride=4)),
            nn.ReLU(),
            layer_init(nn.Conv2d(32, 64, 4, stride=2)),
            nn.ReLU(),
            layer_init(nn.Conv2d(64, 64, 3, stride=1)),
            nn.ReLU(),
            nn.Flatten(),
            layer_init(nn.Linear(64 * 8 * 4, 256)),
            nn.ReLU(),
            layer_init(nn.Linear(256, 448)),
            nn.ReLU(),
        )
        self.actor = nn.Sequential(
            layer_init(nn.Linear(448, 448), std=0.01),
            nn.ReLU(),
            layer_init(nn.Linear(448, envs.single_action_space.n), std=0.01),
        )
        # two critics: extrinsic (game score) and intrinsic (curiosity)
        self.critic_ext = layer_init(nn.Linear(448, 1), std=0.01)
        self.critic_int = layer_init(nn.Linear(448, 1), std=0.01)

    def get_action_and_value(self, x, action=None):
        hidden = self.network(x / 255.0)
        logits = self.actor(hidden)
        probs = Categorical(logits=logits)
        if action is None:
            action = probs.sample()
        return action, probs.log_prob(action), probs.entropy(), \\
               self.critic_ext(hidden), self.critic_int(hidden)`,
  },
  {
    id: "traffic-opt",
    title: "Traffic System Optimization",
    category: "Deep Learning",
    accent: "#e0a13c",
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
            Technical notes and implementation excerpts for selected projects.
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
          <div
            className={styles.viewer}
            style={{ "--project-accent": activeProject.accent } as React.CSSProperties}
          >
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
                    style={{ "--item-accent": proj.accent } as React.CSSProperties}
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
