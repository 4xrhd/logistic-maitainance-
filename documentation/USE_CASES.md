# Use Case Analysis

This document describes the comprehensive use cases for the Logistics Maintenance Management System, categorized by user roles and system functionality.

## Use Case Diagram

```mermaid
useCaseDiagram
    actor Admin
    actor Technician
    
    package "Logistics Maintenance Management System" {
        usecase "User Authentication" as UC1
        usecase "View Dashboard Analytics" as UC2
        usecase "Manage Equipment Registry" as UC3
        usecase "Manage Inventory System" as UC4
        usecase "Create Maintenance Request" as UC5
        usecase "Update Maintenance Status" as UC6
        usecase "Submit Supply Requisition" as UC7
        usecase "Approve/Reject Requisitions" as UC8
        usecase "Manage User Accounts" as UC9
        usecase "Assign Maintenance Tasks" as UC10
        usecase "View Equipment Health" as UC11
        usecase "Track Low Stock Items" as UC12
        usecase "Generate System Reports" as UC13
        usecase "Populate Test Data" as UC14
    }
    
    Technician --> UC1
    Technician --> UC2
    Technician --> UC5
    Technician --> UC6
    Technician --> UC7
    Technician --> UC11
    Technician --> UC12
    
    Admin --> UC1
    Admin --> UC2
    Admin --> UC3
    Admin --> UC4
    Admin --> UC5
    Admin --> UC6
    Admin --> UC7
    Admin --> UC8
    Admin --> UC9
    Admin --> UC10
    Admin --> UC11
    Admin --> UC12
    Admin --> UC13
    Admin --> UC14
```

## Use Case Descriptions

### UC1: User Authentication
- **Actors**: Admin, Technician
- **Description**: Allows users to securely access the system. Registration requires name, email, password, and role assignment. Login provides JWT token for subsequent API requests.
- **Preconditions**: User has valid credentials or needs to register
- **Postconditions**: User is authenticated and can access appropriate system features
- **Normal Flow**: 
  1. User navigates to login page
  2. User enters email and password
  3. System validates credentials
  4. System generates JWT token
  5. User is redirected to dashboard
- **Alternative Flow**: Registration required for new users

### UC2: View Dashboard Analytics
- **Actors**: Admin, Technician
- **Description**: Users view real-time system overview with KPI cards, equipment status charts, maintenance trends, and inventory alerts.
- **Preconditions**: User is authenticated
- **Postconditions**: User has comprehensive system overview
- **Normal Flow**:
  1. User accesses dashboard
  2. System fetches aggregated statistics
  3. System renders interactive visualizations
  4. User can drill down into specific metrics

### UC3: Manage Equipment Registry
- **Actors**: Admin
- **Description**: Admin performs CRUD operations on equipment records including adding new assets, updating status, scheduling maintenance, and deleting obsolete equipment.
- **Preconditions**: User has Admin role
- **Postconditions**: Equipment registry is updated
- **Normal Flow**:
  1. Admin navigates to equipment management
  2. Admin views equipment list
  3. Admin performs create/update/delete operations
  4. System validates and persists changes

### UC4: Manage Inventory System
- **Actors**: Admin
- **Description**: Admin manages inventory items including adding new stock, updating quantities, setting minimum levels, and tracking suppliers.
- **Preconditions**: User has Admin role
- **Postconditions**: Inventory records are updated
- **Normal Flow**:
  1. Admin navigates to inventory management
  2. Admin views inventory list with stock levels
  3. Admin updates quantities or adds new items
  4. System tracks low-stock alerts

### UC5: Create Maintenance Request
- **Actors**: Technician, Admin
- **Description**: Users report equipment issues or schedule preventive maintenance by creating maintenance requests with details including equipment, type, priority, description, and due date.
- **Preconditions**: User is authenticated, equipment exists
- **Postconditions**: New maintenance request is created
- **Normal Flow**:
  1. User selects equipment needing maintenance
  2. User specifies request details (type, priority, description)
  3. User sets due date
  4. System creates request with "Pending" status

