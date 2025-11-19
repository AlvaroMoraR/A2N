'use client';

import { useCreateBlockNote, } from '@blocknote/react';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/core/fonts/inter.css';
import '@blocknote/mantine/style.css';
import { useEffect, useState } from 'react';

export default function Editor({
  pageId,
  initialContent,
}: {
  pageId: string;
  initialContent: any;
}) {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const editor = useCreateBlockNote({
    initialContent,
  });

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);

    const content = editor.document;

    try {
      const res = await fetch(`/api/page/${pageId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });

      if (res.ok) setSaved(true);
    } catch (err) {
      console.error('Error guardando la página', err);
    }

    setSaving(false);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={handleSave} disabled={saving}>
          {saving ? 'Guardando...' : 'Guardar'}
        </button>
        {saved && <span style={{ marginLeft: '1rem', color: 'green' }}>✅ Guardado</span>}
      </div>

      <BlockNoteView editor={editor} theme="light" />
    </div>
  );
}
