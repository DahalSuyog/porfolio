"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ContactModal from "./components/ContactModal";
import styles from "./home.module.css";

export default function Home() {
  const [showContactModal, setShowContactModal] = useState(false);
  return (
    <>
      <Navbar onContactClick={() => setShowContactModal(true)} activePage="home" />

      <main className="flex-grow pt-32">
        <section className={styles.hero} id="about">
          <div className={styles.heroInner}>
            <div className={styles.heroText}>
              <p className={styles.availability}>Available for new opportunities</p>
              <h1 className={styles.heroTitle}>Suyog Dahal</h1>
              <p className={styles.heroRole}>AI Engineer &amp; Researcher</p>
              <p className={styles.heroIntro}>
                I design and build machine intelligence — reinforcement learning
                agents, retrieval systems, and the full-stack applications around
                them. Based in Nepal, working with teams anywhere.
              </p>
              <div className={styles.heroActions}>
                <Link href="/#work" className={styles.ctaPrimary}>
                  View work
                </Link>
                <button onClick={() => setShowContactModal(true)} className={styles.ctaSecondary}>
                  Contact me
                </button>
              </div>
            </div>

            <div className={styles.heroVisual}>
              <div className={styles.visual}></div>
            </div>
          </div>
        </section>

        <section className={styles.section} id="skills">
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionLabel}>Skills</h2>
              <h3 className={styles.sectionTitle}>What I work with</h3>
              <p className={styles.sectionDesc}>
                A practical toolkit spanning low-level performance, modern web
                systems, and applied machine learning.
              </p>
            </div>

            <div className={styles.skillsGrid}>
              <div className={styles.skillCard}>
                <div className={styles.skillIcon}>
                  <span className="material-symbols-outlined text-2xl">code</span>
                </div>
                <h4 className={styles.skillTitle}>Core languages</h4>
                <p className={styles.skillDesc}>
                  Low-level performance with C/C++, rapid iteration in Python, and
                  type-safe JavaScript across the stack.
                </p>
                <div className={styles.skillTags}>
                  <span className={styles.skillTag}>C / C++</span>
                  <span className={styles.skillTag}>Python</span>
                  <span className={styles.skillTag}>JavaScript</span>
                </div>
              </div>

              <div className={styles.skillCard}>
                <div className={styles.skillIcon}>
                  <span className="material-symbols-outlined text-2xl">web</span>
                </div>
                <h4 className={styles.skillTitle}>Web architecture</h4>
                <p className={styles.skillDesc}>
                  Full-stack systems, dashboards, and interfaces built to be fast,
                  accessible, and maintainable.
                </p>
                <div className={styles.skillTags}>
                  <span className={styles.skillTag}>React / Next.js</span>
                  <span className={styles.skillTag}>Tailwind CSS</span>
                  <span className={styles.skillTag}>Node.js / PHP</span>
                </div>
              </div>

              <div className={styles.skillCard}>
                <div className={styles.skillIcon}>
                  <span className="material-symbols-outlined text-2xl">science</span>
                </div>
                <h4 className={styles.skillTitle}>Deep &amp; reinforcement learning</h4>
                <p className={styles.skillDesc}>
                  Designing and tuning models — from DQN agents in simulated
                  environments to RAG pipelines and object detection.
                </p>
                <div className={styles.skillTags}>
                  <span className={styles.skillTag}>PyTorch</span>
                  <span className={styles.skillTag}>LangChain</span>
                  <span className={styles.skillTag}>Deep-Q Learning</span>
                  <span className={styles.skillTag}>R-CNN</span>
                  <span className={styles.skillTag}>LLMs / RAG</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section} id="work">
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionLabel}>Selected work</h2>
              <h3 className={styles.sectionTitle}>Projects</h3>
              <p className={styles.sectionDesc}>
                A few systems I have designed, trained, and shipped. Each project
                has a live demo and documentation.
              </p>
            </div>

            <div className={styles.workGrid}>
              <div className={styles.workCard}>
                <div className={styles.workTags}>
                  <span className={styles.workTag}>Reinforcement learning</span>
                  <span className={styles.workTag}>OpenAI Gym</span>
                </div>
                <h4 className={styles.workTitle}>RL Dangerous Dave</h4>
                <p className={styles.workDesc}>
                  A DQN agent that plays the classic platformer “Dangerous Dave”,
                  trained in a custom OpenAI Gym environment to reach a 95%
                  completion rate within 500 episodes.
                </p>
                <Link href="/demos?project=dave-rl" className={styles.workLink}>
                  View demo
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </Link>
              </div>

              <div className={styles.workCard}>
                <div className={styles.workTags}>
                  <span className={styles.workTag}>RAG</span>
                  <span className={styles.workTag}>LLMs</span>
                </div>
                <h4 className={styles.workTitle}>RAG System with LLMs</h4>
                <p className={styles.workDesc}>
                  A retrieval-augmented generation pipeline using LangChain and
                  open-source models, with document chunking, vector indexing, and
                  contextual query inference.
                </p>
                <Link href="/demos?project=rag-llm" className={styles.workLink}>
                  View demo
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </Link>
              </div>

              <div className={styles.workCard}>
                <div className={styles.workTags}>
                  <span className={styles.workTag}>PyTorch</span>
                  <span className={styles.workTag}>Fuzzy logic</span>
                </div>
                <h4 className={styles.workTitle}>Traffic System Optimization</h4>
                <p className={styles.workDesc}>
                  An R-CNN model detects vehicle density in real time, with fuzzy
                  logic and image detection visualized through a custom Streamlit
                  interface.
                </p>
                <Link href="/demos?project=traffic-opt" className={styles.workLink}>
                  View demo
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </Link>
              </div>

              <div className={styles.workCard}>
                <div className={styles.workTags}>
                  <span className={styles.workTag}>Full-stack</span>
                  <span className={styles.workTag}>Systems C</span>
                </div>
                <h4 className={styles.workTitle}>Class Portal &amp; Maze-Runner</h4>
                <p className={styles.workDesc}>
                  A full-stack portal for administrators, teachers, and students
                  built with PHP and MySQL, alongside a 2D maze game written in raw
                  C with custom collision logic.
                </p>
                <Link href="/demos?project=maze-runner" className={styles.workLink}>
                  View demo
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section} id="experience">
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionLabel}>Experience</h2>
              <h3 className={styles.sectionTitle}>Education &amp; background</h3>
            </div>

            <div className={styles.timeline}>
              <div className={styles.timelineItem}>
                <span className={styles.timelineDate}>2021 – 2025</span>
                <div className={styles.timelineBody}>
                  <h4 className={styles.timelineTitle}>BE in Computer Engineering</h4>
                  <p className={styles.timelineOrg}>Purbanchal University</p>
                  <p className={styles.timelineDesc}>
                    Formal training in data structures and algorithms, computational
                    theory, artificial intelligence, computer networks, and database
                    systems.
                  </p>
                </div>
              </div>

              <div className={styles.timelineItem}>
                <span className={styles.timelineDate}>Present</span>
                <div className={styles.timelineBody}>
                  <h4 className={styles.timelineTitle}>Open to work</h4>
                  <p className={styles.timelineOrg}>Internship &amp; entry-level roles</p>
                  <p className={styles.timelineDesc}>
                    Seeking an internship or entry-level software or AI engineering
                    role where I can apply these skills to real-world challenges.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer onContactClick={() => setShowContactModal(true)} />

      {showContactModal && <ContactModal onClose={() => setShowContactModal(false)} />}
    </>
  );
}
