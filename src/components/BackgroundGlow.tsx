import React from 'react';

const BackgroundGlow: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Main gradient background */}
      <div className="absolute inset-0 bg-background" />
      
      {/* Primary glow orb - top right */}
      <div 
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-20 animate-glow"
        style={{
          background: 'radial-gradient(circle, hsl(187 85% 53% / 0.4) 0%, transparent 70%)',
        }}
      />
      
      {/* Secondary glow orb - bottom left */}
      <div 
        className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full opacity-15 animate-glow"
        style={{
          background: 'radial-gradient(circle, hsl(199 89% 48% / 0.3) 0%, transparent 70%)',
          animationDelay: '1.5s',
        }}
      />
      
      {/* Center subtle glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-10"
        style={{
          background: 'radial-gradient(circle, hsl(187 85% 53% / 0.2) 0%, transparent 60%)',
        }}
      />
      
      {/* Grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(187 85% 53% / 0.5) 1px, transparent 1px),
            linear-gradient(90deg, hsl(187 85% 53% / 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }}
      />
    </div>
  );
};

export default BackgroundGlow;
