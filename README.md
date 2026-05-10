# 🏥 Sistema de Gestión de Afiliados

Una solución moderna y eficiente para la administración de pacientes afiliados, diseñada bajo el patrón de arquitectura **MVC (Modelo-Vista-Controlador)**. Esta aplicación permite gestionar registros de salud, niveles de membresía y cálculos automáticos de beneficios.

---

## ✨ Características Principales

*   **Panel de Administración:** Interfaz limpia tipo dashboard para visualizar el directorio de pacientes.
*   **Gestión de Membresías:** Soporte para niveles *Silver*, *Gold* y *Platinum*.
*   **Simulador de Presupuesto:** Cálculo dinámico de descuentos basado en el tipo de afiliación del paciente.
*   **CRUD Completo:** Flujo integral para crear, leer, actualizar y eliminar registros de afiliados.
*   **Diseño Responsivo:** Optimizado para dispositivos móviles y escritorio mediante Bootstrap 5.
*   **Base de Datos Robusta:** Integración con Prisma ORM para una gestión de datos segura y escalable.

## 🚀 Tecnologías Utilizadas

*   **Frontend:** Handlebars (HBS) & Bootstrap 5.
*   **Backend:** Node.js con Express.
*   **Base de Datos:** Prisma ORM (soporte para SQLite/PostgreSQL).
*   **Lenguaje:** TypeScript

---

## 🛠️ Instalación y Configuración

Sigue estos pasos para poner en marcha el proyecto en tu entorno local:

### 1. Clonar el repositorio
```bash
git clone https://github.com/AndriudDev/Prueba2.git
cd Prueba2
```

### 2. Instalar dependencias
Se recomienda el uso de `yarn` para la gestión de paquetes:
```bash
yarn install
```

### 3. Configurar variables de entorno
Crea un archivo `.env` en la raíz del proyecto basándote en el ejemplo:
```bash
cp .env.example .env
```
*Nota: Asegúrate de configurar la URL de tu base de datos en este archivo.*

### 4. Preparar la Base de Datos
Ejecuta las migraciones de Prisma para generar las tablas y el cliente:
```bash
npx prisma migrate dev --name init
```

### 5. Generate
Genera base de datos
```bash
npx prisma generate
```

### 6. Datos de Prueba (Seed)
Poblar la base de datos con registros de ejemplo para desarrollo:
```bash
yarn seed
```

---

## 💻 Ejecución

Para iniciar el servidor con recarga automática (Hot Reload):
```bash
yarn dev
```
El servidor estará disponible en: `http://localhost:3000`

---

## 📁 Estructura del Proyecto

```text
├── src/
│   ├── controllers/  # Lógica de control
│   ├── models/       # Definición de datos y esquemas
│   ├── routes/       # Definición de endpoints
│   └── index.ts      # Punto de entrada
├── views/            # Plantillas Handlebars (HBS)
│   ├── layouts/      # Estructura base (Main)
│   └── pacientes/    # Vistas de la gestión de afiliados
├── prisma/           # Esquema de DB y migraciones
└── README.md
```
