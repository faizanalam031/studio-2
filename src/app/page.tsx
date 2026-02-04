"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, LockKeyhole, Bell, Mic } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AiGuardianLogo from "@/components/ai-guardian-logo";

type OnboardingStep = "welcome" | "permissions" | "login";

export default function OnboardingPage() {
  const [step, setStep] = useState<OnboardingStep>("welcome");
  const [phone, setPhone] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd have OTP validation here.
    // For this demo, we'll just navigate to the dashboard.
    router.push("/dashboard");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-md">
        {step === "welcome" && (
          <Card className="animate-in fade-in-0 zoom-in-95 duration-500">
            <CardHeader className="items-center text-center">
              <AiGuardianLogo className="mb-4" />
               <CardTitle className="font-headline text-3xl">Welcome to Suraksha Saathi</CardTitle>
              <CardDescription className="text-base">Your personal shield against scam calls.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-6 text-center">
              <div className="flex flex-col gap-2 text-foreground/80">
                <p>I'll watch your calls, silently.</p>
                <p>If something feels unsafe, I’ll step in.</p>
              </div>
              <div className="relative flex h-32 w-32 items-center justify-center">
                <div className="absolute h-full w-full animate-pulse rounded-full bg-primary/20"></div>
                <div className="absolute h-2/3 w-2/3 animate-pulse rounded-full bg-primary/30 [animation-delay:200ms]"></div>
                <Shield className="relative h-16 w-16 text-primary" />
              </div>
              <p className="font-medium text-lg text-primary">Let's get you protected.</p>
              <Button onClick={() => setStep("permissions")} className="w-full" size="lg">
                Continue
              </Button>
            </CardContent>
          </Card>
        )}

        {step === "permissions" && (
          <Card className="animate-in fade-in-0 zoom-in-95 duration-500">
            <CardHeader className="items-center text-center">
              <AiGuardianLogo className="mb-2" />
              <CardTitle className="font-headline text-2xl">How I Work</CardTitle>
              <CardDescription>To protect you, I need a few permissions.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <div className="mt-1 rounded-full bg-primary/10 p-2 text-primary">
                    <LockKeyhole className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Call & Message Access</h3>
                    <p className="text-sm text-foreground/70">To identify scam numbers and analyze threats.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-1 rounded-full bg-primary/10 p-2 text-primary">
                    <Mic className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Microphone Access</h3>
                    <p className="text-sm text-foreground/70">So I can take over the call when you ask me to.</p>
                  </div>
                </li>
                 <li className="flex items-start gap-4">
                  <div className="mt-1 rounded-full bg-primary/10 p-2 text-primary">
                    <Bell className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Notifications</h3>
                    <p className="text-sm text-foreground/70">To alert you about risks and show call summaries.</p>
                  </div>
                </li>
              </ul>
               <p className="text-center text-xs text-foreground/60">I only act when you allow me to. You are always in control.</p>
              <Button onClick={() => setStep("login")} className="w-full" size="lg">
                Grant Permissions
              </Button>
            </CardContent>
          </Card>
        )}

        {step === "login" && (
          <Card className="animate-in fade-in-0 zoom-in-95 duration-500">
            <CardHeader className="items-center text-center">
              <AiGuardianLogo className="mb-2" />
              <CardTitle className="font-headline text-2xl">Verify Your Number</CardTitle>
              <CardDescription>A final step to secure your line.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    placeholder="+91 98765 43210" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required 
                    className="text-lg"
                  />
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="otp">One-Time Password (OTP)</Label>
                  <Input id="otp" type="text" placeholder="_ _ _ _ _ _" required className="text-center tracking-[0.5em] text-lg"/>
                </div>
                <Button type="submit" className="w-full" size="lg">
                  Activate Protection
                </Button>
                <p className="text-center text-xs text-foreground/60">We never listen unless you allow AI to handle a call.</p>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}
