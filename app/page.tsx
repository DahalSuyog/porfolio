"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ContactModal from "./components/ContactModal";
import RewardCurve from "./components/RewardCurve";
import CurveDivider from "./components/CurveDivider";
import Reveal from "./components/Reveal";
import styles from "./home.module.css";

const WORK_PROJECTS = [
  {
    id: "dave-rl",
    tags: ["Reinforcement learning", "PPO + RND"],
    title: "RL Dangerous Dave",
    desc: "A PPO agent augmented with Random Network Distillation plays a PyGame re-creation of Dangerous Dave, wrapped as a custom Gymnasium environment — curiosity, not just score, drives the learning.",
    stat: { value: "2", label: "reward streams: game score + intrinsic curiosity" },
  },
  {
    id: "rag-llm",
    tags: ["RAG", "LLMs"],
    title: "RAG System with LLMs",
    desc: "A retrieval-augmented generation pipeline using LangChain and open-source models, with document chunking, vector indexing, and contextual query inference.",
    stat: { value: "k = 3", label: "sources retrieved per query" },
  },
  {
    id: "traffic-opt",
    tags: ["PyTorch", "Fuzzy logic"],
    title: "Traffic System Optimization",
    desc: "An R-CNN model detects vehicle density in real time, with fuzzy logic and image detection visualized through a custom Streamlit interface.",
    stat: { value: "0.7", label: "detection confidence threshold" },
  },
  {
    id: "maze-runner",
    tags: ["Full-stack", "Systems C"],
    title: "Class Portal & Maze-Runner",
    desc: "A full-stack portal for administrators, teachers, and students built with PHP and MySQL, alongside a 2D maze game written in raw C with custom collision logic.",
    stat: { value: "0", label: "game frameworks, written in raw C" },
  },
];

export default function Home() {
  const [showContactModal, setShowContactModal] = useState(false);
  return (
    <>
      <Navbar onContactClick={() => setShowContactModal(true)} activePage="home" />

      <main className="flex-grow pt-32">
        <section className={styles.hero} id="about">
          <div className={styles.heroInner}>
            <div className={styles.heroText}>
              <p className={`${styles.availability} ${styles.heroFade1}`}>
                Available for new opportunities
              </p>
              <div className={styles.heroMask}>
                <h1 className={styles.heroTitle}>Suyog Dahal</h1>
              </div>
              <p className={`${styles.heroRole} ${styles.heroFade1}`}>
                AI Engineer &amp; Researcher
              </p>
              <p className={`${styles.heroIntro} ${styles.heroFade2}`}>
                I design and build machine intelligence — reinforcement learning
                agents, retrieval systems, and the full-stack applications around
                them. Working from Kathmandu (GMT+5:45) with teams anywhere.
              </p>
              <div className={`${styles.heroActions} ${styles.heroFade3}`}>
                <Link href="/#work" className={styles.ctaPrimary}>
                  View work
                </Link>
                <button onClick={() => setShowContactModal(true)} className={styles.ctaSecondary}>
                  Contact me
                </button>
              </div>
            </div>

            <div className={`${styles.heroVisual} ${styles.heroFade2}`}>
              <figure className={styles.curvePanel}>
                <RewardCurve />
                <figcaption className={styles.curveCaption}>
                  <span className={styles.curveCaptionLabel}>Reward per episode</span>
                  <span className={styles.curveCaptionValue}>500 training episodes</span>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section className={styles.section} id="skills">
          <div className={styles.container}>
            <CurveDivider />
            <Reveal>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionLabel}>Skills</h2>
                <h3 className={styles.sectionTitle}>What I work with</h3>
                <p className={styles.sectionDesc}>
                  A practical toolkit spanning low-level performance, modern web
                  systems, and applied machine learning.
                </p>
              </div>
            </Reveal>

            <div className={styles.skillsGrid}>
              {[
                {
                  icon: "code",
                  title: "Core languages",
                  desc: "Low-level performance with C/C++, rapid iteration in Python, and type-safe JavaScript across the stack.",
                  tags: ["C / C++", "Python", "JavaScript"],
                },
                {
                  icon: "web",
                  title: "Web architecture",
                  desc: "Full-stack systems, dashboards, and interfaces built to be fast, accessible, and maintainable.",
                  tags: ["React / Next.js", "Tailwind CSS", "Node.js / PHP"],
                },
                {
                  icon: "science",
                  title: "Deep & reinforcement learning",
                  desc: "Designing and tuning models — from DQN agents in simulated environments to RAG pipelines and object detection.",
                  tags: ["PyTorch", "LangChain", "Deep-Q Learning", "R-CNN", "LLMs / RAG"],
                },
              ].map((skill, i) => (
                <Reveal key={skill.title} delay={i * 100} className={styles.skillReveal}>
                  <div className={styles.skillCard}>
                    <div className={styles.skillIcon}>
                      <span className="material-symbols-outlined text-2xl">{skill.icon}</span>
                    </div>
                    <h4 className={styles.skillTitle}>{skill.title}</h4>
                    <p className={styles.skillDesc}>{skill.desc}</p>
                    <div className={styles.skillTags}>
                      {skill.tags.map((tag) => (
                        <span key={tag} className={styles.skillTag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section} id="work">
          <div className={styles.container}>
            <CurveDivider />
            <Reveal>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionLabel}>Selected work</h2>
                <h3 className={styles.sectionTitle}>Projects</h3>
                <p className={styles.sectionDesc}>
                  A few systems I have designed, trained, and shipped. Each project
                  has a live demo and documentation.
                </p>
              </div>
            </Reveal>

            <div className={styles.workGrid}>
              {WORK_PROJECTS.map((project, i) => (
                <Reveal key={project.id} delay={i * 100} className={styles.workReveal}>
                  <div className={styles.workCard}>
                    <div className={styles.workTags}>
                      {project.tags.map((tag) => (
                        <span key={tag} className={styles.workTag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h4 className={styles.workTitle}>{project.title}</h4>
                    <p className={styles.workDesc}>{project.desc}</p>
                    <div className={styles.workStat}>
                      <span className={styles.workStatValue}>{project.stat.value}</span>
                      <span className={styles.workStatLabel}>{project.stat.label}</span>
                    </div>
                    <Link href={`/demos?project=${project.id}`} className={styles.workLink}>
                      View demo
                      <span className="material-symbols-outlined text-base">arrow_forward</span>
                    </Link>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section} id="experience">
          <div className={styles.container}>
            <CurveDivider />
            <Reveal>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionLabel}>Experience</h2>
                <h3 className={styles.sectionTitle}>Education &amp; background</h3>
              </div>
            </Reveal>

            <div className={styles.timeline}>
              <Reveal variant="left">
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
              </Reveal>

              <Reveal variant="left" delay={120}>
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
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <Footer onContactClick={() => setShowContactModal(true)} />

      {showContactModal && <ContactModal onClose={() => setShowContactModal(false)} />}
    </>
  );
}
