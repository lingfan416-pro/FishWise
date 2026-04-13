# FishWise — MVP requirement notes

**Project:** FishWise  

**Stack:** React frontend; Node.js/Express backend  

**Project type:** Web-based fishing recommendation assistant  

**Target users:** Casual and beginner fishers  

**Core function**

- Users select a **preset** fishing location.
- Users enter **water type**, **time of day**, **weather**, **wind level**, and **optional target fish**.
- The app returns **recommended fish type**, **bait**, **line depth**, **sinker weight**, **float type**, and a **short explanation**.

**Version 1 constraints**

- No login.
- No real-time weather API.
- No tide API.
- No database in version 1.
- Recommendations must be **rule-based only**.

---

## 1. Project restatement

FishWise is a small web app for casual and beginner fishers. A user chooses one of several **preset locations**, then describes the situation with a few **condition fields**. The server applies a **fixed rule set** (no learning models, no live environmental feeds) and responds with a **single practical setup suggestion**: which fish to aim for, what bait to try, how deep to fish, what sinker and float to use, plus a **brief** explanation of why that suggestion matches the inputs. There are **no accounts** and **no stored user data** on the server in v1.

---

## 2. Ambiguities and missing details

The brief defines *what* to collect and *what* to return, but not every implementation detail. These need an explicit product or engineering decision (or acceptance of a default).

| Area | Gap / ambiguity | What to decide |
|------|------------------|----------------|
| **Preset locations** | Count, names, and whether they imply region, water body type, or are purely labels for rules. | e.g. How many presets for v1? How do rules map `locationId` → advice? |
| **Water type** | No canonical list (fresh/salt/brackish, lake/river/sea, still/moving, etc.). | Fixed dropdown values and definitions used by the rule engine. |
| **Time of day** | Could be coarse bands (dawn, morning, …) or a clock/time picker. | Representation in the API and in rules; timezone handling if any. |
| **Weather** | “Weather” is not enumerated. | Allowed values (e.g. clear, cloudy, rain) and whether more states are needed. |
| **Wind level** | No scale (qualitative vs numeric, number of steps). | Labels or ranges and how they appear in rules. |
| **Target fish** | Marked optional; format not fixed. | Free text vs predefined species list; how rules use or ignore this field. |
| **Recommendation cardinality** | “Recommended fish type” could mean one species or several; “bait” could be one or many. | One primary row vs ranked list; multiple baits or a single suggestion. |
| **Line depth & sinker** | Depth might be a number, a range, or a band; sinker might be weight units or light/medium/heavy. | Units (e.g. feet vs meters) and whether outputs are always human-readable bands. |
| **Float type** | Not defined (fixed vs slip, size family, etc.). | Vocabulary the UI and rules share. |
| **Explanation** | “Short” is subjective; tone and length not fixed. | Max length, reading level, whether to mention which inputs drove the result. |
| **Rule engine behavior** | No spec for conflicting rules, partial matches, or no match. | Default fallback message; priority order; validation errors vs empty result. |
| **“No database”** | Unclear if static files (JSON) for rules on disk are allowed vs only hardcoded logic. | Where rules live (code-only vs bundled data files); still no user/session DB. |
| **Frontend scope** | Brief does not mention mobile, accessibility, or i18n. | Whether responsive layout and basic a11y are MVP goals. |

---

## 3. MVP scope

**In scope**

- React UI: preset location + condition form → submit → show recommendation.
- Express API: accepts structured inputs, runs **rule-based** logic, returns structured recommendation fields listed in the brief.
- **Preset** location selector only (per brief).
- Required inputs: location, water type, time of day, weather, wind level.
- Optional input: target fish.
- Outputs: fish type, bait, line depth, sinker weight, float type, short explanation.
- Styling sufficient for a clear beginner-facing flow.

**Out of scope for v1 (see also §6)**

- Anything that requires **login**, a **database**, **live weather**, **tides**, or **non–rule-based** recommendation logic.

---

## 4. Core inputs

| # | Field | Required | Notes |
|---|--------|----------|--------|
| 1 | Fishing location | Yes | Choose from **preset** locations only. |
| 2 | Water type | Yes | Values TBD; must align with backend rules. |
| 3 | Time of day | Yes | Representation TBD (bands vs time). |
| 4 | Weather | Yes | Values TBD. |
| 5 | Wind level | Yes | Scale TBD. |
| 6 | Target fish | No | Format TBD (text vs list). |

Inputs should be validated so the rule engine only receives allowed combinations (or the API returns a defined error).

---

## 5. Core outputs

| # | Field | Description |
|---|--------|-------------|
| 1 | Recommended fish type | Primary suggestion for what to target under the given inputs. |
| 2 | Bait recommendation | Suggested bait type(s)—cardinality TBD (§2). |
| 3 | Line depth | Guidance for depth; units/format TBD. |
| 4 | Sinker weight | Sinker guidance; units or qualitative bands TBD. |
| 5 | Float type | Float/bobber guidance using a shared vocabulary TBD. |
| 6 | Short explanation | Brief rationale tying recommendation to user inputs. |

---

## 6. Excluded features

Items below are **not part of the FishWise MVP** as defined by the brief’s constraints and scope. They should not be required for v1.

**Stated exclusions (from the brief)**

1. **User login and accounts** — anonymous use only.  
2. **Real-time weather API** — users enter weather manually (or the app uses static copy only); no live forecasts.  
3. **Tide API** — no tide data or tide-driven logic from external services.  
4. **Database in version 1** — no server-side persistence of users, sessions, or history in a database.  
5. **Non–rule-based recommendations** — no machine-learning models, statistical scoring services, or external “smart fishing” APIs as the recommendation source; logic is **rules** (code and/or static rule data).

**Naturally excluded given the above (not requested in the brief)**

6. **User profiles, saved spots, or history** — conflicts with no login and no database.  
7. **Cross-device sync or cloud backup** of past recommendations.  
8. **Native mobile apps** — the brief specifies a **web** stack (React + Express); a separate native app is out of scope unless the brief changes.  
9. **Operational dependence on external condition feeds** — any feature that **requires** pulling live environmental data (beyond manual user input) is out of scope for v1.

---

## 7. User flow

1. User opens the FishWise web app.  
2. User selects a **preset fishing location**.  
3. User enters **water type**, **time of day**, **weather**, and **wind level**; optionally enters **target fish**.  
4. User submits (e.g. “Get recommendations”).  
5. Client sends a normalized request to the Express backend.  
6. Backend validates input, evaluates **rules**, and responds with **fish type**, **bait**, **line depth**, **sinker weight**, **float type**, and **short explanation** (or a defined error if input is invalid or no rule applies—behavior TBD in §2).  
7. User reads the recommendation card; user may change inputs and submit again.  
8. With no database, **server-side state does not persist** after the request; closing or refreshing behaves according to whether the team adds only client-side memory (still no DB)—default assumption: **no durable saved plans** in v1.
