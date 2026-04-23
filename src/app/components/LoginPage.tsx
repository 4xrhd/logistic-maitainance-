import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../lib/api';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { LogIn, Loader2, AlertCircle, UserPlus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Truck, Lock, Mail, AlertCircle, Loader2 } from 'lucide-react';

interface LoginPageProps {
  onSwitchToSignup: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onSwitchToSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    setIsLoading(true);
    
    try {
      const response = await api.post<any>('/auth/login', { email, password });
      login(response.token, response.user);
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
      setError(err.message || 'Verification failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12 sm:px-6 lg:px-8 font-sans">
      <Card className="w-full max-w-md p-0 border-none shadow-2xl rounded-3xl overflow-hidden animate-in fade-in zoom-in duration-500">
        {/* Banner */}
        <div className="bg-slate-900 p-8 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <LogIn className="w-24 h-24 rotate-12" />
          </div>
          <div className="relative z-10">
             <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-blue-500/20">
                <LogIn className="w-8 h-8" />
             </div>
             <h2 className="text-2xl font-bold tracking-tight">Welcome Back</h2>
             <p className="text-slate-400 text-sm mt-1">Logistics & Maintenance Portal</p>
          </div>
        </div>

        <div className="p-8 space-y-6">
          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-100 rounded-xl text-xs font-bold text-rose-600 animate-in slide-in-from-top-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Email Address</Label>
              <Input
                id="email-address"
                type="email"
                required
                className="h-12 rounded-xl bg-slate-50 border-slate-200 focus:ring-blue-500"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Security Key</Label>
              <Input
                id="password"
                type="password"
                required
                className="h-12 rounded-xl bg-slate-50 border-slate-200 focus:ring-blue-500"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-100 transition-all active:scale-[0.98]"
            >
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Authorize Access"}
            </Button>
          </form>

          <div className="pt-4 text-center space-y-4">
             <div className="relative">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-100" /></div>
                <span className="relative bg-white px-2 text-[10px] font-bold text-slate-300 uppercase tracking-widest">New Technician?</span>
             </div>
             
             <Button 
                variant="ghost" 
                onClick={onSwitchToSignup}
                className="text-slate-500 hover:text-blue-600 hover:bg-blue-50 font-bold text-sm h-11 w-full rounded-xl gap-2"
             >
                <UserPlus className="w-4 h-4" />
                Join Technical Fleet
             </Button>
          </div>
        </div>
      </Card>
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background font-['Outfit',sans-serif]">
      {/* Animated Background Blobs */}
      <div className="absolute top-0 -left-40 h-96 w-96 rounded-full bg-primary/20 blur-[100px]" />
      <div className="absolute bottom-0 -right-40 h-96 w-96 rounded-full bg-primary/20 blur-[100px]" />
      <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[80px]" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 w-full max-w-[440px] px-6"
      >
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-2xl backdrop-blur-xl sm:p-12">
          {/* Subtle reflection effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />

          <div className="relative space-y-8">
            <div className="text-center">
              <motion.div 
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/30"
              >
                <Truck size={32} />
              </motion.div>
              <h2 className="mt-6 text-3xl font-bold tracking-tight text-foreground">
                Logistics <span className="text-primary">Pro</span>
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Centralized Maintenance & Operations
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <AnimatePresence mode="wait">
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center gap-3 rounded-xl bg-destructive/10 p-4 text-sm text-destructive border border-destructive/20"
                  >
                    <AlertCircle size={18} className="shrink-0" />
                    <span>{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-4">
                <div className="group relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-muted-foreground transition-colors group-focus-within:text-primary">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    className="block w-full rounded-2xl border border-border bg-input-background py-3.5 pl-12 pr-4 text-foreground placeholder:text-muted-foreground outline-none ring-1 ring-transparent transition-all hover:bg-accent focus:border-primary/50 focus:ring-primary/20 sm:text-sm"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="group relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-muted-foreground transition-colors group-focus-within:text-primary">
                    <Lock size={18} />
                  </div>
                  <input
                    type="password"
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-2xl border border-border bg-input-background py-3.5 pl-12 pr-4 text-foreground placeholder:text-muted-foreground outline-none ring-1 ring-transparent transition-all hover:bg-accent focus:border-primary/50 focus:ring-primary/20 sm:text-sm"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between px-1">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" className="h-4 w-4 rounded border-border bg-input-background text-primary focus:ring-primary focus:ring-offset-0" />
                  <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">Remember me</span>
                </label>
                <a href="#" className="text-xs font-medium text-primary hover:text-primary/80 transition-colors">
                  Forgot password?
                </a>
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="relative flex w-full justify-center rounded-2xl bg-primary px-4 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 outline-none transition-all hover:bg-primary/90 focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background disabled:opacity-70 disabled:grayscale-[0.5]"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  "Sign In to Account"
                )}
              </motion.button>
            </form>
          </div>
        </div>
        
        <p className="mt-8 text-center text-sm text-muted-foreground">
          Not access authorized? <a href="#" className="font-semibold text-primary hover:text-primary/80">Contact Fleet Admin</a>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;

