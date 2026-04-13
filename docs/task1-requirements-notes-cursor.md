# FishWise MVP — requirements notes (Cursor)

**Project:** FishWise  
**Product type:** Web-based fishing recommendation assistant  
**Stack (target):** React frontend, Node.js/Express backend  
**Primary users:** Casual and beginner fishers (including family users) who want simple, actionable setup advice—not expert-level analysis.

**Stated constraints for version 1:** no login; no real-time weather API; no tide API; no database; recommendations must be **rule-based only** (no ML/prediction services).

---

## 1. Project restatement

FishWise helps someone plan a basic fishing setup for a chosen place and conditions. The user picks where they are fishing (or will fish), enters a small set of environmental inputs (water type, time of day, weather, wind, and optionally a target species), and receives a single, easy-to-read recommendation: what kind of fish to focus on, what bait to try, suggested line depth, sinker weight, float type, and a short plain-language explanation of why that setup fits those inputs.

The MVP is intentionally **stateless and anonymous**: one session, one recommendation flow—no accounts, no saved history on the server, and no live feeds (weather, tides, etc.). The “brain” is a **rules lookup or scoring layer** backed by curated logic, not a trained model.

---

## 2. Ambiguities and missing details

These items are **not fully specified** in the source materials; implementers should either decide explicitly (and document the choice in code or ADR) or confirm with the product owner.

| Topic | What is unclear | Decision needed |
|--------|------------------|-----------------|
| **Location UX** | README mentions “select a location on a map **or** choose a preset fishing spot”; the task brief emphasizes **preset locations** only. | MVP: map, presets, or both? If map: how are locations represented (lat/lng buckets, nearest preset, region)? |
| **Preset catalog** | No defined regions, country scope, or count of locations. | How many presets for v1? Are they tied to geography (e.g., one country/region) or generic “archetype” spots? |
| **Water type** | No canonical enum (fresh vs salt vs brackish vs still vs moving, etc.). | Fixed dropdown list and definitions; whether “ocean” and “surf” are separate, etc. |
| **Time of day** | Could be clock time, coarse periods, or both. | e.g. dawn/morning/midday/dusk/night vs time picker; timezone handling if any. |
| **Weather** | “Weather condition” is named but options are not fixed. | Which states count (clear, overcast, rain, storm, fog, …) and whether “season” is separate. |
| **Wind** | Scale not fixed (Beaufort vs qualitative calm/light/moderate/strong). | Units/labels and how many buckets. |
| **Target fish** | Optional input: free text vs controlled vocabulary. | Free text is simpler UX but harder for rules; dropdown needs a species list and maintenance story. |
| **Recommendation shape** | Unclear if the app returns **one** primary species vs a **ranked list**, or multiple baits. | Single card vs list; tie-breaking when rules match equally. |
| **Units** | Line depth “in feet or meters” is mentioned in notes but not mandated globally. | Single unit system vs locale; how sinker weight is expressed (oz/g vs light/medium/heavy). |
| **Legal/safety** | No mention of regulations, licenses, or protected species. | Whether copy should disclaim “check local regulations” and avoid species in restricted areas. |
| **Accessibility & mobile** | Not specified as a requirement. | Target viewports; keyboard/screen reader goals for MVP. |
| **“No database”** | Could mean no persistence at all, or no DB while allowing server-side files/env. | Confirm: in-memory only vs static JSON rules shipped with the app; whether any server logging is allowed. |
| **Stretch: save a plan** | README lists optional local/simple backend storage; core brief says no DB in v1. | Treat as **post-MVP** unless scope is explicitly expanded; clarify “local” = browser only. |

---

## 3. MVP scope

**In scope for MVP (version 1)**

- React UI: single main flow from inputs → recommendation.
- Express API endpoint(s) that accept structured inputs and return a structured recommendation (rules implemented in code or static rule data loaded at startup—**no external prediction API**).
- Required inputs: location (per resolved UX decision), water type, time of day, weather, wind level.
- Optional input: target fish (per decision on free text vs list).
- Outputs: recommended fish type, bait, line depth, sinker weight, float type, short explanation.
- Basic styling suitable for non-expert users; errors/validation messages for incomplete or invalid input.

