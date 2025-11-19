// app/dashboard/[pageId]/layout.tsx

import React from 'react';

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <aside style={{ width: '70px', background: '#f5f5f5', padding: '1rem' }}>
        <nav>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li><a href="/dashboard/1">Página 1</a></li>
            <li><a href="/dashboard/2">Página 2</a></li>
          </ul>
        </nav>
      </aside>
      <main style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>
        {children}
      </main>
    </div>
  );
}