# UI/UX Design Specification: Token Inspector

**Feature Name**: `token-inspector`  
**High-Level Domain**: `Developer Tooling / LLM Observability & Pre-flight Optimization`  
**Status**: `Approved / Ready for Architecture`  
**Design Phase**: `Stage 3 - UI/UX Design`  
**Aesthetic Theme**: `Developer Dark Mode (Linear / Chrome DevTools / Vercel Dark)`  
**Platform Scope**: `Embedded Web Dashboard (Single-Binary Offline-First) & Terminal CLI (Rich ANSI/TUI)`

---

## 1. Executive Summary & Design Vision

### 1.1 Product Purpose
`token-inspector` is a pre-flight observability and token optimization suite for AI engineers. The UI provides instant transparency into how language models parse, budget, and sample tokens. It combines:
1. An embedded, zero-CDN, offline-first Web Inspector UI served locally by the Python reverse proxy.
2. A high-contrast, informative Terminal CLI interface using ANSI 256/Truecolor and Rich rendering.

### 1.2 UX Design Philosophy
- **Developer-Native Density**: High information density without visual clutter, prioritizing raw metrics (tokens, bytes, latency, costs) and syntax clarity.
- **Microsecond Perceptual Speed**: Zero-CDN architecture; pre-compiled static assets embedded in the Python binary; instantaneous client-side navigation; sub-50ms interaction latency.
- **Deep Token Granularity**: Make invisible Byte-Pair Encoding (BPE) mechanics completely visible—exposing subword splits, whitespace token fragmentation, repeated JSON schema keys, and logprob confidence decay.
- **Dual-Surface Consistency**: Visual language, token color alternation, and metric semantics are unified across the browser dashboard and terminal CLI.

---

## 2. Design Tokens & Visual Foundations

### 2.1 Dark Mode First Color Palette (WCAG 2.1 AA Compliant)
The palette is built on rich zinc/slate undertones with crisp semantic accents to ensure contrast ratios exceeding 4.5:1 for body copy and 3.0:1 for graphical UI elements.

```text
Surface & Backgrounds:
  --bg-canvas:         #090A0F  (Deepest terminal black canvas)
  --bg-surface:        #12141C  (Card and sidebar container surface)
  --bg-surface-hover:  #1A1D28  (Interactive hover state)
  --bg-surface-active: #222634  (Selected item state)
  --border-subtle:     #232838  (Subtle dividers and borders)
  --border-strong:     #343B52  (Active card borders and focus rings)

Typography:
  --text-primary:      #F1F5F9  (96% contrast, crisp white-slate for headlines & code)
  --text-secondary:    #94A3B8  (Secondary labels, metadata, muted headers)
  --text-tertiary:     #64748B  (Timestamps, inactive indicators, subtle hints)
  --text-accent:       #38BDF8  (Sky blue highlights, interactive links)

Semantic Status & Context Meters:
  --status-normal:     #10B981  (Emerald green: 0-70% context saturation, 200 OK)
  --status-warning:    #F59E0B  (Amber: 70-85% saturation warning, 4xx warnings)
  --status-danger:     #EF4444  (Crimson: >85% saturation, budget overflow, 5xx errors)
  --status-info:       #06B6D4  (Cyan: system prompts, proxy metrics)
```

### 2.2 Token Boundary Alternation Palette
To distinguish subword tokens within text without creating eye fatigue, the visualizer uses an accessible 6-hue cycling background badge palette with dark contrasting borders.

| Badge Index | Background Hex | Foreground Hex | Terminal ANSI (256 / RGB) | Example Token |
| :---: | :---: | :---: | :---: | :---: |
| **Hue 0** | `#1E293B` (Slate) | `#E2E8F0` | `rgb(30,41,59)` on `white` | `"` |
| **Hue 1** | `#1E3A5F` (Blue) | `#93C5FD` | `rgb(30,58,95)` on `cyan` | `user` |
| **Hue 2** | `#064E3B` (Emerald) | `#6EE7B7` | `rgb(6,78,59)` on `green` | `_id` |
| **Hue 3** | `#3B1F4E` (Purple) | `#D8B4FE` | `rgb(59,31,78)` on `magenta` | `":` |
| **Hue 4** | `#451A03` (Amber) | `#FCD34D` | `rgb(69,26,3)` on `yellow` | `10` |
| **Hue 5** | `#164E63` (Cyan) | `#67E8F9` | `rgb(22,78,99)` on `blue` | `84` |

