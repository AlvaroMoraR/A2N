A2N — The Minimal Productivity Cloud

A2N es una plataforma de productividad moderna, modular y minimalista, inspirada en herramientas como Notion, Linear y Craft.
Su misión es ofrecer un espacio unificado para documentos, bases de datos, tareas, conocimiento y colaboración, dentro de una arquitectura simple, rápida y totalmente privada.

A2N = Alma + Aitor + Nuvem
Un ecosistema creado para organizar, construir y pensar sin fricción.

🚀 Características principales

Workspaces (Áreas de trabajo)
Organiza proyectos, departamentos o documentos de forma independiente.

Editor de bloques estilo Notion
Texto, encabezados, listas, toggles, checklist, código, embeds, etc.

Bases de datos inteligentes
Tablas tipo Notion, propiedades, relaciones, filtros y vistas.

Autenticación moderna (JWT)
Registro, login, roles y control de permisos.

Diseño minimalista
Inspirado en Nothing, Linear y Notion. Limpio, blanco, sin ruido.

API REST estándar
Pensada para integraciones, automatizaciones y aplicaciones externas.

Arquitectura modular
Cada parte del sistema puede crecer: nuevos bloques, paneles, plugins o integraciones.

🧩 Tech Stack

Frontend: Next.js / React

Backend: Next.js API Routes

Base de Datos: PostgreSQL o SQLite

ORM: Prisma

Autenticación: JWT

UI: CSS minimalista (sin Tailwind)

Deploy: Vercel / Docker

/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   ├── documents/
│   │   │   └── workspace/
│   │   ├── dashboard/
│   │   ├── login/
│   │   └── register/
│   ├── components/
│   ├── hooks/
│   └── utils/
├── public/
├── package.json
└── README.md
