"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Phone, PhoneOff, Mic, User, Bot, AlertTriangle, FileText, ChevronUp, Link2, Landmark, Wallet, CircleDashed, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { callHistory } from '@/lib/data';
import { extractScamIntelligence, ExtractScamIntelligenceOutput } from '@/ai/flows/scam-intelligence-panel';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { Label } from '@/components/ui/label';

type CallState = 'incoming' | 'live' | 'summary';
type TranscriptItem = { speaker: 'AI' | 'Scammer' | 'User'; text: string };

const sampleCall = callHistory[0];

export default function CallSimulationPage() {
  const [callState, setCallState] = useState<CallState>('incoming');
  const [transcript, setTranscript] = useState<TranscriptItem[]>([]);
  const [intelligence, setIntelligence] = useState<ExtractScamIntelligenceOutput | null>(null);
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [riskLevel, setRiskLevel] = useState(0);
  const transcriptEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (callState === 'live') {
      let messageIndex = 0;
      const conversation = sampleCall.transcript!;

      const addMessage = () => {
        if (messageIndex < conversation.length) {
          const nextMessage = conversation[messageIndex];
          setIsAiTyping(nextMessage.speaker === 'Scammer');
          
          setTimeout(() => {
            setTranscript(prev => [...prev, nextMessage]);
            setIsAiTyping(false);
            messageIndex++;
            
            // Trigger next message
            if (messageIndex < conversation.length) {
              setTimeout(addMessage, 2000 + Math.random() * 1500);
            } else {
              // End of conversation
              setTimeout(() => setCallState('summary'), 3000);
            }
          }, 1500 + Math.random() * 1000);
        }
      };

      addMessage();
    }
  }, [callState]);

  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });

    const fetchIntelligence = async () => {
      if (transcript.length > 0) {
        const fullTranscript = transcript.map(t => `${t.speaker}: ${t.text}`).join('\n');
        const result = await extractScamIntelligence({ transcript: fullTranscript });
        setIntelligence(result);
        setRiskLevel(result.riskFactors.length * 25 + result.suspiciousLinks.length * 15 + result.upiIds.length * 10);
      }
    };
    
    if (callState === 'live') {
      fetchIntelligence();
    }
  }, [transcript, callState]);

  const renderIncomingCall = () => (
    <div className="w-full max-w-sm mx-auto">
      <Card className="shadow-2xl animate-in fade-in-0 zoom-in-95 duration-500">
        <CardHeader className="text-center">
          <p className="text-muted-foreground">Incoming Call...</p>
          <CardTitle className="font-headline text-3xl">{sampleCall.caller}</CardTitle>
          <div className="flex items-center justify-center gap-2 text-destructive pt-2">
            <AlertTriangle className="h-5 w-5" />
            <span className="font-semibold">High Risk Scam Detected</span>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <Button variant="destructive" size="lg" className="h-16" onClick={() => router.push('/dashboard')}>
            <PhoneOff className="h-7 w-7" />
            <span className="sr-only">Decline</span>
          </Button>
          <Button variant="secondary" size="lg" className="h-16">
            <Phone className="h-7 w-7" />
            <span className="sr-only">Answer</span>
          </Button>
          <Button size="lg" className="col-span-2 h-20 bg-accent text-accent-foreground hover:bg-accent/90" onClick={() => setCallState('live')}>
            <div className="flex items-center gap-3">
              <Bot className="h-8 w-8" />
              <span className="text-xl font-bold">Let AI Answer</span>
            </div>
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderLiveCall = () => (
    <div className="h-full w-full flex flex-col bg-card rounded-t-3xl shadow-2xl animate-in slide-in-from-bottom-full duration-500">
      <header className="p-4 text-center border-b">
        <h2 className="font-semibold">{sampleCall.caller}</h2>
        <p className="text-sm text-primary flex items-center justify-center gap-1">
          <Bot className="h-4 w-4" /> AI Handling Call...
        </p>
      </header>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {transcript.map((item, index) => (
            <div key={index} className={cn(
              "flex items-end gap-2",
              item.speaker === 'AI' ? "justify-start" : "justify-end"
            )}>
              {item.speaker === 'AI' && <Bot className="h-6 w-6 text-primary flex-shrink-0" />}
              <div className={cn(
                "max-w-xs md:max-w-md rounded-2xl p-3 text-sm",
                item.speaker === 'AI' ? "bg-muted rounded-bl-none" : "bg-primary text-primary-foreground rounded-br-none"
              )}>
                {item.text}
              </div>
              {item.speaker !== 'AI' && <User className="h-6 w-6 text-muted-foreground flex-shrink-0" />}
            </div>
          ))}
          {isAiTyping && (
             <div className="flex items-end gap-2 justify-start">
               <Bot className="h-6 w-6 text-primary" />
               <div className="bg-muted rounded-2xl rounded-bl-none p-3 flex items-center gap-1">
                 <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                 <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                 <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce"></span>
               </div>
             </div>
          )}
        </div>
        <div ref={transcriptEndRef} />
      </ScrollArea>
      
      <Sheet>
        <SheetTrigger asChild>
          <button className="w-full bg-background p-2 rounded-t-lg shadow-md border-t">
            <ChevronUp className="h-6 w-6 mx-auto text-muted-foreground" />
            <p className="text-sm font-semibold">Scam Intelligence Panel</p>
          </button>
        </SheetTrigger>
        <SheetContent side="bottom" className="rounded-t-3xl">
          <SheetHeader>
            <SheetTitle className="font-headline">Live Intelligence</SheetTitle>
            <SheetDescription>Real-time entities detected by Suraksha Saathi.</SheetDescription>
          </SheetHeader>
          <div className="py-4 space-y-4">
            <div>
              <Label>Risk Meter</Label>
              <Progress value={riskLevel} className="h-3" />
              <p className="text-sm text-right font-medium mt-1">{riskLevel}% Risk</p>
            </div>
            <Separator />
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2"><Wallet className="h-4 w-4"/>UPI IDs</h4>
              {intelligence?.upiIds && intelligence.upiIds.length > 0 ? (
                intelligence.upiIds.map(id => <Badge key={id} variant="outline">{id}</Badge>)
              ) : <p className="text-sm text-muted-foreground">None detected yet.</p>}
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2"><Landmark className="h-4 w-4"/>Bank Accounts</h4>
              {intelligence?.bankAccounts && intelligence.bankAccounts.length > 0 ? (
                 intelligence.bankAccounts.map(acc => <Badge key={acc} variant="outline">{acc}</Badge>)
              ) : <p className="text-sm text-muted-foreground">None detected yet.</p>}
            </div>
             <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2"><Link2 className="h-4 w-4"/>Suspicious Links</h4>
              {intelligence?.suspiciousLinks && intelligence.suspiciousLinks.length > 0 ? (
                 intelligence.suspiciousLinks.map(link => <Badge key={link} variant="outline">{link}</Badge>)
              ) : <p className="text-sm text-muted-foreground">None detected yet.</p>}
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2"><AlertTriangle className="h-4 w-4"/>Risk Factors</h4>
              {intelligence?.riskFactors && intelligence.riskFactors.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                 {intelligence.riskFactors.map(factor => <Badge key={factor} variant="destructive">{factor}</Badge>)}
                </div>
              ) : <p className="text-sm text-muted-foreground">None detected yet.</p>}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );

  const renderSummary = () => (
    <div className="w-full max-w-md mx-auto animate-in fade-in-0 zoom-in-95 duration-500">
      <Card className="text-center">
        <CardHeader>
          <div className="mx-auto w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center mb-4 border-4 border-green-200 dark:border-green-800">
            <ShieldCheck className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <CardTitle className="font-headline text-2xl">This was a scam. You're safe.</CardTitle>
          <CardDescription>Suraksha Saathi handled the call and collected evidence.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-left">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">Status</CardTitle>
                <CardDescription className="text-lg font-bold text-destructive">Scam Confirmed</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">AI Engagement</CardTitle>
                <CardDescription className="text-lg font-bold">{sampleCall.duration}</CardDescription>
              </CardHeader>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">Data Captured</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {intelligence?.upiIds.map(id => <Badge key={id} variant="outline">{id}</Badge>)}
              {intelligence?.riskFactors.map(f => <Badge key={f} variant="destructive">{f}</Badge>)}
            </CardContent>
          </Card>
          <div className="grid grid-cols-2 gap-4 pt-4">
            <Button variant="outline" asChild>
              <Link href="/dashboard">Back to Hub</Link>
            </Button>
            <Button asChild>
              <Link href={`/report/${sampleCall.id}`}>View Full Report</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      {callState === 'incoming' && renderIncomingCall()}
      {callState === 'live' && renderLiveCall()}
      {callState === 'summary' && renderSummary()}
    </main>
  );
}
