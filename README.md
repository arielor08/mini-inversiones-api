# Mini Inversiones API

Pequeña API RESTful en Node.js + Express para registrar y consultar inversiones con roles (admin, analyst).

## Requisitos
- Node.js 16+

## Instalación

1. Instalar dependencias:

```bash
npm install
```

2. Iniciar el servidor:

```bash
npm start
# o durante desarrollo
npm run dev
```

El servidor corre por defecto en `http://localhost:3000`.

## Usuarios hardcoded
- admin / adminpass (rol: admin)
- analyst / analystpass (rol: analyst)

> Nota: para un entorno real no use contraseñas en texto plano.

## Endpoints

- POST /login
  - Body: `{ "username": "admin", "password": "adminpass" }`
  - Respuesta: `{ "token": "..." }`

- GET /inversiones (protegido)
  - Header: `Authorization: Bearer <token>`
  - Retorna lista de inversiones

- POST /inversiones (solo admin)
  - Header: `Authorization: Bearer <token>`
  - Body: `{ "cliente": "Nombre", "activo": "ACC-123", "monto": 1000, "tipo": "Renta Fija", "fecha": "2025-01-01", "rentabilidad": 0.05 }`

- DELETE /inversiones/:id (solo admin)
  - Header: `Authorization: Bearer <token>`

## Ejemplos con curl

Obtener token:

```bash
curl -s -X POST http://localhost:3000/login -H "Content-Type: application/json" -d '{"username":"admin","password":"adminpass"}' | jq
```

Listar inversiones:

```bash
curl -X GET http://localhost:3000/inversiones -H "Authorization: Bearer <token>"
```

Agregar inversión (admin):

```bash
curl -X POST http://localhost:3000/inversiones \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"cliente":"Cliente 2","activo":"ACC-NEW","monto":5000,"tipo":"Renta Variable","fecha":"2025-02-01","rentabilidad":0.12}'
```

Eliminar inversión (admin):

```bash
curl -X DELETE http://localhost:3000/inversiones/<id> -H "Authorization: Bearer <token>"
```

## Notas
- Los datos se almacenan en memoria (`src/data/store.js`). No hay base de datos.
- El JWT utiliza la variable de entorno `JWT_SECRET` (por defecto `secret123`).

### Variables de entorno
Puedes usar un archivo `.env` (o `.env.example` incluido) con:

```
PORT=3000
JWT_SECRET=secret123
NODE_ENV=development
```

### Errores de validación
Cuando falta algún campo o su formato es incorrecto, el servidor responde `400 Bad Request` con detalles en `details`.

Ejemplo (falta `monto` y `fecha` incorrecta):

```json
HTTP/1.1 400 Bad Request
{
  "error": "Validation error",
  "details": [
    "monto is required",
    "fecha must be a valid date (YYYY-MM-DD)"
  ]
}
```

En `POST /login` se devolverá un 400 similar si faltan `username` o `password`:

```json
HTTP/1.1 400 Bad Request
{
  "error": "Validation error",
  "details": ["username is required"]
}
```

### Scripts útiles
- `npm start` — iniciar servidor
- `npm run dev` — iniciar con nodemon
- `npm run lint` — ejecutar ESLint
- `npm run format` — formatear con Prettier
- `npm test` — ejecutar tests (Jest + Supertest)

## (Opcional) Postman
Incluye una colección básica `postman_collection.json` con los endpoints.

La colección incluye requests adicionales para probar roles y validaciones:

- **Login** (admin)
  - POST `/login` con `{ "username": "admin", "password": "adminpass" }`.
  - Test script: guarda el token en la variable de entorno `token` (para usar en requests protegidos).

- **Login Analyst**
  - POST `/login` con `{ "username": "analyst", "password": "analystpass" }`.
  - Test script: guarda el token en la variable `tokenAnalyst`.

- **List Inversiones (Admin)**
  - GET `/inversiones` con header `Authorization: Bearer {{token}}`.

- **List Inversiones (Analyst)**
  - GET `/inversiones` con header `Authorization: Bearer {{tokenAnalyst}}`.
  - Los analistas pueden listar inversiones (200 OK).

- **Create Inversion (Admin)**
  - POST `/inversiones` con header `Authorization: Bearer {{token}}` y body JSON válido.
  - Test script: guarda el `id` de la inversión creada en `lastId`.

- **Create Inversion (Analyst)**
  - POST `/inversiones` con header `Authorization: Bearer {{tokenAnalyst}}` y body JSON.
  - Test: espera `403 Forbidden` ya que el rol `analyst` no puede crear inversiones.

- **Delete Inversion (Admin)**
  - DELETE `/inversiones/{{lastId}}` con header `Authorization: Bearer {{token}}`.

- **Delete Inversion (Analyst)**
  - DELETE `/inversiones/{{lastId}}` con header `Authorization: Bearer {{tokenAnalyst}}`.
  - Test: espera `403 Forbidden` ya que `analyst` no puede eliminar inversiones.

Cómo usar la colección (sugerido):
1. Importa `postman_collection.json` en Postman.
2. Crea (o selecciona) un *Environment* y asegúrate de que las variables `token`, `tokenAnalyst` y `lastId` estén presentes (Postman las llenará automáticamente si corres los requests con test scripts habilitados).
3. Ejecuta `Login` → `Create Inversion (Admin)` → `List Inversiones (Admin)` → `Delete Inversion (Admin)` para probar el flujo admin.
4. Para pruebas de permisos ejecuta `Login Analyst` → `Create Inversion (Analyst)` y `Delete Inversion (Analyst)` (ambos deben devolver 403).

Pruebas de validación:
- Envía un POST a `/inversiones` sin `monto` o con `fecha` inválida; el servidor devolverá `400` con un body tipo:

```json
{
  "error": "Validation error",
  "details": ["monto is required", "fecha must be a valid date (YYYY-MM-DD)"]
}
```
