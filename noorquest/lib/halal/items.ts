export type Category = 'halal' | 'haram' | 'mushbooh';

export interface HalalItem {
  id: string;
  emoji: string;
  name: { en: string; ar: string };
  category: Category;
}

export const HALAL_ITEMS: HalalItem[] = [
  { id: 'apple',   emoji: '🍎', name: { en: 'Apple',    ar: 'تفاح' },    category: 'halal' },
  { id: 'banana',  emoji: '🍌', name: { en: 'Banana',   ar: 'موز' },     category: 'halal' },
  { id: 'dates',   emoji: '🌴', name: { en: 'Dates',    ar: 'تمر' },     category: 'halal' },
  { id: 'grapes',  emoji: '🍇', name: { en: 'Grapes',   ar: 'عنب' },     category: 'halal' },
  { id: 'honey',   emoji: '🍯', name: { en: 'Honey',    ar: 'عسل' },     category: 'halal' },
  { id: 'milk',    emoji: '🥛', name: { en: 'Milk',     ar: 'حليب' },    category: 'halal' },
  { id: 'bread',   emoji: '🍞', name: { en: 'Bread',    ar: 'خبز' },     category: 'halal' },
  { id: 'rice',    emoji: '🍚', name: { en: 'Rice',     ar: 'أرز' },     category: 'halal' },
  { id: 'chicken', emoji: '🍗', name: { en: 'Chicken',  ar: 'دجاج' },    category: 'halal' },
  { id: 'fish',    emoji: '🐟', name: { en: 'Fish',     ar: 'سمك' },     category: 'halal' },
  { id: 'olives',  emoji: '🫒', name: { en: 'Olives',   ar: 'زيتون' },   category: 'halal' },
  { id: 'cheese',  emoji: '🧀', name: { en: 'Cheese',   ar: 'جبن' },     category: 'halal' },
  { id: 'yogurt',  emoji: '🥣', name: { en: 'Yogurt',   ar: 'لبن' },     category: 'halal' },
  { id: 'carrot',  emoji: '🥕', name: { en: 'Carrot',   ar: 'جزر' },     category: 'halal' },
  { id: 'pork',    emoji: '🥩', name: { en: 'Pork',     ar: 'لحم خنزير' }, category: 'haram' },
  { id: 'bacon',   emoji: '🥓', name: { en: 'Bacon',    ar: 'لحم مقدد' }, category: 'haram' },
  { id: 'ham',     emoji: '🍖', name: { en: 'Ham',      ar: 'لحم' },     category: 'haram' },
  { id: 'wine',    emoji: '🍷', name: { en: 'Wine',     ar: 'نبيذ' },    category: 'haram' },
  { id: 'gummy',   emoji: '🍬', name: { en: 'Gummy',    ar: 'حلوى جيلاتين' }, category: 'mushbooh' },
  { id: 'cheese_q',emoji: '🧀', name: { en: 'Cheese?',  ar: 'جبن؟' },    category: 'mushbooh' },
];

export const CATEGORY_LINES: Record<Category, Record<'en' | 'ar', string[]>> = {
  halal: {
    en: [
      'Yay! {n} is Halal and super yummy! ⭐',
      'MashaAllah! {n} is Halal.',
      'Allah gave us {n} to enjoy!',
    ],
    ar: [
      'يا سلام! {n} حلال ولذيذ! ⭐',
      'ما شاء الله! {n} حلال.',
      'الله أعطانا {n}!',
    ],
  },
  haram: {
    en: [
      "Oh, {n} is not for us. Let's pick something else! 🥕",
      'Allah knows what is best for us. Try another!',
    ],
    ar: [
      '{n} ليس لنا. لنتخيار شيء آخر! 🥕',
      'الله يعلم ما هو الأفضل لنا.',
    ],
  },
  mushbooh: {
    en: [
      "Hmm, {n} might be tricky. Let's ask Mom or Dad! That's smart.",
    ],
    ar: [
      '{n} قد يكون صعباً. لنسأل ماما أو بابا!',
    ],
  },
};

export function getItem(id: string): HalalItem | undefined {
  return HALAL_ITEMS.find((i) => i.id === id);
}

export function randomLineFor(category: Category, name: string, locale: 'en' | 'ar'): string {
  const lines = CATEGORY_LINES[category][locale];
  const line = lines[Math.floor(Math.random() * lines.length)] ?? '';
  return line.replace('{n}', name);
}
