"use client";

import { useState } from "react";
import AppLayout from "@/components/app-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, AlertTriangle, Phone, HelpCircle } from "lucide-react";
import AICrimeAssistant from "@/components/ai-crime-assistant";

export default function HelpPage() {
  const [activeTab, setActiveTab] = useState<"menu" | "ai" | null>(null);
  const [showPoliceConfirm, setShowPoliceConfirm] = useState(false);

  const handlePoliceCall = () => {
    const emergencyNumber = "100";
    window.location.href = `tel:${emergencyNumber}`;
  };

  if (activeTab === "ai") {
    return (
      <AppLayout>
        <div className="h-full flex flex-col">
          <header className="p-4 md:p-6 border-b">
            <Button
              variant="ghost"
              onClick={() => setActiveTab(null)}
              className="mb-4"
            >
              ← Back
            </Button>
            <h1 className="font-headline text-2xl md:text-3xl font-bold">AI Crime Assistant</h1>
            <p className="text-muted-foreground">Get guidance on fraud, scams, and personal safety</p>
          </header>
          <div className="flex-1 overflow-hidden">
            <AICrimeAssistant />
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="flex flex-col h-full">
        <header className="p-4 md:p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <HelpCircle className="w-6 h-6 text-primary" />
            </div>
            <h1 className="font-headline text-2xl md:text-3xl font-bold">Help & Support</h1>
          </div>
          <p className="text-muted-foreground">Get immediate assistance in emergency or crime-related situations</p>
        </header>

        <ScrollArea className="flex-1 px-4 md:px-6">
          <div className="space-y-6 pb-6">
            {/* Emergency Alert */}
            <Card className="bg-destructive/5 border-destructive/20">
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-destructive mb-1">In Immediate Danger?</h3>
                    <p className="text-sm text-destructive/80 mb-3">If you're in immediate danger, call the police emergency number right away.</p>
                    <Button
                      variant="destructive"
                      onClick={() => setShowPoliceConfirm(true)}
                      size="sm"
                      className="w-full"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Call Police Emergency (100)
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Help Options */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">How can we help?</h2>

              {/* AI Assistant Option */}
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveTab("ai")}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Bot className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle>AI Crime Assistant</CardTitle>
                        <CardDescription>Get guidance on crime-related situations</CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>✓ Fraud and scam guidance</li>
                    <li>✓ Cybercrime reporting steps</li>
                    <li>✓ Personal safety advice</li>
                    <li>✓ Step-by-step instructions</li>
                  </ul>
                  <Button className="w-full mt-4">
                    Open AI Assistant →
                  </Button>
                </CardContent>
              </Card>

              {/* Police Call Option */}
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setShowPoliceConfirm(true)}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-destructive/10 rounded-lg">
                        <AlertTriangle className="w-6 h-6 text-destructive" />
                      </div>
                      <div>
                        <CardTitle className="text-destructive">Police Emergency Call</CardTitle>
                        <CardDescription>One-tap call to local police</CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>✓ Fast, one-tap calling</li>
                    <li>✓ Connects to police emergency (100)</li>
                    <li>✓ Available from all screens</li>
                    <li>✓ For immediate emergencies</li>
                  </ul>
                  <Button variant="destructive" className="w-full mt-4">
                    Call Police (100) →
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Safety Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Safety Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <h4 className="font-semibold mb-1">🛡️ If You're Being Scammed</h4>
                  <p className="text-muted-foreground">Stop communication immediately, don't send more money, block the number, and report to your bank.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">🔐 If Your Data Is Compromised</h4>
                  <p className="text-muted-foreground">Change your passwords, enable two-factor authentication, and monitor your accounts closely.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">📞 If You're Being Harassed</h4>
                  <p className="text-muted-foreground">Document all communications, block the caller, and file a complaint with your telecom provider.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">⚠️ If You Feel Unsafe</h4>
                  <p className="text-muted-foreground">Move to a safe location, inform trusted contacts, and call police emergency immediately.</p>
                </div>
              </CardContent>
            </Card>

            {/* FAQ */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div>
                  <h4 className="font-semibold mb-1">Does the AI replace police services?</h4>
                  <p className="text-muted-foreground">No. The AI provides guidance and information. For emergencies, always contact police directly.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Is my conversation private?</h4>
                  <p className="text-muted-foreground">Conversations with the AI are not stored unless you agree. Your privacy is protected.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Can I report a crime here?</h4>
                  <p className="text-muted-foreground">Use the AI Assistant to get guidance on reporting procedures, then file an official report at your local police station.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>

        {/* Police Call Confirmation Dialog */}
        <AlertDialog open={showPoliceConfirm} onOpenChange={setShowPoliceConfirm}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2 text-destructive">
                <AlertTriangle className="w-5 h-5" />
                Call Police Emergency?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This will open your phone's dialer and call the police emergency number (100). Continue only if you're in immediate danger or need emergency assistance.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 text-sm text-destructive">
              Your safety is the priority. If you're in immediate danger, call now.
            </div>
            <div className="flex gap-3">
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handlePoliceCall}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Call Police (100)
              </AlertDialogAction>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </AppLayout>
  );
}
