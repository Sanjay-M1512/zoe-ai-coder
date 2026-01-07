import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';

const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-3 group"
        >
          <img
            src="/logo.png"
            alt="ZOE Logo"
            className="h-8 w-8 object-contain group-hover:scale-105 transition-transform"
          />
          <span className="text-xl font-semibold glow-text">ZOE</span>
        </Link>

        {/* Navigation Actions */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Link 
                to="/chat" 
                className="text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                Chat
              </Link>
              <div className="flex items-center gap-3 glass rounded-full px-4 py-2">
                <User className="w-4 h-4 text-primary" />
                <span className="text-sm text-foreground">{user?.username || 'User'}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button 
                variant="outline" 
                className="glass border-glass-border/50 hover:border-primary/50 hover:shadow-glow transition-all duration-300"
              >
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
