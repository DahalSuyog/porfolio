"use client";

import React, { useState } from "react";
import { createPortal } from "react-dom";
import ContactModal from "./ContactModal";

interface ContactButtonProps {
  className?: string;
  children: React.ReactNode;
  /** Called when the dialog opens, e.g. to close a menu */
  onOpen?: () => void;
}

/** A button that owns the contact dialog, so pages can stay server components. */
export default function ContactButton({ className, children, onOpen }: ContactButtonProps) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
    onOpen?.();
  };

  return (
    <>
      <button type="button" className={className} onClick={handleClick}>
        {children}
      </button>
      {/* portalled so a hidden parent (the folded mobile menu) can't hide it */}
      {open && createPortal(<ContactModal onClose={() => setOpen(false)} />, document.body)}
    </>
  );
}
