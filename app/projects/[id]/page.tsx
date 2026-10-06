import type { Metadata } from "next";
import React, { ViewTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CopyButton from "../../components/CopyButton";
import InView from "../../components/InView";
import { RndSchematic, TrafficSchematic } from "../../components/Diagrams";
import { PROJECTS, getProject } from "../data";
import styles from "./project.module.css";

function delay(ms: number) {
  return { "--d": `${ms}ms` } as React.CSSProperties;
}

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ id: project.id }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps<"/projects/[id]">): Promise<Metadata> {
  const { id } = await params;
  const project = getProject(id);
  if (!project) return {};
  return {
    title: `${project.title} | Suyog Dahal`,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[id]">) {
  const { id } = await params;
  const project = getProject(id);
  if (!project) notFound();

  const index = PROJECTS.indexOf(project);
  const next = PROJECTS[(index + 1) % PROJECTS.length];

  return (
    <ViewTransition
      enter={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" }}
      exit={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" }}
      default="none"
    >
    <main className={styles.page}>
      <Link href="/#projects" className={styles.back} transitionTypes={["nav-back"]}>
        <span className="material-symbols-outlined" aria-hidden="true">arrow_back</span>
        All projects
      </Link>

      <header className={styles.header}>
        {/* same name as the home-page row title, so it morphs in */}
        <ViewTransition name={`project-title-${project.id}`} share="morph">
          <h1 className={styles.title}>{project.title}</h1>
        </ViewTransition>
        <p className={`${styles.lead} ${styles.loadIn}`} style={delay(150)}>
          {project.summary}
        </p>
        <p className={`${styles.tech} ${styles.loadIn}`} style={delay(280)}>
          <span className={styles.techLabel}>Built with</span> {project.tech.join(", ")}
        </p>
      </header>

      <figure className={`${styles.media} ${styles.loadIn}`} style={delay(400)}>
        {project.media === "dave-gif" ? (
          <div className={styles.screen}>
            <Image
              src="/demo_gifs/dangerous_dave_rl-gif.gif"
              alt="A reinforcement-learning agent playing a level of Dangerous Dave"
              width={800}
              height={500}
              unoptimized
              loading="eager"
              className={styles.gif}
            />
          </div>
        ) : (
          <div className={styles.diagramFrame}>
            <TrafficSchematic />
          </div>
        )}
        <figcaption className={styles.caption}>{project.mediaCaption}</figcaption>
      </figure>

      <div className={styles.columns}>
        <section aria-labelledby="how-title">
          <InView>
            <h2 id="how-title" className={`${styles.h2} mask`}>
              <span>How it works</span>
            </h2>
            <div className={styles.prose}>
              {project.body.map((paragraph, i) => (
                <p key={paragraph} className="reveal" style={delay(120 + i * 110)}>
                  {paragraph}
                </p>
              ))}
            </div>
          </InView>
          {project.diagram === "rnd-schematic" && (
            <InView as="figure" className={styles.inlineDiagram}>
              <div className={styles.diagramFrame}>
                <RndSchematic />
              </div>
              <figcaption className={styles.caption}>
                Random Network Distillation: the predictor&rsquo;s error on a frame
                is the curiosity reward for reaching it.
              </figcaption>
            </InView>
          )}
        </section>

        <InView as="section" aria-labelledby="specs-title">
          <h2 id="specs-title" className={`${styles.h2} mask`}>
            <span>Specs</span>
          </h2>
          <dl className={styles.specs}>
            {project.specs.map(([key, value], i) => (
              <div
                key={key}
                className={`${styles.specRow} rule reveal`}
                style={delay(200 + i * 70)}
              >
                <dt>{key}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </InView>
      </div>

      <InView as="section" className={styles.codeSection} aria-labelledby="code-title">
        <h2 id="code-title" className={`${styles.h2} mask`}>
          <span>{project.codeTitle}</span>
        </h2>
        <div className={`${styles.codeFrame} reveal`} style={delay(150)}>
          <div className={styles.codeHeader}>
            <span>{project.codeFile}</span>
            <CopyButton text={project.code} label="Copy code" className={styles.copyBtn} />
          </div>
          <pre className={styles.codeBlock} tabIndex={0}>
            <code>{project.code}</code>
          </pre>
        </div>
      </InView>

      <InView as="nav" className={`${styles.next} rule`} aria-label="Next project">
        <span className={`${styles.nextLabel} reveal`} style={delay(200)}>Next project</span>
        <span className="mask" style={delay(300)}>
          <Link
            href={`/projects/${next.id}`}
            className={styles.nextLink}
            transitionTypes={["nav-forward"]}
          >
            {next.title}
          </Link>
        </span>
      </InView>
    </main>
    </ViewTransition>
  );
}
