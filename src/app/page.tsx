'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier: email, password })
    });

    if (res.ok) {
      router.push('/dashboard');
    } else {
      const data = await res.json();
      setError(data.message || 'Error al iniciar sesión');
    }
  };

  return (
    <main
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f8fafc',
      }}
    >
      <div
        style={{
          backgroundColor: '#fff',
          padding: '2rem',
          borderRadius: '1rem',
          boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
          width: '100%',
          maxWidth: '420px',
          textAlign: 'center',
        }}
      >
        <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#111827' }}>
          Inicia sesión en Nuvem
        </h1>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            type="email"
            placeholder="Correo electrónico o nombre de usuario"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              padding: '0.75rem',
              borderRadius: '0.5rem',
              border: '1px solid #d1d5db',
              fontSize: '1rem',
            }}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              padding: '0.75rem',
              borderRadius: '0.5rem',
              border: '1px solid #d1d5db',
              fontSize: '1rem',
            }}
          />
          <button
            type="submit"
            style={{
              backgroundColor: '#3b82f6',
              color: '#fff',
              padding: '0.75rem',
              borderRadius: '0.5rem',
              fontSize: '1rem',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Iniciar sesión
          </button>
        </form>

        {error && <p style={{ color: 'red', marginTop: '0.5rem' }}>{error}</p>}

        <p style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: '#6b7280' }}>
          ¿Primera vez aquí?{' '}
          <a href="/register" style={{ color: '#3b82f6', textDecoration: 'underline' }}>
            Crear cuenta
          </a>
        </p>

        <footer style={{ marginTop: '2rem', fontSize: '0.85rem', color: '#6b7280' }}>
          <img
            src="/favicon.ico"
            alt="logo"
            style={{ width: '18px', height: '18px', marginRight: '0.5rem', verticalAlign: 'middle' }}
          />
          <span>
            Powered by <strong style={{ color: '#000' }}>Álvaro</strong>
          </span>
        </footer>
      </div>
    </main>
  );
}