### 2.3 Logprob Confidence Heatmap Palette
Used for sampling evaluation, perplexity mapping, and hallucination risk identification:
- **High Confidence ($P \ge 90\%$, $\ln(P) \ge -0.105$)**:
  - Background: `rgba(16, 185, 129, 0.18)` / Border: `#059669` / Text: `#34D399`
- **Moderate Confidence ($50\% \le P < 90\%$, $-0.693 \le \ln(P) < -0.105$)**:
  - Background: `rgba(245, 158, 11, 0.20)` / Border: `#D97706` / Text: `#FBBF24`
- **Low Confidence / Hallucination Risk ($P < 50\%$, $\ln(P) < -0.693$)**:
  - Background: `rgba(239, 68, 68, 0.22)` / Border: `#DC2626` / Text: `#F87171`

### 2.4 Typography Hierarchy
- **Code & Token Display Stack**: `ui-monospace, "JetBrains Mono", "SF Mono", "Fira Code", Menlo, monospace`
  - Base Token Size: `13px` / Line Height: `1.65` / Letter Spacing: `0.02em`
  - Token Subword Indicator: `9px` bold label
- **UI & Controls Stack**: `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif`
  - Display Header (H1): `18px` semi-bold (`font-weight: 600`)
  - Section Header (H2): `14px` medium (`font-weight: 500`)
  - Meta/Badges: `11px` medium (`font-weight: 500`), uppercase tracking `0.05em`
  - Numerical Metrics: `tabular-nums` enabled across all tables and meters

---

## 3. Web Performance & Architecture Budget

### 3.1 Core Web Vitals Targets
Because `token-inspector` runs locally inside developer loops, it must load instantly and remain perfectly fluid during streaming:

| Metric | Target Budget | Strategy & Enforcement |
| :--- | :--- | :--- |
| **First Contentful Paint (FCP)** | **< 600ms** (Threshold <800ms) | Inlined critical CSS and SVG sprites directly in single HTML payload; zero external HTTP roundtrips. |
| **Time to First Byte (TTFB)** | **< 25ms** | Local Python HTTP server (`aiohttp` / `uvicorn`), in-memory static response caching. |
| **Largest Contentful Paint (LCP)** | **< 900ms** (Threshold <1.2s) | Skeleton-free layout structure; primary layout rendered synchronously before SSE connection initializes. |
| **Interaction to Next Paint (INP)** | **< 40ms** (Threshold <50ms) | Virtualized token badge rendering for long contexts (>1,000 tokens); request debouncing on filters (150ms). |
| **Cumulative Layout Shift (CLS)** | **0.00** | Explicit aspect ratio and fixed-height headers/drawers; zero dynamic layout reflows during SSE streaming. |

### 3.2 Client Assets & Footprint Budget
- **Single-Binary Zero-CDN Distribution**:
  - **No external CDN links**: Zero calls to `unpkg.com`, `cdnjs.cloudflare.com`, or Google Fonts. Functions 100% offline in air-gapped environments.
  - **Single Bundled File**: UI delivered as a pre-built static bundle (`index.html`, `app.js`, `app.css`) or single inlined `index.html` (<140KB uncompressed, <40KB gzipped).
  - **Lightweight Reactive UI**: Implemented via modern standard Vanilla Web Components and an ultra-lightweight reactive micro-store (zero React/Next/Vue overhead).
  - **Real-Time Transport**: Native browser `EventSource` (Server-Sent Events) connected to `/v1/inspector/events` with automatic reconnection and a circular buffer of the last 500 requests.

---

## 4. Global Layout & Navigation Shell

