import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DepotButton } from "@/components/ui/depot-button";
import { Badge } from "@/components/ui/badge";
import { Clock, User, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CheckInRecord {
  id: string;
  name: string;
  company: string;
  reason: string;
  time: string;
  status: "checked-in" | "checked-out";
}

interface StaffCheckInProps {
  onStaffUpdate?: (staff: CheckInRecord[]) => void;
  onUserCheckIn?: (user: { name: string; company: string } | null) => void;
  currentUser?: { name: string; company: string } | null;
}

const StaffCheckIn: React.FC<StaffCheckInProps> = ({
  onStaffUpdate,
  onUserCheckIn,
  currentUser,
}) => {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [reason, setReason] = useState("");
  const [records, setRecords] = useState<CheckInRecord[]>([]);
  const { toast } = useToast();

  const handleCheckIn = () => {
    if (!name.trim() || !company.trim() || !reason) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const existingRecord = records.find(
      (r) => r.name === name && r.status === "checked-in"
    );

    if (existingRecord) {
      toast({
        title: "Already Checked In",
        description: `${name} is already checked in`,
        variant: "destructive",
      });
      return;
    }

    const newRecord: CheckInRecord = {
      id: Date.now().toString(),
      name,
      company,
      reason,
      time: new Date().toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "checked-in",
    };

    const updatedRecords = [newRecord, ...records];
    setRecords(updatedRecords);
    onStaffUpdate?.(updatedRecords.filter((r) => r.status === "checked-in"));
    onUserCheckIn?.({ name, company });
    setName("");
    setCompany("");
    setReason("");
    toast({
      title: "Check-in Successful",
      description: `Welcome ${newRecord.name}! Check-in recorded at ${newRecord.time}`,
    });
  };

  const handleCheckOut = () => {
    if (!currentUser) {
      toast({
        title: "Error",
        description: "No user currently checked in",
        variant: "destructive",
      });
      return;
    }

    // Find existing record or create checkout record if none exists
    let existingRecord = records.find(
      (r) => r.name === currentUser.name && r.status === "checked-in"
    );

    let updatedRecords;
    if (existingRecord) {
      // Update existing record to checked-out
      updatedRecords = records.map((r) =>
        r.name === currentUser.name && r.status === "checked-in"
          ? {
              ...r,
              status: "checked-out" as const,
              time: new Date().toLocaleTimeString("en-US", {
                hour12: false,
                hour: "2-digit",
                minute: "2-digit",
              }),
            }
          : r
      );
    } else {
      // Create a new checkout record if no existing record found
      const checkoutRecord: CheckInRecord = {
        id: Date.now().toString(),
        name: currentUser.name,
        company: currentUser.company,
        reason: "Employee", // Default reason since we don't have it stored
        time: new Date().toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
        }),
        status: "checked-out",
      };
      updatedRecords = [checkoutRecord, ...records];
    }

    setRecords(updatedRecords);
    onStaffUpdate?.(updatedRecords.filter((r) => r.status === "checked-in"));
    onUserCheckIn?.(null);
    setName("");
    setCompany("");
    setReason("");
    toast({
      title: "Check-out Successful",
      description: `Goodbye ${currentUser.name}! Have a safe day.`,
    });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-6xl">
            <User className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12" />
            Staff Check In/Out System
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {!currentUser && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Input
                placeholder="Enter Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-base h-10 sm:text-lg sm:h-12 md:text-xl md:h-14 lg:text-4xl lg:h-32"
              />

              <Input
                placeholder="Enter Company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="text-base h-10 sm:text-lg sm:h-12 md:text-xl md:h-14 lg:text-4xl lg:h-32"
              />

              <Select value={reason} onValueChange={setReason}>
                <SelectTrigger className="text-base h-10 sm:text-lg sm:h-12 md:text-xl md:h-14 lg:text-4xl lg:h-32">
                  <SelectValue placeholder="Select Reason for Visit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem
                    value="Employee"
                    className="text-base sm:text-lg md:text-xl lg:text-4xl"
                  >
                    Employee
                  </SelectItem>
                  <SelectItem
                    value="Visitor"
                    className="text-base sm:text-lg md:text-xl lg:text-4xl"
                  >
                    Visitor
                  </SelectItem>
                  <SelectItem
                    value="Supplier"
                    className="text-base sm:text-lg md:text-xl lg:text-4xl"
                  >
                    Supplier
                  </SelectItem>
                  <SelectItem
                    value="Audit"
                    className="text-base sm:text-lg md:text-xl lg:text-4xl"
                  >
                    Audit
                  </SelectItem>
                  <SelectItem
                    value="Safety"
                    className="text-base sm:text-lg md:text-xl lg:text-4xl"
                  >
                    Safety
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          {currentUser && (
            <div className="text-center p-4 bg-depot-surface rounded-lg">
              <p className="text-lg font-medium">
                Welcome back, {currentUser.name}!
              </p>
              <p className="text-sm text-muted-foreground">
                From {currentUser.company}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Click the button below to check out
              </p>
            </div>
          )}
          <div className="flex gap-2 justify-center">
            {!currentUser ? (
              <DepotButton
                variant="success"
                onClick={handleCheckIn}
                className="flex items-center gap-2 w-full sm:w-auto 
             px-4 sm:px-6 md:px-8 lg:px-10 
             py-2 sm:py-3 md:py-4 lg:py-5 
             text-base sm:text-lg md:text-xl lg:text-2xl"
              >
                <CheckCircle className="sm:w-6 sm:h-6 md:w-10 md:h-10 lg:w-40 lg:h-40" />
                Check In
              </DepotButton>
            ) : (
              <DepotButton
                variant="accent"
                onClick={handleCheckOut}
                className="flex items-center gap-2 w-full sm:w-auto 
             px-3 sm:px-5 md:px-7 lg:px-9 
             py-2 sm:py-3 md:py-4 lg:py-5 
             text-sm sm:text-base md:text-lg lg:text-xl"
              >
                <XCircle className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10" />
                <span className="truncate">Check Out {currentUser.name}</span>
              </DepotButton>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffCheckIn;
