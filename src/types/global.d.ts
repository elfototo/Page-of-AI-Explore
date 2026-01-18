export {};

declare global {
  interface Window {
    vega?: unknown;
    vegaLite?: unknown;
    vegaEmbed?: (
      element: HTMLElement,
      spec: unknown,
      options?: {
        actions?: boolean;
        renderer?: "svg" | "canvas";
      }
    ) => Promise<unknown>;
  }
}