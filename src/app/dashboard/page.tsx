// src/app/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Page {
  id: string;
  title: string;
}

export default function DashboardPage() {
  const [pages, setPages] = useState<Page[]>([]);

  useEffect(() => {
    fetch('/api/pages')
      .then((res) => res.json())
      .then((data) => setPages(data.pages));
  }, []);

  return (
    <div>
      <h1>Mis páginas</h1>
      <Link href="/dashboard/new">➕ Nueva página</Link>
  
      {pages.length === 0 ? (
        <p>No tienes páginas aún.</p>
      ) : (
        <ul>
          {pages.map((p) => (
            <li key={p.id}>
              <Link href={`/dashboard/${p.id}`}>{p.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
