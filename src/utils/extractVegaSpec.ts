import type { VegaSpec } from '../types/vega';

export const extractVegaSpec = (text: string): VegaSpec | null => {
  try {
    const jsonBlockRegex = /```json\s*([\s\S]*?)\s*```|(\{[\s\S]*?\})/g;
    const matches = [...text.matchAll(jsonBlockRegex)];
    
    for (const match of matches) {
      const jsonStr = match[1] || match[2];
      if (!jsonStr) continue;
      
      try {
        const parsed = JSON.parse(jsonStr) as Record<string, unknown>;
        if (parsed.mark && parsed.encoding) {
          return parsed as VegaSpec;
        }
      } catch {
        continue;
      }
    }
    return null;
  } catch (error) {
    console.error('Ошибка извлечения Vega spec:', error);
    return null;
  }
};
