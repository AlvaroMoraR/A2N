//import Editor from './Editor';

//export default function PageEditor() {
 // return <Editor />;
//}

import { prisma } from '@/lib/prisma';
import ClientEditor from './Editor';

export default async function DashboardPage({ params }: { params: { pageId: string } }) {
  const page = await prisma.page.findUnique({
    where: { id: params.pageId },
  });

  if (!page) return <h1>Página no encontrada</h1>;

  return <ClientEditor pageId={page.id} initialContent={page.content} />;
}
