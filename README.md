# AromaVerse

AromaVerse es una aplicación web de personalización de velas para **Velas Aromalife**, donde los clientes pueden crear velas a su medida combinando IA, experiencias sensoriales y opciones de compra flexibles.

## 🚀 Características Principales
- **Personalización completa:** Elección de contenedor, fragancia y diseño de etiqueta.  
- **Generación con IA:** Imágenes, mensajes y audios personalizados según emociones.  
- **Previsualización 2D:** Permite ver la vela en una imagen de su espacio.  
- **Playlists en QR:** Sugiere fragancias y genera playlists en Spotify según el mensaje.  
- **Suscripción mensual:** Envió de velas personalizadas según gustos.  
- **Upselling inteligente:** Recomendaciones de chocolates, flores y más.  
- **Integración con redes:** Compartir creaciones en Instagram, TikTok, Facebook y YouTube.  
- **Pasarelas de pago:** MercadoPago y PayU para compras seguras.  

---

## 🛠️ Tecnologías Utilizadas
### **Backend**
- **Django + DRF** (API REST segura y escalable)  
- **PostgreSQL** (Base de datos robusta)  
- **Firebase Auth** (Autenticación rápida y segura)  
- **AWS S3 / Firebase Storage** (Almacenamiento de imágenes)  
- **Integraciones IA:** OpenAI (textos), Stable Diffusion (imágenes), ElevenLabs (audio)  

### **Frontend**
- **React + Next.js** (SSR y rendimiento optimizado)  
- **TailwindCSS** (Diseño moderno y rápido)  
- **Redux Toolkit** (Manejo de estado eficiente)  
- **Three.js** (Previsualización de velas en 2D)  

### **Infraestructura y Deploy**
- **Render** (Backend y base de datos gratis)  
- **Vercel** (Frontend optimizado y rápido)  
- **Firebase** (Autenticación y almacenamiento)  
- **QR Code API** (Generación automática de códigos QR)  

---

## 📦 Instalación y Configuración
### **1️⃣ Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/aromaverse.git
cd aromaverse
```

### **2️⃣ Configurar el backend**
```bash
cd backend
python -m venv env
source env/bin/activate  # En Windows: env\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### **3️⃣ Configurar el frontend**
```bash
cd frontend
npm install
npm run dev
```

---

## ✅ Estado del Proyecto
📌 **En desarrollo** - MVP planeado para mayo 2025. 🚀  

---
