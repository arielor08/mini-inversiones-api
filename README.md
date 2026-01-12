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

## (Opcional) Postman
Incluye una colección básica `postman_collection.json` con los endpoints.
