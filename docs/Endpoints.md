# Endpoints de la API - AromaVerse

Este documento describe los principales endpoints de la API de AromaVerse, detallando su función y estructura.

El servidor está configurado en `server.ts` con las siguientes rutas principales:

```typescript
app.use('/users', userRoutes);
app.use('/products', productRoutes);
```

Esto significa que todas las rutas de usuarios comienzan con `/users` y las de productos con `/products`.

---

### **Tabla de Endpoints**

| **Nombre del Endpoint**         | **Método HTTP** | **URL**                                                                 | **Descripción**                                                                                     | **Parámetros Importantes**                                                                 |
|----------------------------------|-----------------|-------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------|
| **Crear usuario**               | `POST`          | `https://aromaverse-yf4d.onrender.com/users/`                           | Crea un nuevo usuario en el sistema.                                                               | **Body**: `{ "name": "string", "email": "string", "password": "string", "phone": "string", "address": "string" }` |
| **Encontrar todos los usuarios**| `GET`           | `https://aromaverse-yf4d.onrender.com/users/`                           | Obtiene una lista de todos los usuarios registrados.                                                | Ninguno                                                                                    |
| **Borrar un usuario**           | `DELETE`        | `https://aromaverse-yf4d.onrender.com/users/:id`                        | Elimina un usuario específico por su ID.                                                           | **Path**: `id` (ID del usuario a eliminar)                                                |
| **Actualizar un usuario**       | `PUT`           | `https://aromaverse-yf4d.onrender.com/users/:id`                        | Actualiza los datos de un usuario específico por su ID.                                             | **Path**: `id` (ID del usuario a actualizar), **Body**: `{ "role": "string" }`            |
| **Iniciar sesión (Login)**      | `POST`          | `https://aromaverse-yf4d.onrender.com/users/login`                      | Permite a un usuario iniciar sesión y obtener un token de autenticación.                           | **Body**: `{ "email": "string", "password": "string" }`                                   |
| **Crear contenedor**            | `POST`          | `https://aromaverse-yf4d.onrender.com/products/container`               | Crea un nuevo contenedor para velas.                                                               | **Body**: `{ "name": "string", "material": "string", "description": "string" }`           |
| **Obtener todos los contenedores** | `GET`         | `https://aromaverse-yf4d.onrender.com/products/container`               | Obtiene una lista de todos los contenedores registrados.                                            | Ninguno                                                                                    |
| **Eliminar un contenedor**      | `DELETE`        | `https://aromaverse-yf4d.onrender.com/container/:id`                    | Elimina un contenedor específico por su ID.                                                        | **Path**: `id` (ID del contenedor a eliminar)                                             |
| **Actualizar un contenedor**    | `PUT`           | `https://aromaverse-yf4d.onrender.com/products/container/:id`           | Actualiza los datos de un contenedor específico por su ID.                                          | **Path**: `id` (ID del contenedor a actualizar), **Body**: `{ "name": "string" }`         |
| **Crear fragancia**             | `POST`          | `https://aromaverse-yf4d.onrender.com/products/fragrance`               | Crea una nueva fragancia.                                                                          | **Body**: `{ "name": "string", "description": "string", "associatedColor": "string" }`    |
| **Obtener todas las fragancias**| `GET`           | `https://aromaverse-yf4d.onrender.com/products/fragrance`               | Obtiene una lista de todas las fragancias registradas.                                              | Ninguno                                                                                    |
| **Eliminar una fragancia**      | `DELETE`        | `https://aromaverse-yf4d.onrender.com/products/fragrance/:id`           | Elimina una fragancia específica por su ID.                                                        | **Path**: `id` (ID de la fragancia a eliminar)                                            |
| **Actualizar una fragancia**    | `PUT`           | `https://aromaverse-yf4d.onrender.com/products/fragrance/:id`           | Actualiza los datos de una fragancia específica por su ID.                                          | **Path**: `id` (ID de la fragancia a actualizar), **Body**: `{ "description": "string" }` |
| **Crear estado de ánimo (Mood)**| `POST`          | `https://aromaverse-yf4d.onrender.com/products/mood`                    | Crea un nuevo estado de ánimo.                                                                     | **Body**: `{ "name": "string", "description": "string" }`                                 |
| **Obtener todos los estados de ánimo** | `GET`     | `https://aromaverse-yf4d.onrender.com/products/mood`                    | Obtiene una lista de todos los estados de ánimo registrados.                                        | Ninguno                                                                                    |
| **Eliminar un estado de ánimo** | `DELETE`        | `https://aromaverse-yf4d.onrender.com/products/mood/:id`                | Elimina un estado de ánimo específico por su ID.                                                   | **Path**: `id` (ID del estado de ánimo a eliminar)                                        |
| **Actualizar un estado de ánimo** | `PUT`         | `https://aromaverse-yf4d.onrender.com/products/mood/:id`                | Actualiza los datos de un estado de ánimo específico por su ID.                                     | **Path**: `id` (ID del estado de ánimo a actualizar), **Body**: `{ "name": "string" }`    |
| **Vincular estado de ánimo y fragancia** | `POST`  | `https://aromaverse-yf4d.onrender.com/products/mood_fragrance`          | Crea una relación entre un estado de ánimo y una fragancia.                                         | **Body**: `{ "moodId": "number", "fragranceId": "number" }`                               |
| **Desvincular estado de ánimo y fragancia** | `DELETE` | `https://aromaverse-yf4d.onrender.com/products/unlink`                 | Elimina la relación entre un estado de ánimo y una fragancia.                                       | **Body**: `{ "moodId": "number", "fragranceId": "number" }`                               |
| **Obtener fragancias de un estado de ánimo** | `GET`  | `https://aromaverse-yf4d.onrender.com/products/mood_fragrance/m/:id`    | Obtiene todas las fragancias asociadas a un estado de ánimo específico.                             | **Path**: `id` (ID del estado de ánimo)                                                   |
| **Obtener estados de ánimo de una fragancia** | `GET` | `https://aromaverse-yf4d.onrender.com/products/mood_fragrance/f/:id`    | Obtiene todos los estados de ánimo asociados a una fragancia específica.                            | **Path**: `id` (ID de la fragancia)                                                       |

---

### **Notas Adicionales**
1. **Autenticación**:
   - Algunos endpoints requieren un token de autenticación en el encabezado `Authorization` con formato `Bearer <token>`.

2. **Códigos de Respuesta**:
   - `200`: Operación exitosa.
   - `201`: Recurso creado exitosamente.
   - `400`: Error en los datos enviados por el cliente.
   - `404`: Recurso no encontrado.
   - `500`: Error interno del servidor.

3. **Pruebas**:
   - Los scripts de prueba en Postman verifican los códigos de estado, la estructura de las respuestas y los tiempos de respuesta.