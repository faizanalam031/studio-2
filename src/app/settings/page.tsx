"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import AppLayout from "@/components/app-layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { User, Shield, Moon, Sun, Users, FileText } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Personality = "polite" | "confused" | "assertive" | "silent";

export default function SettingsPage() {
  const userAvatar = PlaceHolderImages.find(p => p.id === 'user-profile-avatar');
  const [personality, setPersonality] = useState<Personality>('polite');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    }
  }, []);

  const toggleTheme = (checked: boolean) => {
    setIsDarkMode(checked);
    if (checked) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <AppLayout>
      <div className="flex flex-col h-full">
        <header className="p-4 md:p-6">
          <h1 className="font-headline text-2xl md:text-3xl font-bold">Guardian Controls</h1>
          <p className="text-muted-foreground">Fine-tune how your AI Guardian protects you.</p>
        </header>

        <div className="flex-1 p-4 md:p-6 space-y-8 overflow-y-auto">
          {/* USER PROFILE CARD */}
          <Card>
            <CardHeader>
              <CardTitle>User Profile</CardTitle>
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

           {/* FAMILY SHIELD CARD */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Users className="text-primary"/> Family Shield</CardTitle>
              <CardDescription>Protect your loved ones by adding their numbers. The AI will auto-answer for them, and you'll get notified of any scam attempts.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="space-y-2">
                <Label htmlFor="family-phone">Add Family Member's Number</Label>
                <div className="flex gap-2">
                    <Input id="family-phone" placeholder="+91 00000 00000" />
                    <Button>Add</Button>
                </div>
              </div>
              <Button variant="secondary" className="w-full" asChild>
                <Link href="/family">Manage Family Shield</Link>
              </Button>
            </CardContent>
          </Card>


          {/* BEHAVIOR SECTION */}
          <Card>
            <CardHeader>
              <CardTitle>Behavior</CardTitle>
            </CardHeader>
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

          {/* PERSONALITY SECTION */}
          <Card>
            <CardHeader>
                <CardTitle>Guardian Personality</CardTitle>
                <CardDescription>Choose how the AI behaves when it engages with scammers.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="bg-muted p-1 rounded-full grid grid-cols-2 gap-1">
                {(['polite', 'confused', 'assertive', 'silent'] as Personality[]).map((p) => (
                    <Button
                    key={p}
                    onClick={() => setPersonality(p)}
                    variant={personality === p ? 'default' : 'ghost'}
                    className={cn(
                        "w-full rounded-full transition-colors capitalize",
                        personality === p ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:bg-background/50 hover:text-foreground'
                    )}
                    >
                    {p === 'confused' ? 'Confused Senior' : p === 'silent' ? 'Silent Listener' : p}
                    </Button>
                ))}
                </div>
            </CardContent>
          </Card>
          
          {/* APPEARANCE SECTION */}
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-2">
                    {isDarkMode ? <Moon className="h-5 w-5 text-muted-foreground" /> : <Sun className="h-5 w-5 text-muted-foreground" />}
                    <Label htmlFor="dark-mode" className="text-base font-medium">Dark Mode</Label>
                </div>
                <Switch id="dark-mode" checked={isDarkMode} onCheckedChange={toggleTheme} />
              </div>
            </CardContent>
          </Card>

          {/* STRICT PROTECTION CARD */}
          <Card className="bg-primary/10 border-primary/20">
            <CardHeader>
                <CardTitle className="text-primary flex items-center gap-2"><Shield /> Strict Protection</CardTitle>
            </CardHeader>
            <CardContent className="flex items-start gap-4">
              <div>
                <p className="text-sm text-primary/80 mb-4">In this mode, any caller not in your contacts will be screened by the AI first.</p>
                <Button variant="secondary" size="sm">Enable Strict Mode</Button>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </AppLayout>
  );
}
