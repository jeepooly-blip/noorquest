import { describe, it, expect } from 'vitest';
import { HALAL_ITEMS, CATEGORY_LINES, getItem, randomLineFor, type Category } from './items';

describe('HALAL_ITEMS dataset', () => {
  it('has 20 items', () => {
    expect(HALAL_ITEMS).toHaveLength(20);
  });

  it('contains items in all three categories', () => {
    const cats = new Set(HALAL_ITEMS.map((i) => i.category));
    expect(cats.has('halal')).toBe(true);
    expect(cats.has('haram')).toBe(true);
    expect(cats.has('mushbooh')).toBe(true);
  });

  it('has a healthy mix: ≥10 halal, ≥3 haram, ≥1 mushbooh', () => {
    const count = (c: Category) => HALAL_ITEMS.filter((i) => i.category === c).length;
    expect(count('halal')).toBeGreaterThanOrEqual(10);
    expect(count('haram')).toBeGreaterThanOrEqual(3);
    expect(count('mushbooh')).toBeGreaterThanOrEqual(1);
  });

  it('every item has emoji + en + ar name + unique id', () => {
    const ids = new Set<string>();
    for (const item of HALAL_ITEMS) {
      expect(item.emoji).toBeTruthy();
      expect(item.name.en).toBeTruthy();
      expect(item.name.ar).toBeTruthy();
      expect(ids.has(item.id)).toBe(false);
      ids.add(item.id);
    }
  });

  it('never includes pork-derived items marked halal', () => {
    const pork = HALAL_ITEMS.find((i) => /pork|bacon|ham/i.test(i.name.en));
    expect(pork?.category).toBe('haram');
  });
});

describe('CATEGORY_LINES', () => {
  it('has at least 1 line per category per language', () => {
    for (const cat of ['halal', 'haram', 'mushbooh'] as const) {
      expect(CATEGORY_LINES[cat].en.length).toBeGreaterThan(0);
      expect(CATEGORY_LINES[cat].ar.length).toBeGreaterThan(0);
    }
  });
});

describe('getItem', () => {
  it('returns the matching item by id', () => {
    expect(getItem('apple')?.name.en).toBe('Apple');
  });

  it('returns undefined for unknown ids', () => {
    expect(getItem('does-not-exist')).toBeUndefined();
  });
});

describe('randomLineFor', () => {
  it('substitutes the item name into the line', () => {
    const line = randomLineFor('halal', 'Apple', 'en');
    expect(line).toMatch(/Apple/);
  });

  it('returns Arabic for ar', () => {
    const line = randomLineFor('halal', 'تفاح', 'ar');
    expect(line).toMatch(/تفاح/);
  });

  it('returns a haram line for haram category', () => {
    const line = randomLineFor('haram', 'Pork', 'en');
    expect(line.length).toBeGreaterThan(0);
  });

  it('returns a mushbooh line for mushbooh category', () => {
    const line = randomLineFor('mushbooh', 'Gummy', 'en');
    expect(line.length).toBeGreaterThan(0);
  });
});
