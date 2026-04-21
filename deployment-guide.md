# Deployment Guide: Logistics Maintenance System

To deploy this full-stack system for free, we recommend splitting the architecture between **Netlify** (Frontend) and **Render** (Backend). This ensures your React app is fast and your Express server has a stable home.

## Part 1: Backend Deployment (Render.com)

Since Netlify is statically focused, Render is a better free choice for the Express server.

1.  **Create a Account**: Sign up at [Render.com](https://render.com).
2.  **Create a New Web Service**: Connect your GitHub repository.
3.  **Configure Build & Start**:
    *   **Root Directory**: `server`
    *   **Build Command**: `npm install && npm run build`
    *   **Start Command**: `npm run start`
4.  **Add Environment Variables**:
    *   `DATABASE_URL`: `file:./dev.db` (Note: On Render's free tier, this file is wiped on redeploy. For persistence, use their "Blueprints" or a hosted DB like Supabase).
    *   `JWT_SECRET`: A long random string.
    *   `PORT`: `10000` (Render's default).

## Part 2: Frontend Deployment (Netlify)

1.  **Sign in to Netlify**: [Netlify.com](https://netlify.com).
2.  **Add New Site**: Pick "Import from Git" and select your repo.
3.  **Site Configuration**:
    *   **Build Command**: `npm run build`
    *   **Publish Directory**: `dist`
4.  **Environment Variables**:
    *   `VITE_API_URL`: Your **Render** service URL followed by `/api` (e.g., `https://my-backend.onrender.com/api`).

## Key Files Created/Updated for Deployment

*   [netlify.toml](file:///home/tr/Desktop/project/logistic-maitainance/netlify.toml): Configures Netlify to handle single-page application (SPA) routing.
*   [server/package.json](file:///home/tr/Desktop/project/logistic-maitainance/server/package.json): Added `build` and `start` scripts for production environments.
*   [src/app/lib/api.ts](file:///home/tr/Desktop/project/logistic-maitainance/src/app/lib/api.ts): Updated to support dynamic backend URLs via environment variables.

> [!IMPORTANT]
> **A Note on SQLite Persistence**
> On free hosting services like Render, the local filesystem is ephemeral (it resets frequently). If you need your data to survive restarts permanently in a professional/university project, consider connecting to a **Supabase** (Postgres) database instead of SQLite. It's free and easy to set up with Prisma!
