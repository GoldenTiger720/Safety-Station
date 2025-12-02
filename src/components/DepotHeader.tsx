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
    <div className="relative bg-gradient-to-r from-depot-header to-depot-header/80 py-1 px-4 rounded-t-xl flex-shrink-0">
      {/* RSRG Logo - positioned absolutely to match full header height */}
      <div className="absolute top-0 right-0 h-full flex items-center pr-4">
        <Image
          src="/RSRG.png"
          alt="Rhomberg Sersa Rail Group"
          width={200}
          height={100}
          className="h-[90%] w-auto object-contain"
        />
      </div>

      <div className="relative z-10 flex items-center">
        <h1 className="text-[2vw] font-bold text-foreground tracking-wide flex-1">
          {title}
        </h1>
      </div>
    </div>
  );
};

export default DepotHeader;
