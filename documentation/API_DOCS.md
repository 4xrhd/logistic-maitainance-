# API Documentation

The Logistics Maintenance Management System exposes a comprehensive RESTful API on port 3001 (default). All requests except authentication endpoints require an `Authorization: Bearer <token>` header with a valid JWT token.

## Base URL
- **Development**: `http://localhost:3001/api`
- **Production**: `https://your-backend.onrender.com/api` (configured via `VITE_API_URL`)

## Authentication & Authorization

### Authentication Headers
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

### `POST /api/auth/register`
Creates a new user account with role assignment. Maximum 5 technician accounts allowed.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123",
  "role": "TECHNICIAN"
}
```

**Validation Rules:**
- Email must be unique and valid format
- Password minimum 6 characters
- Role must be "ADMIN" or "TECHNICIAN"
- Maximum 5 technician accounts enforced

**Response (201 Created):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "TECHNICIAN",
    "createdAt": "2026-04-23T10:30:00.000Z"
  }
}
```

**Error Responses:**
- `400 Bad Request`: Invalid input, duplicate email, or technician limit reached
- `500 Internal Server Error`: Server error during registration

### `POST /api/auth/login`
Authenticates a user and returns a JWT token valid for 24 hours.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "TECHNICIAN"
  }
}
```

**Error Responses:**
- `401 Unauthorized`: Invalid credentials
- `404 Not Found`: User not found
- `500 Internal Server Error`: Server error

### `GET /api/auth/me`
Returns the current authenticated user's profile. Protected route.

**Response (200 OK):**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "role": "TECHNICIAN",
  "createdAt": "2026-04-23T10:30:00.000Z",
  "updatedAt": "2026-04-23T10:30:00.000Z"
}
```

**Error Responses:**
- `401 Unauthorized`: No valid token provided
- `500 Internal Server Error`: Server error

---

## Maintenance Requests

### `GET /api/maintenance`
Returns all maintenance requests with equipment and user relationships. Supports query parameters for filtering.

**Query Parameters:**
- `status`: Filter by status (Pending, In Progress, Completed, Cancelled)
- `search`: Search in equipment name or description
- `assignedTo`: Filter by assigned technician ID
- `equipmentId`: Filter by specific equipment

**Response (200 OK):**
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "equipmentId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "type": "Preventive",
    "priority": "High",
    "status": "In Progress",
    "assignedToId": 2,
    "createdById": 1,
    "createdDate": "2026-04-20T09:00:00.000Z",
    "dueDate": "2026-04-25T17:00:00.000Z",
    "description": "Routine maintenance check",
    "createdAt": "2026-04-20T09:00:00.000Z",
    "updatedAt": "2026-04-21T14:30:00.000Z",
    "equipment": {
      "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "name": "Forklift #12",
      "type": "Forklift",
      "location": "Warehouse A",
      "status": "Under Maintenance"
    },
    "assignedTo": {
      "id": 2,
      "name": "Jane Smith",
      "email": "jane@example.com",
      "role": "TECHNICIAN"
    },
    "createdBy": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "TECHNICIAN"
    }
  }
]
```

### `POST /api/maintenance`
Creates a new maintenance request. Technician role required.

**Request Body:**
```json
{
  "equipmentId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "type": "Corrective",
  "priority": "Critical",
  "description": "Hydraulic system failure",
  "dueDate": "2026-04-24T18:00:00.000Z"
}
```

**Validation Rules:**
- Equipment must exist
- Due date must be in the future
- Type must be one of: "Preventive", "Corrective", "Predictive"
- Priority must be one of: "Low", "Medium", "High", "Critical"

**Response (201 Created):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "equipmentId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "type": "Corrective",
  "priority": "Critical",
  "status": "Pending",
  "assignedToId": null,
  "createdById": 1,
  "createdDate": "2026-04-23T14:30:00.000Z",
  "dueDate": "2026-04-24T18:00:00.000Z",
  "description": "Hydraulic system failure",
  "createdAt": "2026-04-23T14:30:00.000Z",
  "updatedAt": "2026-04-23T14:30:00.000Z"
}
```

**Error Responses:**
- `400 Bad Request`: Invalid input or validation failed
- `401 Unauthorized`: Not authenticated
- `403 Forbidden`: User role not authorized (requires Technician or Admin)
- `404 Not Found`: Equipment not found
- `500 Internal Server Error`: Server error

