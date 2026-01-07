import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code2, Zap, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BackgroundGlow from '@/components/BackgroundGlow';
import Navbar from '@/components/Navbar';
import DeveloperCard from '@/components/DeveloperCard';

const Index: React.FC = () => {
  const features = [
    {
      icon: Code2,
      title: 'Code Assistance',
      description: 'Get help with debugging, refactoring, and writing clean code.',
    },
    {
      icon: Zap,
      title: 'Instant Solutions',
      description: 'Quick answers to your programming questions and challenges.',
    },
    {
      icon: Brain,
      title: 'Smart Context',
      description: 'Understands your code context for accurate suggestions.',
    },
  ];

  return (
    <div className="min-h-screen relative">
      <BackgroundGlow />
      <Navbar />

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div 
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 animate-fade-in"
            style={{ animationDelay: '0.1s' }}
          >
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-muted-foreground">AI-Powered Coding Assistant</span>
          </div>

          {/* Main Title */}
          <h1 
            className="text-7xl md:text-9xl font-bold mb-6 tracking-tight animate-fade-in"
            style={{ animationDelay: '0.2s' }}
          >
            <span className="glow-text text-glow">ZOE</span>
          </h1>

          {/* Subtitle */}
          <p 
            className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-in"
            style={{ animationDelay: '0.3s' }}
          >
            Your AI Coding & Problem Solving Assistant
          </p>

          {/* CTA Buttons + Quote */}
          <div 
            className="flex flex-col items-center justify-center gap-4 animate-fade-in"
            style={{ animationDelay: '0.4s' }}
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/login">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-xl shadow-glow hover:shadow-glow-lg transition-all duration-300 group"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              <Link to="/chat">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="glass border-glass-border/50 hover:border-primary/50 px-8 py-6 text-lg rounded-xl hover:shadow-glow transition-all duration-300"
                >
                  Try Demo
                </Button>
              </Link>
            </div>

            {/* Glowing Quote */}
            <p 
              className="mt-4 text-lg md:text-xl lg:text-xl italic tracking-wide animate-fade-in"
              style={{ animationDelay: '0.5s' }}
            >
              <span className="glow-text text-glow">
                “Dreams are only wishes without discipline.”
              </span>
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
            <div className="w-1.5 h-3 rounded-full bg-primary animate-pulse" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            <span className="glow-text">Powerful Features</span>
          </h2>
          <p className="text-muted-foreground text-center mb-16 max-w-xl mx-auto">
            Everything you need to accelerate your development workflow
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="glass rounded-2xl p-6 hover:shadow-glow transition-all duration-300 group animate-fade-in"
                style={{ animationDelay: `${0.1 * (index + 1)}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Developer Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            <span className="glow-text">Meet the Developer</span>
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
            Built with passion for developers, by a developer
          </p>

          <DeveloperCard />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-glass-border/20">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-muted-foreground text-sm">
            © 2026 ZOE. Built by Sanjay M
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
