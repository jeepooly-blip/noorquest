'use client';

import { useDraggable } from '@dnd-kit/core';
import type { HalalItem } from '@/lib/halal/items';

interface FoodItemProps {
  item: HalalItem;
  locale: 'en' | 'ar';
  disabled?: boolean;
}

export function FoodItem({ item, locale, disabled }: FoodItemProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: item.id,
    disabled: disabled === true,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`touch-target cursor-grab select-none rounded-2xl bg-sky-50 p-3 text-center shadow-sm transition-transform hover:scale-105 active:cursor-grabbing ${
        isDragging ? 'opacity-40' : ''
      } ${disabled ? 'pointer-events-none opacity-30' : ''}`}
      aria-label={`${item.name[locale]} (${item.category})`}
    >
      <div className="text-4xl" aria-hidden="true">
        {item.emoji}
      </div>
      <div className="mt-1 text-xs font-bold">{item.name[locale]}</div>
    </div>
  );
}
