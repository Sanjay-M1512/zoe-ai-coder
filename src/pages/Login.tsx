import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import BackgroundGlow from '@/components/BackgroundGlow';
import { Mail, Lock, AlertCircle, ArrowLeft } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/chat');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);

    const result = await login(email, password);

    if (result.success) {
      navigate('/chat');
    } else {
      setError(result.error || 'Login failed');
    }

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-6">
      <BackgroundGlow />

      {/* Back to home */}
      <Link 
        to="/" 
        className="absolute top-6 left-6 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm">Back to home</span>
      </Link>

      <div className="w-full max-w-md animate-fade-in">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4 shadow-glow">
            <img
              src="/logo.png"
              alt="ZOE Logo"
              className="h-10 w-10 object-contain"
            />
          </div>
          <h1 className="text-3xl font-bold glow-text mb-2">Welcome back</h1>
          <p className="text-muted-foreground">Sign in to continue to ZOE</p>
        </div>

        {/* Login Form */}
        <div className="glass rounded-2xl p-8 shadow-glow">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm animate-scale-in">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="pl-10 bg-secondary/50 border-glass-border/50 focus:border-primary focus:ring-primary/20 h-12"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="pl-10 bg-secondary/50 border-glass-border/50 focus:border-primary focus:ring-primary/20 h-12"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-base rounded-xl shadow-glow hover:shadow-glow-lg transition-all duration-300 disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Signing in...
                </div>
              ) : (
                'Sign in'
              )}
            </Button>
          </form>
        </div>

        <p className="text-center text-muted-foreground text-sm mt-6">
          Don't have an account?{' '}
          <span className="text-primary cursor-pointer hover:underline">Contact the developer</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
