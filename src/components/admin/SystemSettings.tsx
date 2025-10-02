import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import {
  Settings,
  Save,
  RefreshCw,
  Shield,
  Database,
  Mail,
  Globe,
  Bell,
  Users,
  Lock,
  Key,
  Server,
  HardDrive,
  Wifi,
  Monitor,
  Smartphone,
  Download,
  Upload,
  AlertTriangle,
  CheckCircle,
  Info,
  Eye,
  EyeOff
} from "lucide-react";

interface SystemSettingsProps {
  className?: string;
}

const SystemSettings: React.FC<SystemSettingsProps> = ({ className }) => {
  const [settings, setSettings] = useState({
    general: {
      siteName: "Safety & Performance Station",
      siteDescription: "Warehouse Safety and Performance Management System",
      timezone: "UTC",
      dateFormat: "MM/DD/YYYY",
      timeFormat: "12",
      language: "en",
      maintenanceMode: false,
      defaultTheme: "light"
    },
    security: {
      passwordMinLength: 8,
      passwordRequireSpecial: true,
      passwordRequireNumbers: true,
      passwordRequireUppercase: true,
      sessionTimeout: 30,
      maxLoginAttempts: 5,
      lockoutDuration: 15,
      twoFactorAuth: false,
      ipWhitelist: "",
      apiRateLimit: 1000
    },
    notifications: {
      emailNotifications: true,
      systemAlerts: true,
      securityAlerts: true,
      maintenanceAlerts: true,
      userRegistration: true,
      emailHost: "smtp.company.com",
      emailPort: 587,
      emailUsername: "noreply@company.com",
      emailPassword: "",
      emailFromName: "Safety Station"
    },
    backup: {
      autoBackup: true,
      backupFrequency: "daily",
      backupRetention: 30,
      backupLocation: "/backups",
      cloudBackup: false,
      cloudProvider: "aws",
      cloudBucket: ""
    },
    api: {
      enableApi: true,
      apiKey: "sk-1234567890abcdef",
      allowCors: true,
      corsOrigins: "*",
      apiVersion: "v1",
      enableSwagger: true,
      enableLogging: true,
      logLevel: "info"
    },
    performance: {
      cacheEnabled: true,
      cacheTtl: 3600,
      compressionEnabled: true,
      compressionLevel: 6,
      maxUploadSize: 100,
      sessionCleanup: true,
      logRetention: 90,
      enableCdn: false
    }
  });

  const [showApiKey, setShowApiKey] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSaveSettings = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Success",
        description: "Settings saved successfully"
      });
    }, 1500);
  };

  const handleTestEmail = async () => {
    toast({
      title: "Email Test",
      description: "Test email sent successfully"
    });
  };

  const handleGenerateApiKey = () => {
    const newApiKey = `sk-${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
    setSettings({
      ...settings,
      api: {
        ...settings.api,
        apiKey: newApiKey
      }
    });
    toast({
      title: "Success",
      description: "New API key generated"
    });
  };

  const updateSetting = (category: keyof typeof settings, key: string, value: any) => {
    setSettings({
      ...settings,
      [category]: {
        ...settings[category],
        [key]: value
      }
    });
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold">System Settings</h2>
          <p className="text-muted-foreground">Configure system-wide settings and preferences</p>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleSaveSettings} disabled={isLoading} className="flex items-center gap-2">
            {isLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save Changes
          </Button>
        </div>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="backup" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            Backup
          </TabsTrigger>
          <TabsTrigger value="api" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            API
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <Monitor className="h-4 w-4" />
            Performance
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>General Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={settings.general.siteName}
                    onChange={(e) => updateSetting('general', 'siteName', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select
                    value={settings.general.timezone}
                    onValueChange={(value) => updateSetting('general', 'timezone', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="America/New_York">Eastern Time</SelectItem>
                      <SelectItem value="America/Chicago">Central Time</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="siteDescription">Site Description</Label>
                <Textarea
                  id="siteDescription"
                  value={settings.general.siteDescription}
                  onChange={(e) => updateSetting('general', 'siteDescription', e.target.value)}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="dateFormat">Date Format</Label>
                  <Select
                    value={settings.general.dateFormat}
                    onValueChange={(value) => updateSetting('general', 'dateFormat', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="timeFormat">Time Format</Label>
                  <Select
                    value={settings.general.timeFormat}
                    onValueChange={(value) => updateSetting('general', 'timeFormat', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12">12 Hour</SelectItem>
                      <SelectItem value="24">24 Hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="language">Language</Label>
                  <Select
                    value={settings.general.language}
                    onValueChange={(value) => updateSetting('general', 'language', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="flex items-center space-x-2">
                <Switch
                  checked={settings.general.maintenanceMode}
                  onCheckedChange={(checked) => updateSetting('general', 'maintenanceMode', checked)}
                />
                <Label>Maintenance Mode</Label>
              </div>

              {settings.general.maintenanceMode && (
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Maintenance mode is enabled. Only administrators can access the system.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Password Policy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="passwordMinLength">Minimum Password Length</Label>
                  <Input
                    id="passwordMinLength"
                    type="number"
                    value={settings.security.passwordMinLength}
                    onChange={(e) => updateSetting('security', 'passwordMinLength', parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={settings.security.sessionTimeout}
                    onChange={(e) => updateSetting('security', 'sessionTimeout', parseInt(e.target.value))}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={settings.security.passwordRequireSpecial}
                    onCheckedChange={(checked) => updateSetting('security', 'passwordRequireSpecial', checked)}
                  />
                  <Label>Require Special Characters</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={settings.security.passwordRequireNumbers}
                    onCheckedChange={(checked) => updateSetting('security', 'passwordRequireNumbers', checked)}
                  />
                  <Label>Require Numbers</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={settings.security.passwordRequireUppercase}
                    onCheckedChange={(checked) => updateSetting('security', 'passwordRequireUppercase', checked)}
                  />
                  <Label>Require Uppercase Letters</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={settings.security.twoFactorAuth}
                    onCheckedChange={(checked) => updateSetting('security', 'twoFactorAuth', checked)}
                  />
                  <Label>Enable Two-Factor Authentication</Label>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Login Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                  <Input
                    id="maxLoginAttempts"
                    type="number"
                    value={settings.security.maxLoginAttempts}
                    onChange={(e) => updateSetting('security', 'maxLoginAttempts', parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="lockoutDuration">Lockout Duration (minutes)</Label>
                  <Input
                    id="lockoutDuration"
                    type="number"
                    value={settings.security.lockoutDuration}
                    onChange={(e) => updateSetting('security', 'lockoutDuration', parseInt(e.target.value))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="ipWhitelist">IP Whitelist (one per line)</Label>
                <Textarea
                  id="ipWhitelist"
                  value={settings.security.ipWhitelist}
                  onChange={(e) => updateSetting('security', 'ipWhitelist', e.target.value)}
                  placeholder="192.168.1.0/24&#10;10.0.0.0/8"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="emailHost">SMTP Host</Label>
                  <Input
                    id="emailHost"
                    value={settings.notifications.emailHost}
                    onChange={(e) => updateSetting('notifications', 'emailHost', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="emailPort">SMTP Port</Label>
                  <Input
                    id="emailPort"
                    type="number"
                    value={settings.notifications.emailPort}
                    onChange={(e) => updateSetting('notifications', 'emailPort', parseInt(e.target.value))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="emailUsername">Username</Label>
                  <Input
                    id="emailUsername"
                    value={settings.notifications.emailUsername}
                    onChange={(e) => updateSetting('notifications', 'emailUsername', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="emailFromName">From Name</Label>
                  <Input
                    id="emailFromName"
                    value={settings.notifications.emailFromName}
                    onChange={(e) => updateSetting('notifications', 'emailFromName', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="emailPassword">Password</Label>
                <Input
                  id="emailPassword"
                  type="password"
                  value={settings.notifications.emailPassword}
                  onChange={(e) => updateSetting('notifications', 'emailPassword', e.target.value)}
                  placeholder="••••••••"
                />
              </div>

              <Button onClick={handleTestEmail} variant="outline" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Test Email Configuration
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={settings.notifications.emailNotifications}
                  onCheckedChange={(checked) => updateSetting('notifications', 'emailNotifications', checked)}
                />
                <Label>Email Notifications</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={settings.notifications.systemAlerts}
                  onCheckedChange={(checked) => updateSetting('notifications', 'systemAlerts', checked)}
                />
                <Label>System Alerts</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={settings.notifications.securityAlerts}
                  onCheckedChange={(checked) => updateSetting('notifications', 'securityAlerts', checked)}
                />
                <Label>Security Alerts</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={settings.notifications.maintenanceAlerts}
                  onCheckedChange={(checked) => updateSetting('notifications', 'maintenanceAlerts', checked)}
                />
                <Label>Maintenance Alerts</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={settings.notifications.userRegistration}
                  onCheckedChange={(checked) => updateSetting('notifications', 'userRegistration', checked)}
                />
                <Label>User Registration Notifications</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Backup Settings */}
        <TabsContent value="backup" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Backup Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={settings.backup.autoBackup}
                  onCheckedChange={(checked) => updateSetting('backup', 'autoBackup', checked)}
                />
                <Label>Enable Automatic Backups</Label>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="backupFrequency">Backup Frequency</Label>
                  <Select
                    value={settings.backup.backupFrequency}
                    onValueChange={(value) => updateSetting('backup', 'backupFrequency', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="backupRetention">Retention Period (days)</Label>
                  <Input
                    id="backupRetention"
                    type="number"
                    value={settings.backup.backupRetention}
                    onChange={(e) => updateSetting('backup', 'backupRetention', parseInt(e.target.value))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="backupLocation">Backup Location</Label>
                <Input
                  id="backupLocation"
                  value={settings.backup.backupLocation}
                  onChange={(e) => updateSetting('backup', 'backupLocation', e.target.value)}
                />
              </div>

              <Separator />

              <div className="flex items-center space-x-2">
                <Switch
                  checked={settings.backup.cloudBackup}
                  onCheckedChange={(checked) => updateSetting('backup', 'cloudBackup', checked)}
                />
                <Label>Enable Cloud Backup</Label>
              </div>

              {settings.backup.cloudBackup && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cloudProvider">Cloud Provider</Label>
                    <Select
                      value={settings.backup.cloudProvider}
                      onValueChange={(value) => updateSetting('backup', 'cloudProvider', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="aws">Amazon S3</SelectItem>
                        <SelectItem value="gcp">Google Cloud Storage</SelectItem>
                        <SelectItem value="azure">Azure Blob Storage</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="cloudBucket">Bucket/Container Name</Label>
                    <Input
                      id="cloudBucket"
                      value={settings.backup.cloudBucket}
                      onChange={(e) => updateSetting('backup', 'cloudBucket', e.target.value)}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* API Settings */}
        <TabsContent value="api" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>API Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={settings.api.enableApi}
                  onCheckedChange={(checked) => updateSetting('api', 'enableApi', checked)}
                />
                <Label>Enable API</Label>
              </div>

              <div>
                <Label htmlFor="apiKey">API Key</Label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Input
                      id="apiKey"
                      type={showApiKey ? "text" : "password"}
                      value={settings.api.apiKey}
                      readOnly
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowApiKey(!showApiKey)}
                    >
                      {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  <Button onClick={handleGenerateApiKey} variant="outline">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="apiVersion">API Version</Label>
                  <Select
                    value={settings.api.apiVersion}
                    onValueChange={(value) => updateSetting('api', 'apiVersion', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="v1">Version 1.0</SelectItem>
                      <SelectItem value="v2">Version 2.0</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="logLevel">Log Level</Label>
                  <Select
                    value={settings.api.logLevel}
                    onValueChange={(value) => updateSetting('api', 'logLevel', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="error">Error</SelectItem>
                      <SelectItem value="warn">Warning</SelectItem>
                      <SelectItem value="info">Info</SelectItem>
                      <SelectItem value="debug">Debug</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={settings.api.allowCors}
                    onCheckedChange={(checked) => updateSetting('api', 'allowCors', checked)}
                  />
                  <Label>Allow CORS</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={settings.api.enableSwagger}
                    onCheckedChange={(checked) => updateSetting('api', 'enableSwagger', checked)}
                  />
                  <Label>Enable Swagger Documentation</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={settings.api.enableLogging}
                    onCheckedChange={(checked) => updateSetting('api', 'enableLogging', checked)}
                  />
                  <Label>Enable API Logging</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Settings */}
        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Optimization</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={settings.performance.cacheEnabled}
                    onCheckedChange={(checked) => updateSetting('performance', 'cacheEnabled', checked)}
                  />
                  <Label>Enable Caching</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={settings.performance.compressionEnabled}
                    onCheckedChange={(checked) => updateSetting('performance', 'compressionEnabled', checked)}
                  />
                  <Label>Enable Compression</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={settings.performance.sessionCleanup}
                    onCheckedChange={(checked) => updateSetting('performance', 'sessionCleanup', checked)}
                  />
                  <Label>Automatic Session Cleanup</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={settings.performance.enableCdn}
                    onCheckedChange={(checked) => updateSetting('performance', 'enableCdn', checked)}
                  />
                  <Label>Enable CDN</Label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cacheTtl">Cache TTL (seconds)</Label>
                  <Input
                    id="cacheTtl"
                    type="number"
                    value={settings.performance.cacheTtl}
                    onChange={(e) => updateSetting('performance', 'cacheTtl', parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="maxUploadSize">Max Upload Size (MB)</Label>
                  <Input
                    id="maxUploadSize"
                    type="number"
                    value={settings.performance.maxUploadSize}
                    onChange={(e) => updateSetting('performance', 'maxUploadSize', parseInt(e.target.value))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="compressionLevel">Compression Level (1-9)</Label>
                  <Input
                    id="compressionLevel"
                    type="number"
                    min="1"
                    max="9"
                    value={settings.performance.compressionLevel}
                    onChange={(e) => updateSetting('performance', 'compressionLevel', parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="logRetention">Log Retention (days)</Label>
                  <Input
                    id="logRetention"
                    type="number"
                    value={settings.performance.logRetention}
                    onChange={(e) => updateSetting('performance', 'logRetention', parseInt(e.target.value))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemSettings;