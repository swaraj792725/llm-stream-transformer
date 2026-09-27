import { describe, it, expect } from 'vitest';
import { parseSSEStream, parsePartialJSON } from '../src/index.js';

describe('llm-stream-transformer', () => {
  it('parses multi-frame SSE streams accurately', () => {
    const rawSSE = `
event: message
data: {"type": "content_block_delta", "delta": {"text": "Hello"}}

event: message
data: {"type": "content_block_delta", "delta": {"text": " world"}}
    `.trim();

    const events = parseSSEStream(rawSSE);
    expect(events.length).toBe(2);
    expect(events[0].event).toBe('message');
    expect(events[0].data).toContain('Hello');
  });

  it('parses incomplete partial JSON payloads during streaming', () => {
    const incomplete1 = '{"user": "Swaraj", "tags": ["ai", "node"';
    const parsed1 = parsePartialJSON(incomplete1);
    expect(parsed1).toEqual({ user: 'Swaraj', tags: ['ai', 'node'] });

    const incomplete2 = '{"status": "processing", "details": {"tokens": 1024';
    const parsed2 = parsePartialJSON(incomplete2);
    expect(parsed2).toEqual({ status: 'processing', details: { tokens: 1024 } });
  });
});