### 4.1 Master Shell ASCII Wireframe
```text
+-----------------------------------------------------------------------------------------------------------------------+
| [T] TOKEN INSPECTOR v0.1.0  | Upstream: api.openai.com | Port: 8080 | Status: ● ACTIVE | 1,420 Req | 412k Tokens | $0.84 |
+-----------------------------------------------------------------------------------------------------------------------+
| [1. Live Stream]  [2. Format Studio]  [3. Context Budget]  [4. Sampling Matrix]              | Search: [/] | Theme: [☀/☾] |
+------------------------------------+----------------------------------------------------------------------------------+
| LIVE REQUEST STREAM                | INSPECTOR WORKSPACE: POST /v1/chat/completions (req_89f2a)                       |
| Filter: [All Models ▼] [Status ▼]  | Model: gpt-4o | Latency: 480ms | Tokens: 1,842 (Prompt: 1,420, Compl: 422) | Cost: $0.008|
+------------------------------------+----------------------------------------------------------------------------------+
| ● 20:34:12 gpt-4o    1.8k tk  $0.01| CONTEXT SATURATION GAUGE: [==========================>      ] 14,200 / 128,000 (11%)|
|   /v1/chat/completions · 480ms    | Breakdown: [Sys: 320 tk (2%)] [FewShot: 850 tk (6%)] [User: 250 tk (2%)] [Free: 89%]     |
|                                    +----------------------------------------------------------------------------------+
| ● 20:33:55 gpt-3.5   850 tk  $0.00 | TABS: [ Prompt Tokens (1,420) ]  [ Completion Tokens (422) ]  [ Raw JSON ] [ Timings ]|
|   /v1/chat/completions · 210ms    +----------------------------------------------------------------------------------+
|                                    | View Mode: [Alternating Chips] [Whitespace Visible] [Token IDs] [Logprob Gradient]  |
| ⚠ 20:32:01 gpt-4o    8.2k tk  $0.04| -------------------------------------------------------------------------------- |
|   /v1/chat/completions · 1.2s      | [You][ are][ a][ helpful][ coding][ assistant][.][\n][\n]                         |
|                                    | [{"role"][ :][ "][system"][",][ "][content"][ :][ "][Analyze][ the][ following]  |
| ● 20:30:11 gpt-4o    412 tk  $0.00 | [ json][ payload][ and][ extract][ key][ metrics]["][}]                          |
|   /v1/chat/completions · 180ms    |                                                                                  |
|                                    | -------------------------------------------------------------------------------- |
|                                    | HOVER CARD (Token #14):                                                          |
|                                    | Token Text: " json"  | Token ID: 3481 | Bytes: 0x20 0x6a 0x73 0x6f 0x6e (5 bytes)     |
|                                    | Subword Offset: 68..73 | Whitespace: Leading space (0x20)                        |
+------------------------------------+----------------------------------------------------------------------------------+
| Footprint: 28KB JS | Zero-CDN | SSE: Connected (●) | ShortKeys: [J/K] Navigate  [/] Filter  [Esc] Close  [1-4] Switch Tab     |
+-----------------------------------------------------------------------------------------------------------------------+
```

### 4.2 Top Bar Navigation & Telemetry Header
- **Branding & Build Indicator**: Left-aligned monogram `[T]` with version tag and active upstream target (`api.openai.com` or local `localhost:11434` for Ollama).
- **Global Metric Ticker**:
  - Live Request Count: Total intercepted since proxy boot.
  - Cumulative Token Meter: Aggregated prompt + completion volume.
  - Cumulative Cost Ticker: Rolling USD calculation based on active pricing cards.
  - Active Connection Beacon: Pulsing green dot indicates active SSE pipe to reverse proxy.
- **View Navigation Tabs**: Segmented control pill buttons with active focus outlines:
  1. `Live Stream` (Interception Drawer & Token Inspector)
  2. `Format Studio` (JSON vs. YAML vs. Markdown Benchmark)
  3. `Context Budget` (Priority Allocation & AST-Aware Truncation)
  4. `Sampling Matrix` (Logprob Confidence & Divergence Tree)
- **Quick Controls**: Global fuzzy search trigger (`/`), theme toggle button, and keyboard shortcut modal trigger (`?`).

---

## 5. Detailed View Specifications

### 5.1 View 1: Live Request Stream & Interception Drawer

#### Purpose
Enables real-time capture and forensic inspection of every LLM interaction handled by the reverse proxy.

#### UI Components
1. **Master Stream Feed (Left Pane, width: 340px resizable)**:
   - **Filter Controls**: Multi-select dropdowns for Status Code (`200 OK`, `4xx Client Error`, `5xx Upstream Error`), Model Name (`gpt-4o`, `gpt-3.5-turbo`, `llama3`), and minimum token count slider.
   - **Request Cards**:
     - Time elapsed (`12s ago`, `2m ago`).
     - HTTP Status badge with emerald/amber/crimson pills.
     - Model badge (`gpt-4o`).
     - Token metrics (`1,842 tk`) and estimated cost (`$0.01`).
     - Saturation bar: Micro-progress bar indicating percentage of model's context consumed.
     - Active selection indicator: Left 3px accent stroke with high-contrast background fill.
