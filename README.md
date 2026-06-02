# 🏥 Sistema de Gestión de Afiliados

Aplicación para gestionar pacientes afiliados usando **Express + TypeScript + Prisma**. Incluye autenticación, CRUD de afiliados y vistas Handlebars. Preparada para ejecución local y en Docker.

---

## ✨ Resumen rápido

- **Arrancar en Docker (reconstruyendo):** `docker compose up --build`
- **Arrancar en Docker (detached):** `docker compose up -d`
- **Compilar localmente:** `yarn build`
- **Generar Prisma client:** `npx prisma generate`
- **Levantar solo la DB:** `docker compose up -d db`

---

## 🧩 Requisitos

- Docker y Docker Compose
- Node.js 18+ y Yarn (para desarrollo local)
- PostgreSQL (si ejecutas sin Docker)

---

## 🛠️ Instalación y uso (local)

1. Instalar dependencias:
```
yarn install
```
2. Copiar variables de entorno y editarlas si es necesario:
```
cp .env.example .env
```
3. Generar Prisma Client:
```
npx prisma generate
```
4. Compilar TypeScript:
```
yarn build
```
5. Ejecutar localmente:
```
node dist/src/index.js
```

Para desarrollo (con recarga) usar `yarn dev`.

---

## 🐳 Uso con Docker

1. Levantar (reconstruye imágenes cuando es necesario):
```
docker compose up --build
```
2. Levantar en segundo plano:
```
docker compose up -d
```
3. Ver logs del servicio:
```
docker compose logs -f app
```

El `docker-compose.yml` inyecta las variables de entorno en tiempo de ejecución y el `app` ejecuta al inicio `npx prisma db push && yarn seed && node dist/src/index.js` para sincronizar el esquema y cargar datos de prueba.

---

## 🔐 Variables de entorno

- `.env.example` contiene ejemplos y debe usarse como plantilla. No subas `.env` al repositorio.
- Variables principales:
	- `DATABASE_URL` — URL de conexión PostgreSQL
	- `SESSION_SECRET` — secreto de sesión
	- `NODE_ENV` — `development` o `production`

Recomendación: para entornos de producción, inyecta secretos desde el host o gestor de secretos en lugar de ponerlos en `docker-compose.yml`.

---

## 📦 Prisma y generated client

- En Prisma 7 la conexión se define en `prisma.config.ts` (usa `process.env["DATABASE_URL"]`). No añadas `url = env("DATABASE_URL")` en `prisma/schema.prisma`.
- El Prisma Client se genera en `generated/prisma`. El `Dockerfile` copia esa carpeta tanto en `/app/generated` como en `/app/dist/generated` para soportar el `seed.ts` (ejecutado desde la raíz) y el código compilado en `dist`.

---

## 🛠️ Problemas comunes y soluciones

- Error: `The datasource.url property is required ...` — Verifica `prisma.config.ts` y que `DATABASE_URL` esté presente en el entorno.
- Error: `Cannot find module '../generated/prisma/client'` — Ejecuta `npx prisma generate` y asegúrate de reconstruir la imagen para que `generated` se copie.
- Error: `Failed to lookup view "home" in views directory "/app/dist/views"` — Rebuild y verifica que la carpeta `views` se copió a la imagen; el proyecto también soporta `/app/views` en producción.
- Si el contenedor se reinicia o sale con código 137, revisa memoria y logs (`docker compose logs app`), y que no haya procesos que maten los contenedores.

---

## 📁 Estructura relevante

```
├── src/                # Código TypeScript
├── views/              # Vistas Handlebars
├── prisma/             # Esquema y seed
├── generated/          # Prisma client (generado)
├── dist/               # Código compilado
├── Dockerfile
├── docker-compose.yml
└── .env.example
```

---

Si quieres, puedo añadir una sección con ejemplos de endpoints (curl/Postman) y screenshots. También puedo revertir a un README más corto si prefieres.

