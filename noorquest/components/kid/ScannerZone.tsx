'use client';

import { useDroppable } from '@dnd-kit/core';
import { useEffect, useState } from 'react';
import type { Category } from '@/lib/halal/items';

interface ScannerZoneProps {
  flash: Category | null;
  currentEmoji: string | null;
}

export function ScannerZone({ flash, currentEmoji }: ScannerZoneProps) {
  const { isOver, setNodeRef } = useDroppable({ id: 'scanner' });
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    if (flash) {
      setScanning(true);
      const t = setTimeout(() => setScanning(false), 800);
      return () => clearTimeout(t);
    }
    return;
  }, [flash]);

  const flashClass =
    flash === 'halal' ? 'bg-sage-600' :
    flash === 'haram' ? 'bg-coral-600' :
    flash === 'mushbooh' ? 'bg-sun-500' : '';

  return (
    <div
      ref={setNodeRef}
      className={`touch-target relative flex h-48 w-full items-center justify-center rounded-2xl border-4 border-dashed transition-all ${
        isOver ? 'scale-105 border-sun-500 bg-sun-100' : 'border-sky-300 bg-sky-50'
      } ${flashClass} ${isOver ? 'ring-4 ring-sun-300' : ''}`}
      role="region"
      aria-label="Halal scanner"
    >
      {currentEmoji ? (
        <div className="text-7xl" aria-live="polite">{currentEmoji}</div>
      ) : (
        <div className="text-ink/40 text-6xl">📦</div>
      )}
      {scanning && (
        <div className="absolute inset-x-2 top-1/2 h-1.5 -translate-y-1/2 rounded bg-sun-500 shadow-[0_0_20px_#FFC107] animate-pulse" />
      )}
    </div>
  );
}
