'use client';

import { useEffect, useState } from 'react';
import { LumiMascot, type LumiPose } from './LumiMascot';

interface LumiSpeechProps {
  lines: string[];
  pose?: LumiPose;
  size?: number;
  cycleMs?: number;
  className?: string;
}

export function LumiSpeech({
  lines,
  pose = 'happy',
  size = 88,
  cycleMs = 5000,
  className = '',
}: LumiSpeechProps) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (lines.length <= 1) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % lines.length), cycleMs);
    return () => clearInterval(t);
  }, [lines.length, cycleMs]);

  const current = lines[idx] ?? '';

  return (
    <div className={`flex items-end gap-3 ${className}`} dir="ltr">
      <LumiMascot size={size} pose={pose} className="shrink-0" />
      <div className="relative max-w-xs rounded-2xl bg-white px-4 py-3 shadow-md ring-1 ring-ink/10">
        <p className="text-sm font-medium leading-relaxed text-ink">{current}</p>
        <span
          className="absolute -left-2 bottom-4 h-4 w-4 rotate-45 bg-white ring-1 ring-ink/10"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
