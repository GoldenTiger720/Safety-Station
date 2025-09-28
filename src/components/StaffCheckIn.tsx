import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DepotButton } from '@/components/ui/depot-button';
import { Badge } from '@/components/ui/badge';
import { Clock, User, CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CheckInRecord {
  id: string;
  name: string;
  company: string;
  reason: string;
  time: string;
  status: 'checked-in' | 'checked-out';
}

interface StaffCheckInProps {
  onStaffUpdate?: (staff: CheckInRecord[]) => void;
}

const StaffCheckIn: React.FC<StaffCheckInProps> = ({ onStaffUpdate }) => {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [reason, setReason] = useState('');
  const [records, setRecords] = useState<CheckInRecord[]>([
    {
      id: '1',
      name: 'John Smith',
      company: 'ABC Corp',
      reason: 'Employee',
      time: '08:30',
      status: 'checked-in'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      company: 'XYZ Ltd',
      reason: 'Visitor',
      time: '08:45',
      status: 'checked-in'
    }
  ]);
  const { toast } = useToast();

  const handleCheckIn = () => {
    if (!name.trim() || !company.trim() || !reason) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const existingRecord = records.find(r => r.name === name && r.status === 'checked-in');

    if (existingRecord) {
      toast({
        title: "Already Checked In",
        description: `${name} is already checked in`,
        variant: "destructive"
      });
      return;
    }

    const newRecord: CheckInRecord = {
      id: Date.now().toString(),
      name,
      company,
      reason,
      time: new Date().toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
      }),
      status: 'checked-in'
    };

    const updatedRecords = [newRecord, ...records];
    setRecords(updatedRecords);
    onStaffUpdate?.(updatedRecords.filter(r => r.status === 'checked-in'));
    setName('');
    setCompany('');
    setReason('');
    toast({
      title: "Check-in Successful",
      description: `Welcome ${newRecord.name}! Check-in recorded at ${newRecord.time}`,
    });
  };

  const handleCheckOut = () => {
    if (!name.trim()) {
      toast({
        title: "Error",
        description: "Please enter your name",
        variant: "destructive"
      });
      return;
    }

    const existingRecord = records.find(r => r.name === name && r.status === 'checked-in');

    if (!existingRecord) {
      toast({
        title: "Not Checked In",
        description: `${name} is not currently checked in`,
        variant: "destructive"
      });
      return;
    }

    const updatedRecords = records.map(r =>
      r.name === name && r.status === 'checked-in'
        ? { ...r, status: 'checked-out' as const, time: new Date().toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit'
          }) }
        : r
    );

    setRecords(updatedRecords);
    onStaffUpdate?.(updatedRecords.filter(r => r.status === 'checked-in'));
    setName('');
    setCompany('');
    setReason('');
    toast({
      title: "Check-out Successful",
      description: `Goodbye ${existingRecord.name}! Have a safe day.`,
    });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <User className="w-6 h-6" />
            Staff Check In/Out System
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Input
              placeholder="Enter Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-lg h-12"
            />
            <Input
              placeholder="Enter Company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="text-lg h-12"
            />
            <Select value={reason} onValueChange={setReason}>
              <SelectTrigger className="text-lg h-12">
                <SelectValue placeholder="Select Reason for Visit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Employee">Employee</SelectItem>
                <SelectItem value="Visitor">Visitor</SelectItem>
                <SelectItem value="Supplier">Supplier</SelectItem>
                <SelectItem value="Audit">Audit</SelectItem>
                <SelectItem value="Safety">Safety</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2 justify-center">
            <DepotButton
              variant="success"
              size="lg"
              onClick={handleCheckIn}
              className="flex items-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              Check In
            </DepotButton>
            <DepotButton
              variant="accent"
              size="lg"
              onClick={handleCheckOut}
              className="flex items-center gap-2"
            >
              <XCircle className="w-5 h-5" />
              Check Out
            </DepotButton>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffCheckIn;