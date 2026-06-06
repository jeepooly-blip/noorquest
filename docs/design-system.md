# NoorQuest — Design System

**Version:** 1.0  
**Owner:** Design Lead

A small, kid-first design system. Optimized for clarity, delight, and accessibility.

---

## 1. Color Palette

### 1.1 Kids Mode

| Token | Hex | Use |
|---|---|---|
| `--sky-50` | `#EAF6FF` | Backgrounds, cards |
| `--sky-300` | `#7CC4F2` | Primary accents, water |
| `--sky-600` | `#1E88E5` | Buttons, links |
| `--sun-300` | `#FFD966` | Highlights, badges, Noor glow |
| `--sun-500` | `#FFC107` | Lumi lantern, streak counters |
| `--sage-300` | `#A8D5BA` | Success states, halal marks |
| `--sage-600` | `#43A047` | Confirmations, confetti |
| `--coral-300` | `#FFAB91` | Gentle warnings, "ask parent" |
| `--coral-600` | `#E64A19` | Soft error redirects |
| `--cream` | `#FFF8E7` | Page background |
| `--ink-900` | `#1A2A3A` | Body text |

### 1.2 Parent Mode

| Token | Hex | Use |
|---|---|---|
| `--teal-600` | `#00897B` | Primary actions, sidebar |
| `--teal-100` | `#B2DFDB` | Card backgrounds |
| `--neutral-50` | `#FAFAFA` | Page background |
| `--neutral-200` | `#EEEEEE` | Borders, dividers |
| `--neutral-700` | `#616161` | Body text |
| `--neutral-900` | `#212121` | Headings |

### 1.3 Status
- **Halal:** sage-600 (green) with star icon.
- **Haram:** coral-600 (red) with redirect arrow.
- **Mushbooh:** sun-500 (yellow) with question mark.
- **Streak:** sun-300 (gold) flame icon.

---

## 2. Typography

### 2.1 Kids Mode
- **Primary:** `Nunito` (rounded, friendly, free).
- **Display / Lumi speech:** `Quicksand Bold`.
- **Sizes:**
  - Body: **18 px** (large by default — kids)
  - Headings: 24 / 32 / 48 px
  - Lumi speech: 20 px
- **Line-height:** 1.5 minimum.

### 2.2 Parent Mode
- **Primary:** `Inter` (clean, professional).
- **Headings:** `Inter Bold`.
- **Sizes:** 14 / 16 / 20 / 24 / 32 px.

### 2.3 Arabic
- **Display:** `Tajawal` or `Cairo` (free, rounded, RTL-optimized).

---

## 3. Spacing & Layout

- **Base unit:** 4 px.
- **Common:** 4, 8, 12, 16, 24, 32, 48, 64.
- **Touch targets:** minimum **48 × 48 px** (kids), **40 × 40 px** (parent).
- **Grid:** 12-column responsive, 16 px gutter.
- **Breakpoints:**
  - Mobile (default): < 640 px
  - Tablet: 640–1024 px (target for kids)
  - Desktop: > 1024 px (parent dashboard)

---

## 4. Border Radius & Elevation

- **Radius:** 12 px (cards), 24 px (buttons, large cards), 999 px (pills, avatar).
- **Shadows:**
  - `--shadow-sm`: `0 2px 4px rgba(26,42,58,0.08)` — cards.
  - `--shadow-md`: `0 4px 12px rgba(26,42,58,0.12)` — hover, lifted cards.
  - `--shadow-lg`: `0 8px 24px rgba(26,42,58,0.16)` — modals, scanner beam.

---

## 5. Iconography

- **Style:** rounded, two-tone, filled where possible.
- **Size:** 24 / 32 / 48 px.
- **Library:** Lucide React (open-source, RTL-friendly).
- **Custom:** Lumi mascot is custom SVG, never a stock illustration.

---

## 6. Components (shadcn/ui base)

| Component | Notes |
|---|---|
| `Button` | 3 variants: primary (sky-600), success (sage-600), warning (coral-600). |
| `Card` | Rounded-2xl, shadow-sm, optional Lumi tip at top. |
| `Modal` | Centered, large radius, kid-mode confetti border. |
| `Toast` | Top-center, auto-dismiss 4s, Lumi voice. |
| `Progress` | Animated bar with sun-300 fill. |
| `Avatar` | 64 px circle, glowing ring on hover. |
| `DragHandle` | Larger hit area (56 px), haptic-like CSS pulse. |

---

## 7. Motion

- **Duration:** 200–400 ms (snappy, never slow).
- **Easing:** `cubic-bezier(0.34, 1.56, 0.64, 1)` for bouncy delight.
- **Confetti:** on streak / correct answer (canvas-confetti).
- **Lumi bob:** 2 s infinite ease-in-out, never distracting.
- **Reduced motion:** all bounce/loop disabled, replace with instant transitions.

---

## 8. Voice & Tone

### 8.1 Lumi (kid-facing)
- **Warm, encouraging, never shaming.**
- "MashaAllah!" "You did it!" "Let's try again together."
- Never "You're wrong" — always "Hmm, let's pick another!"

### 8.2 Parent-facing
- **Reassuring, evidence-based, scholar-cited.**
- Avoid jargon; link to deeper resources.

---

## 9. Accessibility Checklist

- [x] All text meets **WCAG AA 4.5:1** contrast on backgrounds.
- [x] All interactive elements keyboard-navigable.
- [x] All images have `alt` text or `aria-label`.
- [x] Voice-over narration available for all primary actions.
- [x] No flashing content (epilepsy-safe).
- [x] RTL tested in Arabic.
- [x] Color-blind palette tested (Deuteranopia / Protanopia).
- [x] Touch targets ≥ 48 px.

---

## 10. Asset Pipeline

- **Illustrations:** SVG-first, Figma → React component.
- **Audio:** OGG/MP3, ≤ 100 KB per clip, max 30 s.
- **Animation:** Lottie JSON (large), Framer Motion (small).
- **Storage:** Cloudinary (auto-format, lazy-load, CDN).
