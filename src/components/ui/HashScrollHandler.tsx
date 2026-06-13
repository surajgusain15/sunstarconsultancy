"use client";

import { useEffect, useRef } from "react";

function HashScroller() {
  const attempted = useRef<Set<string>>(new Set());

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const id = hash.replace("#", "");
    if (attempted.current.has(id)) return;
    attempted.current.add(id);

    const navHeight = 80;

    const tryScroll = (): boolean => {
      const el = document.getElementById(id);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top, behavior: "smooth" });
        return true;
      }
      return false;
    };

    if (!tryScroll()) {
      const observer = new MutationObserver(() => {
        if (tryScroll()) observer.disconnect();
      });
      observer.observe(document.body, { childList: true, subtree: true });
      setTimeout(() => observer.disconnect(), 5000);
    }
  }, []);

  return null;
}

export default function HashScrollHandler() {
  return <HashScroller />;
}
