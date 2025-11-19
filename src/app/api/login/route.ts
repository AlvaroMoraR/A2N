import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  const { identifier, password } = await req.json();

  if (!identifier || !password) {
    return NextResponse.json({ message: 'Faltan campos' }, { status: 400 });
  }

  try {
    // Buscar usuario por email o nombre
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: identifier },
          { name: identifier },
        ],
      },
    });

    if (!user) {
      return NextResponse.json({ message: 'Usuario no encontrado' }, { status: 404 });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return NextResponse.json({ message: 'Contraseña incorrecta' }, { status: 401 });
    }

    // ⚠️ En producción aquí deberías usar JWT o sesión
    return NextResponse.json({
      message: 'Login correcto',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error('Error en login:', err);
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
  }
}