**Explicitly deferred (see section 6)**  
Stretch ideas from README (e.g., saving a plan) should stay **out** of MVP unless the team promotes them with updated constraints.

---

## 4. Core inputs

1. **Fishing location** — required; implementation resolves to preset selection and/or map (see ambiguities).
2. **Water type** — required; from a **small fixed set** (exact set TBD).
3. **Time of day** — required; coarse periods or time representation TBD.
4. **Weather** — required; fixed set TBD.
5. **Wind level** — required; fixed scale TBD.
6. **Target fish** — optional; free text or dropdown TBD.

All inputs should be validated server-side as well as client-side so the rule engine never sees unexpected values.

---

## 5. Core outputs

1. **Recommended fish type** — primary suggestion (and whether alternates are shown is TBD).
2. **Bait recommendation** — type(s) or categories understandable to beginners.
3. **Line depth** — numeric or banded depth guidance; unit policy TBD.
4. **Sinker weight** — qualitative and/or quantitative; consistent with depth/units TBD.
5. **Float type** — beginner-friendly label (e.g., fixed vs slip) plus any short qualifier TBD.
6. **Short explanation** — roughly one to three sentences connecting inputs to the suggestion without jargon overload.

Optional UX nicety (not a separate “output field”): a **clear disclaimer** that recommendations are generic and local rules may differ.

---

## 6. Excluded features

The following are **out of scope for the FishWise MVP** as currently described. They should not appear as required work for v1.

**Data, accounts, and persistence**

- User login, registration, roles, or profiles.
- Server-side storage of user history, favorites, or “my spots” (**no database** per brief).
- Cross-device sync or cloud backup of sessions.

**Live and external intelligence**

- Real-time or forecast **weather** APIs.
- **Tide** APIs or tide charts.
- Stock/abundance APIs, solunar tables, or other dynamic environmental feeds used to drive recommendations.
- **ML / statistical models** or third-party “fish prediction” services; recommendations stay **rule-based**.

**Product surface area**

- Social feeds, sharing, comments, leaderboards, or community features.
- Payments, gear e-commerce, affiliate storefronts, or bookings.
- Highly detailed **professional** simulation or rigging CAD-level detail.
- **Automatic water depth** or bathymetry (device or map-derived) as an input source.

**Advanced engineering (unless explicitly added later)**

- Native mobile apps (MVP is **web**).
- Operational analytics pipelines, A/B frameworks, or mandatory telemetry (if any analytics are added later, they should be a deliberate, privacy-reviewed choice).

**README “optional stretch” (not MVP unless promoted)**

- Saving a fishing plan in **local storage** or **simple backend storage**—conflicts with “no database v1” unless scope and constraints are updated together.

---

## 7. User flow

1. User opens the FishWise web app and sees a short introduction (what the app does and that advice is general, not a guarantee of catch or compliance).
2. User selects a **location** (preset and/or map, per final UX).
3. User completes **required** fields: water type, time of day, weather, wind.
4. User optionally adds a **target fish**.
5. User submits the form; the client sends a normalized payload to the backend.
6. Backend validates inputs, runs the **rule-based** engine, and returns a recommendation object.
7. UI shows a **recommendation card** (fish, bait, depth, sinker, float, explanation). Errors show inline or as a summary if validation fails.
8. User may **adjust inputs and resubmit** or leave; with no persistence, refreshing typically clears state unless client-side caching is intentionally added (out of scope for core MVP).

---

## Source alignment

This document merges the **task brief** (preset-first framing, hard v1 constraints) with **README.md** (problem statement, user segments, broader out-of-scope list, optional stretch). Where they disagree, the **ambiguities** table records the tension so Cursor or implementers can resolve it deliberately rather than by accident.
