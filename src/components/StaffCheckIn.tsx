import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { DepotButton } from '@/components/ui/depot-button';
import { Badge } from '@/components/ui/badge';
import { Clock, User, CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CheckInRecord {
  id: string;
  employeeId: string;
  name: string;
  time: string;
  status: 'checked-in' | 'checked-out';
}

const StaffCheckIn: React.FC = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [records, setRecords] = useState<CheckInRecord[]>([
    {
      id: '1',
      employeeId: 'EMP001',
      name: 'John Smith',
      time: '08:30',
      status: 'checked-in'
    },
    {
      id: '2',
      employeeId: 'EMP002',
      name: 'Sarah Johnson',
      time: '08:45',
      status: 'checked-in'
    }
  ]);
  const { toast } = useToast();

  const handleCheckIn = () => {
    if (!employeeId.trim()) {
      toast({
        title: "Error",
        description: "Please enter your Employee ID",
        variant: "destructive"
      });
      return;
    }

    const existingRecord = records.find(r => r.employeeId === employeeId && r.status === 'checked-in');
    
    if (existingRecord) {
      toast({
        title: "Already Checked In",
        description: `Employee ${employeeId} is already checked in`,
        variant: "destructive"
      });
      return;
    }

    const newRecord: CheckInRecord = {
      id: Date.now().toString(),
      employeeId,
      name: `Employee ${employeeId}`,
      time: new Date().toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      status: 'checked-in'
    };

    setRecords([newRecord, ...records]);
    setEmployeeId('');
    toast({
      title: "Check-in Successful",
      description: `Welcome ${newRecord.name}! Check-in recorded at ${newRecord.time}`,
    });
  };

  const handleCheckOut = () => {
    if (!employeeId.trim()) {
      toast({
        title: "Error",
        description: "Please enter your Employee ID",
        variant: "destructive"
      });
      return;
    }

    const existingRecord = records.find(r => r.employeeId === employeeId && r.status === 'checked-in');
    
    if (!existingRecord) {
      toast({
        title: "Not Checked In",
        description: `Employee ${employeeId} is not currently checked in`,
        variant: "destructive"
      });
      return;
    }

    const updatedRecords = records.map(r => 
      r.employeeId === employeeId && r.status === 'checked-in' 
        ? { ...r, status: 'checked-out' as const, time: new Date().toLocaleTimeString('en-US', { 
            hour12: false, 
            hour: '2-digit', 
            minute: '2-digit' 
          }) }
        : r
    );

    setRecords(updatedRecords);
    setEmployeeId('');
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
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              placeholder="Enter Employee ID"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value.toUpperCase())}
              className="flex-1 text-lg h-12"
            />
            <div className="flex gap-2">
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
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Today's Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {records.slice(0, 8).map((record) => (
              <div key={record.id} className="flex items-center justify-between p-3 bg-depot-surface rounded-lg">
                <div className="flex items-center gap-3">
                  <Badge 
                    variant={record.status === 'checked-in' ? 'default' : 'secondary'}
                    className={record.status === 'checked-in' ? 'bg-depot-success' : 'bg-depot-accent'}
                  >
                    {record.status === 'checked-in' ? 'IN' : 'OUT'}
                  </Badge>
                  <div>
                    <p className="font-medium">{record.name}</p>
                    <p className="text-sm text-muted-foreground">{record.employeeId}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-mono text-lg">{record.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffCheckIn;