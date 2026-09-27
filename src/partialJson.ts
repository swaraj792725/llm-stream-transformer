/**
 * Safely parses incomplete/streaming partial JSON strings by completing unclosed quotes, brackets, and braces.
 */
export function parsePartialJSON<T = any>(input: string): T | null {
  if (!input || !input.trim()) return null;

  const str = input.trim();

  // Try direct parse first
  try {
    return JSON.parse(str) as T;
  } catch {
    // Continue to repair partial JSON
  }

  let repaired = str;

  // 1. Check open quotes
  let inString = false;
  let isEscaped = false;

  const stack: string[] = [];

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (inString) {
      if (char === '\\') {
        isEscaped = !isEscaped;
      } else if (char === '"' && !isEscaped) {
        inString = false;
      } else {
        isEscaped = false;
      }
    } else {
      if (char === '"') {
        inString = true;
      } else if (char === '{') {
        stack.push('}');
      } else if (char === '[') {
        stack.push(']');
      } else if (char === '}' || char === ']') {
        if (stack.length > 0 && stack[stack.length - 1] === char) {
          stack.pop();
        }
      }
    }
  }

  if (inString) {
    repaired += '"';
  }

  // Remove trailing commas before closing
  repaired = repaired.replace(/,\s*$/, '');

  // Close open structural stacks
  while (stack.length > 0) {
    repaired += stack.pop();
  }

  try {
    return JSON.parse(repaired) as T;
  } catch {
    return null;
  }
}
