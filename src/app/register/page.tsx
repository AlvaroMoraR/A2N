'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Error al registrar');
      } else {
        router.push(`/dashboard/${data.pageId}`);

      }
    } catch (err) {
      setError('Error en el servidor');
    }
  };

  return (
    <section style={{
      maxWidth: '400px',
      margin: 'auto',
      padding: '2rem',
      borderRadius: '8px',
      background: '#fff',
      boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
    }}>
      <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Crear cuenta</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Registrarse</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </section>
  );
}
