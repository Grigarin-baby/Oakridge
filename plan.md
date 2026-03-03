# Plan: Replace Confidential Data with Mock Data

## Goal
Replace all real Ilahiya College data with fictional Oakridge College data so the project can be used as a portfolio showcase.

---

## 1. About Us Content (`src/app/about/page.tsx`)

**Timeline section** — replace real history:
- 2005 "Foundation" → 2010 "Foundation" — "Started with three courses in a modern campus"
- 2006 "New Campus" → 2013 "Expansion" — "Opened new science and technology wing"
- "Present" stays → "Recognized as a leading institution in the region"

**Management section** — replace real names and organizations:
- Remove Al Huda Islamic Cultural Establishment references
- Replace P.K.K Bava, M Ahamed Koya Haji, Dr K Muhammad Basheer with fictional names
- Generic management description

**Mission & Vision** — keep as-is (already generic, no confidential data)

**Facilities** — keep as-is (generic descriptions)

---

## 2. Faculty Data (`src/app/about/faculty/page.tsx`)

Replace all real names and qualifications with fictional ones:
- **Administration**: 2 fictional members
- **Commerce Dept**: 6 fictional faculty
- **Management Studies**: 3 fictional faculty
- **English**: 5 fictional faculty
- **Computer Application**: 3 fictional faculty
- **Sociology**: 1 fictional faculty
- **Languages**: 2 fictional faculty
- **Non-Teaching Staff**: 5 fictional staff

---

## 3. Contact Data (3 files)

**`src/components/Footer.tsx`** (main footer):
- Phone: → "+91 800 123 4567"
- Email: → "info@oakridgecollege.edu"
- Address: → "Green Valley Road, Riverside, Kerala"

**`src/app/components/Footer.tsx`** (alt footer):
- Same mock contact data
- Phone: → "+91 800 123 4567"
- Email: → "info@oakridgecollege.edu"
- Location: → "Riverside, Kerala"

**`src/components/info/ContactInfo.tsx`**:
- Phone: → "+91 800 123 4567"
- Email: → "info@oakridge.edu.in" (already done) → "info@oakridgecollege.edu"
- Address: → "Green Valley Road, Riverside, Kerala - 670001"

---

## 4. Remove IQAC Section Completely

- Delete `src/app/iqac/page.tsx` (or replace with a redirect/empty page)
- Remove "IQAC" link from `src/components/Navbar.tsx` nav items
- Remove "IQAC" link from `src/components/Footer.tsx` quick links
- Remove "Visit IQAC" button from `src/components/sections/FourthSection.tsx`

---

## 5. Gallery Images (`src/app/gallery/page.tsx` + `src/constants/galleryData.ts`)

- Replace real gallery photos (in `public/images/gallery/all/`) with the existing mock images from `public/images/mock/`
- Update `src/app/gallery/page.tsx` image list to use mock images
- `src/constants/galleryData.ts` already uses mock images — no change needed

---

## 6. Disable Student Portal & Apply Now Buttons

**Student Portal button** (`src/components/Navbar.tsx`):
- Change href from `https://www.ilahiyakoyilandy.in/login` to `#` (both desktop and mobile)
- Same in `src/components/Footer.tsx` and `src/app/components/Footer.tsx`

**Apply Now button** (`src/components/sections/FirstSection.tsx`):
- Change href from `/admission` to `#`

---

## 7. About description in FourthSection (`src/components/sections/FourthSection.tsx`)

- Replace "Established in 2005...Cheliya, near Chengottukavu...Korapuzha" with generic mock text
- Update stats if needed (keep as reasonable mock numbers)

---

## Files Changed Summary

| # | File | Action |
|---|------|--------|
| 1 | `src/app/about/page.tsx` | Mock timeline + management text |
| 2 | `src/app/about/faculty/page.tsx` | Mock all faculty names/qualifications |
| 3 | `src/components/Footer.tsx` | Mock contact data, remove IQAC link, disable portal URL |
| 4 | `src/app/components/Footer.tsx` | Mock contact data, disable portal URL |
| 5 | `src/components/info/ContactInfo.tsx` | Mock contact data |
| 6 | `src/app/iqac/page.tsx` | Delete or gut the page |
| 7 | `src/components/Navbar.tsx` | Remove IQAC nav item, disable portal URL |
| 8 | `src/app/gallery/page.tsx` | Replace real images with mock ones |
| 9 | `src/components/sections/FirstSection.tsx` | Disable Apply Now href |
| 10 | `src/components/sections/FourthSection.tsx` | Mock about text, remove IQAC button |
| 11 | `src/app/about/layout.tsx` | Update metadata (remove Kerala/Koyilandy references) |
