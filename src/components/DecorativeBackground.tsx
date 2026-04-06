const DecorativeBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Grid pattern overlay - more visible */}
      <div className="absolute inset-0 bg-grid-pattern opacity-100" />
      
      {/* Large primary gradient blob - top left */}
      <div 
        className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full animate-float"
        style={{
          background: 'radial-gradient(circle, hsl(var(--primary) / 0.25) 0%, transparent 70%)',
        }}
      />
      
      {/* Accent blob - top right */}
      <div 
        className="absolute top-20 -right-20 w-[450px] h-[450px] rounded-full animate-float-delayed"
        style={{
          background: 'radial-gradient(circle, hsl(var(--accent) / 0.3) 0%, transparent 70%)',
        }}
      />
      
      {/* Center glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(var(--muted) / 0.6) 0%, transparent 60%)',
        }}
      />
      
      {/* Bottom left accent */}
      <div 
        className="absolute bottom-20 left-20 w-[400px] h-[400px] rounded-full animate-float"
        style={{
          background: 'radial-gradient(circle, hsl(var(--primary) / 0.2) 0%, transparent 70%)',
          animationDelay: '-8s',
        }}
      />
      
      {/* Bottom right primary */}
      <div 
        className="absolute -bottom-20 -right-20 w-[450px] h-[450px] rounded-full animate-float-delayed"
        style={{
          background: 'radial-gradient(circle, hsl(var(--accent) / 0.2) 0%, transparent 70%)',
        }}
      />
      
      {/* Extra floating elements for depth */}
      <div 
        className="absolute top-1/3 left-1/4 w-[250px] h-[250px] rounded-full animate-float"
        style={{
          background: 'radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, transparent 70%)',
          animationDelay: '-5s',
        }}
      />
      <div 
        className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] rounded-full animate-float-delayed"
        style={{
          background: 'radial-gradient(circle, hsl(var(--accent) / 0.15) 0%, transparent 70%)',
          animationDelay: '-12s',
        }}
      />
      
      {/* Subtle noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

export default DecorativeBackground;