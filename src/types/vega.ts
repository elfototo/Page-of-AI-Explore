export interface VegaSpec {
  $schema?: string;
  description?: string;
  data?: unknown;
  mark?: string | object;
  encoding?: object;
  [key: string]: unknown;
}