import { describe, it, expect } from 'vitest';
import {
  XP_RULES,
  LEVELS,
  levelFromXp,
  nextLevel,
  progressToNext,
  BADGES,
} from './xp';

describe('XP rules', () => {
  it('defines a positive XP value for every event type', () => {
    for (const [type, points] of Object.entries(XP_RULES)) {
      expect(points, `XP for ${type}`).toBeGreaterThan(0);
    }
  });
});

describe('levelFromXp', () => {
  it('returns level 1 for 0 XP', () => {
    expect(levelFromXp(0).level).toBe(1);
  });

  it('returns level 1 for 99 XP (below threshold)', () => {
    expect(levelFromXp(99).level).toBe(1);
  });

  it('returns level 2 at 100 XP', () => {
    expect(levelFromXp(100).level).toBe(2);
  });

  it('returns level 3 at 250 XP', () => {
    expect(levelFromXp(250).level).toBe(3);
  });

  it('returns level 4 at 500 XP', () => {
    expect(levelFromXp(500).level).toBe(4);
  });

  it('returns the max level past the top threshold', () => {
    expect(levelFromXp(9999).level).toBe(5);
  });

  it('provides Arabic and English titles for every level', () => {
    for (const lvl of LEVELS) {
      expect(lvl.title.en).toBeTruthy();
      expect(lvl.title.ar).toBeTruthy();
    }
  });
});

describe('nextLevel', () => {
  it('returns level 2 from level 1', () => {
    expect(nextLevel(LEVELS[0]!)?.level).toBe(2);
  });

  it('returns null at max level', () => {
    expect(nextLevel(LEVELS[LEVELS.length - 1]!)).toBeNull();
  });
});

describe('progressToNext', () => {
  it('shows 100% at max level', () => {
    const p = progressToNext(9999);
    expect(p.pct).toBe(100);
  });

  it('shows 0% right at the threshold of a level', () => {
    const p = progressToNext(100);
    expect(p.pct).toBe(0);
  });

  it('shows 50% at the midpoint of a level', () => {
    const p = progressToNext(175);
    expect(p.pct).toBe(50);
  });
});

describe('BADGES', () => {
  it('has 8 unique badges', () => {
    expect(BADGES).toHaveLength(8);
    const types = BADGES.map((b) => b.type);
    expect(new Set(types).size).toBe(types.length);
  });

  it('every badge has en + ar names + emoji', () => {
    for (const b of BADGES) {
      expect(b.emoji).toBeTruthy();
      expect(b.name.en).toBeTruthy();
      expect(b.name.ar).toBeTruthy();
    }
  });
});
