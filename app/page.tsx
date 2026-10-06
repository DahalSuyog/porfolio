import React, { ViewTransition } from "react";
import Link from "next/link";
import InView from "./components/InView";
import HeroEpisode from "./components/HeroEpisode";
import ContactButton from "./components/ContactButton";
import { RndSchematic, TrafficSchematic } from "./components/Diagrams";
import { PROJECTS } from "./projects/data";
import styles from "./home.module.css";

const SKILLS = [
  {
    group: "Machine learning",
    items: "PyTorch, Gymnasium, Stable-Baselines3, PPO and RND, R-CNN, computer vision",
  },
  { group: "Languages", items: "Python, C and C++, JavaScript" },
  { group: "Web", items: "React, Next.js, Tailwind CSS, Node.js, PHP" },
];

const EXPERIENCE = [
  {
    dates: "Jan – Mar 2026",
    role: "AI/ML Intern",
    org: "Hobbs Technology",
    points: [
      "Designed and built an end-to-end retrieval-augmented generation (RAG) pipeline, pairing embedding models with the Qdrant vector database for semantic document retrieval.",
      "Developed document ingestion and chunking workflows to preprocess and embed unstructured data, improving retrieval accuracy.",
      "Applied prompt engineering to make LLM responses more reliable across use cases.",
    ],
  },
];

const NAME = "Suyog Dahal";

function delay(ms: number) {
  return { "--d": `${ms}ms` } as React.CSSProperties;
}

const DIAGRAMS = {
  "rnd-schematic": RndSchematic,
  "traffic-schematic": TrafficSchematic,
};

export default function Home() {
  return (
    <ViewTransition
      enter={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" }}
      exit={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" }}
      default="none"
    >
    <main>
      <section className={styles.hero} aria-labelledby="hero-name">
        <h1 id="hero-name" className={styles.name} aria-label={NAME}>
          {NAME.split(" ").map((word, w, words) => (
            <React.Fragment key={word}>
              <span className={styles.word} aria-hidden="true">
                <span style={delay(120 + w * 140)}>{word}</span>
              </span>
              {w < words.length - 1 && " "}
            </React.Fragment>
          ))}
        </h1>

        <div className={styles.heroGrid}>
          <div className={styles.heroText}>
            <p className={`${styles.lead} ${styles.heroIn}`} style={delay(650)}>
              I design and build machine intelligence through reinforcement-learning
              agents, computer-vision systems, and the full-stack applications
              around them.
            </p>
            <p className={`${styles.status} ${styles.heroIn}`} style={delay(780)}>
              Working from Kathmandu (GMT+5:45) with teams anywhere.
              <br />
              <span className={styles.openToWork}>Open to work.</span>
            </p>
            <div className={`${styles.actions} ${styles.heroIn}`} style={delay(900)}>
              <Link href="/#projects" className={styles.ctaPrimary}>
                See projects
              </Link>
              <ContactButton className={styles.ctaSecondary}>Contact</ContactButton>
            </div>
          </div>

          <div className={styles.heroEpisode}>
            <HeroEpisode />
          </div>
        </div>
      </section>

      <section id="projects" className={styles.section} aria-labelledby="projects-title">
        <InView className={`${styles.sectionHead} rule`}>
          <h2 id="projects-title" className={`${styles.sectionTitle} mask`} style={delay(250)}>
            <span>Projects</span>
          </h2>
        </InView>

        <div className={styles.projectList}>
          {PROJECTS.map((project) => {
            const Diagram = DIAGRAMS[project.diagram];
            return (
              <InView as="article" key={project.id} className={styles.project}>
                <div className={`${styles.projectMedia} reveal`}>
                  <Diagram />
                </div>
                <div className={`${styles.projectText} reveal`} style={delay(180)}>
                  <h3 className={styles.projectTitle}>
                    <Link
                      href={`/projects/${project.id}`}
                      className={styles.projectLink}
                      transitionTypes={["nav-forward"]}
                    >
                      {/* morphs into the case-study heading on navigation */}
                      <ViewTransition name={`project-title-${project.id}`} share="morph">
                        <span className={styles.projectTitleText}>{project.title}</span>
                      </ViewTransition>
                    </Link>
                  </h3>
                  <p className={styles.projectSummary}>{project.summary}</p>
                  <dl className={styles.facts}>
                    {project.facts.map(([key, value]) => (
                      <div key={key} className={styles.fact}>
                        <dt>{key}</dt>
                        <dd>{value}</dd>
                      </div>
                    ))}
                  </dl>
                  <span className={styles.projectMore} aria-hidden="true">
                    Read the case study
                  </span>
                </div>
              </InView>
            );
          })}
        </div>
      </section>

      <InView
        as="section"
        id="experience"
        className={`${styles.sideSection} rule`}
        aria-labelledby="experience-title"
      >
        <h2 id="experience-title" className={`${styles.sectionTitle} mask`} style={delay(250)}>
          <span>Experience</span>
        </h2>
        <div>
          {EXPERIENCE.map((job, i) => (
            <div
              key={job.org}
              className={`${styles.education} reveal`}
              style={delay(380 + i * 120)}
            >
              <p className={styles.eduDates}>{job.dates}</p>
              <div>
                <h3 className={styles.eduTitle}>{job.role}</h3>
                <p className={styles.eduOrg}>{job.org}</p>
                <ul className={styles.expPoints}>
                  {job.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </InView>

      <InView
        as="section"
        id="skills"
        className={`${styles.sideSection} rule`}
        aria-labelledby="skills-title"
      >
        <h2 id="skills-title" className={`${styles.sectionTitle} mask`} style={delay(250)}>
          <span>Skills</span>
        </h2>
        <dl className={styles.skills}>
          {SKILLS.map((skill, i) => (
            <div
              key={skill.group}
              className={`${styles.skillRow} reveal`}
              style={delay(350 + i * 120)}
            >
              <dt>{skill.group}</dt>
              <dd>{skill.items}</dd>
            </div>
          ))}
        </dl>
      </InView>

      <InView
        as="section"
        id="education"
        className={`${styles.sideSection} rule`}
        aria-labelledby="education-title"
      >
        <h2 id="education-title" className={`${styles.sectionTitle} mask`} style={delay(250)}>
          <span>Education</span>
        </h2>
        <div className={`${styles.education} reveal`} style={delay(380)}>
          <p className={styles.eduDates}>2021 – 2025</p>
          <div>
            <h3 className={styles.eduTitle}>BE in Computer Engineering</h3>
            <p className={styles.eduOrg}>Purbanchal University</p>
            <p className={styles.eduDesc}>
              Data structures and algorithms, computational theory, artificial
              intelligence, computer networks, and database systems.
            </p>
          </div>
        </div>
      </InView>
    </main>
    </ViewTransition>
  );
}
