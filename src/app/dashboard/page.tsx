"use client";

import Link from "next/link";
import {
  ShieldCheck,
  AlertCircle,
  Wand2,
  ChevronRight,
  Shield,
  Phone,
} from "lucide-react";
import AppLayout from "@/components/app-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  const recentActivity = [
    { id: '1', caller: 'SBI Card Support', time: '2h ago', type: 'AI HANDLED', icon: <Shield className="h-5 w-5 text-destructive"/> },
    { id: '3', caller: 'Aman Sharma', time: '5h ago', type: 'PROTECTED', icon: <Phone className="h-5 w-5 text-primary"/>},
    { id: '2', caller: 'Unknown Caller', time: 'Yesterday', type: 'PROTECTED', icon: <Phone className="h-5 w-5 text-primary"/>}
  ];

  return (
    <AppLayout>
      <div className="p-4 space-y-6">
        <div className="text-center space-y-4 pt-4">
          <h1 className="text-2xl font-bold font-headline">Guardian Hub</h1>
          <p className="text-muted-foreground">
            Watching 42 suspected scammers today
          </p>
        </div>
        
        <Link href="/call-simulation" className="block">
            <Button size="lg" className="w-full h-14 text-lg font-bold">
            <Wand2 className="h-5 w-5 mr-2" />
            Let AI Handle Scam Calls
            </Button>
        </Link>
        

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4 flex flex-col items-center justify-center text-center space-y-1">
              <ShieldCheck className="h-6 w-6 text-green-500 mb-1" />
              <p className="text-2xl font-bold">128</p>
              <p className="text-xs text-muted-foreground">Calls Protected</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex flex-col items-center justify-center text-center space-y-1">
              <AlertCircle className="h-6 w-6 text-destructive mb-1" />
              <p className="text-2xl font-bold">14</p>
              <p className="text-xs text-muted-foreground">Scams Defeated</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold font-headline">Recent Activity</h2>
            <Link href="/history">
              <Button variant="link" className="text-primary pr-0">
                See All
              </Button>
            </Link>
          </div>
          <div className="space-y-2">
            {recentActivity.map((call) => (
              <Card key={call.id}>
                <Link href={call.id === '3' ? '/history' : `/report/${call.id}`} className="block">
                  <div className="flex items-center p-3">
                    <div className="flex-shrink-0 p-3 bg-muted rounded-full mr-4">
                        {call.icon}
                    </div>
                    <div className="flex-grow">
                      <p className="font-medium">{call.caller}</p>
                      <p className="text-sm text-muted-foreground">
                        {call.time}
                      </p>
                    </div>
                    <Badge 
                      variant={call.type === 'AI HANDLED' ? 'default' : 'secondary'} 
                      className={cn(call.type === 'AI HANDLED' ? 'bg-accent text-accent-foreground' : '')}
                    >
                      {call.type}
                    </Badge>
                    <ChevronRight className="h-5 w-5 text-muted-foreground ml-2" />
                  </div>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
