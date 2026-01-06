import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import BackgroundGlow from '@/components/BackgroundGlow';
import ChatMessage from '@/components/ChatMessage';
import ChatInput from '@/components/ChatInput';
import { Sparkles, User, LogOut, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
}

const Chat: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const sendMessage = async (prompt: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content: prompt,
      isUser: true,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch('http://13.49.22.195/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          max_tokens: 200,
        }),
      });

      const data = await response.json();

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response || 'Sorry, I could not process your request.',
        isUser: false,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, there was an error connecting to the AI. Please try again.',
        isUser: false,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex relative">
      <BackgroundGlow />

      {/* Sidebar */}
      <aside className="w-16 md:w-64 glass-strong border-r border-glass-border/30 flex flex-col py-4 px-2 md:px-4 fixed h-full z-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 px-2 py-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center shadow-glow">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <span className="text-xl font-semibold glow-text hidden md:block">ZOE</span>
        </Link>

        {/* Nav Items */}
        <nav className="flex-1 space-y-2">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all"
          >
            <Home className="w-5 h-5" />
            <span className="hidden md:block text-sm">Home</span>
          </Link>
        </nav>

        {/* Profile Section */}
        <div className="border-t border-glass-border/30 pt-4 space-y-2">
          {isAuthenticated && user && (
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl w-full text-left hover:bg-secondary/50 transition-all"
            >
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="w-4 h-4 text-primary" />
              </div>
              <div className="hidden md:block overflow-hidden">
                <p className="text-sm font-medium text-foreground truncate">{user.username}</p>
                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
              </div>
            </button>
          )}

          <Button
            onClick={logout}
            variant="ghost"
            className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-secondary/50 px-3"
          >
            <LogOut className="w-5 h-5" />
            <span className="hidden md:block ml-3 text-sm">Logout</span>
          </Button>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col ml-16 md:ml-64">
        {/* Header */}
        <header className="glass-strong border-b border-glass-border/30 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h1 className="text-lg font-semibold text-foreground">Chat with ZOE</h1>
            <p className="text-sm text-muted-foreground">Your AI coding assistant</p>
          </div>
          {!isAuthenticated && (
            <Link to="/login">
              <Button variant="outline" size="sm" className="glass border-glass-border/50">
                Login for full access
              </Button>
            </Link>
          )}
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 md:px-6 py-6">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center animate-fade-in">
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 shadow-glow">
                <Sparkles className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold mb-2 glow-text">How can I help you today?</h2>
              <p className="text-muted-foreground max-w-md">
                Ask me anything about coding, debugging, algorithms, or best practices.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-8 max-w-2xl w-full">
                {[
                  'Fix this Python error...',
                  'Explain async/await in JavaScript',
                  'Write a React component for...',
                  'Optimize this SQL query...',
                ].map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => sendMessage(prompt)}
                    className="glass rounded-xl p-4 text-left text-sm text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all group"
                  >
                    <span className="group-hover:text-primary transition-colors">"</span>
                    {prompt}
                    <span className="group-hover:text-primary transition-colors">"</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto space-y-6">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  content={message.content}
                  isUser={message.isUser}
                />
              ))}
              {isLoading && (
                <ChatMessage content="" isUser={false} isLoading />
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="px-4 md:px-6 py-4 border-t border-glass-border/20">
          <div className="max-w-4xl mx-auto">
            <ChatInput onSend={sendMessage} disabled={isLoading} />
            <p className="text-xs text-muted-foreground text-center mt-3">
              ZOE can make mistakes. Verify important information.
            </p>
          </div>
        </div>
      </main>

      {/* Profile Modal */}
      {showProfile && user && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowProfile(false)}
        >
          <div 
            className="glass rounded-2xl p-6 max-w-sm w-full animate-scale-in shadow-glow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-1">{user.username}</h3>
              <p className="text-muted-foreground text-sm">{user.email}</p>
            </div>
            <Button
              onClick={() => setShowProfile(false)}
              className="w-full mt-6 bg-secondary hover:bg-secondary/80"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
