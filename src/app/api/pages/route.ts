import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'Faltan campos obligatorios' },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'El correo ya está registrado' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const newPage = await prisma.page.create({
      data: {
        title: 'Mi primera página',
        content: [], // puedes poner contenido por defecto en JSON si quieres
        userId: newUser.id,
      },
    });

    return NextResponse.json(
      {
        message: 'Usuario creado correctamente',
        pageId: newPage.id, // 👈 importante
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error en el registro:', error);
    return NextResponse.json(
      { message: 'Error del servidor' },
      { status: 500 }
    );
  }
}
