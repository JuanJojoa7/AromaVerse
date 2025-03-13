# AromaVerse Backend

Este es el backend del proyecto **AromaVerse**, una plataforma para la venta de velas aromáticas. Está desarrollado con **Node.js**, **Express**, **PostgreSQL** y **Prisma ORM**, e integra **Firebase Authentication** para la gestión de usuarios.

## 🚀 Tecnologías

- **Node.js** con **Express** (Framework backend)
- **PostgreSQL** con **Prisma ORM** (Base de datos y ORM)
- **Firebase Authentication** (Autenticación de usuarios)
- **Firebase Storage** (Almacenamiento de imágenes)
- **MercadoPago / PayU** (Pasarelas de pago)
- **Docker** (Opcional para despliegue)

## 📂 Estructura del Proyecto

```
backend/
│-- prisma/          # Esquema de la base de datos y migraciones
│-- src/
│   │-- controllers/ # Lógica de negocio
│   │-- middleware/  # Middlewares para validaciones y seguridad
│   │-- models/      # Modelos de la base de datos con Prisma
│   │-- routes/      # Definición de rutas con Express
│   │-- services/    # Servicios para conectar con Firebase y otros
│   │-- app.js       # Configuración de Express
│   └-- server.js    # Punto de entrada del backend
│-- .env             # Variables de entorno
│-- .gitignore       # Archivos ignorados en Git
│-- package.json     # Dependencias del proyecto
│-- README.md        # Documentación del backend
```

## ⚙️ Instalación

1. **Clonar el repositorio:**

   ```sh
   git clone <URL_DEL_REPOSITORIO>
   cd backend
   ```

2. **Instalar dependencias:**

   ```sh
   npm install
   ```

3. **Configurar las variables de entorno:**
   Crear un archivo `.env` en la raíz del backend y definir las siguientes variables:

   ```env
   DATABASE_URL=postgresql://usuario:password@localhost:5432/AromaLife
   FIREBASE_PROJECT_ID=<TU_PROYECTO>
   FIREBASE_CLIENT_EMAIL=<CLIENT_EMAIL>
   FIREBASE_PRIVATE_KEY=<PRIVATE_KEY>
   ```

4. **Configurar la base de datos con Prisma:**

   ```sh
   npx prisma migrate dev --name init
   npx prisma generate
   ```

5. **Iniciar el servidor:**

   ```sh
   npm start
   ```

## 🛠 Endpoints principales

| Método | Endpoint           | Descripción                 |
| ------ | ------------------ | --------------------------- |
| POST   | /api/auth/login    | Iniciar sesión con Firebase |
| POST   | /api/auth/register | Registrar usuario           |
| GET    | /api/products      | Obtener lista de productos  |
| POST   | /api/orders        | Crear una orden de compra   |

## 📌 Notas

- Se recomienda usar **Postman** o **Insomnia** para probar los endpoints.
- Puedes conectar este backend con el frontend en **Next.js**.
- Asegúrate de tener PostgreSQL corriendo en tu máquina o en un servicio en la nube.

**© 2025 AromaVerse - Backend API**
