# Transform Logistics Maintenance App into a Complete University SWE Course Project

## Current State Analysis

The app is a **frontend-only Figma export** — a React + Vite + TailwindCSS dashboard with 5 pages (Dashboard, Maintenance, Requisitions, Equipment, Inventory). All data is **hardcoded** in component state. There is:
- ❌ No database
- ❌ No backend / API
- ❌ No authentication or user roles
- ❌ No real CRUD (forms don't persist data)
- ❌ No documentation (SRS, ERD, etc.)

## What a University SWE Project Needs

A complete SWE course project typically requires these deliverables:

| Category | Deliverable | Status |
|----------|-------------|--------|
| Documentation | SRS (Software Requirements Specification) | 🆕 |
| Documentation | ERD (Entity Relationship Diagram) | 🆕 |
| Documentation | Use Case Diagrams | 🆕 |
| Documentation | System Architecture Diagram | 🆕 |
| Backend | REST API with CRUD operations | 🆕 |
| Database | Persistent data storage | 🆕 |
| Auth | Login / Register / Role-based access | 🆕 |
| Frontend | Integration with real backend API | 🔄 Modify existing |
| Testing | Basic test coverage | 🆕 |

## User Review Required

> [!IMPORTANT]
> **Database Choice**: I recommend **SQLite** via **Prisma ORM** with an Express.js backend. SQLite requires zero setup (no Docker, no install, just a file), is perfect for university demos, and Prisma gives you a visual schema + auto-migrations. The entire backend runs with just `npm run dev`.

> [!IMPORTANT]
> **Authentication Scope**: I'll implement simple JWT-based login with two roles: **Admin** (full CRUD) and **Technician** (view-only + can create requests). No OAuth complexity — just a login page with register.

---

## Proposed Changes

### 1. Backend — Express.js + Prisma + SQLite

#### [NEW] `server/package.json`
Node.js backend project with Express, Prisma, JWT, bcrypt.

#### [NEW] `server/prisma/schema.prisma`
Database schema matching the existing data model:

```
User          → id, name, email, password, role (ADMIN/TECHNICIAN)
Equipment     → id, name, type, location, status, assignedToId
MaintenanceRequest → id, equipmentId, type, priority, status, assignedToId, dates, description
Requisition   → id, item, category, quantity, unit, status, requestedById, cost
InventoryItem → id, name, category, quantity, unit, minStock, location, supplier
```

#### [NEW] `server/src/index.ts`
Express server entry point (port 3001).

#### [NEW] `server/src/routes/auth.ts`
- `POST /api/auth/register` — Create account
- `POST /api/auth/login` — Get JWT token
- `GET /api/auth/me` — Get current user

#### [NEW] `server/src/routes/maintenance.ts`
- `GET /api/maintenance` — List all (with search/filter)
- `POST /api/maintenance` — Create request
- `PUT /api/maintenance/:id` — Update status
- `DELETE /api/maintenance/:id` — Delete (admin only)

#### [NEW] `server/src/routes/equipment.ts`
- Full CRUD: `GET`, `POST`, `PUT`, `DELETE` on `/api/equipment`

#### [NEW] `server/src/routes/requisitions.ts`
- Full CRUD: `GET`, `POST`, `PUT`, `DELETE` on `/api/requisitions`

#### [NEW] `server/src/routes/inventory.ts`
- Full CRUD: `GET`, `POST`, `PUT`, `DELETE` on `/api/inventory`

#### [NEW] `server/src/routes/dashboard.ts`
- `GET /api/dashboard/stats` — Aggregated stats from DB

#### [NEW] `server/src/middleware/auth.ts`
JWT verification + role-checking middleware.

#### [NEW] `server/src/seed.ts`
Seed script to populate the database with sample data for demo.

---

### 2. Frontend — API Integration + Auth

#### [NEW] `src/app/lib/api.ts`
Centralized API client (fetch wrapper with JWT header injection).

#### [NEW] `src/app/context/AuthContext.tsx`
React context for auth state (login, logout, current user, token).

#### [NEW] `src/app/components/LoginPage.tsx`
Login page with register toggle.

#### [MODIFY] `src/app/routes.ts`
Add login route, protect other routes with auth check.

#### [MODIFY] `src/app/components/Root.tsx`
Add user info display + logout button in sidebar.

#### [MODIFY] `src/app/components/MaintenanceList.tsx`
Replace hardcoded `useState` data with `useEffect` → `fetch /api/maintenance`. Wire "Create Request" dialog to `POST /api/maintenance`.

#### [MODIFY] `src/app/components/EquipmentList.tsx`
Same pattern — fetch from API, wire create form.

#### [MODIFY] `src/app/components/InventoryList.tsx`
Same pattern — fetch from API, wire create form.

#### [MODIFY] `src/app/components/RequisitionList.tsx`
Same pattern — fetch from API, wire create form.

#### [MODIFY] `src/app/components/Dashboard.tsx`
Fetch aggregated stats from `/api/dashboard/stats` instead of hardcoded arrays.

---

### 3. Documentation (SWE Course Deliverables)

#### [NEW] `documentation/SRS.md`
Software Requirements Specification covering:
- Functional requirements (CRUD for each module)
- Non-functional requirements (performance, security)
- User roles and permissions matrix

#### [NEW] `documentation/ERD.md`
Entity Relationship Diagram in Mermaid format showing all tables + relationships.

#### [NEW] `documentation/USE_CASES.md`
Use case diagrams for Admin and Technician actors.

#### [NEW] `documentation/ARCHITECTURE.md`
System architecture diagram (3-tier: React → Express → SQLite).

#### [NEW] `documentation/API_DOCS.md`
REST API endpoint documentation with request/response examples.

#### [MODIFY] `README.md`
Updated with project overview, setup instructions, tech stack, and team info placeholder.

---

## Open Questions

> [!IMPORTANT]
> 1. **Team members**: Should I add a placeholder for team names/IDs in the README, or do you want to provide them?
> 2. **Course-specific documents**: Does your university require any specific document formats (e.g., IEEE SRS template, specific diagram tools)?
> 3. **Deployment**: Do you need Docker setup for submission, or is `npm run dev` sufficient?

## Verification Plan

### Automated Tests
1. Seed the database and verify all 5 API routes return correct data
2. Test auth flow (register → login → access protected route)
3. Run the frontend dev server and verify pages load with real data

### Manual Verification
- Open the app in browser, register a user, log in
- Create/edit/delete a maintenance request
- Verify dashboard stats reflect real DB counts
- Check role-based access (technician can't delete)


id pass:


Login Credentials:
Admin: admin@logistic.com / admin123
Technician: tech@logistic.com / tech123