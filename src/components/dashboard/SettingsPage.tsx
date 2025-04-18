
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Bell, 
  Mail, 
  Lock, 
  Shield, 
  ExternalLink, 
  Palette,
  Moon,
  Sun
} from "lucide-react";

const SettingsPage = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("general");
  
  // Mock settings data
  const [settings, setSettings] = useState({
    general: {
      language: "English",
      timezone: "UTC-08:00 - Pacific Time",
      dateFormat: "MM/DD/YYYY"
    },
    notification: {
      emailNotifications: true,
      courseUpdates: true,
      newMessages: true,
      systemAnnouncements: true,
      marketingEmails: false
    },
    appearance: {
      darkMode: false,
      highContrast: false,
      fontSize: "Medium"
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: "30 minutes",
      passwordExpiryDays: 90
    }
  });
  
  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been updated successfully.",
    });
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Account Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>
      
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="flex flex-wrap w-full">
          <TabsTrigger value="general" className="flex-1">General</TabsTrigger>
          <TabsTrigger value="notification" className="flex-1">Notifications</TabsTrigger>
          <TabsTrigger value="appearance" className="flex-1">Appearance</TabsTrigger>
          <TabsTrigger value="security" className="flex-1">Security</TabsTrigger>
        </TabsList>
        
        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Manage your general account preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <select 
                  id="language" 
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background disabled:cursor-not-allowed disabled:opacity-50"
                  value={settings.general.language}
                  onChange={(e) => setSettings({
                    ...settings, 
                    general: {...settings.general, language: e.target.value}
                  })}
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                  <option value="Chinese">Chinese</option>
                  <option value="Japanese">Japanese</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <select 
                  id="timezone" 
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background disabled:cursor-not-allowed disabled:opacity-50"
                  value={settings.general.timezone}
                  onChange={(e) => setSettings({
                    ...settings, 
                    general: {...settings.general, timezone: e.target.value}
                  })}
                >
                  <option value="UTC-08:00 - Pacific Time">UTC-08:00 - Pacific Time</option>
                  <option value="UTC-05:00 - Eastern Time">UTC-05:00 - Eastern Time</option>
                  <option value="UTC+00:00 - Greenwich Mean Time">UTC+00:00 - Greenwich Mean Time</option>
                  <option value="UTC+01:00 - Central European Time">UTC+01:00 - Central European Time</option>
                  <option value="UTC+05:30 - Indian Standard Time">UTC+05:30 - Indian Standard Time</option>
                  <option value="UTC+08:00 - China Standard Time">UTC+08:00 - China Standard Time</option>
                  <option value="UTC+09:00 - Japan Standard Time">UTC+09:00 - Japan Standard Time</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dateFormat">Date Format</Label>
                <select 
                  id="dateFormat" 
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background disabled:cursor-not-allowed disabled:opacity-50"
                  value={settings.general.dateFormat}
                  onChange={(e) => setSettings({
                    ...settings, 
                    general: {...settings.general, dateFormat: e.target.value}
                  })}
                >
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Notification Settings */}
        <TabsContent value="notification">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Control how you receive notifications and alerts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <Label htmlFor="emailNotifications">Email Notifications</Label>
                </div>
                <Switch 
                  id="emailNotifications" 
                  checked={settings.notification.emailNotifications}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    notification: {...settings.notification, emailNotifications: checked}
                  })}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="courseUpdates">Course Updates</Label>
                  <p className="text-xs text-muted-foreground">Receive notifications about course updates and new content</p>
                </div>
                <Switch 
                  id="courseUpdates" 
                  checked={settings.notification.courseUpdates}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    notification: {...settings.notification, courseUpdates: checked}
                  })}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="newMessages">New Messages</Label>
                  <p className="text-xs text-muted-foreground">Receive notifications for new messages and comments</p>
                </div>
                <Switch 
                  id="newMessages" 
                  checked={settings.notification.newMessages}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    notification: {...settings.notification, newMessages: checked}
                  })}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="systemAnnouncements">System Announcements</Label>
                  <p className="text-xs text-muted-foreground">Receive important system announcements and alerts</p>
                </div>
                <Switch 
                  id="systemAnnouncements" 
                  checked={settings.notification.systemAnnouncements}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    notification: {...settings.notification, systemAnnouncements: checked}
                  })}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="marketingEmails">Marketing Emails</Label>
                  <p className="text-xs text-muted-foreground">Receive promotional emails and special offers</p>
                </div>
                <Switch 
                  id="marketingEmails" 
                  checked={settings.notification.marketingEmails}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    notification: {...settings.notification, marketingEmails: checked}
                  })}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Appearance Settings */}
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>
                Customize the appearance of your dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Moon className="h-4 w-4" />
                  <Label htmlFor="darkMode">Dark Mode</Label>
                </div>
                <Switch 
                  id="darkMode" 
                  checked={settings.appearance.darkMode}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    appearance: {...settings.appearance, darkMode: checked}
                  })}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Palette className="h-4 w-4" />
                  <Label htmlFor="highContrast">High Contrast</Label>
                </div>
                <Switch 
                  id="highContrast" 
                  checked={settings.appearance.highContrast}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    appearance: {...settings.appearance, highContrast: checked}
                  })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="fontSize">Font Size</Label>
                <select 
                  id="fontSize" 
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background disabled:cursor-not-allowed disabled:opacity-50"
                  value={settings.appearance.fontSize}
                  onChange={(e) => setSettings({
                    ...settings, 
                    appearance: {...settings.appearance, fontSize: e.target.value}
                  })}
                >
                  <option value="Small">Small</option>
                  <option value="Medium">Medium</option>
                  <option value="Large">Large</option>
                </select>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Security Settings */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your account security and privacy
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4" />
                    <Label htmlFor="twoFactorAuth">Two-Factor Authentication</Label>
                  </div>
                  <p className="text-xs text-muted-foreground">Add an extra layer of security to your account</p>
                </div>
                <Switch 
                  id="twoFactorAuth" 
                  checked={settings.security.twoFactorAuth}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    security: {...settings.security, twoFactorAuth: checked}
                  })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="sessionTimeout">Session Timeout</Label>
                <select 
                  id="sessionTimeout" 
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background disabled:cursor-not-allowed disabled:opacity-50"
                  value={settings.security.sessionTimeout}
                  onChange={(e) => setSettings({
                    ...settings, 
                    security: {...settings.security, sessionTimeout: e.target.value}
                  })}
                >
                  <option value="15 minutes">15 minutes</option>
                  <option value="30 minutes">30 minutes</option>
                  <option value="1 hour">1 hour</option>
                  <option value="2 hours">2 hours</option>
                  <option value="4 hours">4 hours</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="changePassword">Change Password</Label>
                <div className="grid gap-2">
                  <Input id="currentPassword" type="password" placeholder="Current password" />
                  <Input id="newPassword" type="password" placeholder="New password" />
                  <Input id="confirmPassword" type="password" placeholder="Confirm new password" />
                </div>
              </div>
              
              <div className="pt-2">
                <Button variant="secondary" className="w-full">
                  <Lock className="mr-2 h-4 w-4" />
                  Change Password
                </Button>
              </div>
              
              <div className="pt-2">
                <Button variant="destructive" className="w-full">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Log Out from All Devices
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
