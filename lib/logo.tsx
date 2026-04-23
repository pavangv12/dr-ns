import React from "react";

type LogoProps = {
  className?: string;
};

function ShieldMonogram({ className }: LogoProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      role="img"
      aria-label="Dr. Nishanth S monogram mark"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="shieldGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0B5FA5" />
          <stop offset="100%" stopColor="#084A83" />
        </linearGradient>
      </defs>
      <path
        d="M32 4 L54 12 V29 C54 44 44 55 32 60 C20 55 10 44 10 29 V12 Z"
        fill="url(#shieldGrad)"
      />
      <path
        d="M32 11 V49"
        stroke="#F7F9FC"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M24 21 C24 18.5 25.8 17 28.2 17 C30.9 17 32.5 19 32.5 21.4 C32.5 23.8 31.3 25.3 29.4 26.8"
        fill="none"
        stroke="#F7F9FC"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M40 19 C38.5 20.4 37.8 21.6 37.8 23.1 C37.8 24.8 38.8 26.4 40.9 28"
        fill="none"
        stroke="#1B9C85"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M41 28.2 C38.3 29.7 36.8 31.1 36.8 33.2 C36.8 35.8 38.9 37.3 41.6 38.2"
        fill="none"
        stroke="#1B9C85"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="32" cy="9" r="2.2" fill="#C8933A" />
    </svg>
  );
}

export function LogoIcon({ className }: LogoProps) {
  return <ShieldMonogram className={className ?? "h-8 w-8"} />;
}

export function LogoFull({ className }: LogoProps) {
  return (
    <div className={className ?? "inline-flex items-center gap-2"}>
      <ShieldMonogram className="h-9 w-9" />
      <div className="leading-tight">
        <div className="font-serif text-lg font-semibold text-[var(--color-text)]">Dr. Nishanth S</div>
        <div className="font-accent text-[10px] tracking-[0.18em] text-[var(--color-muted)]">UROLOGY</div>
      </div>
    </div>
  );
}

export function LogoWhite({ className }: LogoProps) {
  return (
    <div className={className ?? "inline-flex items-center gap-2"}>
      <svg
        viewBox="0 0 64 64"
        role="img"
        aria-label="Dr. Nishanth S monogram mark white"
        className="h-9 w-9"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M32 4 L54 12 V29 C54 44 44 55 32 60 C20 55 10 44 10 29 V12 Z" fill="#FFFFFF" />
        <path d="M32 11 V49" stroke="#102039" strokeWidth="3" strokeLinecap="round" />
        <path
          d="M24 21 C24 18.5 25.8 17 28.2 17 C30.9 17 32.5 19 32.5 21.4 C32.5 23.8 31.3 25.3 29.4 26.8"
          fill="none"
          stroke="#102039"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M40 19 C38.5 20.4 37.8 21.6 37.8 23.1 C37.8 24.8 38.8 26.4 40.9 28"
          fill="none"
          stroke="#1B9C85"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M41 28.2 C38.3 29.7 36.8 31.1 36.8 33.2 C36.8 35.8 38.9 37.3 41.6 38.2"
          fill="none"
          stroke="#1B9C85"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="32" cy="9" r="2.2" fill="#C8933A" />
      </svg>
      <div className="leading-tight text-white">
        <div className="font-serif text-lg font-semibold">Dr. Nishanth S</div>
        <div className="font-accent text-[10px] tracking-[0.18em] text-white/80">UROLOGY</div>
      </div>
    </div>
  );
}
