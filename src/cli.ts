#!/usr/bin/env node

import * as process from 'node:process';
import * as fs from 'node:fs';
import { parseSSEStream } from './sse.js';
import { parsePartialJSON } from './partialJson.js';

function printHelp() {
  console.log(`
@swaraj792725/llm-stream-transformer - Zero-dependency streaming SSE & partial JSON parser

Usage:
  llm-stream-transformer <command> [options]

Commands:
  sse        Parse Server-Sent Events stream payload
  partial    Parse incomplete/streaming partial JSON string

Example:
  npx @swaraj792725/llm-stream-transformer partial '{"name": "Claude", "tools": ["search"'
`);
}

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  if (!command || args.includes('--help') || args.includes('-h')) {
    printHelp();
    process.exit(0);
  }

  const input = args[1] || fs.readFileSync(0, 'utf8');

  if (command === 'sse') {
    const events = parseSSEStream(input);
    console.log(JSON.stringify(events, null, 2));
  } else if (command === 'partial') {
    const result = parsePartialJSON(input);
    console.log(JSON.stringify(result, null, 2));
  } else {
    printHelp();
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Error running llm-stream-transformer CLI:', err);
  process.exit(1);
});
