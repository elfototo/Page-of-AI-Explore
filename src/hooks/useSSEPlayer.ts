import type { SSEStatus, StreamEvent } from "../types/sse";
import { useState, useRef, useEffect } from "react";
import { SSE_DELAY } from "../config/constants";

export const useSSEPlayer = (dump: string, playbackSpeed: number = 1) => {
  const [status, setStatus] = useState<SSEStatus>('idle');
  const [streamedText, setStreamedText] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const timeoutRef = useRef<number | null>(null);
  const currentLineRef = useRef(0);

  const play = () => {
    if (!dump) {
      setStatus('error');
      setErrorMessage('Файл не загружен');
      return;
    }

    setIsPlaying(true);
    setStatus('streaming');
    setStreamedText('');
    setErrorMessage('');
    currentLineRef.current = 0;

    const lines = dump.split('\n').filter(line => line.trim());

    const playNextLine = () => {
      if (currentLineRef.current >= lines.length) {
        setStatus('done');
        setIsPlaying(false);
        return;
      }

      const line = lines[currentLineRef.current];
      try {
        const event = JSON.parse(line) as StreamEvent;
        
        if (event.event === 'token') {
          setStreamedText(prev => prev + event.data.delta);
        } else if (event.event === 'done') {
          setStatus('done');
          setIsPlaying(false);
          return;
        } else if (event.event === 'error') {
          setStatus('error');
          setErrorMessage(event.data.message);
          setIsPlaying(false);
          return;
        }
      } catch (error) {
        console.error('Ошибка парсинга JSONL строки:', error);
      }

      currentLineRef.current++;

      const baseDelay = Math.random() * (SSE_DELAY.MAX - SSE_DELAY.MIN) + SSE_DELAY.MIN;
      
      const adjustedDelay = baseDelay / playbackSpeed;
      timeoutRef.current = window.setTimeout(playNextLine, adjustedDelay);
    };

    playNextLine();
  };

  const stop = () => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }
    setIsPlaying(false);
    if (status === 'streaming') {
      setStatus('done');
    }
  };

  const reset = () => {
    stop();
    setStatus('idle');
    setStreamedText('');
    setErrorMessage('');
    currentLineRef.current = 0;
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return { status, streamedText, isPlaying, play, stop, reset, errorMessage };
};

