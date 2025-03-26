# Endpoints de la API - AromaVerse

Este documento describe los principales endpoints de la API de AromaVerse, detallando su función y estructura.

El servidor está configurado en `server.ts` con las siguientes rutas principales:

```typescript
app.use('/users', userRoutes);
app.use('/products', productRoutes);
```

Esto significa que todas las rutas de usuarios comienzan con `/users` y las de productos con `/products`.

---

## 🛠️ Tabla de Endpoints

| Método | Endpoint | Descripción |
|--------|---------|-------------|
| **POST** | `/users/` | Crea un nuevo usuario en la plataforma. |
| **GET** | `/users/` | Obtiene la lista de todos los usuarios registrados. |
| **DELETE** | `/users/{id}` | Elimina un usuario específico. |
| **PUT** | `/users/{id}` | Modifica los datos de un usuario existente. |
| **POST** | `/users/login` | Inicia sesión y devuelve un token JWT. |
| **POST** | `/products/container` | Crea un nuevo envase para velas. |
| **GET** | `/products/container` | Obtiene la lista de todos los envases. |
| **DELETE** | `/products/container/{id}` | Elimina un envase específico. |
| **POST** | `/products/fragrance` | Crea una nueva fragancia para velas. |
| **GET** | `/products/fragrance` | Obtiene la lista de todas las fragancias. |
| **POST** | `/products/mood` | Crea un nuevo estado de ánimo asociado a fragancias. |
| **GET** | `/products/mood` | Obtiene la lista de estados de ánimo. |
| **POST** | `/products/mood_fragrance` | Asocia un estado de ánimo con una fragancia. |
| **DELETE** | `/products/mood_fragrance` | Desvincula una fragancia de un estado de ánimo. |

## 📌 Notas
- Todos los endpoints protegidos requieren un **token JWT** en el header `Authorization: Bearer <TOKEN>`.
- Los códigos de estado estándar son:
  - `200 OK`: Respuesta exitosa.
  - `201 Created`: Recurso creado correctamente.
  - `400 Bad Request`: Error en los datos enviados.
  - `401 Unauthorized`: Falta de autenticación.
  - `404 Not Found`: Recurso no encontrado.
  - `500 Internal Server Error`: Error en el servidor.

