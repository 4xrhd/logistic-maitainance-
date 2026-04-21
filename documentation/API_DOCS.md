# API Documentation

The system exposes a RESTful API on port 3001. All requests (except authentication) require a `Authorization: Bearer <token>` header.

## Authentication

### `POST /api/auth/register`
Creates a new user account.
- **Body**: `{ "name": "...", "email": "...", "password": "...", "role": "ADMIN|TECHNICIAN" }`

### `POST /api/auth/login`
Authenticates a user and returns a token.
- **Body**: `{ "email": "...", "password": "..." }`
- **Response**: `{ "token": "...", "user": { ... } }`

---

## Maintenance Requests

### `GET /api/maintenance`
Returns all maintenance requests. Supports `status` and `search` query params.

### `POST /api/maintenance`
Creates a new request.
- **Body**: `{ "equipmentId": "...", "type": "...", "priority": "...", "description": "...", "dueDate": "..." }`

### `PUT /api/maintenance/:id`
Updates status or priority of a request.

---

## Equipment

### `GET /api/equipment`
Returns the full hardware registry.

### `POST /api/equipment`
Registers new equipment.

---

## Inventory

### `GET /api/inventory`
Returns all stock items.

---

## Requisitions

### `GET /api/requisitions`
Returns all supply requests.

### `POST /api/requisitions`
Submits a new requisition.

### `PUT /api/requisitions/:id/approve`
Approves a requisition (Admin only).
