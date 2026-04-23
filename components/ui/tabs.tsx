"use client";

import { cn } from "@/lib/utils";

type Props = {
  value: string;
  onChange: (value: string) => void;
  options: Array<{ label: string; value: string }>;
};

export function Tabs({ value, onChange, options }: Props) {
  return (
    <div className="inline-flex rounded-xl border border-slate-300 bg-white p-1">
      {options.map((item) => (
        <button
          key={item.value}
          onClick={() => onChange(item.value)}
          className={cn(
            "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
            value === item.value
              ? "bg-[var(--color-primary)] text-white"
              : "text-slate-600 hover:bg-slate-100",
          )}
          type="button"
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
