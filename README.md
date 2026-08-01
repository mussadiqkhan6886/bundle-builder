# Take Home Bundle Builder

A multi-step product bundle builder built as a frontend take-home assignment. Shoppers assemble a custom security system across a 4-step accordion (cameras → plan → sensors → protection), with a live review panel that reflects every selection in real time.

**Live demo:** https://bundle-builder-theta-ten.vercel.app/
**Repo:** https://github.com/mussadiqkhan6886/bundle-builder

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js (App Router) + TypeScript |
| Styling | Tailwind CSS |
| State management | React Context API (no Redux/external state libs) |
| Data | MongoDB + Mongoose (bonus backend — see below) |
| Persistence | `localStorage` (client-side "Save my system for later") |
| Font | Gilory (Local Fonts) — see [Design decisions](#design-decisions--tradeoffs) |
| Hosting | Vercel |

---

## Features

- **4-step accordion** — Choose cameras, plan, sensors, and extra protection. Step 1 is expanded on load; only one step is open at a time; "Next: ..." advances to the following step.
- **"N selected" counter** — reflects the number of *distinct products* with quantity > 0 in each step, not total units.
- **Variant selection** — products with color options track each variant's quantity independently. Switching the active color chip only changes which count is displayed/edited — it never resets or merges another variant's quantity.
- **Live review panel** — "Your security system" summary updates instantly as quantities change, grouped by category (Cameras / Sensors / Accessories / Plan), with synced quantity steppers, running total, struck-through compare-at price, and a savings callout.
- **Required, non-removable items** — e.g. the Sense Hub is pre-populated, has no add/remove control, and cannot be decremented below 1.
- **Persistence** — "Save my system for later" writes the full configuration to `localStorage`; reloading or returning later restores it exactly.
- **Data-driven rendering** — no hardcoded per-product markup. Every card, badge, variant, and price is rendered from the fetched product catalog.
- **Responsive layout** — desktop matches the Figma design; layout adapts down to phone width.
- **Bonus: real backend** — product catalog and seed cart are served from MongoDB via Mongoose, fetched server-side for fast initial render (see architecture below), instead of a static local JSON file.

---

## Architecture

### Data flow

```
MongoDB (Step + SeedConfig collections)
        │
        ▼
Home (Server Component) — fetches directly from the DB at request time
        │
        ▼
CartProvider (Client Component) — receives steps/seedSelections/seedActiveVariants as props
        │
        ▼
CartContext — owns ALL cart state (selections, activeVariants, steps, increment/decrement, etc)
        │
        ▼
useCart() hook — consumed by any component that needs cart data or actions
```

Key design decision: **the product catalog is fetched once, server-side**, directly from MongoDB inside the `Home` server component (`app/page.tsx`) — not inside the Context. This avoids a second client-side network request for data that's already available at render time, and keeps the initial page load fast (no client-side loading spinner for the catalog).

**Only actual cart state** — live quantities, which variant is active per product, — lives inside `CartContext`. Static catalog data (names, prices, images, categories) is treated as read-only props, never duplicated into Context state.

### State shape

```ts
// Raw cart ledger: productId -> variantId -> quantity
selections: Record<string, Record<string, number>>

// UI-only pointer: which color chip is currently active per product
// (never affects quantity — switching chips never resets or merges counts)
activeVariants: Record<string, string>
```

The review panel is derived from `selections` by joining each `(productId, variantId)` pair back against the product catalog (for name/price/image/category), then filtering to only entries with `quantity > 0`.

---

## Folder structure

```
bundle-builder/
├── app/
│   ├── fonts/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                  # server component — fetches directly from MongoDB
├── components/
│   ├── Accordion.tsx
│   ├── AccordionList.tsx
│   ├── Products.tsx
│   ├── VariantSelector.tsx
│   ├── ProductQtyStepper.tsx
│   ├── QuantityStepper.tsx
│   ├── ImageChanger.tsx
│   ├── ReviewItem.tsx
│   ├── ReviewData.tsx
│   ├── Checkout.tsx
│   └── SaveSystemButton.tsx
│   └── Steps.tsx
│   └── StepsHeader.tsx
├── contextAPI/
│   └── contextCart.tsx           # CartProvider + useCart()
├── lib/
│   ├── config/
│   │   └── db.ts                 # Mongoose connection helper
│   └── models/
│       ├── Products.ts           # Step + Product + Variant schemas
│       └── Seeds.ts              # SeedConfig schema
├── public/
│   ├── images/
│   └── data.json
├── sections/
│   ├── BundlePanel.tsx
│   └── ReviewPanel.tsx
├── scripts/
│   └── seed.ts                   # one-time script to load data.json into MongoDB
├── type.d.ts                       # shared TypeScript types
└── README.md
```

---

## Getting started

### 1. Clone the repo

```bash
git clone https://github.com/mussadiqkhan6886/bundle-builder.git
cd bundle-builder
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the project root:

```dotenv
MONGO_URI=your_mongodb_connection_string_here
```

| Variable | Description |
|---|---|
| `MONGO_URI` | MongoDB connection string (e.g. from MongoDB Atlas). Used server-side only to connect via Mongoose. |

### 4. Seed the database

The database needs to be populated once with the product catalog and seed cart values:

```bash
npx tsx scripts/seed.ts
```

This reads the product/step/seed data and inserts it into your MongoDB instance (`Step` and `SeedConfig` collections). Re-run this any time you want to reset the catalog back to its original state.

### 5. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 6. Build for production (optional, to verify a clean build)

```bash
npm run build
npm run start
```

---

## Deployment (Vercel)

1. Push the repo to GitHub.
2. Import the project into Vercel.
3. Add environment variables (`MONGO_URI`) under **Project Settings → Environment Variables**. Set `MONGO_URI` to the mongodb uri.
4. Deploy. Make sure your MongoDB Atlas cluster's IP access list allows connections from anywhere (`0.0.0.0/0`), or specifically allows Vercel's outbound IPs, or the server-side fetch will fail in production.

---

## Design decisions & tradeoffs

- **Backend as a bonus, built on MongoDB + Mongoose:** The spec explicitly marks a backend as optional. It was added here to demonstrate full-stack capability — the product catalog and seed configuration are fetched directly from MongoDB inside the `Home` server component at request time (not via an internal API round-trip), for the fastest possible initial render.
- **Client-side persistence via `localStorage`:** "Save my system for later" is implemented client-side only, per the spec's suggestion. A server-side `SavedSystem` model would be a natural next step if authenticated, cross-device persistence were required.
- **"Choose your plan" behavior:** the plan step's quantity is capped at 1 per plan option, since a shopper reasonably picks one monitoring plan rather than multiple quantities of the same plan.
- **Required items (e.g. Sense Hub):** flagged via `requiredItem: true` + `editable: false` in the data model; their quantity stepper is locked at a minimum of 1 and cannot be removed from the cart.
- **Variant selection state is intentionally separate from quantity state:** `activeVariants` (which color chip is highlighted) and `selections` (actual quantities per variant) are two separate pieces of state, so switching the active color on a card never affects another color's already-selected quantity.

---

## Scripts reference

| Command | Description |
|---|---|
| `npm run dev` | Start the local development server |
| `npm run build` | Production build |
| `npm run start` | Run the production build locally |
| `npx tsx scripts/seed.ts` | Seed/reset the MongoDB database with the product catalog and seed cart |
