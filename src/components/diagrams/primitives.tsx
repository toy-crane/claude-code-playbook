import type { ReactNode } from 'react';

export function DiagramFrame({ children }: { children: ReactNode }) {
  return (
    <figure
      className="my-8 rounded-xl p-4"
      style={{ backgroundColor: 'var(--diagram-bg-panel)' }}
    >
      {children}
    </figure>
  );
}
