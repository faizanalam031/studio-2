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
import { User, Shield, Moon, Sun, FileText, Key, Check, AlertCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Personality = "polite" | "confused" | "assertive" | "silent";

export default function SettingsPage() {
  const userAvatar = PlaceHolderImages.find(p => p.id === 'user-profile-avatar');
  const [personality, setPersonality] = useState<Personality>('polite');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [apiKeySaved, setApiKeySaved] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setIsDarkMode(savedTheme === "dark");
    
    // Load saved API key from localStorage
    const savedApiKey = localStorage.getItem("openai_api_key");
    if (savedApiKey) {
      setApiKey(savedApiKey);
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

  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem("openai_api_key", apiKey);
      setApiKeySaved(true);
      setTimeout(() => setApiKeySaved(false), 3000);
    }
  };

  const handleClearApiKey = () => {
    localStorage.removeItem("openai_api_key");
    setApiKey("");
  };

  return (
    <AppLayout>
      <div className="flex flex-col h-full">
        <header className="p-4 md:p-6">
          <h1 className="font-headline text-2xl md:text-3xl font-bold">Suraksha Saathi Controls</h1>
          <p className="text-muted-foreground">Fine-tune how Suraksha Saathi protects you.</p>
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
                <CardTitle>Suraksha Saathi Personality</CardTitle>
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

          {/* API KEY SETTINGS CARD */}
          <Card className="border-blue-200 dark:border-blue-900">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                OpenAI API Key Setup
              </CardTitle>
              <CardDescription>
                Configure your OpenAI API key to enable the AI Crime Assistant
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-lg p-4">
                <div className="flex gap-2">
                  <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-800 dark:text-blue-300">
                    <p className="font-semibold mb-1">Get your API key from OpenAI</p>
                    <ol className="list-decimal list-inside space-y-1 text-xs">
                      <li>Go to <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="underline font-semibold hover:text-blue-900 dark:hover:text-blue-200">OpenAI API Keys page</a></li>
                      <li>Create a new API key (if you don't have one)</li>
                      <li>Copy the key and paste it below</li>
                      <li>Click "Save API Key" to enable AI features</li>
                    </ol>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="api-key" className="text-base font-medium">OpenAI API Key</Label>
                <div className="flex gap-2">
                  <Input
                    id="api-key"
                    type={showApiKey ? "text" : "password"}
                    placeholder="sk-proj-..."
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="font-mono text-sm"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowApiKey(!showApiKey)}
                  >
                    {showApiKey ? "Hide" : "Show"}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Your API key is stored locally in your browser. Never share your API key with anyone.
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={handleSaveApiKey}
                  className={cn(
                    "flex-1 transition-all",
                    apiKeySaved && "bg-green-600 hover:bg-green-600"
                  )}
                >
                  {apiKeySaved ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Saved Successfully
                    </>
                  ) : (
                    "Save API Key"
                  )}
                </Button>
                {apiKey && (
                  <Button
                    variant="outline"
                    onClick={handleClearApiKey}
                  >
                    Clear
                  </Button>
                )}
              </div>

              {apiKey && (
                <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 rounded-lg p-3">
                  <p className="text-sm text-green-800 dark:text-green-300 flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    API Key configured. AI features are now active.
                  </p>
                </div>
              )}
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
