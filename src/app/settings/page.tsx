import Image from "next/image";
import AppLayout from "@/components/app-layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { User } from "lucide-react";

export default function SettingsPage() {
  const userAvatar = PlaceHolderImages.find(p => p.id === 'user-profile-avatar');

  return (
    <AppLayout>
      <div className="flex flex-col h-full">
        <header className="p-4 md:p-6 border-b">
          <h1 className="font-headline text-2xl md:text-3xl font-bold">Guardian Controls</h1>
          <p className="text-muted-foreground">Fine-tune how your AI Guardian protects you.</p>
        </header>

        <div className="flex-1 p-4 md:p-6 space-y-8 overflow-y-auto">
          <Card>
            <CardHeader>
              <CardTitle>User Profile</CardTitle>
              <CardDescription>Manage your personal information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                {userAvatar ? (
                  <Image src={userAvatar.imageUrl} alt="User Avatar" width={64} height={64} className="rounded-full" data-ai-hint={userAvatar.imageHint} />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                    <User className="w-8 h-8 text-muted-foreground"/>
                  </div>
                )}
                <Button variant="outline">Change Photo</Button>
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue="User" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" defaultValue="+91 98765 43210" disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="hi">Hindi</SelectItem>
                    <SelectItem value="hinglish">Hinglish</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Protection Sensitivity</CardTitle>
              <CardDescription>How proactively should the AI intervene?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sensitivity">Sensitivity Level</Label>
                <Select defaultValue="balanced">
                  <SelectTrigger id="sensitivity">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relaxed">Relaxed</SelectItem>
                    <SelectItem value="balanced">Balanced</SelectItem>
                    <SelectItem value="strict">Strict</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-answer" className="text-base">Auto AI Answer</Label>
                  <p className="text-sm text-muted-foreground">Automatically let AI handle calls marked as high-risk scams.</p>
                </div>
                <Switch id="auto-answer" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Guardian Behavior</CardTitle>
              <CardDescription>Choose the AI's personality when handling calls.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="behavior">AI Personality</Label>
                <Select defaultValue="polite">
                  <SelectTrigger id="behavior">
                    <SelectValue placeholder="Select personality" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="polite">Polite</SelectItem>
                    <SelectItem value="confused">Confused</SelectItem>
                    <SelectItem value="assertive">Assertive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button>Save Changes</Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
