# 🏥 Sistema de Gestión de Afiliados

Aplicación para gestionar pacientes afiliados usando **Express + TypeScript + Prisma**. Incluye autenticación, CRUD de afiliados y simulación de presupuestos.

---

## ✨ Características Principales

- **Autenticación** con sesión y usuarios.
- **CRUD de afiliados** con vistas Handlebars.
- **Validación** usando Zod.
- **Base de datos** con Prisma y PostgreSQL.
- **Rutas protegidas** para usuarios autenticados.
- **Bootstrap 5** para diseño responsivo.

## 🚀 Tecnologías Utilizadas

- Node.js + Express
- TypeScript
- Prisma ORM
- PostgreSQL
- Handlebars (HBS)
- express-session
- bcryptjs
- Docker / Docker Compose

---

## 🧩 Requisitos Previos

Para instalar localmente:

- Node.js 18+
- Yarn o npm
- PostgreSQL 14+
- Git

Para usar Docker:

- Docker Desktop instalado

---

## 🛠️ Instalación Local

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/Prueba3.git
cd Prueba3
```

### 2. Instalar dependencias
```bash
yarn install
```

### 3. Configurar variables de entorno
Crea el archivo `.env` desde el ejemplo:
```bash
cp .env.example .env
```

> El archivo `.env.example` ya incluye las credenciales de prueba y la forma correcta de configurar `DATABASE_URL`.

### 4. Ejecutar migraciones y generar Prisma
```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 5. Cargar datos de prueba
```bash
yarn seed
```

### 6. Iniciar la aplicación
```bash
yarn dev
```

Abre la app en: `http://localhost:3000`

---

## 🐳 Uso con Docker

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/Prueba3.git
cd Prueba3
```

### 2. Levantar con Docker Compose
```bash
docker compose up -d
```

### 3. Acceder
```text
http://localhost:3000
```

> Docker crea la base de datos, ejecuta Prisma y carga el seed automáticamente.

---

## 👤 Credenciales de prueba

- Email: `user1@example.com`
- Contraseña: `123456`

> Si usas Docker, asegúrate de que el contenedor está funcionando y de que el seed se ejecutó correctamente.

---

## 🌐 Rutas principales

- `GET /` - Página de inicio
- `GET /login` - Formulario de login
- `GET /login/register` - Registro
- `GET /affiliates` - Lista de afiliados
- `GET /affiliates/create` - Crear afiliado

---

## 📁 Estructura del proyecto

```text
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── schemas/
│   ├── lib/
│   └── index.ts
├── views/
│   ├── layouts/
│   ├── pacientes/
│   └── home.hbs
├── prisma/
│   ├── schema.prisma
│   ├── seed.ts
│   └── migrations/
├── Dockerfile
├── docker-compose.yml
├── .env.example
└── README.md
```

---

## 💻 Comandos útiles

```bash
# Instalar dependencias
yarn install

# Migrar y generar Prisma
npx prisma migrate dev --name init
npx prisma generate

# Cargar seed
yarn seed

# Iniciar en desarrollo
yarn dev

# Levantar con Docker
docker compose up -d
```

---

## 🆘 Solución de problemas

- Si no puedes iniciar sesión, verifica que el seed haya creado usuarios.
- Si falta `.env`, crea uno con `cp .env.example .env`.
- Si la base de datos no existe, ejecuta `npx prisma migrate dev --name init`.
- Si usas Docker y la app no arranca, revisa `docker compose logs app`.

