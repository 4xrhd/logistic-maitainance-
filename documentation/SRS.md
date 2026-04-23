# Software Requirements Specification (SRS)
## for Logistics Maintenance Management System

**Version:** 2.0  
**Date:** April 23, 2026  
**Project Name:** Logistics Maintenance Management System  
**Status:** Complete Implementation

---

## 1. Introduction
### 1.1 Purpose
This document provides a comprehensive description of the Logistics Maintenance Management System, a full-stack web application designed for logistics warehouse operations. It details the system's functionality, constraints, interfaces, and implementation specifications.

### 1.2 Document Conventions
- Standard IEEE 830 SRS template is followed throughout this document.
- Requirement IDs follow the format REQ-XXX with sequential numbering.
- User roles are consistently capitalized (ADMIN, TECHNICIAN).
- Technical terms are defined in the glossary (Appendix A).

### 1.3 Intended Audience and Reading Suggestions
**Primary Audience:** Software Engineering course instructors, project evaluators, and academic reviewers.  
**Secondary Audience:** Development team members, system administrators, and end-users.  
**Reading Suggestions:** Begin with Section 2 (Overall Description) for system overview, then proceed to Section 3 (Specific Requirements) for detailed functionality.

### 1.4 Product Scope
The Logistics Maintenance Management System is a production-ready web application that manages equipment maintenance, inventory tracking, and supply requisitions for logistics warehouse environments. It replaces manual spreadsheet-based tracking with an automated, secure, and scalable solution featuring real-time dashboards, equipment health monitoring, and automated requisition workflows.

---

## 2. Overall Description
### 2.1 Product Perspective
This system is a standalone 3-tier web application designed for single or multi-warehouse logistics management. It implements a modern technology stack (React + Express + SQLite) with comprehensive security measures and role-based access control.

### 2.2 Product Functions
- **User Authentication & Authorization**: Secure JWT-based login/registration with role-based permissions (Admin/Technician).
- **Dashboard Analytics**: Real-time visualization of maintenance status, equipment health, and operational KPIs using Recharts.
- **Maintenance Management**: Complete CRUD operations for maintenance requests with technician assignment and priority tracking.
- **Equipment Tracking**: Comprehensive registry of logistics assets with health status monitoring and maintenance scheduling.
- **Inventory Management**: Stock level tracking with automated low-stock alerts, supplier information, and restock tracking.
- **Requisition Workflow**: End-to-end supply request submission, admin approval/rejection, and cost estimation.
- **User Management**: Admin-controlled user lifecycle management with role assignment and deletion prevention safeguards.

### 2.3 User Characteristics
- **ADMIN**: Full system access including user management, inventory deletion, requisition approval, and all CRUD operations.
- **TECHNICIAN**: Limited access to view equipment/inventory, create maintenance requests, submit requisitions, and update assigned tasks.

### 2.4 Constraints
- **Hardware Constraints**: Responsive design optimized for desktop browsers (Chrome, Firefox, Edge).
- **Database Constraints**: SQLite for portability and demonstration; PostgreSQL recommended for production.
- **Performance Constraints**: Support for 1000+ equipment records and 5000+ maintenance logs with sub-500ms dashboard response.
- **Security Constraints**: All API routes (except authentication) require JWT authorization.

### 2.5 Assumptions and Dependencies
- Users have basic familiarity with logistics terminology and web applications.
- System is accessed via modern web browsers with JavaScript enabled.
- Node.js 18+ runtime is available for both development and production.
- Internet connectivity is required for deployment but not for local operation.

---

## 3. Specific Requirements

### 3.1 External Interface Requirements
- **3.1.1 User Interfaces**: Modern React dashboard with Tailwind CSS, Radix UI components, and responsive design.
- **3.1.2 Software Interfaces**: Prisma ORM for database abstraction, Express REST API for frontend-backend communication.
- **3.1.3 Hardware Interfaces**: Standard web server hardware capable of running Node.js applications.
- **3.1.4 Communication Interfaces**: HTTP/HTTPS for web communication, CORS for cross-origin requests.

### 3.2 Functional Requirements

#### 3.2.1 Authentication & Authorization
- **REQ-001**: System shall allow user registration with name, email, password, and role assignment.
- **REQ-002**: System shall implement JWT-based authentication with 24-hour token expiration.
- **REQ-003**: System shall encrypt passwords using bcryptjs with salt rounds.
- **REQ-004**: System shall enforce role-based access control (Admin/Technician) on all protected routes.
- **REQ-005**: System shall prevent self-deletion of user accounts.
- **REQ-006**: System shall limit technician registrations to maximum 5 accounts.

#### 3.2.2 Dashboard & Analytics
- **REQ-007**: System shall display real-time KPI cards for active maintenance, pending requisitions, total assets, and low stock items.
- **REQ-008**: System shall provide interactive visualizations (pie charts, bar graphs) for equipment status and maintenance trends.
- **REQ-009**: System shall aggregate statistics from database for dashboard display with sub-500ms response time.
- **REQ-010**: System shall provide equipment health matrix with percentage breakdowns by status.

