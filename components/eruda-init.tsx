'use client';

import { useEffect } from 'react';
import eruda from 'eruda';

export default function ErudaInit() {
  useEffect(() => {
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      (async () => {
        eruda.init();
      })();
    }
  }, []);

  return null;
}
