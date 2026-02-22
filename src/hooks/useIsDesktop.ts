import { useSyncExternalStore } from 'react';

const DESKTOP_BREAKPOINT = 1024;

function getSnapshot(): boolean {
  return window.innerWidth >= DESKTOP_BREAKPOINT;
}

function getServerSnapshot(): boolean {
  return true;
}

function subscribe(callback: () => void): () => void {
  const mql = window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT}px)`);
  mql.addEventListener('change', callback);
  return () => mql.removeEventListener('change', callback);
}

export function useIsDesktop(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
