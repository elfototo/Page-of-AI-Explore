export type SSEStatus = 'idle' | 'streaming' | 'done' | 'error';

export type StreamEvent =
  | { event: 'token'; data: { delta: string } }
  | { event: 'done'; data: unknown }
  | { event: 'error'; data: { message: string } };