2. **Detail Inspector Workspace (Right Pane)**:
   - **Header Card**: HTTP Method, URL path, upstream latency in milliseconds, TTFB, and token breakdown (Prompt vs. Completion).
   - **Context Saturation Linear & Radial Gauge**:
     - Visual linear bar showing current request tokens vs. total model context ceiling (e.g. `14,200 / 128,000`).
     - Color transitions dynamically:
       * `0% - 69%`: Emerald Green (`--status-normal`)
       * `70% - 84%`: Amber Warning (`--status-warning`)
       * `85% - 100%`: Crimson Hazard (`--status-danger`)
       * `>100%`: Pulsing Red Overflow Alert (`Context Window Exceeded`)
     - Role Breakdown pills: `System (320 tk)`, `Few-Shot (850 tk)`, `User (250 tk)`, `Assistant (422 tk)`.
   - **Interactive Token Boundary Visualizer**:
     - Renders token sequences as alternating colored chips.
     - **Toggle Modes**:
       * `[Chips]`: Alternating background badge colors.
       * `[Whitespace Visible]`: Renders leading/trailing spaces as light dots (`·`) and newlines as return symbols (`↵`).
       * `[Token IDs]`: Displays raw numeric BPE token ID beneath or adjacent to token string.
       * `[Subword Splits]`: Outlines words that were fragmented into multiple subword tokens with a dotted underline.
     - **Interactive Hover Card (Popover)**:
       * Appears on mouse hover or keyboard focus (`Tab` + `Enter`).
       * Displays: Token Index, Token String, BPE Token ID (int), Hex representation (e.g. `0x20 0x6a`), Byte length, Character length, and Logprob / Probability score (if generation tokens).

---

### 5.2 View 2: Format Comparison Studio

#### Purpose
Solves developer "token blindness" by benchmarking identical structured payloads across multiple serializations (Indented JSON vs. Compact JSON vs. YAML vs. Markdown vs. Raw Plaintext) and revealing redundant schema overhead.

#### Format Comparison Studio ASCII Wireframe
```text
+-----------------------------------------------------------------------------------------------------------------------+
| FORMAT COMPARISON STUDIO                                                                                              |
| Benchmark Payload: [ 50 User Records with Schema: id, name, email, role, status ]                                    |
+-----------------------------------------------------------------------------------------------------------------------+
| FORMAT SUMMARY & COST COMPARISON MATRIX:                                                                              |
| Format              | Tokens     | Bytes      | Ratio (Tk/Byte) | Delta vs Indented | Est. Cost / 1M Calls | Savings    |
|---------------------|------------|------------|-----------------|-------------------|----------------------|------------|
| 1. JSON (Indented)  | 2,420 tk   | 4,890 B    | 0.49            | Baseline (0%)     | $12.10               | $0.00      |
| 2. JSON (Minified)  | 1,750 tk   | 3,620 B    | 0.48            | - 27.7%           | $8.75                | $3.35 (28%)|
| 3. YAML (Compact)   | 1,380 tk   | 2,980 B    | 0.46            | - 43.0%           | $6.90                | $5.20 (43%)|
| 4. Markdown Table   | 1,120 tk   | 2,410 B    | 0.46            | - 53.7%           | $5.60                | $6.50 (54%)|
+-----------------------------------------------------------------------------------------------------------------------+
| SIDE-BY-SIDE VISUALIZER:                                                                                              |
| [ JSON (Minified) - 1,750 tokens ]                   | [ YAML (Compact) - 1,380 tokens ] (SAVINGS: 370 TOKENS)        |
+------------------------------------------------------+----------------------------------------------------------------+
| [{"id":1,"name":"Alice","role":"admin"},             | - id: 1                                                        |
|  {"id":2,"name":"Bob","role":"member"},              |   name: Alice                                                  |
|  {"id":3,"name":"Charlie","role":"guest"}]           |   role: admin                                                  |
|                                                      | - id: 2                                                        |
| TOKEN FRAGMENTATION ANALYSIS:                        |   name: Bob                                                    |
| Repeated schema key "role" repeats 50 times          |   role: member                                                 |
| Overhead cost of key tokens: 350 tokens (20.0%)      |                                                                |
| Recommendation: Convert to tabular schema or YAML    | TOKEN SAVINGS HIGHLIGHT:                                       |
| to save ~43% prompt context and $5.20 per 1M calls.  | Eliminated 100 quote characters and 50 brace pairs.            |
+------------------------------------------------------+----------------------------------------------------------------+
```

#### Key Visual Components
1. **Serialization Comparator Matrix**:
   - Table detailing token count, byte footprint, compression ratio, and dollar savings for 100k and 1M requests.
   - Highlights the "Winner" format with an emerald efficiency badge.
