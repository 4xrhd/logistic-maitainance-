import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../lib/api';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { LogIn, Loader2, AlertCircle, UserPlus } from 'lucide-react';

interface LoginPageProps {
  onSwitchToSignup: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onSwitchToSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      const response = await api.post<any>('/auth/login', { email, password });
      login(response.token, response.user);
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
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
    </div>
  );
};

export default LoginPage;
