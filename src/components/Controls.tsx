import type { SSEStatus } from "../types/sse";
import { PLAYBACK_SPEED } from "../config/constants";

type ControlsProps = {
  handleFileLoad: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isPlaying: boolean;
  play: () => void;
  dump: string;
  status: SSEStatus;
  reset: () => void;
  stop: () => void;
  playbackSpeed: number;
  setPlaybackSpeed: (speed: number) => void;
  fileName: string;
};

export const Controls = ({
  handleFileLoad,
  isPlaying,
  play,
  dump,
  status,
  reset,
  stop,
  playbackSpeed,
  setPlaybackSpeed,
  fileName,
}: ControlsProps) => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col gap-5 lg:gap-0 lg:justify-between lg:flex-row mb-5">
        <div className="flex flex-col text-start gap-4">
          <p className="font-semibold">Выберите JSONL файл:</p>
          <label className="grid sm:flex items-center gap-4 cursor-pointer text-center">
            <input
              type="file"
              accept=".jsonl"
              onChange={handleFileLoad}
              className="hidden"
            />

            <span className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition whitespace-nowrap">
              Выбрать файл
            </span>

            <span className="text-sm text-gray-600 truncate block">
              {fileName || "Файл не выбран"}
            </span>
          </label>
        </div>

        <div className="grid gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <button
              onClick={isPlaying ? stop : play}
              disabled={!dump || status === "done"}
              className="px-6 py-2 bg-blue-500 rounded text-white cursor-pointer hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed"
            >
              {isPlaying ? "Stop" : "Play"}
            </button>

            <button
              onClick={reset}
              disabled={status === "idle"}
              className="bg-red-500 rounded hover:bg-red-600 px-6 py-2 cursor-pointer text-white disabled:bg-red-300 disabled:cursor-not-allowed"
            >
              Reset
            </button>
          </div>

          <div className="flex flex-wrap gap-4 items-center text-start w-full justify-center lg:justify-between">
            <p className="text-sm">Скорость:</p>
            <div className="flex gap-2 justify-between">
              {PLAYBACK_SPEED.OPTIONS.map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => setPlaybackSpeed(value)}
                  disabled={isPlaying}
                  className={`px-3 py-1 text-xs rounded transition-colors ${
                    playbackSpeed === value
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  } disabled:cursor-not-allowed disabled:opacity-50`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