2. **Repeated Key Bloat Heatmap**:
   - Analyzes JSON structures and highlights repeated key names (`"first_name"`, `"created_at"`) in purple with an overhead callout badge (e.g. `24% of context spent on repeating dictionary keys`).
3. **Whitespace & Delimiter Optimization Banner**:
   - Identifies subword fragmentation caused by 4-space indentations vs. 2-space or tab indentation.
   - Shows actionable prompt optimization tips ("Minifying this prompt saves 670 tokens without loss of semantic precision").

---

### 5.3 View 3: Context Budget & Truncation Studio

#### Purpose
Visualizes priority-based context allocation and allows developers to dry-run syntax-aware truncation rules (guaranteeing valid JSON and closed Markdown fences) before deploying.

#### Context Budget ASCII Wireframe
```text
+-----------------------------------------------------------------------------------------------------------------------+
| CONTEXT BUDGET & SYNTAX-AWARE TRUNCATION STUDIO                                                                        |
| Target Model: [ gpt-4o (128k) ▼ ]  | Budget Ceiling: [ 4,096 Tokens ]  | Safety Buffer: [ 15% (3,481 max) ]          |
+-----------------------------------------------------------------------------------------------------------------------+
| CONTEXT SATURATION METER (Current Prompt: 5,620 Tokens -> EXCEEDS CEILING BY 1,524 TOKENS)                           |
| 0% [=======================================================|||||||||||||||||||||||||] 100% (Ceiling: 4,096 tk)       |
|    | Priority 1: System Rules (320 tk)   [100% LOCKED]     | Over Budget: 1,524 tokens [CRIMSON WARNING]              |
|    | Priority 2: User Query (480 tk)     [100% LOCKED]     | Action Required: Prune Priority 3 & 4                    |
|    | Priority 3: Few-Shot Examples (1,820 tk)              |                                                          |
|    | Priority 4: Chat History (3,000 tk)                   |                                                          |
+-----------------------------------------------------------------------------------------------------------------------+
| TRUNCATION SIMULATOR & STRATEGY SELECTION:                                                                            |
| Strategy: (•) Priority-Based Sliding Window   ( ) Syntax-Aware AST Pruner (JSON)   ( ) Proportional Semantic Prune    |
| Options:  [x] Protect System Prompt   [x] Protect Last User Query   [x] Ensure Valid JSON AST   [x] Auto-Close MD     |
+-----------------------------------------------------------------------------------------------------------------------+
| BEFORE / AFTER TRUNCATION DIFF:                                                                                       |
| Original Context (5,620 tk)                          | Truncated Result (3,890 tk) - BUDGET SATISFIED (SAVED 1,730 tk)|
+------------------------------------------------------+----------------------------------------------------------------+
| [System Message: "You are an agent..."] (320 tk)     | [System Message: "You are an agent..."] (320 tk) [RETAINED]    |
| [History #1: "Hello"] (40 tk)                        | [NOTICE: 4 oldest history turns pruned (- 1,730 tokens)]       |
| [History #2: "How can I help?"] (60 tk)              | [History #5: "Current order #9921"] (210 tk) [RETAINED]        |
| [History #3: <long JSON data payload>] (1,630 tk)    | [Few-Shot Example #1] (450 tk) [RETAINED]                      |
| [User Query: "Process order #9921"] (480 tk)         | [User Query: "Process order #9921"] (480 tk) [RETAINED]        |
+-----------------------------------------------------------------------------------------------------------------------+
| JSON AST Integrity Check: PASSED (Valid JSON verified via parser, zero broken string literals or unclosed brackets)  |
+-----------------------------------------------------------------------------------------------------------------------+
```

#### Visual Features
- **Stacked Role Saturation Bar**: Color-coded segments for System (`#06B6D4`), Few-Shot (`#8B5CF6`), History (`#64748B`), and User (`#10B981`).
- **Interactive Budget Ceiling Slider**: Drag to simulate lower context limits (e.g. 2k, 4k, 8k, 32k) and watch the truncation diff update instantly.
- **Syntax Integrity Status Indicator**: An emerald shield badge verifying that JSON AST elements were pruned cleanly at object boundaries without breaking syntax.

---

### 5.4 View 4: Sampling & Logprobs Matrix Comparator

#### Purpose
Removes the guesswork from tuning `temperature` and `top_p`. Displays token-level confidence scores, calculates sequence perplexity, and pinpoints where hallucinations begin.