#### 3.2.3 Maintenance Management
- **REQ-011**: Users shall create maintenance requests with equipment selection, type, priority, description, and due date.
- **REQ-012**: Technicians shall update status of their assigned maintenance tasks.
- **REQ-013**: Admins shall assign maintenance tasks to available technicians.
- **REQ-014**: System shall enforce permission rules: Technicians can only update their assigned tasks or cancel own requests.
- **REQ-015**: Admins shall have full CRUD access to all maintenance records.

#### 3.2.4 Equipment Tracking
- **REQ-016**: System shall maintain complete equipment registry with name, type, location, status, and maintenance history.
- **REQ-017**: Admins shall create, update, and delete equipment records.
- **REQ-018**: Technicians shall have read-only access to equipment listings.
- **REQ-019**: Equipment deletion shall cascade to related maintenance records.
- **REQ-020**: System shall track last maintenance date and calculate next scheduled maintenance.

#### 3.2.5 Inventory Management
- **REQ-021**: System shall track inventory items with name, category, quantity, unit, minimum stock level, location, and supplier.
- **REQ-022**: System shall flag items below minimum stock level with visual indicators.
- **REQ-023**: Admins shall manage inventory CRUD operations.
- **REQ-024**: Technicians shall view inventory levels but not modify them.
- **REQ-025**: System shall track last restocked date for inventory items.

#### 3.2.6 Requisition Workflow
- **REQ-026**: Users shall submit supply requisitions with item details, quantity, unit, and estimated cost.
- **REQ-027**: Admins shall approve or reject pending requisitions.
- **REQ-028**: System shall maintain requisition status (Pending, Approved, Rejected).
- **REQ-029**: Admins shall have delete permissions for requisitions.
- **REQ-030**: Requisitions shall be linked to requesting user for accountability.

#### 3.2.7 User Management
- **REQ-031**: Admins shall view list of all system users.
- **REQ-032**: Admins shall update user roles (between Admin and Technician).
- **REQ-033**: Admins shall delete user accounts with self-deletion prevention.
- **REQ-034**: System shall enforce unique email constraints during registration.

### 3.3 Performance Requirements
- **3.3.1 Response Time**: Dashboard statistics shall load in <500ms under normal load (1000 records).
- **3.3.2 Capacity**: Support up to 1000 equipment records, 5000 maintenance logs, and 2000 inventory items.
- **3.3.3 Availability**: System shall maintain 99% uptime during business hours (8 AM - 6 PM).
- **3.3.4 Scalability**: Architecture shall support horizontal scaling for increased user load.

### 3.4 Software System Attributes
- **Security**: All API routes (except `/api/auth/*`) protected by JWT verification middleware.
- **Reliability**: SQLite database with Prisma ORM ensuring data integrity and transaction support.
- **Maintainability**: Modular React components, structured Express backend, comprehensive documentation.
- **Portability**: Cross-platform compatibility (Windows, macOS, Linux) via Node.js runtime.
- **Testability**: Manual test scenarios defined for all user flows and edge cases.

### 3.5 Database Requirements
- **3.5.1 Data Models**: 5 primary models (User, Equipment, MaintenanceRequest, Requisition, InventoryItem).
- **3.5.2 Relationships**: Proper foreign key constraints with cascade deletion where appropriate.
- **3.5.3 Constraints**: Unique constraints on email fields, validation on required fields.
- **3.5.4 Indexing**: Appropriate indexing for frequently queried fields (status, equipmentId, etc.).

### 3.6 Deployment Requirements
- **3.6.1 Development**: Local development with `npm run dev` for both frontend and backend.
- **3.6.2 Production**: Split deployment architecture (Netlify frontend + Render backend).
- **3.6.3 Database**: SQLite for demonstration, PostgreSQL recommended for production persistence.
- **3.6.4 Environment Variables**: Secure configuration via environment variables (JWT_SECRET, DATABASE_URL).

---

## Appendices
### Appendix A: Glossary
- **JWT**: JSON Web Token - A compact, URL-safe means of representing claims to be transferred between two parties.
- **CRUD**: Create, Read, Update, Delete - Basic operations of persistent storage.
- **ORM**: Object-Relational Mapping - Technique for converting data between incompatible type systems.
- **API**: Application Programming Interface - Set of rules for software communication.
- **KPI**: Key Performance Indicator - Measurable value demonstrating effectiveness.

### Appendix B: Analysis Models
- **Entity Relationship Diagram**: See `documentation/ERD.md`
- **Use Case Analysis**: See `documentation/USE_CASES.md`
- **System Architecture**: See `documentation/ARCHITECTURE.md`
- **API Documentation**: See `documentation/API_DOCS.md`

### Appendix C: Implementation Verification
- **Seed Data**: 3 users (1 Admin, 2 Technicians), 5 equipment items, 5 inventory items, 4 maintenance requests, 2 requisitions.
- **Test Credentials**: Admin (admin@logistic.com/admin123), Technician (tech@logistic.com/tech123).
- **Manual Test Scenarios**: Authentication flow, CRUD operations, role-based access control, database validation.
- **Performance Metrics**: Dashboard load time <500ms, API response time <100ms for basic queries.
