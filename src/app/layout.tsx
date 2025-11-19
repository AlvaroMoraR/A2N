import '././globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'SAAS NT',
  description: 'Tu espacio profesional para organizar ideas y datos',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body>
        <header style={{ padding: '1rem', borderBottom: '1px solid #ddd', marginBottom: '2rem' }}>
         
        </header>

        <main style={{ maxWidth: '720px', margin: '0 auto' }}>
          {children}
        </main>
      </body>
    </html>
  );
}