import Link from "next/link";
import { BadgeCheck, Phone, AlertTriangle, ShieldCheck } from "lucide-react";

import AppLayout from "@/components/app-layout";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { GuardianSphere } from "@/components/guardian-sphere";
import { callHistory } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function DashboardPage() {
  const recentCalls = callHistory.slice(0, 3);

  const getIconForType = (type: string) => {
    switch (type) {
      case 'AI-Handled':
        return <ShieldCheck className="h-5 w-5 text-accent" />;
      case 'Scam':
        return <AlertTriangle className="h-5 w-5 text-destructive" />;
      case 'Safe':
        return <BadgeCheck className="h-5 w-5 text-green-500" />;
      default:
        return <Phone className="h-5 w-5 text-muted-foreground" />;
    }
  };

  return (
    <AppLayout>
      <div className="flex h-full flex-col">
        <header className="p-4 md:p-6">
          <h1 className="font-headline text-2xl md:text-3xl font-bold">Guardian Hub</h1>
          <p className="text-muted-foreground">Your protection is active and vigilant.</p>
        </header>

        <div className="flex flex-1 flex-col items-center justify-center gap-8 p-4 text-center">
          <GuardianSphere />
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-xl font-semibold text-primary flex items-center gap-2">
              <BadgeCheck /> Protection Active
            </h2>
            <p className="text-muted-foreground max-w-sm">
              Last scan: 2 minutes ago.
            </p>
          </div>
          <Link href="/call-simulation">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg">
              <span className="font-bold">🤖 Simulate Scam Call</span>
            </Button>
          </Link>
        </div>

        <Separator />

        <div className="p-4 md:p-6">
          <h3 className="text-lg font-semibold mb-3">Recent Activity</h3>
          <div className="space-y-3">
            {recentCalls.map((call) => (
              <Link href={`/report/${call.id}`} key={call.id} className="block">
                <div className="flex items-center gap-4 rounded-lg p-3 hover:bg-muted transition-colors">
                  <div className="flex-shrink-0">
                    {getIconForType(call.type)}
                  </div>
                  <div className="flex-grow">
                    <p className="font-medium">{call.caller}</p>
                    <p className="text-sm text-muted-foreground">{new Date(call.timestamp).toLocaleString()}</p>
                  </div>
                  <Badge variant={call.type === 'Scam' ? 'destructive' : call.type === 'AI-Handled' ? 'default' : 'secondary'} className={call.type === 'AI-Handled' ? 'bg-accent text-accent-foreground' : ''}>
                    {call.type}
                  </Badge>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
