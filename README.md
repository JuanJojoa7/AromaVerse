# AromaVerse - Plataforma de Venta de Velas Aromáticas

AromaVerse es una plataforma e-commerce para la venta de velas aromáticas. El proyecto está desarrollado con Node.js en el backend y una base de datos PostgreSQL gestionada con Prisma ORM (En desarrollo).

## Integrantes 👨‍💻
* Felipe Rojas Prado - A00393918
* Juan Felipe Jojoa Crespo - A00382042
* Juan Sebastian Gonzalez - A00

## 🌍 URL del despliegue del proyecto

[https://aromaverse-yf4d.onrender.com](https://aromaverse-yf4d.onrender.com)

---

## Documentacion Base De Datos 🪪
[📄 Documentación del Modelado de Datos](docs/ModeladoDatos.md)

## Postman Con Pruebas JSON 💊
[🧪 Pruebas Postman](docs/Resources/AromaVerse.postman_collection.json)

## Endpoints del proyecto ✅
[✅ Endpoints](docs/Endpoints.md)

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

#### Configurar las variables de entorno (Si desea ejecutar el proyecto localmente):
Crear un archivo `.env` en `backend/` con:
```ini
DATABASE_URL=postgresql://usuario:password@localhost:5432/AromaLife (Debe inicializar una base de datos localmente Postgre y reemplazar usuario y password)
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
---

📌 **© 2025 AromaVerse - Todos los derechos reservados.**
