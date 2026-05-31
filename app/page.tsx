"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "./components/Navbar";
import styles from "./home.module.css";

export default function Home() {
  const [showContactModal, setShowContactModal] = useState(false);
  return (
    <>
      <Navbar onContactClick={() => setShowContactModal(true)} activePage="home" />

      <main className="flex-grow pt-32">
        <section className={`${styles.hero} tech-grid`} id="about">
          <div className={styles.heroOverlay}></div>
          <div className={styles.heroContainer}>
            <div className={styles.heroTextCol}>
              <div className={styles.statusBadge}>
                <span className={styles.statusDot}></span>
                System Online
              </div>
              <h1 className={styles.heroTitle}>
                THE <br />
                <span className={styles.heroHighlight}>
                  AI ENGINEER
                </span>
              </h1>
              <p className={styles.heroDesc}>
                Aspiring AI Researcher & Software Engineer. Building robust machine intelligence and full-stack solutions, with a deep passion for Reinforcement Learning and Neural Architecture.
              </p>
              <div className={styles.heroActions}>
                <Link href="/demos" className={styles.launchBtn}>
                  Launch Demos
                </Link>
                <a href="https://github.com" target="_blank" rel="noreferrer" className={styles.githubBtn}>
                  <span>GitHub Repository</span>
                </a>
              </div>
            </div>
            
            <div className={styles.heroVisual}>
              <div className={styles.visualContainer}>
                <div className={styles.visualGradient}></div>
                <div className={styles.visualPattern}>
                   <div className={styles.outerRing}>
                     <div className={styles.innerRing}></div>
                   </div>
                </div>
                
                <div className={`${styles.floatingNode}`} style={{ top: '25%', left: '25%' }}>
                  <span className="material-symbols-outlined text-primary">polyline</span>
                </div>
                <div className={`${styles.floatingNode}`} style={{ bottom: '33%', right: '25%' }}>
                  <span className="material-symbols-outlined text-primary">network_node</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.skillsSection} id="stack">
          <div className={styles.skillsContainer}>
            <div className={styles.skillsHeader}>
              <div>
                <h2 className={styles.sectionLabel}>
                  Core Competencies
                </h2>
                <h3 className={styles.sectionTitle}>
                  Neural Infrastructure
                </h3>
              </div>
              <p className={styles.skillsSubText}>
                Specialized stacks engineered for high-performance agent training, web systems, and environment simulation.
              </p>
            </div>

            <div className={styles.skillsGrid}>
              <div className={styles.skillCard}>
                <div className={styles.skillIconBox}>
                  <span className={`material-symbols-outlined ${styles.skillIcon}`}>code</span>
                </div>
                <h4 className={styles.skillTitle}>Core Languages</h4>
                <p className={styles.skillDesc}>
                  Low-level performance handling with C/C++ alongside rapid iteration in Python & JS.
                </p>
                <div className={styles.skillTags}>
                  <span className={styles.skillTag}>C / C++</span>
                  <span className={styles.skillTag}>Python</span>
                  <span className={styles.skillTag}>JavaScript</span>
                </div>
              </div>

              <div className={styles.skillCard}>
                <div className={styles.skillIconBox}>
                  <span className={`material-symbols-outlined ${styles.skillIcon}`}>webhook</span>
                </div>
                <h4 className={styles.skillTitle}>Web Architecture</h4>
                <p className={styles.skillDesc}>
                  Building full-stack systems, dynamic dashboards, and bespoke interfaces.
                </p>
                <div className={styles.skillTags}>
                  <span className={styles.skillTag}>React/Next.js</span>
                  <span className={styles.skillTag}>Tailwind CSS</span>
                  <span className={styles.skillTag}>Node.js / PHP</span>
                </div>
              </div>

              <div className={`${styles.skillCard} ${styles.skillCardWide}`}>
                <div className={styles.skillIconBox}>
                  <span className={`material-symbols-outlined ${styles.skillIcon}`}>memory</span>
                </div>
                <h4 className={styles.skillTitle}>Deep / Reinforcement Learning</h4>
                <p className={`${styles.skillDesc} ${styles.skillDescWide}`}>
                  Implementation and tuning of state-of-the-art AI algorithms. From Deep-Q networks in simulated environments to custom RAG ingestion pipelines and object detection architectures.
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

        <section className={styles.projectsSection} id="archive">
          <div className={styles.projectsContainer}>
            <div className="mb-16">
              <h2 className={styles.sectionLabel}>
                Case Studies
              </h2>
              <h3 className={styles.sectionTitle}>
                Applied Intelligence
              </h3>
            </div>

            <div className={styles.projectsGrid}>
              
              <div className={`${styles.projectCard} ${styles.projectCardLarge}`}>
                <div className={styles.projectOverlay}></div>
                <div className={styles.projectContent}>
                  <div className={styles.projectTags}>
                    <span className={`${styles.projectTag} ${styles.projectTagPrimary}`}>
                      Reinforcement Learning
                    </span>
                    <span className={`${styles.projectTag} ${styles.projectTagDefault}`}>
                      OpenAI Gym
                    </span>
                  </div>
                  <h4 className={styles.projectTitle}>
                    RL Dangerous Dave
                  </h4>
                  <p className={styles.projectDesc}>
                    Created a Reinforcement Learning agent to play the classic platformer 'Dangerous Dave' by building a custom game environment. Optimized a DQN agent to achieve a 95% success rate in level completion within 500 training episodes through trial-and-error learning and effective reward structure design.
                  </p>
                  <Link href="/demos?project=dave-rl" className={styles.projectLink}>
                    View Live Demo <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>
                </div>
              </div>

              <div className={`${styles.projectCard} ${styles.projectCardSmall}`}>
                <div className="p-10 h-full flex flex-col justify-between z-20 relative">
                  <div>
                    <div className={styles.skillIconBox}>
                      <span className={`material-symbols-outlined ${styles.skillIcon}`}>search_insights</span>
                    </div>
                    <h4 className={`${styles.projectTitle} ${styles.projectTitleSmall}`}>
                      RAG System with LLMs
                    </h4>
                    <p className="text-sm text-on-surface-variant font-body font-light leading-relaxed">
                      Developed a Retrieval-Augmented Generation (RAG) system to enhance language model responses via LangChain & Hugging Face. Implemented document processing workflows and integrated open-source models for contextual query inference.
                    </p>
                  </div>
                  <div className="mt-8">
                    <div className={styles.skillTags}>
                      <span className={styles.skillTag}>LangChain</span>
                      <span className={styles.skillTag}>LLMs</span>
                    </div>
                    <Link href="/demos?project=rag-llm" className={`${styles.projectLink} ${styles.projectLinkOutline} ${styles.projectLinkSmall} mt-8`}>
                      View Live Demo <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              </div>

              <div className={`${styles.projectCard} ${styles.projectCardMedium}`}>
                <div className="p-10 h-full flex flex-col justify-between z-20 relative">
                  <div>
                    <h4 className={`${styles.projectTitle} ${styles.projectTitleSmall}`}>
                      Traffic System Optimization
                    </h4>
                    <p className="text-sm text-on-surface-variant font-body font-light leading-relaxed">
                      Implemented an R-CNN model using PyTorch to detect vehicle density in real-time. Built a custom UI in Streamlit to observe traffic footage on which image detection and fuzzy logic are actively visualized.
                    </p>
                  </div>
                  <div className="mt-8 flex justify-between items-center">
                    <div className={styles.skillTags}>
                      <span className={styles.skillTag}>PyTorch</span>
                      <span className={styles.skillTag}>Fuzzy Logic</span>
                    </div>
                    <Link href="/demos?project=traffic-opt" className={styles.projectLinkText}>
                      Live Demo <span className="material-symbols-outlined text-xs">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              </div>

              <div className={`${styles.projectCard} ${styles.projectCardMedium}`} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '2.5rem' }}>
                 <div>
                    <h4 className={`${styles.projectTitle} ${styles.projectTitleSmall} mb-2`}>Class Portal</h4>
                    <p className="text-sm text-on-surface-variant font-body font-light mb-6">
                      Full-stack web app tailored for Administrators, Teachers, and Students using PHP and MySQL.
                    </p>
                    <h4 className={`${styles.projectTitle} ${styles.projectTitleSmall} mb-2`}>Maze-Runner</h4>
                    <p className="text-sm text-on-surface-variant font-body font-light">
                      A 2D interactive maze game written in raw C, deploying collision logic and UI loops.
                    </p>
                  </div>
                  <div className="mt-8 flex justify-between items-center">
                    <div className="flex gap-2">
                       <span className={styles.skillTag}>Full-Stack</span>
                       <span className={styles.skillTag}>Systems C</span>
                    </div>
                    <Link href="/demos?project=maze-runner" className={styles.projectLinkText}>
                      Solve Maze <span className="material-symbols-outlined text-xs">arrow_forward</span>
                    </Link>
                  </div>
              </div>

            </div>
          </div>
        </section>

        <section className={styles.timelineSection} id="experience">
          <div className={styles.timelineContainer}>
            <div className={styles.timelineHeader}>
              <h2 className={styles.sectionLabel}>
                Operational History
              </h2>
              <h3 className={styles.sectionTitle}>
                Education & Experience
              </h3>
            </div>

            <div className={styles.timelineWrapper}>
              <div className={styles.timelineLine}></div>
              <div className={styles.timelineLineMobile}></div>

              <div className={styles.timelineEvent}>
                <div className={`${styles.timelineContent} ${styles.timelineContentLeft}`}>
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
                <div className={`${styles.timelineDot} ${styles.timelineDotPrimary}`} style={{ left: '-5px', top: '2rem' }}></div>
                <div className="md:w-[45%] text-left pl-8 md:pl-12 hidden md:block" style={{ marginLeft: '0' }}>
                  <div className={styles.timelineDate}>
                    Jan 2021 - Aug 2025
                  </div>
                </div>
              </div>

              <div className={`${styles.timelineEvent} ${styles.timelineEventReverse}`}>
                <div className={`${styles.timelineContent} ${styles.timelineContentRight}`}>
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
                <div className={`${styles.timelineDot} ${styles.timelineDotSecondary}`} style={{ left: '-5px', top: '2rem' }}></div>
                <div className="md:w-[45%] text-left md:text-right pr-0 md:pr-12 ml-8 md:ml-0 hidden md:block">
                  <div className={styles.timelineDate}>
                    Present
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerLinks}>
            <a className={styles.footerLink} href="https://github.com" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a className={styles.footerLink} href="https://linkedin.com" target="_blank" rel="noreferrer">
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
    </>
  );
}
