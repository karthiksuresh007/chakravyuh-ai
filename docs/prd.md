# CHAKRAVYUH_AI — Product Requirements Document

**Version:** 1.0.0
**Status:** Draft — For Engineering & Design Review
**Author:** Product & Engineering Leadership
**Last Updated:** 2026-03-05
**Confidentiality:** Internal Use Only

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Product Vision & Strategy](#2-product-vision--strategy)
3. [Target Users & Personas](#3-target-users--personas)
4. [Core Features](#4-core-features)
5. [Advanced Features](#5-advanced-features)
6. [AI Capabilities](#6-ai-capabilities)
7. [Multilingual Support](#7-multilingual-support)
8. [Data Sources & Pipelines](#8-data-sources--pipelines)
9. [Technical Architecture](#9-technical-architecture)
10. [Database Schema](#10-database-schema)
11. [API Design](#11-api-design)
12. [UX Principles & UI Pages](#12-ux-principles--ui-pages)
13. [Security & Trust](#13-security--trust)
14. [Performance & Scalability](#14-performance--scalability)
15. [MVP Definition](#15-mvp-definition)
16. [Roadmap](#16-roadmap)
17. [Success Metrics](#17-success-metrics)
18. [Risks & Mitigations](#18-risks--mitigations)
19. [Open Questions](#19-open-questions)

---

## 1. Executive Summary

### 1.1 The Problem

The modern information ecosystem has a critical gap: global geopolitical events are covered extensively by news media, but rarely explained with sufficient depth, context, or clarity for the average person.

When war breaks out or a new geopolitical crisis emerges, most people encounter fragmented headlines, contradictory narratives, and no accessible framework for understanding *why* events are happening, *who* is involved, and *what* the real-world consequences are.

The result is a globally informed but geopolitically illiterate population — people who are aware of conflicts but cannot reason about them.

### 1.2 The Solution

**CHAKRAVYUH_AI** is an AI-powered interactive geopolitics intelligence platform that transforms complex global conflicts into clear, structured, and explorable knowledge.

Named after the ancient strategic military formation that was complex to enter and navigate, CHAKRAVYUH_AI is designed to be its antithesis — a system that makes the complex navigable.

The platform combines:

- **Interactive conflict maps** with real-time markers
- **AI-powered conflict explainers** calibrated to user knowledge level
- **Timeline sliders** that visualize conflict evolution
- **Impact dashboards** showing economic, humanitarian, and military consequences
- **Multilingual support** for six languages at launch
- **AI Debate Mode** exposing multiple geopolitical perspectives

> **Core promise:** Any person, regardless of background or language, should be able to understand any global conflict in under 3 minutes.

### 1.3 Market Context

| Platform | Strength | Weakness |
|---|---|---|
| Wikipedia | Depth & coverage | Static, no visualization, no AI |
| Bloomberg | Financial context | Paywalled, not accessible, no maps |
| Reuters / BBC | News freshness | No context, no history, no AI |
| Google News | Aggregation | No synthesis, no explanation |
| **CHAKRAVYUH_AI** | All of the above + AI + interactivity | To be built |

### 1.4 Positioning Statement

> For curious citizens, students, journalists, and researchers who need to understand global conflicts, CHAKRAVYUH_AI is the geopolitics intelligence platform that combines the depth of an encyclopedia, the freshness of a newsroom, the clarity of an AI tutor, and the visual power of an interactive atlas — in one unified experience.

---

## 2. Product Vision & Strategy

### 2.1 Vision

> Become the world's most trusted and accessible platform for understanding wars, conflicts, and geopolitical tensions.

### 2.2 Mission

Transform confusing, fragmented global news into clear, structured, and actionable geopolitical knowledge — accessible to everyone, in every language.

### 2.3 Strategic Pillars

| Pillar | Description |
|---|---|
| **Clarity** | Every piece of content is optimized for comprehension, not clicks |
| **Depth** | Layered information architecture from summary to expert-level detail |
| **Freshness** | Near-real-time updates via automated news ingestion pipelines |
| **Accessibility** | Multilingual, mobile-first, and designed for non-experts |
| **Trustworthiness** | Sourced, cited, and hallucination-mitigated AI outputs |
| **Interactivity** | Maps, timelines, simulators, and exploratory tools |

### 2.4 Design Philosophy

The product experience should feel like reading a *beautifully designed intelligence briefing* prepared by a brilliant analyst who also happens to be a great teacher. Think:

- The visual clarity of a *New York Times* interactive feature
- The depth of a *Foreign Affairs* article
- The accessibility of a well-designed explainer app
- The freshness of a live news dashboard

---

## 3. Target Users & Personas

### 3.1 Persona Matrix

| Persona | Age Range | Primary Use Case | Key Need | Frequency |
|---|---|---|---|---|
| Student | 16–25 | Academic research, current events | Simplified explanations, citations | Weekly |
| Journalist | 25–45 | Background research, context | Fast timelines, key players, data | Daily |
| Researcher | 25–55 | Data, structured history, analysis | API access, datasets, sourcing | Daily |
| Policy Enthusiast | 30–55 | Understanding world events | Depth, multiple perspectives | Weekly |
| Curious General User | 18–65 | Making sense of news | Quick, simple, visual | Occasional |
| Investor / Analyst | 30–55 | Geopolitical risk assessment | Economic impact data, risk scores | Daily |

---

### 3.2 Detailed Persona Profiles

#### Persona 1 — Arjun (Student, 19)

**Background:** Undergraduate student in political science. Follows global news casually but struggles to connect historical dots.

**Goals:**
- Understand conflicts for class assignments and debates
- Get reliable, citable sources
- Grasp why conflicts started without reading 40 articles

**Pain Points:**
- Wikipedia is too dense and unstructured
- News articles assume prior knowledge
- Difficult to find timelines and visual summaries

**Workflow on CHAKRAVYUH_AI:**
1. Lands on the global map
2. Clicks on the Ukraine conflict marker
3. Reads the AI explainer at "college student" level
4. Scrolls the timeline to understand escalation
5. Checks the key players section
6. Exports or cites the page for an essay

---

#### Persona 2 — Priya (Journalist, 32)

**Background:** Freelance journalist covering South Asia and Middle East for international publications.

**Goals:**
- Get deep, fast background on a conflict before an interview
- Understand recent developments in 5 minutes
- Find reliable economic impact data

**Pain Points:**
- Wasting time searching across 10 different sources
- No single reliable place for conflict timelines
- Hard to find actor-level breakdowns quickly

**Workflow on CHAKRAVYUH_AI:**
1. Searches for a specific conflict
2. Opens the conflict page, scans the latest updates
3. Navigates to the key players section for entity profiles
4. Checks the impact dashboard for citations
5. Bookmarks the page for reference during writing

---

#### Persona 3 — Marcus (Investor / Analyst, 44)

**Background:** Portfolio manager at a global macro hedge fund. Tracks geopolitical risk for investment decisions.

**Goals:**
- Understand how a conflict escalation could affect oil prices or supply chains
- Monitor risk scores across active conflicts
- Get economic impact simulations for portfolio modeling

**Pain Points:**
- Geopolitical risk tools are expensive and built for governments
- Connecting news events to market impacts requires significant manual work
- No accessible economic simulation tools exist

**Workflow on CHAKRAVYUH_AI:**
1. Opens the global conflict risk index dashboard
2. Identifies elevated-risk conflicts
3. Uses the economic impact simulator to model oil price impact scenarios
4. Sets up alerts for conflict escalation thresholds

---

#### Persona 4 — Lakshmi (General User, 38)

**Background:** Software engineer. Reads the news every morning but wants to deeply understand a conflict she keeps hearing about.

**Goals:**
- Understand a conflict in plain language without hours of research
- Get a visual, narrative explanation she can follow easily
- Ask follow-up questions naturally

**Pain Points:**
- News articles are too surface-level
- Complex geopolitical jargon is a barrier
- No interactive way to explore context

**Workflow on CHAKRAVYUH_AI:**
1. Asks the AI chatbot "Why is there a war in Sudan?"
2. AI explains in plain language with context
3. She selects "Explain Like I'm 15" mode for simpler breakdown
4. Clicks through the interactive timeline
5. Shares the conflict page link with friends

---

## 4. Core Features

### 4.1 Interactive Global Conflict Map

#### 4.1.1 Overview

The map is the primary entry point and the most visceral representation of the platform's value. Users land on a globe/map view that immediately communicates the scale and distribution of global conflicts.

#### 4.1.2 Map Marker System

| Marker Color | Meaning | Example |
|---|---|---|
| 🔴 Red (pulsing) | Active armed conflict | Ukraine, Gaza, Sudan |
| 🟠 Orange | Significant military tension | Taiwan Strait, India-Pakistan LoC |
| 🟡 Yellow | Elevated political/diplomatic tension | Serbia-Kosovo, South China Sea |
| ⚫ Gray | Historical / resolved conflict | Falklands War, Gulf War |
| 🔵 Blue | Active UN peacekeeping mission | DRC, South Sudan |

#### 4.1.3 Functional Requirements

| Requirement | Priority | Notes |
|---|---|---|
| Zoom in/out (globe to street level) | P0 | WebGL smooth rendering |
| Click marker → open conflict detail panel | P0 | Side panel, not redirect |
| Hover tooltip with conflict name + intensity + casualties | P0 | Popover with brief summary |
| Cluster markers at low zoom levels | P0 | Prevent visual overload |
| Filter by conflict intensity (active / tension / historical) | P1 | Multi-select filter panel |
| Filter by region (Africa, Middle East, Europe, Asia, etc.) | P1 | Regional boundary overlays |
| Filter by timeline (show state of map at any historical date) | P1 | Linked to global timeline slider |
| Search for a specific conflict or country | P1 | Autocomplete search bar |
| Heatmap mode for casualty intensity | P2 | Toggle layer |
| Satellite imagery toggle | P2 | External satellite tile provider |

#### 4.1.4 Technical Implementation

```
Map Engine:        MapLibre GL JS — WebGL-accelerated (open-source fork of Mapbox GL JS)
Map Data:          OpenStreetMap (ODbL licensed)
Tiles:             OpenMapTiles / MapTiler public vector tiles
Markers:           Custom SVG/Canvas markers rendered via MapLibre circle + symbol layers
Clustering:        Supercluster library for marker clustering
Data Format:       GeoJSON for all geographic data
Conflict Polygons: Disputed territory overlays as GeoJSON polygon layers
Performance:       Vector tile caching; WebGL hardware acceleration
```

#### 4.1.4.1 Open Map Infrastructure

CHAKRAVYUH_AI intentionally uses open geographic infrastructure:

- **MapLibre GL JS** is an open-source fork of Mapbox GL JS (pre-proprietary-license), providing identical WebGL rendering performance with no vendor lock-in or API billing.
- **OpenStreetMap** provides the base map data under the ODbL license, ensuring the platform's geographic foundation is community-maintained and freely accessible.
- This choice aligns with the platform's core mission of making geopolitical knowledge accessible to everyone — the map infrastructure itself should embody the same open knowledge philosophy.

#### 4.1.5 Map Data Model

```json
{
  "conflict_id": "ukraine-russia-2022",
  "display_name": "Russia-Ukraine War",
  "coordinates": { "lat": 49.0, "lng": 31.2 },
  "status": "active",
  "intensity": "high",
  "start_date": "2022-02-24",
  "region": "Eastern Europe",
  "casualty_estimate": 500000,
  "displaced_persons": 6000000,
  "risk_score": 9.2
}
```

---

### 4.2 Conflict Detail Pages

#### 4.2.1 Overview

Each conflict has a dedicated, deeply structured detail page that functions as a living, AI-augmented intelligence report. This is the core content unit of the platform.

#### 4.2.2 Page Structure

```
/conflict/[conflict-slug]
├── Hero Section
│   ├── Conflict name + status badge
│   ├── One-sentence AI summary
│   ├── Key stats strip (casualties, displaced, duration, risk score)
│   └── Quick action buttons (Share, Save, Ask AI)
│
├── Overview Tab
│   ├── AI-generated overview (2-3 paragraphs)
│   ├── Background & root causes
│   └── Current status
│
├── Timeline Tab
│   ├── Interactive timeline slider (see 4.3)
│   └── Chronological event cards
│
├── Key Players Tab
│   ├── Country/entity profiles
│   ├── Leadership cards
│   └── Alliance map
│
├── Military Tab
│   ├── Military developments feed
│   ├── Order of battle summary
│   └── Territorial control map
│
├── Impact Tab
│   ├── Casualties chart
│   ├── Refugee/displacement data
│   ├── Economic impact metrics
│   └── Humanitarian indicators
│
├── Political Tab
│   ├── Diplomatic timeline
│   ├── Negotiations tracker
│   └── International response log
│
├── Latest Updates Tab
│   └── AI-summarized news feed (rolling 30 days)
│
└── AI Explainer Panel (Persistent sidebar/bottom sheet)
    ├── "Explain this conflict" prompt
    ├── Knowledge level selector
    └── Follow-up Q&A interface
```

#### 4.2.3 Content Requirements

| Section | Content Source | Refresh Frequency | AI-Generated |
|---|---|---|---|
| Overview | Editorial + AI synthesis | Weekly | Partially |
| Background | Curated + verified | Monthly | No |
| Timeline | ACLED + editorial | Daily | No |
| Key Players | Curated database | As-needed | No |
| Military Developments | ACLED + news APIs | Daily | Partially |
| Impact Metrics | UN, World Bank, ACLED | Weekly | No |
| Latest Updates | News API + AI summarizer | Every 4 hours | Yes |

---

### 4.3 Timeline Slider

#### 4.3.1 Overview

The timeline slider allows users to travel through the history of a conflict visually — seeing how the map, key events, and facts evolved over time. This is the most powerful educational tool on the platform.

#### 4.3.2 Functional Requirements

| Requirement | Priority |
|---|---|
| Horizontal scrollable timeline with milestone markers | P0 |
| Draggable slider that updates displayed content | P0 |
| Event cards appear at each milestone | P0 |
| Map updates to reflect territorial control at selected date | P1 |
| Play/Pause auto-scroll mode | P1 |
| Milestone categories: Military, Political, Diplomatic, Humanitarian | P1 |
| Exportable timeline as image/PDF | P2 |
| Zoom into specific time ranges (e.g., zoom into a single month) | P2 |

#### 4.3.3 Timeline Data Schema

```json
{
  "event_id": "ukr-001",
  "conflict_id": "ukraine-russia-2022",
  "date": "2022-02-24",
  "title": "Full-Scale Russian Invasion Begins",
  "description": "Russia launches a full-scale military invasion of Ukraine from multiple directions including the north (Kyiv), east (Kharkiv, Donbas), and south (Crimea).",
  "category": "military",
  "significance": "critical",
  "sources": ["reuters.com/...", "bbc.com/..."],
  "media": {
    "type": "image",
    "url": "https://cdn.chakravyuh.ai/events/ukr-001.jpg"
  }
}
```

---

### 4.4 AI Conflict Explainer

#### 4.4.1 Overview

The AI Explainer is the most differentiated feature of the platform. It uses an LLM to generate customized explanations of any conflict based on the user's selected knowledge level and query.

#### 4.4.2 Explanation Modes

| Mode | Audience | Reading Level | Avg. Length |
|---|---|---|---|
| ELI10 — Explain Like I'm 10 | Children / General | Grade 5 | 150 words |
| ELI15 — Explain Like I'm 15 | Teenagers | Grade 9 | 250 words |
| College Level | Educated adults | Undergraduate | 400 words |
| Policymaker | Domain experts | Expert | 600 words |
| Research Brief | Academics / Analysts | Expert + citations | 800 words |

#### 4.4.3 AI Output Structure

For each explanation, the AI must generate structured output including the following sections:

```
1. What is happening? (1-2 sentences)
2. Why did this start? (Root causes, simplified)
3. Who is involved? (Key actors)
4. What has happened so far? (Brief chronology)
5. Why does this matter? (Global significance)
6. What might happen next? (Uncertainty-calibrated forecast)
```

#### 4.4.4 System Prompt Design Principles

- Always cite uncertainty ("According to most analysts..." / "It is not yet clear...")
- Never editorialize or assign moral blame
- Acknowledge multiple legitimate perspectives
- Ground explanations in verified historical facts
- Avoid politically loaded language

#### 4.4.5 Follow-up Q&A Interface

Users can ask follow-up questions in natural language after receiving an initial explanation. The AI maintains context across the conversation within a session. Example:

```
User: "Why did Russia annex Crimea in 2014?"
AI: [Explanation]
User: "But why didn't NATO do anything at the time?"
AI: [Contextual follow-up, referencing previous answer]
```

---

### 4.5 Key Players Section

#### 4.5.1 Entity Types

| Entity Type | Examples |
|---|---|
| Nation-State | Russia, Ukraine, USA, China |
| Armed Non-State Actor | Hamas, Houthi, Wagner Group |
| International Organization | UN, NATO, AU, Arab League |
| Individual Leader | Vladimir Putin, Volodymyr Zelenskyy |
| Political Party / Faction | Likud, PLO, Fatah |

#### 4.5.2 Entity Profile Card

Each entity card must contain:

```
Name / Official title
Type (country / organization / individual)
Flag / Logo / Photo
Role in conflict (attacker / defender / mediator / supporter)
Stated objectives
Key actions taken (chronological list)
Alliances (linked entities)
International standing (UN recognition, sanctions, etc.)
Related conflicts (other conflicts this entity is involved in)
```

#### 4.5.3 Alliance Visualization

An interactive force-directed graph showing relationships between actors — alliances, support relationships, proxy ties, and opposition. Built with D3.js.

---

### 4.6 Impact Dashboard

#### 4.6.1 Overview

The Impact Dashboard provides quantified, visualized consequences of a conflict across four dimensions: Human, Economic, Military, and Political.

#### 4.6.2 Metrics & Data Sources

**Human Impact**

| Metric | Source | Visualization |
|---|---|---|
| Total conflict-related deaths | ACLED, UN OCHA | Running counter + line chart |
| Civilian vs. combatant deaths | ACLED | Stacked bar chart |
| Internally displaced persons | UNHCR | Choropleth map |
| Refugees (cross-border) | UNHCR | Flow map |
| Humanitarian aid required (USD) | OCHA FTS | Gauge chart |

**Economic Impact**

| Metric | Source | Visualization |
|---|---|---|
| GDP impact (affected country) | World Bank, IMF | Year-over-year bar chart |
| Oil/commodity price correlation | EIA, Bloomberg | Time-series line chart |
| Trade disruption estimate (USD) | WTO | Table + bar chart |
| Sanctions imposed (count + scope) | OFAC, EU, UN | Sanctions tracker table |
| Reconstruction cost estimate | World Bank | Counter card |

**Military**

| Metric | Source | Visualization |
|---|---|---|
| Defense spending increase | SIPRI | Comparison bar chart |
| Equipment losses (verified) | OSINT databases | Running counter |
| Territorial control changes | ACLED, ISW | Map layer |

---

### 4.7 Latest Updates Feed

#### 4.7.1 Architecture

```
News Ingestion Layer:
  - Source: Reuters, BBC, AP, Al Jazeera, Foreign Policy, The Guardian
  - Method: RSS feeds + NewsAPI + custom scrapers
  - Frequency: Every 30 minutes per source
  - Deduplication: Semantic similarity (cosine similarity threshold > 0.85)

AI Summarization Layer:
  - Model: GPT-4o / Claude (configurable)
  - Task: Extract key facts, summarize in 3 bullet points
  - Bias Check: Flag articles from state-affiliated sources
  - Output: Structured JSON with summary, source, date, conflict_id

Storage:
  - Raw articles: Object storage (S3/GCS)
  - Summaries: PostgreSQL + Elasticsearch for full-text search

Display:
  - Infinite scroll feed
  - Filter by category (military / political / humanitarian)
  - Filter by source
  - Source credibility indicator (curated tier list)
```

#### 4.7.2 Update Card Format

```
[Category Badge]  [Source]  [Time ago]
[Headline]
• Bullet 1: Key fact
• Bullet 2: Context
• Bullet 3: Significance
[Read Full Article →]  [Ask AI About This]
```

---

## 5. Advanced Features

### 5.1 AI Debate Mode

#### 5.1.1 Purpose

One of the most dangerous aspects of geopolitical discourse is the tendency to view conflicts through a single ideological lens. AI Debate Mode explicitly presents multiple, competing analytical perspectives on a conflict or question.

#### 5.1.2 Functional Flow

```
User Input: "Who is responsible for the conflict in Gaza?"

System generates responses from 4 analytical lenses:

[Lens 1: Western Liberal Internationalist]
[Lens 2: Arab/Palestinian Nationalist]
[Lens 3: Realist / Balance of Power]
[Lens 4: International Law Framework]

Each lens presents:
- Core argument
- Historical basis
- Key evidence
- Acknowledged weaknesses

Footer: "CHAKRAVYUH_AI does not endorse any perspective.
        These represent legitimate analytical frameworks."
```

#### 5.1.3 Guardrails

- AI must never generate content that endorses ethnic violence, genocide, or terrorism
- All perspectives must be grounded in publicly documented positions (no hallucination)
- Content moderation layer reviews debate outputs before display

---

### 5.2 Future Scenario Predictions

#### 5.2.1 Scenario Generation

For each active conflict, the AI generates 3–5 plausible future scenarios:

| Scenario Type | Description |
|---|---|
| Escalation | Conflict spreads geographically or intensifies militarily |
| Frozen Conflict | Fighting pauses without formal resolution |
| Negotiated Settlement | Diplomatic solution with defined terms |
| Regime Collapse | Governing authority in one or more states collapses |
| Territorial Change | Formal or de facto border changes |

#### 5.2.2 Scenario Card Format

```
Scenario: Negotiated Settlement
Probability: Low–Medium (15–25%)
Conditions: [What would need to happen]
Timeline: 12–24 months
Precedents: [Historical analogies]
Key Indicators to Watch: [List of signals]
```

**Note:** Probabilities must be presented as ranges, not point estimates. The platform must prominently state these are analytical estimates, not predictions.

---

### 5.3 Economic Impact Simulator

#### 5.3.1 Overview

An interactive, variable-adjustment tool that allows users to model how changes in conflict intensity or policy responses could affect global economic indicators.

#### 5.3.2 Input Variables (User-Adjustable Sliders)

```
Conflict Intensity: [Low ←—————→ High]
Sanctions Severity: [None ←—————→ Maximum]
Trade Route Disruption: [Minimal ←—————→ Total blockade]
Duration: [3 months ←—————→ 5+ years]
Third-party Involvement: [None ←—————→ Major power intervention]
```

#### 5.3.3 Output Projections

```
Oil Price: +X% (Brent Crude)
European Gas Prices: +X%
Global Inflation Impact: +X bps
Wheat/Grain Price: +X%
Shipping Insurance Costs: +X%
Affected GDP (region): -X%
Refugee Flow Estimate: X million additional
```

#### 5.3.4 Model Notes

The simulator uses regression models trained on historical conflict-economic data. Outputs are illustrative and must include clear uncertainty disclaimers. Not suitable for financial decision-making.

---

### 5.4 Satellite Change Visualization

#### 5.4.1 Overview

Side-by-side or slider-based before/after comparison of satellite imagery showing war damage, territorial changes, or refugee camp growth.

#### 5.4.2 Data Sources

- Planet Labs (commercial satellite imagery)
- Sentinel-2 (ESA, open access)
- Maxar Technologies (high-resolution, licensed)
- UNOSAT (UN-provided analysis products)

#### 5.4.3 UI Pattern

```
[Before: Date Selector]  [DRAG →]  [After: Date Selector]
[Satellite Image A]         |         [Satellite Image B]
                    [Drag handle]
```

Annotations overlaid on imagery highlighting:
- Destroyed infrastructure
- Defensive fortifications
- Civilian displacement camps
- Agricultural land changes

---

### 5.5 Global Conflict Risk Index

#### 5.5.1 Overview

A proprietary risk scoring model that ranks all monitored conflicts by escalation risk.

#### 5.5.2 Risk Score Components

| Dimension | Weight | Data Source |
|---|---|---|
| Military activity intensity | 25% | ACLED |
| Great power involvement | 20% | Editorial assessment |
| Nuclear/WMD risk proximity | 20% | Expert assessment |
| Economic stakes (global) | 15% | IMF, World Bank |
| Alliance entanglement risk | 10% | Editorial assessment |
| Diplomatic breakdown signals | 10% | News signals |

**Composite Risk Score: 0–10** (displayed with category label: Low / Moderate / High / Critical)

#### 5.5.3 Risk Index Display

The Global Dashboard displays a ranked table + map heatmap of all conflicts by risk score, updated weekly.

---

## 6. AI Capabilities

### 6.1 AI Architecture Overview

```
┌─────────────────────────────────────────────┐
│               AI Services Layer             │
├─────────────┬──────────────┬────────────────┤
│  Explainer  │ Summarizer   │  Q&A Engine    │
│  Service    │  Service     │  Service       │
├─────────────┴──────────────┴────────────────┤
│         Orchestration Layer (LangChain)     │
├─────────────────────────────────────────────┤
│   Primary LLM: GPT-4o / Claude Sonnet       │
│   Fallback LLM: GPT-3.5 Turbo              │
├─────────────────────────────────────────────┤
│   RAG Layer (Retrieval-Augmented Generation)│
│   Vector DB: Pinecone / Weaviate            │
│   Embeddings: text-embedding-3-large        │
├─────────────────────────────────────────────┤
│    Guardrails Layer (NeMo Guardrails /      │
│    custom moderation classifiers)           │
└─────────────────────────────────────────────┘
```

### 6.2 LLM-Powered Explanation Service

**Responsibilities:**
- Generate multi-level explanations of conflicts on demand
- Produce context-sensitive, level-appropriate language
- Maintain session context for follow-up questions

**Implementation:**
```python
class ConflictExplainerService:
    def explain(
        self,
        conflict_id: str,
        user_level: ExplanationLevel,
        language: str = "en",
        follow_up_context: list[Message] | None = None
    ) -> ExplanationResponse:
        # 1. Retrieve conflict context from RAG
        # 2. Construct system prompt with level instructions
        # 3. Call LLM with context + user query
        # 4. Validate output through guardrails
        # 5. Return structured response
```

**Prompt Engineering Pattern:**
```
SYSTEM:
You are CHAKRAVYUH_AI, a neutral geopolitical intelligence analyst.
Explain the following conflict at the [{level}] comprehension level.
Use only verified facts. Do not assign moral blame. Acknowledge uncertainty.
Always cite your reasoning. Output must be structured JSON.

CONTEXT:
{retrieved_conflict_documents}

USER:
Explain: {conflict_name}
Focus: {user_query or "general overview"}
Language: {user_language}
```

### 6.3 News Summarization Pipeline

```
Raw Article
    │
    ▼
Language Detection (fastText)
    │
    ▼
Content Extraction (Trafilatura)
    │
    ▼
Relevance Classification (fine-tuned BERT classifier)
    │   (filter out non-geopolitical content)
    ▼
Deduplication (semantic similarity check)
    │
    ▼
Summarization (GPT-4o mini — cost-optimized)
    │
    ▼
Conflict Tagging (classify to conflict_id)
    │
    ▼
Bias/Credibility Check (source tier + framing analysis)
    │
    ▼
Storage (PostgreSQL + Elasticsearch index)
    │
    ▼
Display (Latest Updates Feed)
```

### 6.4 Retrieval-Augmented Generation (RAG)

The platform uses RAG to ground all AI responses in factual, sourced content rather than relying purely on LLM parametric knowledge (which prevents hallucination and ensures recency).

**RAG Corpus:**
- All curated conflict documents
- Verified timeline events
- Conflict actor profiles
- Academic sources (JSTOR, Google Scholar excerpts)
- ACLED, GDELT event records
- Verified news summaries

**Chunking Strategy:**
- Documents chunked at 512 tokens with 50-token overlap
- Metadata-tagged: `{conflict_id, date, source, category}`
- Re-embedded and re-indexed on content update

**Retrieval:**
- Top-K retrieval (K=8) with MMR (Maximal Marginal Relevance) for diversity
- Hybrid search: dense (vector) + sparse (BM25) via Weaviate

### 6.5 Hallucination Mitigation

| Technique | Description |
|---|---|
| RAG grounding | All claims must be supported by retrieved documents |
| Citation enforcement | LLM instructed to cite sources for factual claims |
| Self-consistency check | Run 3 generations, flag high-variance claims |
| Confidence scoring | Propagate source confidence to outputs |
| Human-in-loop review | High-stakes outputs (scenario predictions) reviewed by editors |
| Fallback disclaimers | Outputs that reference post-training events include uncertainty warnings |

---

## 7. Multilingual Support

### 7.1 Supported Languages — Launch

| Language | Code | Script | Priority |
|---|---|---|---|
| English | en | Latin | P0 — Primary |
| Hindi | hi | Devanagari | P0 |
| Tamil | ta | Tamil | P1 |
| Telugu | te | Telugu | P1 |
| Bengali | bn | Bengali | P1 |
| Marathi | mr | Devanagari | P1 |

### 7.2 Multilingual Architecture

```
User Input (any supported language)
    │
    ▼
[1] Language Detection
    Engine: fastText (lid.176.bin model)
    Fallback: CLD3 (Google's Compact Language Detector)
    Confidence threshold: > 0.80 (below threshold → prompt user to confirm)
    │
    ▼
[2] Input Translation (if non-English)
    Engine: DeepL API (primary) / Google Translate API (fallback)
    Cache: Redis with TTL=7 days for input translations
    │
    ▼
[3] English AI Processing
    All LLM reasoning conducted in English
    RAG corpus indexed in English
    │
    ▼
[4] Response Translation
    Engine: DeepL API (primary)
    Quality check: Back-translation spot check for high-traffic content
    Cache: Redis — key: hash(english_response + target_language)
    TTL: 24 hours for dynamic content, 7 days for static summaries
    │
    ▼
[5] Localized Display
    RTL support: Not required for Phase 1 (none of the 6 languages are RTL)
    Font support: Google Fonts (Noto Sans family for Indic scripts)
    Character encoding: UTF-8 throughout
```

### 7.3 UI Localization

**Scope of localization:**

| Component | Localized | Method |
|---|---|---|
| Navigation items | Yes | i18n JSON files |
| Button labels | Yes | i18n JSON files |
| Section headers | Yes | i18n JSON files |
| Map tooltips | Yes | AI-translated + cached |
| Conflict summaries | Yes | AI-translated + cached |
| Timeline events | Yes | AI-translated + cached |
| Error messages | Yes | i18n JSON files |
| Full article content | No (links to source) | Out of scope |

**i18n Implementation:**
```
Framework: Next.js built-in i18n routing
Library: next-intl
Structure:
  /messages
    en.json
    hi.json
    ta.json
    te.json
    bn.json
    mr.json
```

### 7.4 Pre-generated Translation Cache Strategy

High-traffic pages (Top 20 conflicts by pageviews) will have pre-generated translations stored in the database, not computed on demand.

```
Pre-generation triggers:
- New conflict page created
- Conflict content updated
- Weekly re-generation for major conflicts

Storage:
  Table: conflict_translations
  Columns: conflict_id, language_code, section, translated_content, generated_at
```

### 7.5 Language Selector UI

```
Location: Top navigation bar (right side, before user menu)
Design: Globe icon + current language abbreviation (e.g., "EN")
Interaction: Click → dropdown with 6 language options + flags
Persistence: Language preference stored in localStorage + user profile (if logged in)
```

---

## 8. Data Sources & Pipelines

### 8.1 Primary Data Sources

| Source | Type | Data | License | Refresh |
|---|---|---|---|---|
| ACLED | API | Conflict events, fatalities, actors | Free (research) | Daily |
| GDELT | API/BigQuery | Global news events, conflict signals | Open | 15-min updates |
| UNHCR | API | Refugee statistics, displacement | Open | Monthly |
| World Bank | API | GDP, trade, economic indicators | Open | Monthly |
| SIPRI | Database | Military spending, arms trade | Open | Annual |
| UN OCHA | API | Humanitarian data, appeals | Open | Weekly |
| NewsAPI | API | Real-time news from 150k sources | Commercial | Hourly |
| Reuters Connect | API | Wire news | Commercial | Real-time |
| OpenStreetMap | Tiles | Map base layer + rendering via MapLibre | ODbL | On update |
| EIA | API | Oil & energy prices | Open | Daily |
| IMF | API | Macroeconomic projections | Open | Quarterly |

### 8.2 Data Ingestion Pipeline Architecture

```
External Sources
    │
    ▼
┌────────────────────────────────────────┐
│         Ingestion Workers              │
│   (Python, Celery + Redis queue)       │
│                                        │
│  ┌──────────┐  ┌──────────┐           │
│  │ REST API │  │ RSS/Atom │           │
│  │ Clients  │  │ Scrapers │           │
│  └────┬─────┘  └────┬─────┘          │
└───────┼─────────────┼─────────────────┘
        │             │
        ▼             ▼
┌──────────────────────────────┐
│       Raw Data Lake          │
│   (AWS S3 / GCS Bucket)      │
│   Partitioned by: source/date│
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│   Normalization Service      │
│  - Schema validation         │
│  - Entity resolution         │
│  - Deduplication             │
│  - Conflict ID tagging       │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│      PostgreSQL              │
│  (Canonical data store)      │
│  + Elasticsearch index       │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│   AI Processing Queue        │
│  (Summarization, tagging,    │
│   embedding generation)      │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│   Vector Store               │
│   (Pinecone / Weaviate)      │
│   RAG corpus                 │
└──────────────────────────────┘
```

### 8.3 Entity Resolution

A key challenge in conflict data aggregation is that the same actor or event may be referenced differently across sources. Entity resolution normalizes these references:

```
"Russia" = "Russian Federation" = "RF" = "RU"
"Zelenskyy" = "Zelensky" = "Volodymyr Zelenskyy"

Method:
1. Canonical entity dictionary (manually curated)
2. Fuzzy matching (rapidfuzz, Jaro-Winkler distance > 0.90)
3. LLM disambiguation for ambiguous cases
4. Human review queue for low-confidence matches
```

---

## 9. Technical Architecture

### 9.1 System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                             │
│   Web Browser (Next.js)     Mobile Browser     PWA             │
└────────────────────────────────┬────────────────────────────────┘
                                 │ HTTPS
┌────────────────────────────────▼────────────────────────────────┐
│                        CDN LAYER                                │
│               Cloudflare (Static assets, Edge caching)         │
└────────────────────────────────┬────────────────────────────────┘
                                 │
┌────────────────────────────────▼────────────────────────────────┐
│                      API GATEWAY                                │
│              Kong / AWS API Gateway                             │
│  (Auth, rate limiting, routing, SSL termination, logging)      │
└──────┬─────────────┬──────────────┬──────────────┬─────────────┘
       │             │              │              │
┌──────▼──────┐ ┌────▼──────┐ ┌────▼────────┐ ┌──▼───────────┐
│   Content   │ │    AI     │ │    Data     │ │   Auth       │
│   Service   │ │  Service  │ │   Service   │ │   Service    │
│  (Node.js)  │ │ (Python)  │ │  (Node.js)  │ │  (Node.js)   │
└──────┬──────┘ └────┬──────┘ └────┬────────┘ └──────────────┘
       │             │              │
┌──────▼─────────────▼──────────────▼───────────────────────────┐
│                       DATA LAYER                               │
│                                                                │
│  PostgreSQL (primary)   Redis (cache)   Elasticsearch (search)│
│  Pinecone (vectors)     S3 (object)     TimescaleDB (metrics) │
└────────────────────────────────────────────────────────────────┘
       │
┌──────▼─────────────────────────────────────────────────────────┐
│                   EXTERNAL SERVICES                            │
│  OpenAI API   DeepL API   MapLibre/OSM   NewsAPI   ACLED   GDELT │
└────────────────────────────────────────────────────────────────┘
```

### 9.2 Frontend Stack

| Technology | Purpose | Version |
|---|---|---|
| Next.js | Full-stack React framework, SSR/SSG/ISR | 14+ (App Router) |
| React | UI component library | 18+ |
| TypeScript | Type safety across codebase | 5+ |
| Tailwind CSS | Utility-first styling | 3+ |
| Framer Motion | Animations and transitions | 11+ |
| MapLibre GL JS | Interactive map rendering (open-source, WebGL) | 4+ |
| D3.js | Custom data visualizations (force graph, custom charts) | 7+ |
| Recharts | Chart components | 2+ |
| next-intl | Internationalization | 3+ |
| SWR | Client-side data fetching and caching | 2+ |
| Zustand | Lightweight global state management | 4+ |

**Rendering Strategy:**
- Static pages (home, about): SSG
- Conflict detail pages: ISR (revalidate every 5 minutes)
- Latest updates feed: Client-side SWR with polling
- AI responses: Streaming SSE (Server-Sent Events)
- Map: Client-side only (no SSR for WebGL)

### 9.3 Backend Stack

**Content Service (Node.js / TypeScript)**
- Conflict CRUD operations
- Timeline event management
- Actor/entity management
- Caching layer integration

**AI Service (Python / FastAPI)**
- LLM orchestration (LangChain)
- RAG pipeline execution
- Summarization pipeline
- Translation coordination
- Streaming response support

**Data Service (Node.js / TypeScript)**
- External API ingestion workers
- Data normalization
- Entity resolution
- Elasticsearch indexing

**Auth Service (Node.js / TypeScript)**
- JWT + Refresh token authentication
- OAuth2 (Google, GitHub)
- Role-based access control (RBAC)
- Rate limiting per user tier

### 9.4 Infrastructure

```
Cloud Provider:         AWS (primary) / GCP (AI workloads)
Container Runtime:      Docker + Kubernetes (EKS)
CI/CD:                  GitHub Actions → ECR → EKS
Infrastructure as Code: Terraform
Secrets Management:     AWS Secrets Manager
Monitoring:             Datadog (APM, logs, infrastructure)
Error Tracking:         Sentry
Analytics:              PostHog (product analytics)
Feature Flags:          LaunchDarkly
```

---

## 10. Database Schema

### 10.1 Core Tables

#### `conflicts`
```sql
CREATE TABLE conflicts (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug            VARCHAR(255) UNIQUE NOT NULL,
    display_name    VARCHAR(255) NOT NULL,
    status          VARCHAR(50) NOT NULL, -- 'active' | 'frozen' | 'resolved' | 'historical'
    intensity       VARCHAR(50) NOT NULL, -- 'high' | 'medium' | 'low' | 'tension'
    start_date      DATE NOT NULL,
    end_date        DATE,
    region          VARCHAR(100) NOT NULL,
    sub_region      VARCHAR(100),
    lat             DECIMAL(9,6) NOT NULL,
    lng             DECIMAL(9,6) NOT NULL,
    risk_score      DECIMAL(3,1),         -- 0.0–10.0
    overview_text   TEXT,
    background_text TEXT,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);
```

#### `timeline_events`
```sql
CREATE TABLE timeline_events (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conflict_id     UUID NOT NULL REFERENCES conflicts(id) ON DELETE CASCADE,
    event_date      DATE NOT NULL,
    title           VARCHAR(500) NOT NULL,
    description     TEXT NOT NULL,
    category        VARCHAR(50) NOT NULL, -- 'military' | 'political' | 'diplomatic' | 'humanitarian'
    significance    VARCHAR(50) NOT NULL, -- 'critical' | 'major' | 'moderate' | 'minor'
    sources         JSONB,               -- Array of source URLs
    media_url       VARCHAR(1000),
    media_type      VARCHAR(50),         -- 'image' | 'video' | 'document'
    created_at      TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_timeline_events_conflict ON timeline_events(conflict_id, event_date);
```

#### `actors`
```sql
CREATE TABLE actors (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name            VARCHAR(255) NOT NULL,
    type            VARCHAR(100) NOT NULL, -- 'state' | 'non_state' | 'organization' | 'individual'
    country_code    CHAR(2),               -- ISO 3166-1 alpha-2
    description     TEXT,
    logo_url        VARCHAR(1000),
    created_at      TIMESTAMPTZ DEFAULT NOW()
);
```

#### `conflict_actors` (junction table)
```sql
CREATE TABLE conflict_actors (
    conflict_id     UUID NOT NULL REFERENCES conflicts(id) ON DELETE CASCADE,
    actor_id        UUID NOT NULL REFERENCES actors(id) ON DELETE CASCADE,
    role            VARCHAR(100) NOT NULL, -- 'attacker' | 'defender' | 'mediator' | 'supporter' | 'observer'
    stated_objectives TEXT,
    involvement_start DATE,
    involvement_end   DATE,
    PRIMARY KEY (conflict_id, actor_id)
);
```

#### `economic_impact`
```sql
CREATE TABLE economic_impact (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conflict_id     UUID NOT NULL REFERENCES conflicts(id) ON DELETE CASCADE,
    metric_name     VARCHAR(255) NOT NULL,
    metric_value    DECIMAL(20,4),
    metric_unit     VARCHAR(100),
    as_of_date      DATE NOT NULL,
    source          VARCHAR(500),
    notes           TEXT,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_economic_impact_conflict ON economic_impact(conflict_id, metric_name);
```

#### `humanitarian_impact`
```sql
CREATE TABLE humanitarian_impact (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conflict_id         UUID NOT NULL REFERENCES conflicts(id),
    total_deaths        INTEGER,
    civilian_deaths     INTEGER,
    combatant_deaths    INTEGER,
    idp_count           INTEGER,  -- Internally Displaced Persons
    refugee_count       INTEGER,
    as_of_date          DATE NOT NULL,
    source              VARCHAR(500),
    updated_at          TIMESTAMPTZ DEFAULT NOW()
);
```

#### `news_updates`
```sql
CREATE TABLE news_updates (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conflict_id     UUID REFERENCES conflicts(id),
    source_name     VARCHAR(255) NOT NULL,
    source_url      VARCHAR(2000) NOT NULL,
    headline        VARCHAR(1000) NOT NULL,
    summary_bullets JSONB,                -- Array of 3 bullet strings
    published_at    TIMESTAMPTZ NOT NULL,
    category        VARCHAR(50),          -- 'military' | 'political' | 'humanitarian'
    credibility_tier INTEGER,             -- 1 (highest) – 4 (lowest)
    raw_content     TEXT,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_news_updates_conflict_date ON news_updates(conflict_id, published_at DESC);
```

#### `conflict_translations`
```sql
CREATE TABLE conflict_translations (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conflict_id     UUID NOT NULL REFERENCES conflicts(id),
    language_code   CHAR(5) NOT NULL,     -- e.g., 'hi', 'ta', 'te'
    section         VARCHAR(100) NOT NULL, -- 'overview' | 'background' | 'timeline_summary'
    translated_text TEXT NOT NULL,
    generated_at    TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(conflict_id, language_code, section)
);
```

#### `users`
```sql
CREATE TABLE users (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email           VARCHAR(255) UNIQUE,
    display_name    VARCHAR(255),
    avatar_url      VARCHAR(1000),
    preferred_language CHAR(5) DEFAULT 'en',
    role            VARCHAR(50) DEFAULT 'reader',  -- 'reader' | 'premium' | 'editor' | 'admin'
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    last_active_at  TIMESTAMPTZ
);
```

#### `saved_conflicts`
```sql
CREATE TABLE saved_conflicts (
    user_id         UUID NOT NULL REFERENCES users(id),
    conflict_id     UUID NOT NULL REFERENCES conflicts(id),
    saved_at        TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (user_id, conflict_id)
);
```

---

## 11. API Design

### 11.1 Design Principles

- RESTful endpoints for resource-oriented operations
- GraphQL endpoint for complex, nested queries (conflict detail page)
- All responses return JSON with consistent envelope structure
- Versioned via URL prefix: `/api/v1/`
- Authentication via Bearer JWT token

**Response Envelope:**
```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "page": 1,
    "total": 42,
    "request_id": "req_abc123"
  },
  "error": null
}
```

### 11.2 REST API Endpoints

#### Conflicts

```
GET    /api/v1/conflicts
       Query params: region, status, intensity, limit, offset, sort
       → Returns paginated list of conflicts with summary fields

GET    /api/v1/conflicts/:slug
       → Returns full conflict object with all sections

GET    /api/v1/conflicts/:slug/timeline
       Query params: start_date, end_date, category, significance
       → Returns chronological array of timeline events

GET    /api/v1/conflicts/:slug/actors
       → Returns array of actors with their roles

GET    /api/v1/conflicts/:slug/impact
       → Returns economic + humanitarian impact data

GET    /api/v1/conflicts/:slug/updates
       Query params: limit, offset, category, since
       → Returns latest news update summaries

GET    /api/v1/conflicts/:slug/translations/:lang_code
       → Returns all translated sections for a given language
```

#### AI Endpoints

```
POST   /api/v1/ai/explain
       Body: { conflict_id, level, language, follow_up_messages? }
       → Returns streaming SSE of explanation text

POST   /api/v1/ai/ask
       Body: { question, conflict_id?, language }
       → Returns streaming SSE of Q&A response

POST   /api/v1/ai/debate
       Body: { conflict_id, question }
       → Returns structured multi-perspective analysis

POST   /api/v1/ai/scenarios
       Body: { conflict_id }
       → Returns array of future scenario objects
```

#### Search

```
GET    /api/v1/search
       Query params: q, type (conflict|actor|event), language
       → Returns ranked search results across all content types
```

#### Map Data

```
GET    /api/v1/map/markers
       Query params: region, status, intensity
       → Returns GeoJSON FeatureCollection of conflict markers

GET    /api/v1/map/snapshot
       Query params: conflict_id, date
       → Returns territorial control GeoJSON for a given date
```

#### User

```
GET    /api/v1/user/profile
POST   /api/v1/user/saved-conflicts
DELETE /api/v1/user/saved-conflicts/:conflict_id
PUT    /api/v1/user/preferences
```

### 11.3 GraphQL Schema (Conflict Detail)

```graphql
type Conflict {
  id: ID!
  slug: String!
  displayName: String!
  status: ConflictStatus!
  intensity: ConflictIntensity!
  startDate: Date!
  endDate: Date
  region: String!
  riskScore: Float
  overview: String
  background: String
  timeline(
    startDate: Date
    endDate: Date
    category: EventCategory
    limit: Int
  ): [TimelineEvent!]!
  actors: [ConflictActor!]!
  economicImpact: [ImpactMetric!]!
  humanitarianImpact: HumanitarianImpact
  latestUpdates(limit: Int): [NewsUpdate!]!
  translation(language: LanguageCode!): ConflictTranslation
}

type TimelineEvent {
  id: ID!
  date: Date!
  title: String!
  description: String!
  category: EventCategory!
  significance: EventSignificance!
  sources: [String!]
}

type ConflictActor {
  actor: Actor!
  role: ActorRole!
  statedObjectives: String
}
```

### 11.4 Rate Limiting

| Tier | Limit | Notes |
|---|---|---|
| Unauthenticated | 30 req/min | IP-based |
| Free registered | 100 req/min | |
| Premium | 500 req/min | |
| API (developer) | Configurable | Per API key |
| AI endpoints | 10 req/min (free), 60 req/min (premium) | LLM cost management |

---

## 12. UX Principles & UI Pages

### 12.1 Design Principles

| Principle | Application |
|---|---|
| **Clarity over density** | Never show more than users can process; progressive disclosure pattern |
| **Visual storytelling** | Lead with maps and visuals; text supports, not leads |
| **Trust through transparency** | Every fact is sourced; AI outputs labeled as AI |
| **Progressive depth** | Summary → Detail → Expert, always user-controlled |
| **Speed to insight** | Any conflict understandable in under 3 minutes |
| **Mobile-first** | Full feature parity on mobile, optimized touch interactions |

### 12.2 Page Architecture

#### Page 1 — Home / Discovery Page (`/`)

**Purpose:** Orient users to the platform. Draw them into a conflict.

**Layout:**
```
[Global Navigation: Logo | Search | Regions | Learn | About | Lang Selector | Sign In]

[HERO: Animated globe with pulsing conflict markers]
[Tagline: "Understand the world's conflicts. Instantly."]
[Search bar: "Ask about any conflict..."]

[FEATURED CONFLICT — Editorial pick, refreshed weekly]
  Large card: Map + headline + AI one-liner + key stats

[ACTIVE CONFLICTS GRID — Cards for all high-intensity active conflicts]
  Filter row: All | Africa | Middle East | Europe | Asia | Americas

[CONFLICT RISK INDEX — Top 5 highest-risk conflicts this week]

[LATEST UPDATES — Rolling feed of summarized news, last 24 hours]

[LEARN MODE TEASER — "New to geopolitics? Start here"]

[Footer: About | Data Sources | Methodology | API | Privacy | Terms]
```

---

#### Page 2 — Conflict Detail Page (`/conflict/[slug]`)

**Purpose:** Deep-dive on a single conflict. The core content unit.

**Layout:**
```
[Breadcrumb: Home → Region → Conflict Name]
[Hero: Conflict name | Status badge | Risk score | Key stats strip]
[Action bar: Ask AI | Save | Share | Language selector]

[Tab Navigation: Overview | Timeline | Key Players | Military | Impact | Updates]

[Main Content Area — Tab-dependent]

[AI Explainer Panel — Sticky right sidebar (desktop) / bottom sheet (mobile)]
  Level selector + explanation text + follow-up input
```

---

#### Page 3 — Global Dashboard (`/dashboard`)

**Purpose:** High-level situational awareness across all conflicts.

**Layout:**
```
[World Map — Full viewport, all conflict markers]
[Sidebar: Conflict Risk Index ranking]
[Filter panel: Region | Status | Intensity | Date range]
[Bottom strip: Active conflicts count | Total casualties | Displaced persons | Highest risk alert]
```

---

#### Page 4 — Compare Conflicts (`/compare`)

**Purpose:** Side-by-side comparison of two conflicts across standardized dimensions.

**Layout:**
```
[Conflict A Selector]     vs.     [Conflict B Selector]

[Comparison Grid]
  Duration
  Casualties
  Displacement
  Economic impact
  International involvement
  Current status

[AI Comparison Summary]
[Key Similarities & Differences — AI Generated]
```

---

#### Page 5 — Learn Mode (`/learn`)

**Purpose:** Structured, curriculum-style introduction to geopolitics for users with no prior knowledge.

**Content modules:**
```
Module 1: What is a geopolitical conflict?
Module 2: Understanding maps and territories
Module 3: How to read the news critically
Module 4: Key concepts (sovereignty, deterrence, proxy war, etc.)
Module 5: Introduction to current conflicts
[AI Tutor: Ask anything about geopolitics]
```

---

#### Page 6 — Search Results (`/search`)

```
[Search input — pre-filled from query]
[Filters: Type (Conflict/Actor/Event) | Region | Date Range]
[Results list — ranked by relevance]
  Conflict cards
  Actor cards
  Event snippets
[AI Summary of search intent — top of results]
```

---

## 13. Security & Trust

### 13.1 AI Hallucination Prevention

| Control | Description |
|---|---|
| RAG grounding | All AI outputs grounded in retrieved factual documents |
| Citation enforcement | System prompt requires LLM to cite sources |
| Output validation | Post-generation check for factual claims vs. corpus |
| Confidence thresholds | Low-confidence outputs are flagged or withheld |
| Editorial review queue | High-stakes AI content (scenario analysis) reviewed by humans |
| User reporting | "Flag this response" button on all AI outputs |

### 13.2 Misinformation Prevention

- **Source tier system:** Sources categorized by editorial independence and verification standards (Tier 1: Reuters, AP; Tier 4: tabloids, state-controlled media flagged)
- **State-media labeling:** State-affiliated media sources labeled prominently (e.g., "RT is state-funded media")
- **No AI-generated factual claims without sourcing** in conflict pages — editorial team verifies all key facts
- **Content review workflow:** All new conflict pages reviewed by at least one human editor before publication

### 13.3 Data Security

| Layer | Control |
|---|---|
| Transport | TLS 1.3 everywhere |
| Authentication | JWT (short-lived) + Refresh tokens (httpOnly cookie) |
| Authorization | RBAC (reader / premium / editor / admin) |
| Input validation | Zod schema validation on all API inputs |
| SQL injection | Parameterized queries (Drizzle ORM / Prisma) |
| XSS prevention | Content Security Policy headers, output sanitization |
| Rate limiting | Kong rate limiting + Redis token bucket |
| DDoS protection | Cloudflare (Layer 3/4/7) |
| Secrets | AWS Secrets Manager — never in code or env files |
| GDPR | Data minimization, right to deletion, EU hosting for EU users |

### 13.4 AI Content Moderation

All AI-generated content passes through a two-layer moderation system:

1. **Pre-generation:** System prompt guardrails (no incitement, no ethnic targeting, no endorsement of violence)
2. **Post-generation:** OpenAI Moderation API + custom classifier for geopolitical content

Content that triggers moderation is:
- Withheld from display
- Logged for review
- Replaced with a "Content under review" placeholder

---

## 14. Performance & Scalability

### 14.1 Performance Targets

| Metric | Target | Measurement |
|---|---|---|
| Time to First Contentful Paint (FCP) | < 1.2s | Lighthouse / RUM |
| Largest Contentful Paint (LCP) | < 2.5s | Lighthouse / RUM |
| Time to Interactive (TTI) | < 3.5s | Lighthouse |
| AI explanation first token | < 800ms | Custom APM |
| Map initial load | < 2.0s | Custom APM |
| API P95 response time | < 200ms (non-AI) | Datadog |
| API P99 response time | < 500ms (non-AI) | Datadog |

### 14.2 Caching Strategy

| Layer | Technology | TTL | Scope |
|---|---|---|---|
| CDN edge cache | Cloudflare | 5–60 min | Static assets, ISR pages |
| API response cache | Redis | 5 min | Conflict list, map markers |
| Conflict detail cache | Redis | 5 min | Full conflict JSON |
| AI response cache | Redis | 1 hour | Explanation responses by hash |
| Translation cache | Redis | 24 hours | Translated content |
| Database query cache | PostgreSQL + pgBouncer | N/A | Connection pooling |

**Cache Invalidation:** Conflict content changes trigger targeted cache purges via webhook → Redis DEL + Cloudflare Cache Purge API.

### 14.3 Scalability Architecture

**Horizontal scaling:**
- All services deployed as stateless containers on Kubernetes
- Auto-scaling policies on CPU > 70% or queue depth > 1000
- Read replicas for PostgreSQL (2 replicas minimum in production)

**AI workload management:**
- Request queuing for AI endpoints (Celery + Redis)
- Streaming responses to reduce perceived latency
- Cost controls: GPT-4o for complex explanations, GPT-4o mini for summarization
- AI response caching as primary cost reduction strategy

**Database:**
- TimescaleDB for time-series metrics (conflict events, impact metrics)
- Elasticsearch for full-text search and real-time news indexing
- Pinecone for vector embeddings (scales independently)

---

## 15. MVP Definition

### 15.1 MVP Scope

The MVP must deliver the core promise: *"Understand any conflict in under 3 minutes."*

**In scope for MVP:**

| Feature | Priority | Notes |
|---|---|---|
| Interactive global conflict map | P0 | 20 pre-loaded conflicts |
| Conflict detail pages | P0 | All sections |
| Timeline slider | P0 | Per conflict |
| AI Conflict Explainer (4 levels) | P0 | English only |
| Key Players section | P0 | Manual data entry |
| Impact Dashboard (basic metrics) | P0 | |
| Latest Updates feed | P0 | English news sources |
| User accounts + saved conflicts | P1 | |
| Search | P1 | Elasticsearch |
| Multilingual support (Hindi first) | P1 | Translation pipeline |
| Mobile-responsive design | P0 | |

**Out of scope for MVP:**

- AI Debate Mode
- Economic Impact Simulator
- Satellite Change Visualization
- Future Scenario Predictions
- Compare Conflicts page
- Full multilingual support (all 6 languages)
- Developer API access
- Learn Mode

### 15.2 MVP Conflict Coverage

Initial 20 conflicts for launch:

```
HIGH INTENSITY (Active War):
1. Russia-Ukraine War
2. Gaza-Israel Conflict
3. Sudan Civil War
4. Myanmar Civil War
5. Haiti Crisis
6. DRC Conflict (M23)
7. Ethiopia (Amhara conflict)

MEDIUM INTENSITY (Active armed conflict):
8. Sahel / Mali-Burkina Faso
9. Somalia (Al-Shabaab)
10. Yemen Civil War
11. Syria Conflict
12. Nagorno-Karabakh
13. India-Pakistan (Kashmir LoC)
14. Mozambique (Cabo Delgado)

TENSIONS:
15. Taiwan Strait Tensions
16. South China Sea
17. Kosovo-Serbia
18. Iran-Israel Shadow War
19. North Korea (Korean Peninsula)
20. Armenia-Azerbaijan (post-war)
```

### 15.3 MVP Success Criteria

| Metric | Target (30 days post-launch) |
|---|---|
| Weekly Active Users | 10,000 |
| Avg. time on conflict page | > 4 minutes |
| AI explainer usage rate | > 40% of conflict page visitors |
| Return visitor rate (7-day) | > 25% |
| Mobile traffic share | > 55% |
| Page crash rate | < 0.1% |
| AI response satisfaction (👍/👎) | > 75% positive |

---

## 16. Roadmap

### Phase 1 — MVP (Months 1–3)

```
Engineering:
✅ Frontend — Map, conflict pages, timeline, AI explainer, impact dashboard
✅ Backend — Content service, AI service, data pipelines (ACLED, GDELT, UNHCR)
✅ Infrastructure — Kubernetes cluster, CI/CD, monitoring
✅ Data — 20 conflict seed data, actor database, timeline events

Launch:
✅ Private beta (500 users)
✅ Public launch
✅ PR/content marketing — target student/journalist audience
```

### Phase 2 — Engagement & Depth (Months 4–6)

```
Features:
- AI Debate Mode
- Future Scenario Predictions
- Compare Conflicts page
- Full multilingual support (all 6 languages)
- User accounts with personalization
- Email/push alerts for conflict updates
- Learn Mode
- Mobile app (React Native)

Data:
- Expand to 50 conflicts
- Add SIPRI military spending data
- Add real-time news integration (Reuters Connect)
```

### Phase 3 — Intelligence Layer (Months 7–9)

```
Features:
- Economic Impact Simulator
- Global Conflict Risk Index (public-facing)
- Satellite Change Visualization (Sentinel-2 data)
- API access for developers/researchers
- Conflict comparison matrix

Monetization:
- Premium tier launch ($9.99/month)
  - Unlimited AI queries
  - API access
  - No rate limits
  - Advanced simulator
- Institutional licensing (universities, newsrooms, NGOs)
```

### Phase 4 — Platform Expansion (Months 10–15)

```
Features:
- Real-time satellite monitoring integration
- Historical conflict archive (Cold War, WW2, etc.)
- Conflict simulation games / educational tools
- Expert contributor program (academic and journalist contributions)
- Embeddable widgets for news sites

Partnerships:
- UN agencies data partnerships
- University research program
- Newsroom API integrations
```

### Phase 5 — Geopolitical Intelligence Platform (Year 2+)

```
Vision:
- Proprietary conflict intelligence scoring model
- Institutional subscriptions (governments, corporations, think tanks)
- API ecosystem for third-party integrations
- Conflict early warning system
- Podcast / video explainer integration
- Public research portal
```

---

## 17. Success Metrics

### 17.1 Product Health Metrics

| Category | Metric | Target | Cadence |
|---|---|---|---|
| **Acquisition** | Weekly new users | 10K (Month 1) → 100K (Month 6) | Weekly |
| **Activation** | % who view a full conflict page on first visit | > 70% | Weekly |
| **Engagement** | Avg. session duration | > 6 minutes | Weekly |
| **Engagement** | Avg. conflict pages per session | > 2.5 | Weekly |
| **Retention** | 7-day return rate | > 30% | Weekly |
| **AI Feature** | AI explainer usage rate | > 40% of page visitors | Weekly |
| **AI Feature** | AI response satisfaction rate | > 75% thumbs up | Weekly |
| **Content** | Timeline interactions per conflict page visit | > 60% | Weekly |
| **Search** | Search-to-conflict click rate | > 65% | Weekly |
| **Mobile** | Mobile session share | > 55% | Monthly |

### 17.2 Quality Metrics

| Metric | Target |
|---|---|
| AI factual accuracy (human-evaluated sample) | > 95% |
| Content freshness (updates within 4 hours of major event) | > 90% SLA |
| Page uptime | > 99.9% |
| API P95 latency (non-AI) | < 200ms |
| AI first token latency | < 800ms |

### 17.3 Business Metrics

| Metric | Target |
|---|---|
| Monthly Active Users (MAU) — Month 6 | 200K |
| MAU — Month 12 | 1M |
| Premium conversion rate | > 3% |
| Premium churn (monthly) | < 5% |
| ARR — Month 12 | $500K |
| NPS score | > 50 |

---

## 18. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| AI hallucination damages trust | Medium | High | RAG grounding, human review, clear AI labeling, user flagging |
| Accusations of political bias | High | High | Multi-perspective design, editorial guidelines, transparent sourcing |
| Data source reliability (ACLED, GDELT accuracy) | Medium | Medium | Multi-source corroboration, confidence scoring, lag indicators |
| LLM API cost overruns | High | Medium | Response caching, model tiering, rate limiting, cost monitoring |
| Map performance on low-end devices | Medium | Medium | Leaflet fallback, simplified tile layers, progressive enhancement |
| Content copyright / news scraping legal risk | Medium | High | RSS-only ingestion, no full-text reproduction, news summaries only |
| Geopolitical sensitivity / government pressure | Low | High | Clear editorial independence statement, legal review of content policy |
| Scale surge (viral moment around a major conflict) | Medium | High | Auto-scaling, CDN caching, circuit breakers on AI endpoints |
| Translation quality degradation in Indic languages | Medium | Medium | Quality spot-checks, user feedback mechanism, human review for high-traffic pages |

---

## 19. Open Questions

| # | Question | Owner | Due |
|---|---|---|---|
| 1 | Which LLM provider is primary at launch: OpenAI or Anthropic? | Engineering Lead | Sprint 1 |
| 2 | What is the editorial review SLA for new conflict pages? | Editorial | Sprint 2 |
| 3 | Should the platform take explicit positions on disputed territorial claims (e.g., Crimea, Palestine borders)? | Legal + Editorial | Sprint 1 |
| 4 | What is the minimum viable satellite imagery plan for Phase 3? | Product | Sprint 6 |
| 5 | Should we build a mobile app in parallel with web, or web-first? | Product + Engineering | Sprint 1 |
| 6 | Will we open-source the conflict data schema and API? | Product | Sprint 4 |
| 7 | What is the content moderation escalation path for politically sensitive AI outputs? | Legal + Product | Sprint 2 |
| 8 | Should the Economic Impact Simulator use public-facing probabilistic disclaimers or only show ranges? | Legal | Sprint 7 |

---

## Appendix A — Glossary

| Term | Definition |
|---|---|
| Conflict | An armed confrontation, war, or sustained violent dispute between parties |
| Actor | Any state, organization, or individual participating in a conflict |
| Intensity | Classification of conflict severity (high / medium / low / tension) |
| Risk Score | Composite 0–10 score indicating escalation risk |
| RAG | Retrieval-Augmented Generation — AI answers grounded in retrieved documents |
| ISR | Incremental Static Regeneration — Next.js rendering strategy |
| ELI10/ELI15 | "Explain Like I'm 10/15" — simplified explanation modes |
| ACLED | Armed Conflict Location & Event Data Project |
| GDELT | Global Database of Events, Language, and Tone |
| IDP | Internally Displaced Person |
| OSINT | Open Source Intelligence |

---

## Appendix B — Technology Decision Log

| Decision | Options Considered | Decision Made | Rationale |
|---|---|---|---|
| Map library | MapLibre GL JS, Mapbox GL JS, Leaflet, Google Maps, Deck.gl | MapLibre GL JS (primary), Leaflet (fallback) | Open-source, WebGL performance, no vendor lock-in, no API billing, conflict polygon support |
| Frontend framework | Next.js, Nuxt.js, SvelteKit | Next.js | Ecosystem maturity, ISR support, team familiarity |
| Primary LLM | OpenAI GPT-4o, Anthropic Claude, Google Gemini | GPT-4o (primary), Claude (fallback) | Evaluate both in Sprint 1 |
| Vector database | Pinecone, Weaviate, pgvector | TBD — evaluate in Sprint 2 | Need to benchmark on conflict corpus size |
| Translation API | DeepL, Google Translate, OpenAI | DeepL (primary), Google (fallback) | DeepL quality superior for formal/political text |
| State management | Redux Toolkit, Zustand, Jotai | Zustand | Simplicity, bundle size, sufficient for scope |

---

*Document maintained by: Product & Engineering*
*Review cycle: Bi-weekly during active development*
*Next review date: 2026-03-19*