### UC6: Update Maintenance Status
- **Actors**: Technician, Admin
- **Description**: Users update the status of maintenance requests. Technicians can only update their assigned tasks, while Admins can update any task.
- **Preconditions**: Maintenance request exists, user has appropriate permissions
- **Postconditions**: Maintenance status is updated
- **Normal Flow**:
  1. User views maintenance request
  2. User updates status (In Progress, Completed, Cancelled)
  3. System validates permission
  4. System updates request status

### UC7: Submit Supply Requisition
- **Actors**: Technician, Admin
- **Description**: Users request supplies by submitting requisitions with item details, quantity, unit, and estimated cost.
- **Preconditions**: User is authenticated
- **Postconditions**: New requisition is created with "Pending" status
- **Normal Flow**:
  1. User navigates to requisitions
  2. User fills requisition form
  3. User submits requisition
  4. System creates requisition record

### UC8: Approve/Reject Requisitions
- **Actors**: Admin
- **Description**: Admin reviews pending supply requisitions and either approves them for procurement or rejects them with possible comments.
- **Preconditions**: User has Admin role, requisition exists with "Pending" status
- **Postconditions**: Requisition status is updated to "Approved" or "Rejected"
- **Normal Flow**:
  1. Admin views pending requisitions
  2. Admin reviews requisition details
  3. Admin approves or rejects
  4. System updates requisition status

### UC9: Manage User Accounts
- **Actors**: Admin
- **Description**: Admin manages system users including viewing all accounts, updating roles, and deleting users (with self-deletion prevention).
- **Preconditions**: User has Admin role
- **Postconditions**: User accounts are managed appropriately
- **Normal Flow**:
  1. Admin navigates to user management
  2. Admin views user list
  3. Admin updates roles or deletes users
  4. System prevents self-deletion

### UC10: Assign Maintenance Tasks
- **Actors**: Admin
- **Description**: Admin assigns maintenance requests to available technicians based on workload and expertise.
- **Preconditions**: User has Admin role, maintenance request exists, technician exists
- **Postconditions**: Maintenance request is assigned to technician
- **Normal Flow**:
  1. Admin views unassigned maintenance requests
  2. Admin selects technician for assignment
  3. System updates request with assigned technician
  4. Technician receives notification (in-system)

### UC11: View Equipment Health
- **Actors**: Admin, Technician
- **Description**: Users monitor equipment health status through visual indicators and detailed equipment profiles.
- **Preconditions**: User is authenticated
- **Postconditions**: User understands equipment status
- **Normal Flow**:
  1. User views equipment list
  2. System displays status indicators
  3. User drills into specific equipment
  4. System shows maintenance history

### UC12: Track Low Stock Items
- **Actors**: Admin, Technician
- **Description**: Users identify inventory items below minimum stock levels requiring reorder.
- **Preconditions**: User is authenticated
- **Postconditions**: User is aware of low-stock situations
- **Normal Flow**:
  1. User views inventory dashboard
  2. System highlights low-stock items
  3. User can initiate requisition for restocking

### UC13: Generate System Reports
- **Actors**: Admin
- **Description**: Admin generates analytical reports on system performance, maintenance efficiency, inventory turnover, and equipment utilization.
- **Preconditions**: User has Admin role
- **Postconditions**: Reports are available for review
- **Normal Flow**:
  1. Admin accesses reporting section
  2. Admin selects report parameters
  3. System generates aggregated data
  4. Admin views/downloads reports

### UC14: Populate Test Data
- **Actors**: Developer/Admin
- **Description**: Developer or Admin populates the database with realistic synthetic data for testing, demonstration, or evaluation purposes using CLI commands.
- **Preconditions**: System is installed, database is accessible
- **Postconditions**: Database contains test data
- **Normal Flow**:
  1. Developer runs seed command
  2. System creates test users, equipment, inventory, maintenance requests, and requisitions
  3. System confirms data population
  4. System is ready for demonstration
