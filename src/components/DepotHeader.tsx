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
    <div className="relative bg-gradient-to-r from-depot-header to-depot-header/80 p-2 sm:p-3 md:p-4 rounded-t-xl">
      {/* RSRG Logo - positioned absolutely to match full header height */}
      <div className="absolute top-0 right-0 h-full flex items-center pr-2 sm:pr-3 md:pr-4">
        <img
          src="/RSRG.png"
          alt="Rhomberg Sersa Rail Group"
          className="h-full w-auto object-contain"
        />
      </div>

      <div className="relative z-10 flex items-center">
        <h1 className="hidden sm:block text-xs sm:text-sm md:text-base lg:text-lg font-bold text-foreground tracking-wide flex-1">
          {title}
        </h1>

        {/* User Avatar Dropdown - positioned with margin to move it left */}
        {(userName || userEmail) && (
          <div className="mr-8 sm:mr-12 md:mr-16 lg:mr-40">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center space-x-3 hover:opacity-80 transition-opacity cursor-pointer">
                  <div className="text-right hidden sm:block">
                    {userName && (
                      <p className="text-sm font-medium text-foreground">
                        {userName}
                      </p>
                    )}
                    {userEmail && (
                      <p className="text-xs text-foreground/70">{userEmail}</p>
                    )}
                  </div>
                  <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                    <AvatarImage src={userAvatar} alt={userName || userEmail} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
                      {getInitials(userName, userEmail)}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem
                  onClick={onProfileClick}
                  className="cursor-pointer"
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>My Profile</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={onLogoutClick}
                  className="cursor-pointer text-red-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </div>
  );
};

export default DepotHeader;