### `PUT /api/maintenance/:id`
Updates a maintenance request. Permission rules apply:
- Technicians can only update their assigned tasks or cancel their own requests
- Admins can update any maintenance request

**Request Body (partial update supported):**
```json
{
  "status": "Completed",
  "assignedToId": 2,
  "priority": "Medium"
}
```

**Response (200 OK):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "equipmentId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "type": "Corrective",
  "priority": "Medium",
  "status": "Completed",
  "assignedToId": 2,
  "createdById": 1,
  "createdDate": "2026-04-20T09:00:00.000Z",
  "dueDate": "2026-04-25T17:00:00.000Z",
  "description": "Hydraulic system failure - repaired",
  "createdAt": "2026-04-20T09:00:00.000Z",
  "updatedAt": "2026-04-23T15:45:00.000Z"
}
```

**Error Responses:**
- `400 Bad Request`: Invalid input
- `401 Unauthorized`: Not authenticated
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Maintenance request not found
- `500 Internal Server Error`: Server error

### `DELETE /api/maintenance/:id`
Deletes a maintenance request. Admin role required.

**Response (200 OK):**
```json
{
  "message": "Maintenance request deleted successfully"
}
```

**Error Responses:**
- `401 Unauthorized`: Not authenticated
- `403 Forbidden`: Not an Admin
- `404 Not Found`: Maintenance request not found
- `500 Internal Server Error`: Server error

### `GET /api/maintenance/technicians`
Returns list of available technicians for assignment. Admin role required.

**Response (200 OK):**
```json
[
  {
    "id": 2,
    "name": "Jane Smith",
    "email": "jane@example.com",
    "role": "TECHNICIAN",
    "createdAt": "2026-04-22T08:15:00.000Z"
  },
  {
    "id": 3,
    "name": "Bob Johnson",
    "email": "bob@example.com",
    "role": "TECHNICIAN",
    "createdAt": "2026-04-22T09:30:00.000Z"
  }
]
```

---

## Equipment Management

### `GET /api/equipment`
Returns all equipment records with status information.

**Response (200 OK):**
```json
[
  {
    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "name": "Forklift #12",
    "type": "Forklift",
    "location": "Warehouse A",
    "status": "Operational",
    "lastMaintenance": "2026-04-10T14:00:00.000Z",
    "nextMaintenance": "2026-05-10T14:00:00.000Z",
    "createdAt": "2026-01-15T09:00:00.000Z",
    "updatedAt": "2026-04-23T10:00:00.000Z",
    "maintenanceLogs": [
      {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "type": "Preventive",
        "priority": "Medium",
        "status": "Completed",
        "createdDate": "2026-04-10T14:00:00.000Z"
      }
    ]
  }
]
```

### `POST /api/equipment`
Creates new equipment record. Admin role required.

**Request Body:**
```json
{
  "name": "Delivery Van #5",
  "type": "Van",
  "location": "Loading Bay 3",
  "status": "Operational",
  "lastMaintenance": "2026-04-15T10:00:00.000Z",
  "nextMaintenance": "2026-05-15T10:00:00.000Z"
}
```

**Response (201 Created):**
```json
{
  "id": "b2c3d4e5-f6g7-8901-bcde-f23456789012",
  "name": "Delivery Van #5",
  "type": "Van",
  "location": "Loading Bay 3",
  "status": "Operational",
  "lastMaintenance": "2026-04-15T10:00:00.000Z",
  "nextMaintenance": "2026-05-15T10:00:00.000Z",
  "createdAt": "2026-04-23T16:20:00.000Z",
  "updatedAt": "2026-04-23T16:20:00.000Z"
}
```

### `PUT /api/equipment/:id`
Updates equipment record. Admin role required.

### `DELETE /api/equipment/:id`
Deletes equipment record with cascade deletion of related maintenance requests. Admin role required.

---

## Inventory Management

### `GET /api/inventory`
Returns all inventory items with stock level information.

**Response (200 OK):**
```json
[
  {
    "id": "c3d4e5f6-g7h8-9012-cdef-345678901234",
    "name": "Engine Oil 5W-30",
    "category": "Lubricants",
    "quantity": 42,
    "unit": "liters",
    "minStock": 20,
    "location": "Shelf B4",
    "supplier": "OilCo Inc.",
    "lastRestocked": "2026-04-18T11:30:00.000Z",
    "createdAt": "2026-01-10T08:00:00.000Z",
    "updatedAt": "2026-04-23T09:15:00.000Z"
  }
]
```

### `POST /api/inventory`
Creates new inventory item. Admin role required.

**Request Body:**
```json
{
  "name": "Air Filter",
  "category": "Filters",
  "quantity": 15,
  "unit": "pieces",
  "minStock": 10,
  "location": "Shelf C2",
  "supplier": "FilterTech Ltd."
}
```

### `PUT /api/inventory/:id`
Updates inventory quantity or details. Admin role required for most fields, technicians can update quantity during use.

### `DELETE /api/inventory/:id`
Deletes inventory item. Admin role required.

---

## Requisition Management

### `GET /api/requisitions`
Returns all requisitions with requester information.

**Response (200 OK):**
```json
[
  {
    "id": "d4e5f6g7-h8i9-0123-defg-456789012345",
    "item": "Brake Pads",
    "category": "Brakes",
    "quantity": 8,
    "unit": "pairs",
    "status": "Pending",
    "requestedById": 1,
    "requestDate": "2026-04-22T14:45:00.000Z",
    "estimatedCost": "$240.00",
    "createdAt": "2026-04-22T14:45:00.000Z",
    "updatedAt": "2026-04-22T14:45:00.000Z",
    "requestedBy": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "TECHNICIAN"
    }
  }
]
```

### `POST /api/requisitions`
Creates new supply requisition.

**Request Body:**
```json
{
  "item": "Tires 225/65R17",
  "category": "Tires",
  "quantity": 4,
  "unit": "pieces",
  "estimatedCost": "$600.00"
}
```

### `PUT /api/requisitions/:id`
Updates requisition status (Admin only for approval/rejection).

**Request Body:**
```json
{
  "status": "Approved"
}
```

### `DELETE /api/requisitions/:id`
Deletes requisition. Admin role required.

---

## Dashboard Statistics

### `GET /api/dashboard/stats`
Returns aggregated statistics for dashboard visualization.

**Response (200 OK):**
```json
{
  "equipment": 25,
  "operational": 18,
  "inMaintenance": 5,
  "outOfService": 2,
  "maintenance": 12,
  "activeMaintenance": 7,
  "lowStock": 3,
  "requisitions": 5
}
```

---

## User Management

### `GET /api/users`
Returns all system users. Admin role required.

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "name": "Admin User",
    "email": "admin@logistic.com",
    "role": "ADMIN",
    "createdAt": "2026-04-20T08:00:00.000Z",
    "updatedAt": "2026-04-20T08:00:00.000Z"
  },
  {
    "id": 2,
    "name": "Technician One",
    "email": "tech@logistic.com",
    "role": "TECHNICIAN",
    "createdAt": "2026-04-21T09:15:00.000Z",
    "updatedAt": "2026-04-21T09:15:00.000Z"
  }
]
```