#### Sampling & Logprobs Matrix ASCII Wireframe
```text
+-----------------------------------------------------------------------------------------------------------------------+
| SAMPLING & LOGPROBS MATRIX COMPARATOR                                                                                 |
| Prompt: "The capital city of Australia is [___]"                                                                      |
| Test Matrix: Temperatures [ 0.0, 0.7, 1.2 ]  | Top_p: [ 0.9, 1.0 ]  | Top Logprobs: [ 5 ]  | Runs per config: [ 3 ]   |
+-----------------------------------------------------------------------------------------------------------------------+
| RUN SUMMARY COMPARISON:                                                                                               |
| Config           | Perplexity | Avg Confidence | Output Preview                                       | Divergence    |
|------------------|------------|----------------|------------------------------------------------------|---------------|
| Temp 0.0 (Run 1) | 1.04       | 99.2% (High)   | "The capital city of Australia is Canberra."         | Root Baseline |
| Temp 0.7 (Run 2) | 1.18       | 94.1% (High)   | "The capital city of Australia is Canberra, not S..."| Branch at tk 8|
| Temp 1.2 (Run 3) | 4.82       | 54.3% (Low)    | "The capital city of Australia is Sydney according..."| Diverged (tk 7)|
+-----------------------------------------------------------------------------------------------------------------------+
| LOGPROB CONFIDENCE HEATMAP (Run 3 - Temp 1.2, High Hallucination Risk):                                               |
| Legend: [■ >90% High Conf]  [■ 50-90% Moderate Conf]  [■ <50% High Uncertainty / Hallucination Risk]                  |
|                                                                                                                       |
| [ The][ capital][ city][ of][ Australia][ is][ Sydney][,][ according][ to][ popular][ belief][,]                      |
| [ but][ the][ official][ capital][ is][ actually][ Canberra][.]                                                       |
|                                                                                                                       |
| CRITICAL DIVERGENCE POINT (Token #7):                                                                                 |
| Selected Token: " Sydney" (P = 42.1%, logprob = -0.865) [CRIMSON WARNING]                                             |
| Alternative Candidates in Top-5 Logprobs:                                                                            |
|   1. " Canberra" (P = 51.4%, logprob = -0.665) [Top Candidate]                                                        |
|   2. " Sydney"   (P = 42.1%, logprob = -0.865) [Selected via high temperature sampling]                              |
|   3. " Melbourne"(P = 5.8%,  logprob = -2.847)                                                                        |
|   4. " not"      (P = 0.5%,  logprob = -5.298)                                                                        |
|   5. " often"    (P = 0.2%,  logprob = -6.214)                                                                        |
+-----------------------------------------------------------------------------------------------------------------------+
| TOKEN DIVERGENCE FORK TREE:                                                                                           |
|                                      ┌── [P=51.4%] " Canberra." (Deterministic Path)                                  |
| "The capital of Australia is" ───────┤                                                                                |
|                                      └── [P=42.1%] " Sydney" ──► [P=88.2%] ", according to popular belief..."        |
+-----------------------------------------------------------------------------------------------------------------------+
```

#### Visual Features
- **Confidence Heatmap**: Color-coded background tinting for each generated token with seamless gradients.
- **Top-5 Logprob Distribution Popover**: Bar chart inside the hover card showing the relative probability distribution of competing tokens at that exact position.
- **Token Divergence Fork Tree**: SVG/ASCII branching graph highlighting the exact token index where the model deviated from the greedy path ($T=0.0$).

---

## 6. Terminal CLI UX & ANSI Visualizer

### 6.1 Terminal Aesthetic Standards
The CLI output uses Python `rich` to deliver modern, developer-grade terminal aesthetics:
- **Auto-Detect Color Depth**: Truecolor (16.7M colors) -> 256 Colors -> 16 ANSI colors -> High-contrast monochrome fallback.
- **Alternating Token Badges**: Subtle alternating terminal background blocks (`on #1e293b`, `on #1e3a5f`, `on #064e3b`).
- **Monospace Boundary Markers**: When color depth is disabled or in raw pipe mode, uses clear delimiters: `[| token1 |][| token2 |]`.

### 6.2 CLI Subcommand Wireframes

