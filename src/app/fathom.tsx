import { load, trackPageview } from 'fathom-client';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function FathomTracker() {
  const location = useLocation();

  useEffect(() => {
    const fathomId = import.meta.env.VITE_FATHOM_ID;

    if (fathomId) {
      load(fathomId, {
        includedDomains: ['pragmatic-board.vercel.app'],
        spa: 'auto',
      });
    }
  }, []);

  useEffect(() => {
    trackPageview();
  }, [location.pathname]);

  return null;
}
