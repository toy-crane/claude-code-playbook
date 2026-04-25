'use client';

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';

type FadeInProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  style?: CSSProperties;
};

export function FadeIn({ children, delay = 0, y = 16, className, style }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let fired = false;
    const reveal = () => {
      if (fired) return;
      fired = true;
      setShown(true);
      io.disconnect();
    };
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) reveal();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );
    io.observe(el);
    const t = setTimeout(reveal, 200 + delay);
    return () => {
      io.disconnect();
      clearTimeout(t);
    };
  }, [delay]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'translateY(0)' : `translateY(${y}px)`,
        transition: `opacity 600ms cubic-bezier(0.2, 0, 0, 1) ${delay}ms, transform 600ms cubic-bezier(0.2, 0, 0, 1) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
