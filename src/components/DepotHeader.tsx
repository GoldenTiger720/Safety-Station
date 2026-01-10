"use client";

import React from "react";
import Image from "next/image";

interface DepotHeaderProps {
  title?: string;
}

const DepotHeader: React.FC<DepotHeaderProps> = ({
  title = "Safety & Performance Station",
}) => {
  return (
    <div className="relative bg-gradient-to-r from-depot-header to-depot-header/80 py-3 px-6 rounded-t-xl flex-shrink-0">
      {/* RSRG Logo - positioned absolutely, much larger */}
      <div className="absolute top-0 right-0 h-full flex items-center pr-6">
        <Image
          src="/RSRG.png"
          alt="Rhomberg Sersa Rail Group"
          width={350}
          height={150}
          className="h-[95%] w-auto object-contain"
        />
      </div>

      <div className="relative z-10 flex items-center">
        <h1 className="text-[3vw] font-bold text-foreground tracking-wide flex-1">
          {title}
        </h1>
      </div>
    </div>
  );
};

export default DepotHeader;
