import { useEffect, useState, useCallback } from 'react';

export function useWakeLock(enabled: boolean = true) {
  const [isLocked, setIsLocked] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    setIsSupported('wakeLock' in navigator);
  }, []);

  const requestLock = useCallback(async () => {
    if (!('wakeLock' in navigator) || !enabled) return;

    try {
      const sentinel = await (navigator as any).wakeLock.request('screen');
      setIsLocked(true);

      sentinel.addEventListener('release', () => {
        setIsLocked(false);
      });
    } catch (err) {
      // Wake lock can fail if battery saver is on or page is hidden
      console.warn('Wake lock error:', err);
      setIsLocked(false);
    }
  }, [enabled]);

  useEffect(() => {
    if (enabled) {
      requestLock();
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && enabled) {
        requestLock();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [enabled, requestLock]);

  return { isLocked, isSupported };
}
