interface LumiMascotProps {
  size?: number;
  glowing?: boolean;
  className?: string;
}

export function LumiMascot({ size = 64, glowing = true, className = '' }: LumiMascotProps) {
  return (
    <div
      className={`inline-block ${glowing ? 'animate-bob' : ''} ${className}`}
      style={{ width: size, height: size }}
      aria-label="Lumi the Lantern mascot"
    >
      <svg viewBox="0 0 64 64" width={size} height={size} className="drop-shadow-[0_0_12px_rgba(255,201,7,0.55)]">
        <ellipse cx="32" cy="38" rx="22" ry="24" fill="#FFF8E7" stroke="#1A2A3A" strokeWidth="2" />
        <ellipse cx="24" cy="34" rx="3" ry="3" fill="#1A2A3A" />
        <ellipse cx="40" cy="34" rx="3" ry="3" fill="#1A2A3A" />
        <circle cx="25" cy="33" r="1" fill="#fff" />
        <circle cx="41" cy="33" r="1" fill="#fff" />
        <path d="M26 44 Q32 48 38 44" stroke="#1A2A3A" strokeWidth="2" fill="none" strokeLinecap="round" />
        <ellipse cx="32" cy="20" rx="6" ry="3" fill="#FFC107" />
        <line x1="32" y1="2" x2="32" y2="14" stroke="#1A2A3A" strokeWidth="2" />
        <path d="M32 8 Q28 4 24 6" fill="none" stroke="#FFC107" strokeWidth="2" />
      </svg>
    </div>
  );
}
