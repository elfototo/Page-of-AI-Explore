import { useState, useMemo } from "react";
import { extractVegaSpec } from "../utils/extractVegaSpec";
import { useSSEPlayer } from "../hooks/useSSEPlayer";
import { StreamingOutput } from "../components/StreamingOutput";
import { Controls } from "./Controls";
import { VegaChart } from "./VegaChart";
import { STATUS_COLORS, PLAYBACK_SPEED } from "../constants";

export default function AIExplorer() {
  const [dump, setDump] = useState("");
  const [playbackSpeed, setPlaybackSpeed] = useState(Number(PLAYBACK_SPEED.DEFAULT));

  const { status, streamedText, isPlaying, play, stop, reset, errorMessage } =
    useSSEPlayer(dump, playbackSpeed);

  const vegaSpec = useMemo(() => {
    return extractVegaSpec(streamedText);
  }, [streamedText]);

  const handleFileLoad = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setDump(content);
      reset();
    };
    reader.readAsText(file);
  };

  return (
    <div className="mx-2 w-full sm:w-xl lg:w-4xl">
      <div className="mx-auto w-full h-full">
        <h1 className="font-bold text-4xl sm:text-5xl">
          AI Explorer
        </h1>

        <div className="m-5 text-center">
          <span
            className={`inline-block px-4 py-2 rounded-full font-semibold ${STATUS_COLORS[status]}`}
          >
            Статус: {status.toUpperCase()}
          </span>
          {errorMessage && (
            <div className="text-red-400 mt-2">{errorMessage}</div>
          )}
        </div>

        <div className="bg-white shadow-2xl rounded p-5 mx-2 h-full">
          <Controls
            handleFileLoad={handleFileLoad}
            isPlaying={isPlaying}
            play={play}
            stop={stop}
            dump={dump}
            status={status}
            reset={reset}
            playbackSpeed={playbackSpeed}
            setPlaybackSpeed={setPlaybackSpeed}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 overflow-hidden w-[100%] lg:h-96">
            <StreamingOutput
              text={streamedText}
              isStreaming={status === "streaming"}
            />

            <VegaChart spec={vegaSpec} />
          </div>
        </div>
      </div>
    </div>
  );
}
