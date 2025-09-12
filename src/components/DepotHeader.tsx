import React from 'react';

interface DepotHeaderProps {
  title?: string;
}

const DepotHeader: React.FC<DepotHeaderProps> = ({ 
  title = "Safety & Performance Station" 
}) => {
  return (
    <div className="relative bg-gradient-to-r from-depot-header to-depot-header/80 p-8 rounded-t-xl">
      {/* Accent gradient bar */}
      <div 
        className="absolute top-0 right-0 w-32 h-full rounded-tr-xl"
        style={{
          background: 'var(--gradient-accent)',
          clipPath: 'polygon(40% 0%, 100% 0%, 100% 100%, 0% 100%)'
        }}
      />
      
      <div className="relative z-10">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-wide">
          {title}
        </h1>
      </div>
    </div>
  );
};

export default DepotHeader;