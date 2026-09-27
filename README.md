# `@swaraj792725/llm-stream-transformer`

> **Zero-dependency streaming SSE chunk transformer, real-time partial JSON parser, and tool-call accumulator for Anthropic, OpenAI, and Ollama.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![GitHub Packages](https://img.shields.io/badge/registry-GitHub_Packages-green.svg)](https://github.com/swaraj792725?tab=packages)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3+-blue.svg)](https://www.typescriptlang.org/)

---

## 🌟 Overview

When streaming responses from Claude 3.5 Sonnet, GPT-4o, or local Ollama instances, SSE network chunks arrive fragmented, and structured JSON outputs are incomplete mid-stream.

`@swaraj792725/llm-stream-transformer` parses SSE frame chunks and repairs incomplete partial JSON strings in real-time so your frontend or CLI can render live streaming structured data!

---

## 📦 Installation

```bash
npm install @swaraj792725/llm-stream-transformer --registry=https://npm.pkg.github.com
```

---

## 🚀 Usage

### 1. Parse Incomplete Partial JSON Mid-Stream

```typescript
import { parsePartialJSON } from '@swaraj792725/llm-stream-transformer';

// Incomplete chunk received from stream:
const streamingChunk = '{"status": "processing", "items": ["step1", "step2"';

const parsed = parsePartialJSON(streamingChunk);
console.log(parsed);
// Output: { status: "processing", items: ["step1", "step2"] }
```

---

### 2. Parse Raw SSE Streams

```typescript
import { parseSSEStream } from '@swaraj792725/llm-stream-transformer';

const events = parseSSEStream(rawSSEResponse);
for (const ev of events) {
  console.log(`Event: ${ev.event}, Data: ${ev.data}`);
}
```

---

## 📜 License

MIT © [Swaraj](https://github.com/swaraj792725)
