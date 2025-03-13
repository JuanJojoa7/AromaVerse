# AromaVerse - Plataforma de Venta de Velas Aromáticas  

AromaVerse es una plataforma e-commerce para la venta de velas aromáticas. El proyecto está desarrollado con **Node.js** en el backend y **Next.js** en el frontend, integrando autenticación con **Firebase**, procesamiento de pagos con **MercadoPago/PayU**, y una base de datos PostgreSQL gestionada con **Prisma ORM**.  

## 🚀 Tecnologías  

### 🔹 Backend  
- **Node.js** con **Express** (Framework backend)  
- **PostgreSQL** con **Prisma ORM** (Base de datos y ORM)  
- **Firebase Authentication** (Autenticación de usuarios)  
- **Firebase Storage** (Almacenamiento de imágenes)  
- **MercadoPago / PayU** (Pasarelas de pago)  

### 🔹 Frontend  
- **Next.js** con **React** (Framework para el frontend)  
- **TailwindCSS** (Estilos)  
- **Redux Toolkit / Zustand** (Gestión de estado)  
- **Three.js** (Previsualización 3D de productos)  

### 🔹 Infraestructura  
- **Backend en AWS/GCP**  
- **Frontend en Vercel**  
- **Docker** (Opcional para despliegue)  

## ⚙️ Instalación  

### 🖥️ Clonar el repositorio  
```sh
git clone <URL_DEL_REPOSITORIO>
cd AromaVerse
```

### 🔹 Configurar el backend  
1. **Instalar dependencias:**  
   ```sh
   cd backend
   npm install
   ```

2. **Configurar las variables de entorno:**  
   Crear un archivo `.env` en `backend/` con:  
   ```env
   DATABASE_URL=postgresql://usuario:password@localhost:5432/AromaLife
   FIREBASE_PROJECT_ID=<TU_PROYECTO>
   FIREBASE_CLIENT_EMAIL=<CLIENT_EMAIL>
   FIREBASE_PRIVATE_KEY=<PRIVATE_KEY>
   ```

3. **Configurar la base de datos con Prisma:**  
   ```sh
   npx prisma migrate dev --name init
   npx prisma generate
   ```

4. **Iniciar el servidor backend:**  
   ```sh
   npm start
   ```

### 🔹 Configurar el frontend  
1. **Instalar dependencias:**  
   ```sh
   cd ../frontend
   npm install
   ```

2. **Configurar las variables de entorno:**  
   Crear un archivo `.env.local` en `frontend/` con:  
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:4000/api
   NEXT_PUBLIC_FIREBASE_API_KEY=<FIREBASE_API_KEY>
   ```

3. **Iniciar el frontend:**  
   ```sh
   npm run dev
   ```

## 🛠 Endpoints principales  

| Método | Endpoint           | Descripción                 |
|--------|--------------------|-----------------------------|
| POST   | /api/auth/login    | Iniciar sesión con Firebase |
| POST   | /api/auth/register | Registrar usuario           |
| GET    | /api/products      | Obtener lista de productos  |
| POST   | /api/orders        | Crear una orden de compra   |

## 🎨 Características del Frontend  

- **Diseño moderno y responsivo** con **TailwindCSS**  
- **Carrito de compras** con Redux Toolkit/Zustand  
- **Autenticación con Firebase**  
- **Vista 3D de productos con Three.js**  
- **Checkout integrado con MercadoPago/PayU**   

📌 **© 2025 AromaVerse - Todos los derechos reservados.** 
