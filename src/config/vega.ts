export const VEGA_DEFAULT_DATA = [
  { region: "Almaty", revenue: 120 },
  { region: "Astana", revenue: 90 },
  { region: "Shymkent", revenue: 70 },
] as const;

export const VEGA_CDN = {
  VEGA: "https://cdn.jsdelivr.net/npm/vega@5",
  VEGA_LITE: "https://cdn.jsdelivr.net/npm/vega-lite@5",
  VEGA_EMBED: "https://cdn.jsdelivr.net/npm/vega-embed@6",
} as const;
