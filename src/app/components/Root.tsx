import { Outlet, Link, useLocation } from "react-router";
import { Package, Wrench, FileText, Box, BarChart3, LogOut, User as UserIcon } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import { useState } from "react";

export function Root() {
  const location = useLocation();
  const { user, logout, isLoading } = useAuth();
  const [authView, setAuthView] = useState<'login' | 'signup'>('login');

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50 text-slate-400 font-bold uppercase tracking-widest animate-pulse">
        Syncing Fleet...
      </div>
    );
  }

  if (!user) {
    return authView === 'login' 
      ? <LoginPage onSwitchToSignup={() => setAuthView('signup')} /> 
      : <SignupPage onSwitchToLogin={() => setAuthView('login')} />;
  }

  const navItems = [
    { path: "/", label: "Dashboard", icon: BarChart3 },
    { path: "/maintenance", label: "Maintenance", icon: Wrench },
    { path: "/requisitions", label: "Requisitions", icon: FileText },
    { path: "/equipment", label: "Equipment", icon: Package },
    { path: "/inventory", label: "Inventory", icon: Box },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-900">Logistics Manager</h1>
          <p className="text-sm text-gray-500 mt-1">Maintenance & Requisition</p>
        </div>
        
        <nav className="p-4 space-y-1 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.path === "/" 
              ? location.pathname === "/" 
              : location.pathname.startsWith(item.path);
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center gap-3 px-2 mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
              <UserIcon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 truncate w-32">{user.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user.role.toLowerCase()}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