#### 1. `token-inspector inspect "Hello world! How are you?" --model gpt-4o`
```text
╭─────────────────────────────── TOKEN INSPECTOR ──────────────────────────────╮
│ Text: "Hello world! How are you?"                                            │
│ Model: gpt-4o (o200k_base) · Total Tokens: 7 · Characters: 25 · Bytes: 25   │
├──────────────────────────────────────────────────────────────────────────────┤
│ TOKEN BOUNDARY VISUALIZATION:                                                │
│  [Hello][ world][!][ How][ are][ you][?]                                     │
├──────────────────────────────────────────────────────────────────────────────┤
│ TOKEN BREAKDOWN TABLE:                                                       │
│ ┌─────┬──────────┬──────────────┬───────────────┬──────────────────────────┐ │
│ │ Idx │ Token ID │ Token String │ Bytes (Hex)   │ Subword / Type           │ │
│ ├─────┼──────────┼──────────────┼───────────────┼──────────────────────────┤ │
│ │ 0   │ 9906     │ Hello        │ 0x48656c6c6f  │ Word                     │ │
│ │ 1   │ 1917     │  world       │ 0x20776f726c  │ Word (leading space)     │ │
│ │ 2   │ 0        │ !            │ 0x21          │ Punctuation              │ │
│ │ 3   │ 2402     │  How         │ 0x20486f77    │ Word (leading space)     │ │
│ │ 4   │ 527      │  are         │ 0x20617265    │ Word (leading space)     │ │
│ │ 5   │ 499      │  you         │ 0x20796f75    │ Word (leading space)     │ │
│ │ 6   │ 30       │ ?            │ 0x3f          │ Punctuation              │ │
│ └─────┴──────────┴──────────────┴───────────────┴──────────────────────────┘ │
╰──────────────────────────────────────────────────────────────────────────────╯
```

#### 2. `token-inspector benchmark --file data.json`
```text
╭────────────────────────── FORMAT BENCHMARK MATRIX ──────────────────────────╮
│ Source: data.json (50 items) · Evaluated against gpt-4o (o200k_base)         │
├───────────────────┬────────┬─────────┬─────────────┬─────────────┬──────────┤
│ Format            │ Tokens │ Bytes   │ Ratio (T/B) │ vs Baseline │ 1M Calls │
├───────────────────┼────────┼─────────┼─────────────┼─────────────┼──────────┤
│ JSON (Indented)   │ 2,420  │ 4,890   │ 0.49        │ Baseline    │ $12.10   │
│ JSON (Minified)   │ 1,750  │ 3,620   │ 0.48        │ -27.7%      │ $8.75    │
│ YAML (Compact)    │ 1,380  │ 2,980   │ 0.46        │ -43.0%      │ $6.90    │
│ Markdown Table    │ 1,120  │ 2,410   │ 0.46        │ -53.7%      │ $5.60    │
╰───────────────────┴────────┴─────────┴─────────────┴─────────────┴──────────╯
✔ Winner: Markdown Table saves 1,300 tokens (53.7%) and $6.50 / 1M calls.
```

#### 3. `token-inspector proxy --port 8080 --upstream https://api.openai.com`
```text
╭──────────────────────── TOKEN INSPECTOR REVERSE PROXY ───────────────────────╮
│ Listening: http://127.0.0.1:8080 ──► Upstream: https://api.openai.com        │
│ Dashboard: http://127.0.0.1:8080/_inspector (Web UI)                        │
│ Status: Active & Intercepting SSE/HTTP traffic (Press Ctrl+C to stop)        │
├──────────────────────────────────────────────────────────────────────────────┤
│ 20:34:12  POST /v1/chat/completions  200 OK  480ms  1,420 prompt + 422 compl │
│ 20:34:55  POST /v1/chat/completions  200 OK  210ms    650 prompt + 200 compl │
│ 20:35:10  POST /v1/chat/completions  200 OK  1.1s   8,190 prompt [⚠ >80% SAT]│
╰──────────────────────────────────────────────────────────────────────────────╯
```

---

## 7. Interaction States & Transitions

### 7.1 Visual State Matrix
Every component and view in the Web UI must handle 6 distinct interaction states:

