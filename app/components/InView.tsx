"use client";

import React, { useEffect, useRef, useState } from "react";

type Tag = "div" | "section" | "article" | "dl" | "figure" | "nav";

type InViewProps = {
  as?: Tag;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

/*
 * Marks its element data-inview="true" the first time it scrolls into view.
 * Animations are pure CSS keyed off that attribute (see the "Scroll reveals"
 * block in globals.css), and they only hide content once JS has loaded, so
 * nothing stays invisible without it.
 */
export default function InView({ as: Tag = "div", children, ...rest }: InViewProps) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      data-inview={inView ? "true" : "false"}
      {...rest}
    >
      {children}
    </Tag>
  );
}
