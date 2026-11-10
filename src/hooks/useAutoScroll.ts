import { useState, useEffect, useRef, useCallback } from 'react';

interface UseAutoScrollOptions {
  containerRef?: React.RefObject<HTMLElement | null>;
  initialSpeed?: number; // 1 to 10
}

export function useAutoScroll({ containerRef, initialSpeed = 2 }: UseAutoScrollOptions = {}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(initialSpeed);
  const [scrollProgress, setScrollProgress] = useState(0); // 0 to 100%
  const animationFrameId = useRef<number | null>(null);
  const lastTimestamp = useRef<number | null>(null);

  const getScrollContainer = useCallback((): HTMLElement | Window => {
    if (containerRef && containerRef.current) {
      return containerRef.current;
    }
    return window;
  }, [containerRef]);

  const updateProgress = useCallback(() => {
    const target = getScrollContainer();
    let currentScroll = 0;
    let maxScroll = 1;

    if (target instanceof Window) {
      currentScroll = window.scrollY || document.documentElement.scrollTop;
      maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    } else {
      currentScroll = target.scrollTop;
      maxScroll = target.scrollHeight - target.clientHeight;
    }

    if (maxScroll <= 0) {
      setScrollProgress(0);
    } else {
      const p = Math.min(100, Math.max(0, (currentScroll / maxScroll) * 100));
      setScrollProgress(Math.round(p));
    }
  }, [getScrollContainer]);

  const scrollStep = useCallback((timestamp: number) => {
    if (!lastTimestamp.current) {
      lastTimestamp.current = timestamp;
    }

    const elapsed = timestamp - lastTimestamp.current;
    lastTimestamp.current = timestamp;

    // Base speed: speed 1 = ~12 px/sec, speed 5 = ~60 px/sec, speed 10 = ~120 px/sec
    const pixelsPerMs = (speed * 12) / 1000;
    const distance = elapsed * pixelsPerMs;

    const target = getScrollContainer();

    if (target instanceof Window) {
      window.scrollBy({ top: distance, behavior: 'instant' as ScrollBehavior });
      const currentScroll = window.scrollY || document.documentElement.scrollTop;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (currentScroll >= maxScroll - 2) {
        setIsPlaying(false);
        return;
      }
    } else {
      target.scrollTop += distance;
      if (target.scrollTop >= target.scrollHeight - target.clientHeight - 2) {
        setIsPlaying(false);
        return;
      }
    }

    updateProgress();

    if (isPlaying) {
      animationFrameId.current = requestAnimationFrame(scrollStep);
    }
  }, [speed, isPlaying, getScrollContainer, updateProgress]);

  useEffect(() => {
    if (isPlaying) {
      lastTimestamp.current = null;
      animationFrameId.current = requestAnimationFrame(scrollStep);
    } else {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
    }

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isPlaying, scrollStep]);

  // Track manual scroll
  useEffect(() => {
    const handleScroll = () => {
      updateProgress();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [updateProgress]);

  // Spacebar toggle (if not typing in input/textarea)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const resetToTop = useCallback(() => {
    setIsPlaying(false);
    const target = getScrollContainer();
    if (target instanceof Window) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      target.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setScrollProgress(0);
  }, [getScrollContainer]);

  return {
    isPlaying,
    speed,
    scrollProgress,
    setSpeed,
    togglePlay,
    resetToTop,
  };
}
