import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut } from "lucide-react";

interface DepotHeaderProps {
  title?: string;
  userName?: string;
  userEmail?: string;
  userAvatar?: string;
  onProfileClick?: () => void;
  onLogoutClick?: () => void;
}

const DepotHeader: React.FC<DepotHeaderProps> = ({
  title = "Safety & Performance Station",
  userName,
  userEmail,
  userAvatar,
  onProfileClick,
  onLogoutClick,
}) => {
  const getInitials = (name?: string, email?: string) => {
    if (name) {
      return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    if (email) {
      return email.substring(0, 2).toUpperCase();
    }
    return "U";
  };

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

        {/* User Profile Dropdown - positioned with margin to move it left */}
        {userName && (
          <div className="mr-8 sm:mr-12 md:mr-16 lg:mr-72">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={userAvatar} alt={userName} />
                  <AvatarFallback className="bg-blue-600 text-white">
                    {getInitials(userName, userEmail)}
                  </AvatarFallback>
                </Avatar>
                <p className="text-sm font-medium text-foreground">
                  {userName}
                </p>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {userEmail && (
                  <>
                    <div className="px-2 py-1.5">
                      <p className="text-sm font-medium">{userName}</p>
                      <p className="text-xs text-muted-foreground">{userEmail}</p>
                    </div>
                    <DropdownMenuSeparator />
                  </>
                )}
                {onProfileClick && (
                  <>
                    <DropdownMenuItem onClick={onProfileClick}>
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </>
                )}
                {onLogoutClick && (
                  <DropdownMenuItem onClick={onLogoutClick} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </div>
  );
};

export default DepotHeader;
