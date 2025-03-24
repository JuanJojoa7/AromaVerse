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
   Abrir git bash
   Ejecutar comando: chmod +x setup.sh
   ./setup.sh
   ```

1.1. **Ajustes adicionales:**

```sh
Cuando esten ejecutando el ./setup.sh llegaran a una parte de jest, este es para el funcionamiento de las pruebas de unidad. Solamente denle a que no quieren hacer overwrite jest.config.ts ya que este estara en el repositorio con el que podran ver las pruebas de covertura del proyecto. 
```

2. **Configurar las variables de entorno:**  
   Crear un archivo `.env` en `backend/` con:  
   ```env
   DATABASE_URL=postgresql://usuario:password@localhost:5432/AromaLife
   PORT = 3000
   JWT_SECRET = "UnaClaveSecreta"
   ```

3. **Configurar la base de datos con Prisma:**  
   ```sh
   1. Primero en pgAdmin crear una base de datos con el nombre AromaLife
   2. Ejecutar: prisma migrate dev
   3. Ejecutar: yarn prisma migrate staus
   Este debera devolverte un "Ok" 
   ```

4. **Iniciar el servidor backend:**  
   ```sh
   yarn run dev
   ```

5. **Correr pruebas de unidad:**
```sh
yarn test
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
