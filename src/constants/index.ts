export const STATUS_COLORS = {
  idle: "bg-gray-200 text-gray-700",
  streaming: "bg-blue-200 text-blue-700 animate-pulse",
  done: "bg-green-200 text-green-700",
  error: "bg-red-200 text-red-700",
} as const;

export const SSE_DELAY = {
  MIN: 50,
  MAX: 150,
} as const;

export const PLAYBACK_SPEED = {
  MIN: 0.5,
  MAX: 5,
  STEP: 0.5,
  DEFAULT: 1,
  OPTIONS: [
    { value: 0.5, label: "0.5x" },
    { value: 1, label: "1x" },
    { value: 2, label: "2x" },
    { value: 5, label: "5x" },
  ],
} as const;
