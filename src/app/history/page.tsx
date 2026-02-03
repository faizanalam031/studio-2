"use client";

import Link from "next/link";
import { BadgeCheck, Phone, AlertTriangle, ShieldCheck } from "lucide-react";
import AppLayout from "@/components/app-layout";
import { Card, CardContent } from "@/components/ui/card";
import { callHistory } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";

export default function HistoryPage() {
  const [timestamps, setTimestamps] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const newTimestamps: { [key: string]: string } = {};
    callHistory.forEach(call => {
      newTimestamps[call.id] = new Date(call.timestamp).toLocaleString();
    });
    setTimestamps(newTimestamps);
  }, []);

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
      <div className="flex flex-col h-full">
        <header className="p-4 md:p-6">
          <h1 className="font-headline text-2xl md:text-3xl font-bold">Call & Scam Log</h1>
          <p className="text-muted-foreground">A complete record of all analyzed calls.</p>
        </header>
        <ScrollArea className="flex-1 px-4 md:px-6">
          <Card className="rounded-2xl">
            <CardContent className="p-0">
              <div>
                {callHistory.map((call, index) => {
                  const isClickable = call.type === 'AI-Handled' || call.type === 'Scam';
                  const content = (
                    <div className="flex items-center gap-4 p-3">
                      <div className="flex-shrink-0 p-2 bg-muted/50 rounded-lg">
                        {getIconForType(call.type)}
                      </div>
                      <div className="flex-grow">
                        <p className="font-medium">{call.caller}</p>
                        <p className="text-sm text-muted-foreground">{timestamps[call.id] || ''}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant={call.type === 'Scam' ? 'destructive' : call.type === 'AI-Handled' ? 'default' : 'secondary'} className={call.type === 'AI-Handled' ? 'bg-accent text-accent-foreground' : ''}>
                          {call.type}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">{call.duration}</p>
                      </div>
                    </div>
                  );
                  return (
                    <div key={call.id}>
                      {isClickable ? (
                        <Link href={`/report/1?id=${call.id}`} className="block rounded-lg hover:bg-muted/50 transition-colors">
                          {content}
                        </Link>
                      ) : (
                        <div className="block rounded-lg">
                          {content}
                        </div>
                      )}
                      {index < callHistory.length - 1 && <Separator />}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </ScrollArea>
      </div>
    </AppLayout>
  );
}
