import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { User, Mail, Phone, School, Briefcase, Calendar, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  address: string;
  birthDate: string;
  bio: string;
  education: string;
  occupation: string;
}

const ProfilePage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  
  const [profileData, setProfileData] = useState<ProfileData>({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    birthDate: "",
    bio: "",
    education: "",
    occupation: user?.role || ""
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user?.id) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        toast({
          title: "Error fetching profile",
          description: error.message,
          variant: "destructive"
        });
        return;
      }

      if (data) {
        setProfileData(prev => ({
          ...prev,
          name: data.name || user.name || "",
          occupation: data.role || user.role || "",
          // Keep other fields from local state if not in DB
          phone: prev.phone,
          address: prev.address,
          birthDate: prev.birthDate,
          bio: prev.bio,
          education: prev.education
        }));
      }
    };

    fetchProfileData();
  }, [user, toast]);

  const handleSaveProfile = async () => {
    if (!user?.id) return;

    const { error } = await supabase
      .from('profiles')
      .update({
        name: profileData.name,
        role: profileData.occupation,
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id);

    if (error) {
      toast({
        title: "Error updating profile",
        description: error.message,
        variant: "destructive"
      });
      return;
    }

    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully."
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Profile</h1>
          <p className="text-muted-foreground">
            View and update your profile information
          </p>
        </div>
        <Button 
          variant={isEditing ? "default" : "outline"}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Cancel Editing" : "Edit Profile"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="text-center">Profile</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <Avatar className="h-32 w-32 mb-4">
              <AvatarImage src={user?.avatar} />
              <AvatarFallback className="text-2xl">
                {profileData.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <h3 className="text-xl font-bold">{profileData.name}</h3>
            <p className="text-muted-foreground capitalize">{profileData.occupation}</p>
            
            <div className="w-full mt-6 space-y-3">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{profileData.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{profileData.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{profileData.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{profileData.birthDate}</span>
              </div>
            </div>
          </CardContent>
          {isEditing && (
            <CardFooter>
              <Button className="w-full" onClick={handleSaveProfile}>
                Save Profile
              </Button>
            </CardFooter>
          )}
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Update your personal information</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs 
              defaultValue={activeTab} 
              onValueChange={setActiveTab}
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                <TabsTrigger value="education">Education & Career</TabsTrigger>
              </TabsList>
              
              <TabsContent value="personal" className="space-y-4 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name"
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input 
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="birthDate">Birth Date</Label>
                    <Input 
                      id="birthDate"
                      value={profileData.birthDate}
                      onChange={(e) => setProfileData({...profileData, birthDate: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input 
                    id="address"
                    value={profileData.address}
                    onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <textarea 
                    id="bio"
                    className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background disabled:cursor-not-allowed disabled:opacity-50"
                    value={profileData.bio}
                    onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="education" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="education">Education</Label>
                  <Input 
                    id="education"
                    value={profileData.education}
                    onChange={(e) => setProfileData({...profileData, education: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="occupation">Occupation</Label>
                  <Input 
                    id="occupation"
                    value={profileData.occupation}
                    onChange={(e) => setProfileData({...profileData, occupation: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          {isEditing && (
            <CardFooter>
              <Button onClick={handleSaveProfile}>Save Changes</Button>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
