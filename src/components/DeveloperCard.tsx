import React from 'react';
import { Github, Linkedin, Globe } from 'lucide-react';

const DeveloperCard: React.FC = () => {
  const links = [
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/Sanjay-M1512',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/sanjay-m-31658b288/',
    },
    {
      icon: Globe,
      label: 'Portfolio',
      href: 'https://sanjay1512-portfolio.vercel.app/',
    },
  ];

  return (
    <div className="glass rounded-2xl p-8 max-w-md mx-auto animate-fade-in-up shadow-glow" style={{ animationDelay: '0.4s' }}>
      <div className="text-center mb-6">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/20">
          <span className="text-3xl font-bold glow-text">SM</span>
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-1">Sanjay M</h3>
        <p className="text-muted-foreground text-sm">Developer & Creator</p>
      </div>

      <div className="flex justify-center gap-4">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-secondary/50 transition-all duration-300"
          >
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary/20 group-hover:shadow-glow transition-all duration-300">
              <link.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
              {link.label}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default DeveloperCard;
