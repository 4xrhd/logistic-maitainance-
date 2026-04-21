# Use Case Analysis

This document describes the primary use cases for the Logistics Maintenance System, categorized by user roles.

## Use Case Diagram

```mermaid
useCaseDiagram
    actor Admin
    actor Technician
    
    package "Logistics Maintenance System" {
        usecase "Login/Register" as UC1
        usecase "View Dashboard" as UC2
        usecase "Manage Equipment" as UC3
        usecase "Manage Inventory" as UC4
        usecase "Create Maintenance Request" as UC5
        usecase "Update Maintenance Status" as UC6
        usecase "Submit Requisition" as UC7
        usecase "Approve Requisition" as UC8
        usecase "Generate Reports" as UC9
    }
    
    Technician --> UC1
    Technician --> UC2
    Technician --> UC5
    Technician --> UC7
    
    Admin --> UC1
    Admin --> UC2
    Admin --> UC3
    Admin --> UC4
    Admin --> UC6
    Admin --> UC8
    Admin --> UC9
```

## Use Case Descriptions

### UC1: Login/Register
- **Actors**: Admin, Technician
- **Description**: Allows users to enter the system. Registration requires a name, email, and password. Login provides a JWT for subsequent requests.

### UC5: Create Maintenance Request
- **Actors**: Technician, Admin
- **Description**: Users can report equipment failure or request scheduled maintenance. Requires equipment ID, type, and description.

### UC8: Approve Requisition
- **Actors**: Admin
- **Description**: Admins review pending supply requisitions and either approve them for ordering or reject them.

### UC9: Generate Reports
- **Actors**: Admin
- **Description**: Admins can view aggregated analytics on equipment health and warehouse downtime.
