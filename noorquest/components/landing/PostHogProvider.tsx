'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://us.i.posthog.com';
const ENABLED = !!POSTHOG_KEY && process.env.NODE_ENV === 'production';

declare global {
  interface Window {
    posthog?: {
      init: (key: string, opts: Record<string, unknown>) => void;
      capture: (event: string, props?: Record<string, unknown>) => void;
      identify: (id: string, props?: Record<string, unknown>) => void;
      reset: () => void;
      opt_out_capturing: () => void;
    };
  }
}

let scriptLoaded = false;

function loadPostHog(): Promise<void> {
  if (!ENABLED || !POSTHOG_KEY) return Promise.resolve();
  if (typeof window === 'undefined') return Promise.resolve();
  if (window.posthog) return Promise.resolve();

  return new Promise((resolve) => {
    if (scriptLoaded) return resolve();
    scriptLoaded = true;

    const script = document.createElement('script');
    script.async = true;
    script.src = `${POSTHOG_HOST}/static/array.js`;
    script.onload = () => {
      window.posthog?.init(POSTHOG_KEY!, {
        api_host: POSTHOG_HOST,
        cookieless_mode: 'always',
        ip: false,
        autocapture: true,
        capture_pageview: false,
        capture_pageleave: true,
        disable_session_recording: true,
        person_profiles: 'identified_only',
        opt_out_capturing_by_default: false,
        respect_dnt: true,
        secure_cookie: true,
        cross_subdomain_cookie: false,
      });
      resolve();
    };
    script.onerror = () => resolve();
    document.head.appendChild(script);
  });
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!ENABLED) return;
    void loadPostHog().then(() => {
      if (!pathname) return;
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
      window.posthog?.capture('$pageview', { $current_url: url });
    });
  }, [pathname, searchParams]);

  return <>{children}</>;
}
