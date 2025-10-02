import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import {
  Activity,
  Users,
  Clock,
  TrendingUp,
  TrendingDown,
  Eye,
  Calendar,
  Download,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Globe,
  Monitor,
  Smartphone,
  Tablet
} from "lucide-react";

interface AnalyticsDashboardProps {
  className?: string;
}

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ className }) => {
  const [selectedPeriod, setSelectedPeriod] = useState("7d");

  // Mock data for various charts
  const userActivityData = [
    { date: '2025-09-25', checkIns: 45, checkOuts: 42, active: 38 },
    { date: '2025-09-26', checkIns: 52, checkOuts: 48, active: 44 },
    { date: '2025-09-27', checkIns: 38, checkOuts: 41, active: 35 },
    { date: '2025-09-28', checkIns: 67, checkOuts: 63, active: 58 },
    { date: '2025-09-29', checkIns: 71, checkOuts: 68, active: 62 }
  ];

  const safetyMetricsData = [
    { month: 'May', incidents: 2, nearmisses: 8, trainings: 45 },
    { month: 'Jun', incidents: 1, nearmisses: 5, trainings: 52 },
    { month: 'Jul', incidents: 0, nearmisses: 3, trainings: 48 },
    { month: 'Aug', incidents: 1, nearmisses: 7, trainings: 61 },
    { month: 'Sep', incidents: 0, nearmisses: 2, trainings: 67 }
  ];

  const deviceUsageData = [
    { name: 'Desktop', value: 45, color: '#8884d8' },
    { name: 'Tablet', value: 35, color: '#82ca9d' },
    { name: 'Mobile', value: 20, color: '#ffc658' }
  ];

  const departmentActivityData = [
    { department: 'Safety', users: 24, sessions: 156 },
    { department: 'Operations', users: 18, sessions: 134 },
    { department: 'Maintenance', users: 15, sessions: 98 },
    { department: 'Administration', users: 8, sessions: 67 },
    { department: 'Security', users: 6, sessions: 45 }
  ];

  const systemPerformanceData = [
    { time: '00:00', cpu: 45, memory: 67, requests: 234 },
    { time: '04:00', cpu: 32, memory: 54, requests: 123 },
    { time: '08:00', cpu: 78, memory: 82, requests: 567 },
    { time: '12:00', cpu: 85, memory: 89, requests: 634 },
    { time: '16:00', cpu: 92, memory: 91, requests: 789 },
    { time: '20:00', cpu: 67, memory: 75, requests: 456 }
  ];

  const kpis = [
    {
      title: "Total Users",
      value: "247",
      change: "+12%",
      trend: "up",
      icon: Users,
      description: "from last month"
    },
    {
      title: "Daily Check-ins",
      value: "59",
      change: "+8%",
      trend: "up",
      icon: Clock,
      description: "today's average"
    },
    {
      title: "System Uptime",
      value: "99.8%",
      change: "+0.2%",
      trend: "up",
      icon: Activity,
      description: "last 30 days"
    },
    {
      title: "Safety Incidents",
      value: "0",
      change: "-100%",
      trend: "up",
      icon: CheckCircle,
      description: "this month"
    }
  ];

  const alerts = [
    {
      id: 1,
      type: "warning",
      title: "High Memory Usage",
      description: "System memory usage is at 89%",
      time: "5 minutes ago"
    },
    {
      id: 2,
      type: "info",
      title: "Scheduled Maintenance",
      description: "System maintenance scheduled for tonight",
      time: "2 hours ago"
    },
    {
      id: 3,
      type: "success",
      title: "Backup Completed",
      description: "Daily backup completed successfully",
      time: "4 hours ago"
    }
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
          <p className="text-muted-foreground">Monitor system performance and user activity</p>
        </div>

        <div className="flex gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 Hours</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="90d">Last 90 Days</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>

          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                {kpi.trend === "up" ? (
                  <TrendingUp className="h-3 w-3 text-green-500" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-500" />
                )}
                <span className={kpi.trend === "up" ? "text-green-500" : "text-red-500"}>
                  {kpi.change}
                </span>
                {kpi.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Analytics Content */}
      <Tabs defaultValue="activity" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="activity">User Activity</TabsTrigger>
          <TabsTrigger value="safety">Safety Metrics</TabsTrigger>
          <TabsTrigger value="system">System Performance</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="activity" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Daily Check-ins/Check-outs</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={userActivityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="checkIns" stroke="#8884d8" name="Check-ins" />
                    <Line type="monotone" dataKey="checkOuts" stroke="#82ca9d" name="Check-outs" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Device Usage Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={deviceUsageData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {deviceUsageData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Department Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={departmentActivityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="department" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="users" fill="#8884d8" name="Active Users" />
                    <Bar dataKey="sessions" fill="#82ca9d" name="Sessions" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Active Users Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={userActivityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="active" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="safety" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Safety Metrics Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={safetyMetricsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="incidents" stroke="#ff7300" name="Incidents" strokeWidth={3} />
                    <Line type="monotone" dataKey="nearmisses" stroke="#ffbb28" name="Near Misses" strokeWidth={2} />
                    <Line type="monotone" dataKey="trainings" stroke="#00ff00" name="Trainings Completed" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Safety Performance Indicators</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Days Without Incident</span>
                    <span className="text-lg font-bold text-green-600">47</span>
                  </div>
                  <Progress value={94} className="w-full" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Training Completion Rate</span>
                    <span className="text-lg font-bold text-blue-600">94%</span>
                  </div>
                  <Progress value={94} className="w-full" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Safety Score</span>
                    <span className="text-lg font-bold text-green-600">A+</span>
                  </div>
                  <Progress value={96} className="w-full" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Compliance Rating</span>
                    <span className="text-lg font-bold text-green-600">98%</span>
                  </div>
                  <Progress value={98} className="w-full" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>System Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={systemPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="cpu" stroke="#8884d8" name="CPU %" />
                    <Line type="monotone" dataKey="memory" stroke="#82ca9d" name="Memory %" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>API Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={systemPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="requests" stroke="#ffc658" fill="#ffc658" fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* System Health */}
          <Card>
            <CardHeader>
              <CardTitle>System Health Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3 p-4 border rounded-lg">
                  <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">Database</p>
                    <p className="text-sm text-muted-foreground">Operational</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 border rounded-lg">
                  <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">API Server</p>
                    <p className="text-sm text-muted-foreground">Operational</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 border rounded-lg">
                  <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">Storage</p>
                    <p className="text-sm text-muted-foreground">High Usage (89%)</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>System Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {alerts.map((alert) => (
                    <div key={alert.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                      <div className={`h-2 w-2 rounded-full ${
                        alert.type === 'warning' ? 'bg-yellow-500' :
                        alert.type === 'info' ? 'bg-blue-500' : 'bg-green-500'
                      }`} />
                      <div className="flex-1">
                        <p className="font-medium">{alert.title}</p>
                        <p className="text-sm text-muted-foreground">{alert.description}</p>
                      </div>
                      <p className="text-xs text-muted-foreground">{alert.time}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-blue-800">Peak Usage Hours</h4>
                  <p className="text-sm text-blue-600">System usage peaks between 12:00-16:00. Consider load balancing optimization.</p>
                </div>

                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-medium text-green-800">Safety Achievement</h4>
                  <p className="text-sm text-green-600">47 consecutive days without incidents. Excellent safety performance!</p>
                </div>

                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-medium text-yellow-800">Storage Warning</h4>
                  <p className="text-sm text-yellow-600">Storage usage at 89%. Consider cleanup or expansion.</p>
                </div>

                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <h4 className="font-medium text-purple-800">User Growth</h4>
                  <p className="text-sm text-purple-600">User base grew 12% this month. System scaling may be needed.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsDashboard;