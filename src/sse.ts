export interface SSEMessage {
  event?: string;
  data: string;
  id?: string;
}

/**
 * Parses raw Server-Sent Events (SSE) text buffer into structured message objects.
 */
export function parseSSEStream(rawBuffer: string): SSEMessage[] {
  const messages: SSEMessage[] = [];
  const blocks = rawBuffer.split(/\n\n+/);

  for (const block of blocks) {
    if (!block.trim()) continue;
    const lines = block.split('\n');

    let event: string | undefined;
    let id: string | undefined;
    const dataLines: string[] = [];

    for (const line of lines) {
      if (line.startsWith('data:')) {
        dataLines.push(line.slice(5).trim());
      } else if (line.startsWith('event:')) {
        event = line.slice(6).trim();
      } else if (line.startsWith('id:')) {
        id = line.slice(3).trim();
      }
    }

    if (dataLines.length > 0) {
      messages.push({
        event,
        id,
        data: dataLines.join('\n')
      });
    }
  }

  return messages;
}
