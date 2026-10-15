"use client";

import { useEffect, useRef } from "react";

// Ad unit slot IDs from AdSense (Ads > By ad unit).
// Add new slots here as they are created in the AdSense dashboard.
export const AD_SLOTS = {
  /** ToolPage-InContent-Horizontal — used on tool pages and homepage */
  inContent: "5649977497",
} as const;

interface AdBannerProps {
  className?: string;
  slot?: string;
  format?: "horizontal" | "vertical" | "square";
  responsive?: boolean;
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export default function AdBanner({
  className = "",
  slot = AD_SLOTS.inContent,
  format = "horizontal",
  responsive = true,
}: AdBannerProps) {
  const adRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  const style: React.CSSProperties = {};
  if (format === "horizontal") {
    style.width = "100%";
    style.maxWidth = "100%";
    style.height = "100px";
  } else if (format === "vertical") {
    style.width = "300px";
    style.height = "600px";
  } else {
    style.width = "300px";
    style.height = "250px";
  }

  return (
    <div className={`ad-container my-6 flex justify-center ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{
          display: "block",
          ...style,
        }}
        data-ad-client="ca-pub-0050898365765606"
        data-ad-slot={slot}
        data-ad-format={responsive ? "auto" : undefined}
        data-full-width-responsive={responsive ? "true" : undefined}
      />
    </div>
  );
}
