import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import {
  Settings,
  Bell,
  Lock,
  DollarSign,
  Globe,
  Database,
  Shield,
  Mail,
  ArrowRight,
  Check,
} from 'lucide-react';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    // General Settings
    appName: 'PayzaGo',
    companyEmail: 'admin@payzago.com',
    companyPhone: '+1 (555) 123-4567',
    baseUrl: 'https://payzago.com',
    
    // Transaction Settings
    minTransaction: 1,
    maxTransaction: 10000,
    transactionFee: 2.5,
    feeType: 'percentage', // percentage or fixed
    
    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    
    // Security Settings
    twoFactorAuth: true,
    accountLockout: true,
    lockoutAttempts: 5,
    sessionTimeout: 30,
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Settings saved successfully!');
    } catch (error) {
      toast.error('Failed to save settings');
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetSettings = () => {
    toast.info('Settings reset to default');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Admin Settings</h1>
        <p className="text-muted-foreground">Manage system configuration and preferences</p>
      </div>

      {/* General Settings */}
      <Card className="border-0 shadow-card">
        <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Application name and contact information</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="appName">Application Name</Label>
              <Input
                id="appName"
                value={settings.appName}
                onChange={(e) => handleInputChange('appName', e.target.value)}
                placeholder="Enter app name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyEmail">Company Email</Label>
              <Input
                id="companyEmail"
                type="email"
                value={settings.companyEmail}
                onChange={(e) => handleInputChange('companyEmail', e.target.value)}
                placeholder="Enter company email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyPhone">Company Phone</Label>
              <Input
                id="companyPhone"
                value={settings.companyPhone}
                onChange={(e) => handleInputChange('companyPhone', e.target.value)}
                placeholder="Enter phone number"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="baseUrl">Base URL</Label>
              <Input
                id="baseUrl"
                value={settings.baseUrl}
                onChange={(e) => handleInputChange('baseUrl', e.target.value)}
                placeholder="Enter base URL"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transaction Settings */}
      <Card className="border-0 shadow-card">
        <CardHeader className="border-b bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
              <DollarSign className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <CardTitle>Transaction Settings</CardTitle>
              <CardDescription>Configure transaction limits and fees</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="minTransaction">Minimum Transaction Amount ($)</Label>
              <Input
                id="minTransaction"
                type="number"
                value={settings.minTransaction}
                onChange={(e) => handleInputChange('minTransaction', parseFloat(e.target.value))}
                placeholder="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxTransaction">Maximum Transaction Amount ($)</Label>
              <Input
                id="maxTransaction"
                type="number"
                value={settings.maxTransaction}
                onChange={(e) => handleInputChange('maxTransaction', parseFloat(e.target.value))}
                placeholder="10000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="transactionFee">Transaction Fee</Label>
              <div className="flex gap-2">
                <Input
                  id="transactionFee"
                  type="number"
                  value={settings.transactionFee}
                  onChange={(e) => handleInputChange('transactionFee', parseFloat(e.target.value))}
                  placeholder="2.5"
                  className="flex-1"
                />
                <Select value={settings.feeType} onValueChange={(value) => handleInputChange('feeType', value)}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">%</SelectItem>
                    <SelectItem value="fixed">$</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className="border-0 shadow-card">
        <CardHeader className="border-b bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Bell className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Control notification channels</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">Send notifications via email</p>
                </div>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(value) => handleInputChange('emailNotifications', value)}
              />
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">SMS Notifications</p>
                  <p className="text-sm text-muted-foreground">Send notifications via SMS</p>
                </div>
              </div>
              <Switch
                checked={settings.smsNotifications}
                onCheckedChange={(value) => handleInputChange('smsNotifications', value)}
              />
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Push Notifications</p>
                  <p className="text-sm text-muted-foreground">Send push notifications</p>
                </div>
              </div>
              <Switch
                checked={settings.pushNotifications}
                onCheckedChange={(value) => handleInputChange('pushNotifications', value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card className="border-0 shadow-card">
        <CardHeader className="border-b bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-950/20 dark:to-rose-950/20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <Lock className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure security and access control</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Two-Factor Authentication</p>
                  <p className="text-sm text-muted-foreground">Require 2FA for all admin accounts</p>
                </div>
              </div>
              <Switch
                checked={settings.twoFactorAuth}
                onCheckedChange={(value) => handleInputChange('twoFactorAuth', value)}
              />
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Account Lockout</p>
                  <p className="text-sm text-muted-foreground">Enable account lockout after failed attempts</p>
                </div>
              </div>
              <Switch
                checked={settings.accountLockout}
                onCheckedChange={(value) => handleInputChange('accountLockout', value)}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="lockoutAttempts">Lockout After Failed Attempts</Label>
              <Input
                id="lockoutAttempts"
                type="number"
                value={settings.lockoutAttempts}
                onChange={(e) => handleInputChange('lockoutAttempts', parseInt(e.target.value))}
                placeholder="5"
                disabled={!settings.accountLockout}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
              <Input
                id="sessionTimeout"
                type="number"
                value={settings.sessionTimeout}
                onChange={(e) => handleInputChange('sessionTimeout', parseInt(e.target.value))}
                placeholder="30"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Information */}
      <Card className="border-0 shadow-card">
        <CardHeader className="border-b bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <Database className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <CardTitle>System Information</CardTitle>
              <CardDescription>View system details and status</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">System Version</p>
              <p className="font-semibold">v1.0.0</p>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">Database Status</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="h-2 w-2 rounded-full bg-success"></div>
                <p className="font-semibold">Connected</p>
              </div>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">API Status</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="h-2 w-2 rounded-full bg-success"></div>
                <p className="font-semibold">Operational</p>
              </div>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">Last Backup</p>
              <p className="font-semibold">Today at 2:30 AM</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-3 justify-end">
        <Button variant="outline" onClick={handleResetSettings}>
          Reset to Default
        </Button>
        <Button onClick={handleSaveSettings} disabled={isSaving} className="gap-2">
          {isSaving ? (
            <>
              <span className="animate-spin">⏳</span>
              Saving...
            </>
          ) : (
            <>
              <Check className="h-4 w-4" />
              Save Settings
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default AdminSettings;
