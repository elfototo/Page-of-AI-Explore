import type { VegaSpec } from "../types/vega";
import { useState, useRef, useEffect } from "react";
import { VEGA_DEFAULT_DATA, VEGA_CDN } from "../config/vega";

const loadScript = (src: string) =>
  new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve();
    script.onerror = () => reject();
    document.head.appendChild(script);
  });

export const VegaChart: React.FC<{ spec: VegaSpec | null }> = ({ spec }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!spec || !containerRef.current) return;

    let isMounted = true;
    Promise.resolve().then(() => {
      if (isMounted) setIsLoading(true);
    });

    const specWithData = {
      ...spec,
      data: { values: VEGA_DEFAULT_DATA },
    };

    const loadVega = async () => {
      if (!window.vegaEmbed) {
        await loadScript(VEGA_CDN.VEGA);
        await loadScript(VEGA_CDN.VEGA_LITE);
        await loadScript(VEGA_CDN.VEGA_EMBED);
      }

      if (isMounted && containerRef.current && window.vegaEmbed) {
        try {
          await window.vegaEmbed(containerRef.current, specWithData, {
            actions: false,
            renderer: "svg",
          });
          if (isMounted) setIsLoading(false);
        } catch (error) {
          console.error("Vega rendering error:", error);
          if (isMounted) setIsLoading(false);
        }
      }
    };
    loadVega();

    return () => {
      isMounted = false;
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [spec]);

  if (!spec) {
    return (
      <div className="border text-start w-full border-gray-300 rounded-lg p-4 bg-white text-sm whitespace-pre-wrap lg:h-96 overflow-y-auto relative">
        <h3 className="text-lg font-semibold mb-3">Vega Chart Preview</h3>
        <div className="flex items-center justify-center h-64 text-gray-400">
          Ожидание Vega спецификации...
        </div>
      </div>
    );
  }

  return (
    <div className="border text-start w-full border-gray-300 rounded-lg p-4 bg-white text-sm lg:h-96">
      <h3 className="text-lg font-semibold mb-3 font-sans">
        Vega Chart Preview
      </h3>
      {isLoading && (
        <div className="flex items-center justify-center h-64 text-gray-400">
          Загрузка графика...
        </div>
      )}
      <div className="flex items-center justify-center w-full">
        <div ref={containerRef} className="min-h-[300px]"></div>
      </div>
    </div>
  );
};