| Component | Default State | Hover / Focus State | Active / Selected State | Loading / Streaming State | Empty State | Error State |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Request Card** | Subtle dark background (`#12141C`), thin border. | Surface lightens (`#1A1D28`), border brightens (`#343B52`). | Deep highlight (`#222634`), left 3px sky blue border. | Pulsing shimmer on status pill during SSE stream. | "No intercepted requests yet. Run an LLM request through :8080." | Red error badge with status code (`502 Bad Gateway`) and retry link. |
| **Token Chip** | Alternating pastel hue, opaque text. | Highlight ring (`2px #38BDF8`), cursor pointer, popover opens. | Solid accent fill, high-contrast text. | Skeleton pill with pulse animation (`opacity: 0.5`). | Gray placeholder box if empty prompt. | Amber/Red dashed border if tokenization failed or invalid character. |
| **Context Gauge** | Smooth linear progress fill (`#10B981`). | Tooltip displays exact token math (`14,200 / 128,000`). | Role breakdown splits with distinct colors. | Subtle animated diagonal stripes during active SSE generation. | Gray empty bar (`0 / 128,000`). | Pulsing crimson glow if ceiling exceeded (`>100%`). |
| **Matrix Row** | Clean tabular row with monospace values. | Row background tints to `#1A1D28`. | Pinned comparison baseline row. | Monospace spinner (`⠋ ⠙ ⠹`) next to running trial. | "No matrix configuration loaded." | Warning triangle with error message ("Rate limited 429"). |

### 7.2 Keyboard Navigation & Shortcuts
- `j` / `k` or `Down` / `Up`: Navigate through intercepted requests list in chronological order.
- `Enter`: Select request and focus inspection workspace.
- `/`: Instantly focus search/filter input.
- `1`, `2`, `3`, `4`: Switch between main navigation tabs (Live Stream, Format Studio, Context Budget, Sampling Matrix).
- `Esc`: Close open modal/popover or clear current search filter.
- `w`: Toggle whitespace visibility (`·` and `↵`).
- `?`: Open keyboard shortcuts cheat sheet.

---

## 8. Accessibility (WCAG 2.1 AA+) & Responsive Specifications

### 8.1 Accessibility Checklist
- **Semantic HTML Landmark Elements**:
  - `<header role="banner">` for global ticker and upstream metadata.
  - `<nav role="navigation" aria-label="Inspector Views">` for view tabs.
  - `<main role="main">` for active inspection workspaces.
  - `<aside role="complementary" aria-label="Request Stream">` for the master stream list.
- **ARIA Live Regions**:
  - The live request counter and incoming proxy events use `aria-live="polite"` so screen-reader users are notified of completed LLM calls without interrupting active reading.
- **Contrast & Color-Blind Safety**:
  - Token alternating background badges maintain a minimum 4.5:1 text-to-background contrast ratio.
  - Logprob confidence is never communicated by color alone; it always includes numerical percentages ($P=94.1\%$) and textual labels (`High`, `Moderate`, `Uncertain`).
- **Reduced Motion Support**:
  - All transitions and pulsing streaming shimmers respect `@media (prefers-reduced-motion: reduce)` by disabling keyframe animations.

### 8.2 Responsive Layout Adaptations
While primarily a developer desktop tool, the Web Inspector adapts across viewports:

| Breakpoint | Layout Behavior | Navigation & Drawer Adaptation |
| :--- | :--- | :--- |
| **Desktop (>1200px)** | Full dual-pane master-detail layout (340px stream list + expansive workspace). | Side-by-side comparison tables, full horizontal token chip wrap. |
| **Tablet (768px - 1199px)** | Collapsible sidebar drawer (stream list collapses to 72px icon column or slide-over drawer). | Stacked comparator views; token hover cards anchored to clicked chips. |
| **Mobile (<768px)** | Single-column view with bottom sheet navigation drawer. | Bottom sheet modal for request details; swipe gestures to dismiss drawers; minimum touch targets of 44x44px. |

---

## 9. Verification & Quality Acceptance Criteria

The implementation of `token-inspector` UI/UX will be validated against the following criteria:

1. **Zero-CDN Verification**: The dashboard loads completely and functions identically in an air-gapped environment with internet access disabled (`curl -I` confirms 0 external asset requests).
2. **Performance Audit**: Google Lighthouse / DevTools performance audit confirms:
   - FCP < 800ms
   - LCP < 1.2s
   - INP < 50ms
   - CLS = 0.00
3. **Alternating Token Highlighting**: Alternating token chips render distinct hues without clipping or overflow, correctly reflecting BPE boundaries.
4. **Context Saturation Warning**: When prompt context exceeds 85%, the UI immediately renders amber warning borders; when exceeding 100%, crimson alert barriers appear.
5. **CLI Rich Rendering**: `token-inspector inspect` outputs crisp ANSI colored token blocks in Truecolor and 256-color terminals, with clean tabular metrics.

---

## 10. Autonomous Chaining & Next Step

This UI/UX Design specification is complete and directly satisfies all requirements of Stage 3.  
In accordance with the feature pipeline workflow, this stage autonomously hands off to **Stage 4: Technical Architecture & Specification (`spec.md`)** via `/define-feature`.
