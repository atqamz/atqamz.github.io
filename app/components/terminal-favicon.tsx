"use client";

import * as React from "react";

const BLINK_INTERVAL = 650;
const ICON_ID = "terminal-favicon";

function makeSvg(accent: string, background: string, blinkOn: boolean) {
  const cursorOpacity = blinkOn ? "1" : "0";

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <rect width="64" height="64" rx="10" fill="${background}"/>
      <rect x="12" y="14" width="40" height="6" fill="${accent}" opacity="0.9"/>
      <rect x="12" y="28" width="34" height="6" fill="${accent}" opacity="0.75"/>
      <rect x="12" y="42" width="26" height="6" fill="${accent}" opacity="0.6"/>
      <rect x="40" y="42" width="12" height="6" fill="${accent}" opacity="${cursorOpacity}"/>
    </svg>
  `.trim();
}

export function TerminalFavicon() {
  React.useEffect(() => {
    const ensureLink = () => {
      let link = document.querySelector(`link[rel="icon"]#${ICON_ID}`) as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        link.id = ICON_ID;
        document.head.appendChild(link);
      }
      return link;
    };

    const getColors = () => {
      const styles = getComputedStyle(document.documentElement);
      const accent = styles.getPropertyValue("--accent").trim() || "#eec35e";
      const background = styles.getPropertyValue("--background").trim() || "#1a170f";
      return { accent, background };
    };

    let blinkOn = true;
    const link = ensureLink();

    const updateIcon = () => {
      const { accent, background } = getColors();
      const svg = makeSvg(accent, background, blinkOn);
      const href = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
      link.href = href;
    };

    updateIcon();

    const interval = window.setInterval(() => {
      blinkOn = !blinkOn;
      updateIcon();
    }, BLINK_INTERVAL);

    const observer = new MutationObserver(() => updateIcon());
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-palette", "class"],
    });

    return () => {
      window.clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  return null;
}
