"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

type SiteLogoProps = {
  compact?: boolean;
  className?: string;
};

export function SiteLogo({ compact = false, className }: SiteLogoProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      {!failed ? (
        <Image
          src="/logo.png"
          alt="Dr. Nishanth S logo"
          width={compact ? 36 : 44}
          height={compact ? 36 : 44}
          className="h-auto w-auto rounded-md object-contain"
          onError={() => setFailed(true)}
          priority
        />
      ) : (
        <div
          className={cn(
            "flex items-center justify-center rounded-md border border-dashed border-slate-300 bg-slate-50 text-[10px] font-medium text-slate-500",
            compact ? "h-9 w-9" : "h-11 w-11",
          )}
          aria-label="Logo placeholder"
        >
          LOGO
        </div>
      )}

      {!compact && (
        <div className="leading-tight">
          <div className="font-serif text-lg font-semibold text-[var(--color-text)]">Dr. Nishanth S</div>
          <div className="font-accent text-[10px] tracking-[0.18em] text-[var(--color-muted)]">UROLOGY</div>
        </div>
      )}
    </div>
  );
}
