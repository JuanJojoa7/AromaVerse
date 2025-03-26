# AromaVerse - Plataforma de Venta de Velas Aromáticas

AromaVerse es una plataforma e-commerce para la venta de velas aromáticas. El proyecto está desarrollado con Node.js en el backend y una base de datos PostgreSQL gestionada con Prisma ORM (En desarrollo).

## 🌍 URL del despliegue del proyecto

[https://aromaverse-yf4d.onrender.com](https://aromaverse-yf4d.onrender.com)

---

## 🚀 Tecnologías

### 🔹 Backend
- Node.js con Express (Framework backend)
- PostgreSQL con Prisma ORM (Base de datos y ORM)

### 🔹 Infraestructura
- Backend en Render

---

## ⚙️ Instalación

### 🖥️ Clonar el repositorio
```bash
git clone https://github.com/JuanJojoa7/AromaVerse.git
cd AromaVerse
```

### 🔹 Configurar el backend

#### Instalar dependencias:
```bash
cd backend
```

#### Configurar permisos y ejecutar el script de configuración:
```bash
chmod +x setup.sh
./setup.sh
```

#### ⚠️ Ajustes adicionales:
Cuando estén ejecutando `./setup.sh`, llegarán a una parte donde se pregunta por Jest. Esto es para el funcionamiento de las pruebas de unidad. Simplemente seleccionen "No" cuando pregunte si desean sobrescribir `jest.config.ts`, ya que este archivo estará en el repositorio y se usará para verificar la cobertura de pruebas del proyecto.

#### Configurar las variables de entorno:
Crear un archivo `.env` en `backend/` con:
```ini
DATABASE_URL=postgresql://usuario:password@localhost:5432/AromaLife
PORT=3000
JWT_SECRET="Secret"
```

#### Configurar la base de datos con Prisma:
1. En pgAdmin, crear una base de datos con el nombre `AromaLife`.
2. Ejecutar:
   ```bash
   yarn prisma migrate dev
   ```
3. Verificar el estado de la migración:
   ```bash
   yarn prisma migrate status
   ```
   Esto debería devolver un "Ok".

#### Iniciar el servidor backend:
```bash
yarn run dev
```

#### Correr pruebas de unidad:
```bash
yarn test
```

## 🛠 Endpoints principales

| Método | Endpoint | Descripción |
|---------|-------------|------------------------------|
| POST | `/api/auth/login` | Iniciar sesión con Firebase |
| POST | `/api/auth/register` | Registrar usuario |
| GET  | `/api/products` | Obtener lista de productos |
| POST | `/api/orders` | Crear una orden de compra |

---

📌 **© 2025 AromaVerse - Todos los derechos reservados.**
