import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';

// Bloques iniciales para BlockNote
const initialContent = [
  {
    id: 'block-1',
    type: 'heading',
    props: { level: 1 },
    content: [
      {
        type: 'text',
        text: 'Dashboard',
        styles: {},
      },
    ],
  },
];

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'Faltan campos obligatorios' },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });

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

    // Verifica si ya tenía una página (por si recarga)
    const existingPage = await prisma.page.findFirst({
      where: { userId: newUser.id },
    });

    let page;

    if (existingPage) {
      page = existingPage;
    } else {
      page = await prisma.page.create({
        data: {
          title: 'Dashboard',
          content: initialContent,
          userId: newUser.id,
        },
      });
    }

    return NextResponse.json(
      {
        message: 'Usuario creado correctamente',
        pageId: page.id,
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
