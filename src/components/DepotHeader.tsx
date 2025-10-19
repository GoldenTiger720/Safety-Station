import React from "react";

interface DepotHeaderProps {
  title?: string;
}

const DepotHeader: React.FC<DepotHeaderProps> = ({
  title = "Safety & Performance Station",
}) => {
  return (
    <div className="relative bg-gradient-to-r from-depot-header to-depot-header/80 p-4 sm:p-6 xl:py-[3vw] md:p-8 rounded-t-xl">
      {/* RSRG Logo - positioned absolutely to match full header height */}
      <div className="absolute top-0 right-0 h-full flex items-center pr-4 sm:pr-6 md:pr-8">
        <img
          src="/RSRG.png"
          alt="Rhomberg Sersa Rail Group"
          className="h-full w-auto object-contain"
        />
      </div>

      <div className="relative z-10 flex items-center">
        <h1 className="hidden sm:block text-sm sm:text-lg md:text-xl lg:text-[5vw] font-bold text-foreground tracking-wide flex-1">
          {title}
        </h1>
      </div>
    </div>
  );
};

export default DepotHeader;
