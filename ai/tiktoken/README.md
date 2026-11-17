# Token Inspector (`ai/tiktoken`)

> **Transparent LLM Pre-flight Observability Suite & Developer CLI**  
> Visualize token fragmentation, simulate syntax-aware context window budgeting, and evaluate sampling logprobs before sending requests to providers.

---

## 🚀 Quick Start with Poetry

### Prerequisites
- Python >= 3.11
- [Poetry](https://python-poetry.org/)

### 1. Installation
```bash
# Clone and enter the project directory
cd ai/tiktoken

# Install dependencies and project in virtualenv
poetry install
```

### 2. Running Automated Tests
```bash
poetry run pytest -v
```

---

## 🛠️ CLI Usage & Core Mechanics

### 1. Token Boundary Visualizer (`inspect`)
Color-code how raw text fragments into subword Byte-Pair Encoding tokens (`cl100k_base`, `o200k_base`), showing character offsets, token IDs, and whitespace boundaries:
```bash
poetry run token-inspector inspect "Why does JSON key verbosity inflate LLM costs?"
poetry run token-inspector inspect --file prompt.txt --model gpt-4o
```

### 2. Format Serialization Benchmark (`benchmark`)
Quantifies how different serialization formats (JSON Indented vs. JSON Minified vs. YAML vs. Markdown tables) fragment into tokens:
```bash
poetry run token-inspector benchmark --file data.json
```

### 3. Context Budget Manager & Syntax-Aware Truncation (`budget`)
Dynamically fits prompts into strict token ceilings (e.g. 2k, 8k, 32k) using hierarchical priority allocation (System > User > Few-shot > History) with AST-level JSON pruning (guaranteeing valid `json.loads`) and Markdown code-fence repair:
```bash
poetry run token-inspector budget --file request.json --max-tokens 1500 --strategy ast_json
```

### 4. Sampling Matrix & Logprobs Comparator (`compare`)
Runs the same prompt across a matrix of sampling temperatures (0.0 vs. 0.7) and top_p values, categorizing token confidence tiers and identifying exact divergence points:
```bash
poetry run token-inspector compare --prompt "Explain quantum superposition" --temps 0.0,0.7 --top-ps 1.0
```

### 5. Transparent Reverse Proxy & Embedded Web Inspector (`proxy`)
Run an ASGI reverse proxy intercepting OpenAI-compatible completions with sub-5ms pass-through streaming SSE and serve the zero-CDN local Web Inspector:
```bash
poetry run token-inspector proxy --port 8080 --upstream https://api.openai.com
```
Open `http://localhost:8080/_inspector` in your browser to inspect live streams, context saturation gauges, and token hover cards.
