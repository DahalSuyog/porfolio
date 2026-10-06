"use client";

import React, { useEffect, useState } from "react";

interface CopyButtonProps {
  text: string;
  label: string;
  className?: string;
}

/** Copies text and confirms inline ("Copied") instead of an alert. */
export default function CopyButton({ text, label, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      // clipboard blocked: leave the label as-is, the text is still selectable
    }
  };

  return (
    <button type="button" onClick={copy} className={className}>
      <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: "1rem" }}>
        {copied ? "check" : "content_copy"}
      </span>
      <span aria-live="polite">{copied ? "Copied" : label}</span>
    </button>
  );
}