### `PUT /api/users/:id/role`
Updates user role. Admin role required, prevents self-role change to non-admin.

**Request Body:**
```json
{
  "role": "ADMIN"
}
```

### `DELETE /api/users/:id`
Deletes user account. Admin role required, prevents self-deletion.

**Response (200 OK):**
```json
{
  "message": "User deleted successfully"
}
```

---

## Error Responses

All API endpoints follow consistent error response format:

**400 Bad Request (Validation Error):**
```json
{
  "message": "Validation failed",
  "errors": [
    "Email must be valid",
    "Password must be at least 6 characters"
  ]
}
```

**401 Unauthorized:**
```json
{
  "message": "Access denied. No token provided."
}
```

**403 Forbidden:**
```json
{
  "message": "Access denied. Insufficient permissions."
}
```

**404 Not Found:**
```json
{
  "message": "Resource not found"
}
```

**500 Internal Server Error:**
```json
{
  "message": "An error occurred while processing your request"
}
```

---

## Rate Limiting & Security

- **Authentication**: JWT tokens expire after 24 hours
- **Password Security**: bcryptjs with salt rounds for password hashing
- **Input Validation**: Zod schema validation for all request bodies
- **SQL Injection Protection**: Prisma ORM with parameterized queries
- **CORS**: Configured for frontend domain only
- **Headers**: Security headers implemented (X-Content-Type-Options, X-Frame-Options)
