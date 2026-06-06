import Image from 'next/image';

export type LumiPose = 'happy' | 'celebrate' | 'thinking' | 'sleepy';

interface LumiMascotProps {
  size?: number;
  glowing?: boolean;
  className?: string;
  pose?: LumiPose;
}

const POSE_MAP: Record<LumiPose, string> = {
  happy: '/mascots/lumi-happy.svg',
  celebrate: '/mascots/lumi-celebrate.svg',
  thinking: '/mascots/lumi-thinking.svg',
  sleepy: '/mascots/lumi-sleepy.svg',
};

export function LumiMascot({ size = 64, glowing = true, className = '', pose = 'happy' }: LumiMascotProps) {
  const aspect = 240 / 200;
  const width = size;
  const height = size * aspect;

  return (
    <div
      className={`inline-block ${glowing ? 'animate-bob' : ''} ${className}`}
      style={{ width, height }}
      aria-label={`Lumi the Lantern mascot — ${pose}`}
      role="img"
    >
      <Image
        src={POSE_MAP[pose]}
        alt=""
        width={width}
        height={height}
        className="h-full w-full select-none"
        priority={pose === 'happy'}
        draggable={false}
      />
    </div>
  );
}
