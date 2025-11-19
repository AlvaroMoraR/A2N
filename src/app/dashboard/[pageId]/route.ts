import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(request: Request, { params }: { params: { pageId: string } }) {
  const { content } = await request.json();

  if (!params.pageId || !content) {
    return NextResponse.json({ message: 'Datos incompletos' }, { status: 400 });
  }

  try {
    const page = await prisma.page.update({
      where: { id: params.pageId },
      data: {
        content,
      },
    });

    return NextResponse.json(page);
  } catch (err) {
    console.error('Error al guardar contenido', err);
    return NextResponse.json({ message: 'Error al guardar' }, { status: 500 });
  }
}
