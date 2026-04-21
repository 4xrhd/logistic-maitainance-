# Software Requirements Specification (SRS)
## for Logistics Maintenance System

**Version:** 1.0  
**Date:** 2026-04-21  
**Project Name:** Logistics Maintenance App

---

## 1. Introduction
### 1.1 Purpose
The purpose of this document is to provide a detailed description of the Logistics Maintenance System. It will illustrate the purpose and complete declaration of the system. It will also explain system constraints, interface and advantages.

### 1.2 Document Conventions
- Standard IEEE 830 SRS template is followed.
- Requirement IDs follow the format REQ-XXX.
- User roles are capitalized (e.g., ADMIN, TECHNICIAN).

### 1.3 Intended Audience and Reading Suggestions
The intended audience of this SRS document is project managers, software developers, and course instructors for software engineering evaluation.

### 1.4 Product Scope
The Logistics Maintenance System is designed to manage equipment maintenance, inventory tracking, and supply requisitions for a logistics warehouse environment. It provides real-time dashboards, equipment health monitoring, and requisition workflows to minimize downtime and optimize resource allocation.

---

## 2. Overall Description
### 2.1 Product Perspective
This system is a standalone web application designed for a single-warehouse or multi-warehouse logistics manager. It replaces manual spreadsheet-based tracking with a unified relational database.

### 2.2 Product Functions
- **User Authentication**: Secure login and registration.
- **Dashboard Analytics**: Real-time visualization of maintenance status and equipment health.
- **Maintenance Management**: Creating, updating, and tracking maintenance requests.
- **Equipment Tracking**: Maintaining a registry of all logistics assets and their health status.
- **Inventory Management**: Monitoring stock levels of parts and supplies with low-stock alerts.
- **Requisition Workflow**: Submitting and tracking requests for new supplies or equipment.

### 2.3 User Characteristics
- **ADMIN**: Full access to all modules, including user management, inventory deletion, and requisition approval.
- **TECHNICIAN**: Access to view equipment and inventory, and create maintenance or requisition requests.

### 2.4 Constraints
- **Hardware Constraints**: Responsive design for desktop use.
- **Database Constraints**: Uses SQLite for portability and ease of demonstration.

### 2.5 Assumptions and Dependencies
- Users are familiar with logistics terminology.
- The system is accessed via a modern web browser (Chrome, Firefox, Edge).

---

## 3. Specific Requirements

### 3.1 External Interface Requirements
- **3.1.1 User Interfaces**: A clean, modern dashboard built with React and Tailwind CSS.
- **3.1.2 Software Interfaces**: Prisma ORM for database interaction, REST API for frontend-backend communication.

### 3.2 Functional Requirements

#### 3.2.1 Authentication
- **REQ-001**: System shall allow users to register with name, email, and password.
- **REQ-002**: System shall support JWT-based login with encrypted passwords.

#### 3.2.2 Dashboard
- **REQ-003**: System shall display total counts for active maintenance, pending requisitions, and overdue tasks.
- **REQ-004**: System shall provide visualizations for maintenance by type and weekly activity trends.

#### 3.2.3 Maintenance
- **REQ-005**: Users shall be able to create maintenance requests for specific equipment.
- **REQ-006**: Users shall be able to update the status of existing maintenance requests.

#### 3.2.4 Equipment & Inventory
- **REQ-007**: System shall maintain a registry of all hardware assets.
- **REQ-008**: System shall track inventory quantities and flag items below the minimum stock level.

#### 3.2.5 Requisitions
- **REQ-009**: Users shall be able to submit supply requisitions with cost estimation.
- **REQ-010**: ADMIN users shall be able to approve or reject requisitions.

### 3.3 Performance Requirements
- **3.3.1 Response Time**: Dashboard stats shall update in less than 500ms under normal load.
- **3.3.2 Capacity**: Support up to 1000 equipment records and 5000 maintenance logs.

### 3.4 Software System Attributes
- **Security**: All API routes (except login/register) shall be protected by JWT.
- **Maintainability**: Modular React components and a structured Express backend.

---

## Appendices
- **Appendix A: Glossary**
- **Appendix B: Analysis Models** (See `documentation/ERD.md` and `documentation/USE_CASES.md`)
