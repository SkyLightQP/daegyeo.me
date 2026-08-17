'use client';

import { MouseEvent as ReactMouseEvent, ReactNode, useEffect, useRef } from 'react';
import posthog from 'posthog-js';

const SCROLL_THRESHOLDS = [25, 50, 75, 100];

const getScrollDepthPercentage = () => {
  const scrollTop = window.scrollY;
  const viewportHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  if (documentHeight <= viewportHeight) return 100;

  return Math.min(100, Math.round(((scrollTop + viewportHeight) / documentHeight) * 100));
};

/** 메인 페이지 전용 PostHog 이벤트 트래킹 래퍼 (스크롤 깊이 / 링크 클릭 / 설명 펼침) */
const AnalyticsBoundary = ({ children }: { children: ReactNode }) => {
  const firedThresholdsRef = useRef<Set<number>>(new Set());
  const tickingRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;

      requestAnimationFrame(() => {
        const depth = getScrollDepthPercentage();

        SCROLL_THRESHOLDS.forEach((threshold) => {
          if (depth >= threshold && !firedThresholdsRef.current.has(threshold)) {
            firedThresholdsRef.current.add(threshold);
            posthog.capture('page_scroll_depth', { depth_percentage: threshold });
          }
        });

        tickingRef.current = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (event: ReactMouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;

    const anchor = target.closest('a');
    if (anchor) {
      posthog.capture('link_click', {
        href: anchor.href,
        text: anchor.textContent?.trim(),
        is_external: anchor.hostname !== window.location.hostname,
      });
      return;
    }

    // aria-expanded="false"인 시점(펼치기 전)에만 기록해 펼침 액션만 잡아낸다
    const toggle = target.closest<HTMLElement>('[data-analytics-event]');
    if (toggle && toggle.getAttribute('aria-expanded') === 'false') {
      posthog.capture(toggle.dataset.analyticsEvent as string, {
        label: toggle.dataset.analyticsLabel,
      });
    }
  };

  return <div onClick={handleClick}>{children}</div>;
};

export default AnalyticsBoundary;
