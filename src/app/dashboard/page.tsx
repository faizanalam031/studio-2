"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  ShieldCheck,
  AlertCircle,
  Wand2,
  ChevronRight,
  Shield,
  Info,
  Clock,
  BrainCircuit,
  Lock,
  Users,
  Check,
} from "lucide-react";
import AppLayout from "@/components/app-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { callHistory } from "@/lib/data";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export default function DashboardPage() {
  const [timestamps, setTimestamps] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const newTimestamps: { [key: string]: string } = {};
    callHistory.slice(0, 3).forEach(call => {
      newTimestamps[call.id] = new Date(call.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    });
    setTimestamps(newTimestamps);
  }, []);

  const getConfidenceColor = (confidence?: number) => {
    if (!confidence) return "bg-gray-300";
    if (confidence > 80) return "bg-red-500";
    if (confidence > 50) return "bg-yellow-500";
    return "bg-green-500";
  }

  return (
    <AppLayout>
      <div className="p-4 md:p-6 space-y-6">
        <div className="text-center space-y-2 pt-4">
          <h1 className="text-2xl font-bold font-headline">Suraksha Saathi</h1>
          <p className="text-muted-foreground">
            Your personal shield against scams.
          </p>
          <Popover>
            <PopoverTrigger asChild>
                <Badge variant="outline" className="cursor-pointer">
                  <Check className="h-3 w-3 mr-1 text-green-500"/>
                  Govt-grade Privacy
                </Badge>
            </PopoverTrigger>
            <PopoverContent className="text-sm text-center">
              AI never listens unless allowed. No OTPs or personal data are ever stored.
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="text-center">
          <Button size="lg" className="w-full max-w-sm mx-auto h-16 text-lg font-bold bg-green-600 hover:bg-green-700 text-white shadow-lg animate-pulse">
            <ShieldCheck className="h-6 w-6 mr-2" />
            Suraksha Saathi is Watching Calls
          </Button>
          <p className="text-muted-foreground text-sm mt-2">You stay silent. AI handles potential threats.</p>
        </div>
        
        <Button variant="outline" className="w-full">
            <Lock className="h-4 w-4 mr-2"/>
            Lock Down Mode
        </Button>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4 flex flex-col items-center justify-center text-center space-y-1">
              <Clock className="h-6 w-6 text-primary mb-1" />
              <p className="text-2xl font-bold">4.5 Hours</p>
              <p className="text-xs text-muted-foreground">Time Saved</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex flex-col items-center justify-center text-center space-y-1">
              <BrainCircuit className="h-6 w-6 text-primary mb-1" />
              <p className="text-2xl font-bold">32</p>
              <p className="text-xs text-muted-foreground">Patterns Learned</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold font-headline">Recent Encounters</h2>
            <Link href="/history">
              <Button variant="link" className="text-primary pr-0">
                See All
              </Button>
            </Link>
          </div>
          <div className="space-y-2">
            {callHistory.slice(0,3).map((call) => (
              <Card key={call.id}>
                <Link href={`/report/1?id=${call.id}`} className="block">
                  <div className="p-3">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 p-3 bg-muted rounded-full mr-4">
                          {call.type === 'AI-Handled' ? <Shield className="h-5 w-5 text-destructive"/> : <ShieldCheck className="h-5 w-5 text-primary"/>}
                      </div>
                      <div className="flex-grow">
                        <p className="font-medium">{call.caller}</p>
                        <p className="text-sm text-muted-foreground">
                          {timestamps[call.id] || ''}
                        </p>
                      </div>
                      <Badge 
                        variant={call.type === 'AI-Handled' ? 'destructive' : 'secondary'} 
                      >
                        {call.type}
                      </Badge>
                      <ChevronRight className="h-5 w-5 text-muted-foreground ml-2" />
                    </div>
                    {call.confidence && (
                      <div className="flex items-center gap-2 mt-2">
                         <div className="w-full bg-muted rounded-full h-1.5">
                          <div className={cn("h-1.5 rounded-full", getConfidenceColor(call.confidence))} style={{width: `${call.confidence}%`}}></div>
                        </div>
                        {call.explanation && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className="h-4 w-4 text-muted-foreground" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{call.explanation}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                    )}
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
