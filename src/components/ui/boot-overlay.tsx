"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export function BootOverlay() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 1900);
    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div className="macos-boot fixed inset-0 z-[2000] flex flex-col items-center justify-center bg-black text-white">
      <Image
        src="/apple-logo.png"
        alt=""
        aria-hidden="true"
        width={80}
        height={80}
        className="macos-boot-logo h-20 w-20 object-contain invert"
      />
      <div className="mt-12 h-1 w-56 overflow-hidden rounded-full bg-white/20">
        <div className="macos-boot-progress h-full w-full origin-left rounded-full bg-white" />
      </div>
    </div>
  );
}
