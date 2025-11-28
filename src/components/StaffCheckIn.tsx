"use client";

import React, { useState, useEffect } from "react";
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
import { Clock, User, CheckCircle, XCircle, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  useCheckInRecords,
  useCreateCheckIn,
  useCheckOutUser,
  useReCheckInUser,
} from "@/hooks/use-checkin";
import type { CheckInRecord } from "@/types";
import { format } from "date-fns";

interface StaffCheckInProps {
  onStaffUpdate?: (staff: CheckInRecord[]) => void;
}

const StaffCheckIn: React.FC<StaffCheckInProps> = ({ onStaffUpdate }) => {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reCheckInUserId, setReCheckInUserId] = useState<number | null>(null);
  const [checkOutUserId, setCheckOutUserId] = useState<number | null>(null);
  const { toast } = useToast();

  // Use React Query hooks
  const { data: checkInData, isLoading } = useCheckInRecords();
  const createCheckInMutation = useCreateCheckIn();
  const checkOutMutation = useCheckOutUser();
  const reCheckInMutation = useReCheckInUser();

  // Get all records from cache
  const allRecords = checkInData?.records || [];

  // Filter checked-in and checked-out users separately
  const checkedInUsers = allRecords.filter(
    (record) => record.status === "checked-in"
  );
  const checkedOutUsers = allRecords.filter(
    (record) => record.status === "checked-out"
  );

  // Update parent component when checked-in users change
  useEffect(() => {
    if (onStaffUpdate) {
      onStaffUpdate(checkedInUsers);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkedInUsers.length, onStaffUpdate]);

  const handleCheckIn = async () => {
    if (!name.trim() || !company.trim() || !reason) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const existingRecord = checkedInUsers.find(
      (r) => r.name.toLowerCase() === name.toLowerCase()
    );

    if (existingRecord) {
      toast({
        title: "Already Checked In",
        description: `${name} is already checked in`,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await createCheckInMutation.mutateAsync({
        name,
        company,
        reason,
      });

      // Clear form
      setName("");
      setCompany("");
      setReason("");

      toast({
        title: "Check-in Successful",
        description: result.message || `Welcome ${name}!`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to check in. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCheckOut = async (userId: number, userName: string) => {
    setCheckOutUserId(userId);
    try {
      const result = await checkOutMutation.mutateAsync(userId);

      toast({
        title: "Check-out Successful",
        description: result.message || `Goodbye ${userName}! Have a safe day.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to check out. Please try again.",
        variant: "destructive",
      });
    } finally {
      setCheckOutUserId(null);
    }
  };

  const handleReCheckIn = async (user: CheckInRecord) => {
    setReCheckInUserId(user.id);
    try {
      const result = await reCheckInMutation.mutateAsync(user.id);

      toast({
        title: "Check-in Successful",
        description: result.message || `Welcome back ${user.name}!`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to check in. Please try again.",
        variant: "destructive",
      });
    } finally {
      setReCheckInUserId(null);
    }
  };

  const handleExportExcel = () => {
    try {
      const headers = [
        "ID",
        "Name",
        "Company",
        "Reason",
        "Check In Time",
        "Check Out Time",
        "Status",
      ];
      const csvContent = [
        headers.join(","),
        ...allRecords.map((record) =>
          [
            record.id,
            `"${record.name}"`,
            `"${record.company}"`,
            `"${record.reason}"`,
            `"${format(new Date(record.check_in_time), "yyyy-MM-dd HH:mm:ss")}"`,
            record.check_out_time
              ? `"${format(new Date(record.check_out_time), "yyyy-MM-dd HH:mm:ss")}"`
              : '""',
            `"${record.status}"`,
          ].join(",")
        ),
      ].join("\n");

      const blob = new Blob(["\uFEFF" + csvContent], {
        type: "text/csv;charset=utf-8;",
      });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);

      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `checkin_records_${format(new Date(), "yyyy-MM-dd_HHmmss")}.csv`
      );
      link.style.visibility = "hidden";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "Export Successful",
        description: "Check-in records have been exported to Excel file.",
      });
    } catch {
      toast({
        title: "Export Failed",
        description: "Failed to export records. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Check-in Form Card */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-6xl">
            <User className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12" />
            Staff Check In System
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
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
                  value="firewarden"
                  className="text-base sm:text-lg md:text-xl lg:text-4xl"
                >
                  Fire warden
                </SelectItem>
                <SelectItem
                  value="firstaider"
                  className="text-base sm:text-lg md:text-xl lg:text-4xl"
                >
                  First aider
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 justify-center">
            <DepotButton
              variant="success"
              onClick={handleCheckIn}
              disabled={isSubmitting}
              className="flex items-center gap-2 w-full sm:w-auto
                px-4 sm:px-6 md:px-8 lg:px-10
                py-2 sm:py-3 md:py-4 lg:py-5
                text-base sm:text-lg md:text-xl lg:text-2xl"
            >
              <CheckCircle className="sm:w-6 sm:h-6 md:w-10 md:h-10 lg:w-40 lg:h-40" />
              {isSubmitting ? "Checking In..." : "Check In"}
            </DepotButton>
          </div>
        </CardContent>
      </Card>

      {/* Checked-in Users List Card */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 text-lg sm:text-xl md:text-2xl">
              <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-green-500" />
              Currently Checked In
            </div>
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className="text-base sm:text-lg md:text-xl px-3 py-1"
              >
                {checkedInUsers.length}{" "}
                {checkedInUsers.length === 1 ? "Person" : "People"}
              </Badge>
              <DepotButton
                variant="default"
                onClick={handleExportExcel}
                disabled={allRecords.length === 0}
                className="flex items-center gap-2 px-3 py-2 text-sm"
              >
                <Download className="w-4 h-4" />
                Export Excel
              </DepotButton>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground">
              Loading...
            </div>
          ) : checkedInUsers.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p className="text-lg">No one is currently checked in</p>
            </div>
          ) : (
            <div className="space-y-3">
              {checkedInUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4 bg-depot-surface rounded-lg border border-border hover:border-primary transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div>
                        <h3 className="font-semibold text-lg sm:text-xl md:text-2xl">
                          {user.name}
                        </h3>
                        <p className="text-sm sm:text-base text-muted-foreground">
                          {user.company} - {user.reason}
                        </p>
                        <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1 mt-1">
                          <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                          Checked in:{" "}
                          {format(
                            new Date(user.check_in_time),
                            "yyyy-MM-dd HH:mm"
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                  <DepotButton
                    variant="accent"
                    onClick={() => handleCheckOut(user.id, user.name)}
                    disabled={checkOutUserId === user.id}
                    className="flex items-center gap-2 px-3 sm:px-5 py-2 sm:py-3 text-sm sm:text-base md:text-lg"
                  >
                    <XCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                    {checkOutUserId === user.id ? "Checking Out..." : "Check Out"}
                  </DepotButton>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Checked-out Users List Card */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-lg sm:text-xl md:text-2xl">
              <XCircle className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-orange-500" />
              Checked Out History
            </div>
            <Badge
              variant="outline"
              className="text-base sm:text-lg md:text-xl px-3 py-1"
            >
              {checkedOutUsers.length}{" "}
              {checkedOutUsers.length === 1 ? "Record" : "Records"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground">
              Loading...
            </div>
          ) : checkedOutUsers.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p className="text-lg">No checkout records</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              {checkedOutUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border border-border hover:border-primary transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div>
                        <h3 className="font-semibold text-lg sm:text-xl md:text-2xl">
                          {user.name}
                        </h3>
                        <p className="text-sm sm:text-base text-muted-foreground">
                          {user.company} - {user.reason}
                        </p>
                        <div className="flex flex-col gap-1 mt-1">
                          <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                            In:{" "}
                            {format(
                              new Date(user.check_in_time),
                              "yyyy-MM-dd HH:mm"
                            )}
                          </p>
                          {user.check_out_time && (
                            <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1">
                              <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                              Out:{" "}
                              {format(
                                new Date(user.check_out_time),
                                "yyyy-MM-dd HH:mm"
                              )}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <DepotButton
                    variant="success"
                    onClick={() => handleReCheckIn(user)}
                    disabled={reCheckInUserId === user.id}
                    className="flex items-center gap-2 px-3 sm:px-5 py-2 sm:py-3 text-sm sm:text-base md:text-lg"
                  >
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                    {reCheckInUserId === user.id ? "Checking In..." : "Check In"}
                  </DepotButton>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffCheckIn;
