# Logistics Maintenance System

A comprehensive web application for managing equipment maintenance, inventory tracking, and supply requisitions in logistics warehouse environments.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.12-06B6D4?logo=tailwindcss)

## 📋 Overview

The Logistics Maintenance System is a modern web application designed to streamline maintenance operations, equipment tracking, and inventory management for logistics and warehouse facilities. It provides real-time dashboards, equipment health monitoring, and automated requisition workflows to minimize downtime and optimize resource allocation.

### Key Features

- **Real-time Dashboard**: Visual analytics for maintenance status, equipment health, and operational metrics
- **Maintenance Management**: Create, track, and update maintenance requests with priority levels
- **Equipment Tracking**: Comprehensive registry of logistics assets with health status monitoring
- **Inventory Management**: Stock level tracking with automated low-stock alerts
- **Requisition Workflow**: Streamlined supply request submission and approval process
- **User Authentication**: Secure JWT-based authentication with role-based access control
- **Responsive Design**: Fully responsive interface optimized for desktop use

## 🏗️ Architecture

The system follows a modern 3-tier architecture:

```
Client (Frontend) → Server (Backend) → Database
```

### Technology Stack

**Frontend:**
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling with custom design system
- **Radix UI** components for accessible UI elements
- **Recharts** for data visualization
- **React Router** for navigation

**Backend:**
- **Express.js** REST API server
- **Prisma ORM** for type-safe database operations
- **SQLite** for portable database storage
- **JWT** for authentication and authorization

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Modern web browser (Chrome, Firefox, Edge)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/logistics-maintenance-system.git
   cd logistics-maintenance-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the database**
   ```bash
   cd server
   npx prisma migrate dev
   npx prisma db seed
   cd ..
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser** and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 📁 Project Structure

```
├── src/                    # Frontend source code
│   ├── app/               # React application
│   │   ├── components/   # Reusable UI components
│   │   ├── context/      # React context providers
│   │   ├── lib/          # Utility functions and API client
│   │   └── routes.ts     # Application routing configuration
│   ├── styles/           # CSS and theme files
│   └── main.tsx          # Application entry point
├── server/                # Backend Express server
│   ├── src/              # Server source code
│   │   ├── lib/         # Server utilities
│   │   ├── middleware/  # Express middleware
│   │   ├── routes/      # API route handlers
│   │   └── index.ts     # Server entry point
│   └── prisma/           # Database schema and migrations
├── documentation/        # Project documentation
├── public/               # Static assets
└── package.json          # Dependencies and scripts
```

## 🔐 Authentication & Authorization

The system implements role-based access control with two primary user roles:

- **Admin**: Full access to all modules including user management, inventory deletion, and requisition approval
- **Technician**: Access to view equipment and inventory, create maintenance requests, and submit requisitions

All API routes (except authentication endpoints) are protected by JWT verification middleware.

## 📊 API Documentation

The backend provides a RESTful API with the following endpoints:

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration

### Maintenance
- `GET /api/maintenance` - List maintenance requests
- `POST /api/maintenance` - Create new maintenance request
- `PUT /api/maintenance/:id` - Update maintenance request
- `GET /api/maintenance/:id` - Get specific maintenance request

### Equipment
- `GET /api/equipment` - List all equipment
- `POST /api/equipment` - Add new equipment
- `GET /api/equipment/:id` - Get equipment details

### Inventory
- `GET /api/inventory` - List inventory items
- `POST /api/inventory` - Add inventory item
- `PUT /api/inventory/:id` - Update inventory quantity

### Requisitions
- `GET /api/requisitions` - List requisitions
- `POST /api/requisitions` - Create requisition
- `PUT /api/requisitions/:id/approve` - Approve requisition (Admin only)
- `PUT /api/requisitions/:id/reject` - Reject requisition (Admin only)

## 🎨 Design System

The application uses a custom design system defined in `src/styles/theme.css` with:

- **Primary Color**: `#030213` (Dark Blue/Black)
- **Secondary Colors**: Custom palette for status indicators
- **Typography**: Outfit font family with responsive sizing
- **Spacing**: Consistent spacing scale using Tailwind's spacing utilities
- **Components**: Reusable UI components built with Radix UI primitives

## 🧪 Testing

Run the test suite:

```bash
npm test
```

## 📈 Deployment

The system is designed for deployment using a split architecture: **Netlify** for the frontend and **Render** for the backend. This provides optimal performance and reliability on free tiers.

### Backend Deployment (Render.com)

1. **Create an account** at [Render.com](https://render.com)
2. **Create a New Web Service** and connect your GitHub repository
3. **Configure Build & Start**:
   - **Root Directory**: `server`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start`
4. **Add Environment Variables**:
   - `DATABASE_URL`: `file:./dev.db` (Note: For production persistence, consider using Supabase or another hosted database)
   - `JWT_SECRET`: A long random string
   - `PORT`: `10000` (Render's default)

### Frontend Deployment (Netlify)

1. **Sign in to Netlify** at [Netlify.com](https://netlify.com)
2. **Add New Site** → "Import from Git" and select your repository
3. **Site Configuration**:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
4. **Environment Variables**:
   - `VITE_API_URL`: Your Render service URL followed by `/api` (e.g., `https://your-backend.onrender.com/api`)

### Important Note on Database Persistence

On free hosting services like Render, the local filesystem is ephemeral (resets frequently). For production use or university projects requiring persistent data, consider connecting to a **Supabase** (PostgreSQL) database instead of SQLite. Supabase offers a generous free tier and integrates easily with Prisma.

### Manual Deployment

1. Build the project: `npm run build`
2. Deploy the `dist` directory to your preferred hosting service
3. Set up environment variables for production database

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code follows the existing style and includes appropriate tests.

## 📄 License

This project is licensed under the MIT License.

## 📚 Documentation

Additional documentation is available in the `documentation/` directory:

- [Software Requirements Specification](documentation/SRS.md)
- [System Architecture](documentation/ARCHITECTURE.md)
- [Entity Relationship Diagram](documentation/ERD.md)
- [Use Cases](documentation/USE_CASES.md)
- [API Documentation](documentation/API_DOCS.md)

## 🆘 Support

For support, please:
1. Check the [documentation](documentation/) first
2. Review existing issues on GitHub
3. Create a new issue with detailed information about your problem

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) components used under MIT license
- [Unsplash](https://unsplash.com) for photography used under their license
- [Lucide Icons](https://lucide.dev/) for beautiful icons
- [Radix UI](https://www.radix-ui.com/) for accessible UI primitives
- [Recharts](https://recharts.org/) for data visualization

---

**Built with ❤️ for logistics professionals**