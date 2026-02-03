"use client";

import Image from "next/image";
import { useState } from "react";
import AppLayout from "@/components/app-layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { User, Shield } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

type Personality = "polite" | "confused" | "assertive";

export default function SettingsPage() {
  const userAvatar = PlaceHolderImages.find(p => p.id === 'user-profile-avatar');
  const [personality, setPersonality] = useState<Personality>('polite');

  return (
    <AppLayout>
      <div className="flex flex-col h-full">
        <header className="p-4 md:p-6">
          <h1 className="font-headline text-2xl md:text-3xl font-bold">Guardian Controls</h1>
          <p className="text-muted-foreground">Fine-tune how your AI Guardian protects you.</p>
        </header>

        <div className="flex-1 p-4 md:p-6 space-y-8 overflow-y-auto">
          {/* USER PROFILE CARD - Kept as requested */}
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

          {/* BEHAVIOR SECTION */}
          <div>
            <h2 className="text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Behavior</h2>
            <Card>
              <CardContent className="divide-y divide-border p-0">
                <div className="flex items-center justify-between p-4">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-answer" className="text-base font-medium">Auto AI Answer</Label>
                    <p className="text-sm text-muted-foreground">Let AI answer confirmed scam calls automatically.</p>
                  </div>
                  <Switch id="auto-answer" defaultChecked={true} />
                </div>
                <div className="flex items-center justify-between p-4">
                  <div className="space-y-0.5">
                    <Label htmlFor="silent-monitoring" className="text-base font-medium">Silent Monitoring</Label>
                    <p className="text-sm text-muted-foreground">Listen to AI takeover without interrupting.</p>
                  </div>
                  <Switch id="silent-monitoring" defaultChecked={true} />
                </div>
                <div className="flex items-center justify-between p-4">
                  <div className="space-y-0.5">
                    <Label htmlFor="gov-reporting" className="text-base font-medium">Government Reporting</Label>
                    <p className="text-sm text-muted-foreground">Automatically share scam data with Cybercrime portal.</p>
                  </div>
                  <Switch id="gov-reporting" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* PERSONALITY SECTION */}
          <div>
            <h2 className="text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Personality</h2>
            <div className="bg-muted p-1 rounded-full flex items-center">
              {(['polite', 'confused', 'assertive'] as Personality[]).map((p) => (
                <Button
                  key={p}
                  onClick={() => setPersonality(p)}
                  variant={personality === p ? 'default' : 'ghost'}
                  className={cn(
                    "w-full rounded-full transition-colors capitalize",
                    personality === p ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:bg-background/50 hover:text-foreground'
                  )}
                >
                  {p}
                </Button>
              ))}
            </div>
          </div>
          
          {/* STRICT PROTECTION CARD */}
          <Card className="bg-primary/10 border-primary/20">
            <CardContent className="p-4 flex items-start gap-4">
              <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-primary">Strict Protection</h3>
                <p className="text-sm text-primary/80">In this mode, any caller not in your contacts will be screened by the AI first.</p>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </AppLayout>
  );
}
