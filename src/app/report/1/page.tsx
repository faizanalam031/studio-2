import AppLayout from "@/components/app-layout";
import { callHistory, Call } from "@/lib/data";
import { notFound } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Download, Share2, ShieldCheck, AlertTriangle, BadgeCheck, Bot, User, Wallet, Landmark, Link2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export default function ReportPage() {
  const call: Call | undefined = callHistory.find(c => c.id === '1');

  if (!call) {
    notFound();
  }

  const getIconForType = (type: string) => {
    switch (type) {
      case 'AI-Handled':
        return <ShieldCheck className="h-6 w-6 text-accent" />;
      case 'Scam':
        return <AlertTriangle className="h-6 w-6 text-destructive" />;
      case 'Safe':
        return <BadgeCheck className="h-6 w-6 text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <AppLayout>
      <div className="flex flex-col h-full">
        <header className="p-4 md:p-6 flex justify-between items-center">
          <div>
            <h1 className="font-headline text-2xl md:text-3xl font-bold">Evidence Report</h1>
            <p className="text-muted-foreground">Call from: {call.caller}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon"><Share2 className="h-4 w-4" /></Button>
            <Button><Download className="h-4 w-4 mr-2" /> Download</Button>
          </div>
        </header>
        
        <ScrollArea className="flex-1">
          <div className="p-4 md:p-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Call Summary</CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  {getIconForType(call.type)}
                  <div>
                    <p className="text-sm text-muted-foreground">Outcome</p>
                    <p className="font-semibold">{call.type}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date & Time</p>
                  <p className="font-semibold">{new Date(call.timestamp).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="font-semibold">{call.duration}</p>
                </div>
              </CardContent>
            </Card>

            {call.scamData && (
              <Card className="border-destructive/50">
                <CardHeader>
                  <CardTitle className="text-destructive flex items-center gap-2"><AlertTriangle/>Extracted Intelligence</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold flex items-center gap-2 mb-2"><Wallet className="h-4 w-4"/>UPI IDs</h4>
                    {call.scamData.upiIds.length > 0 ? call.scamData.upiIds.map(id => <Badge key={id} variant="outline">{id}</Badge>) : <p className="text-sm text-muted-foreground">None</p>}
                  </div>
                  <Separator/>
                  <div>
                    <h4 className="font-semibold flex items-center gap-2 mb-2"><Landmark className="h-4 w-4"/>Bank Accounts</h4>
                    {call.scamData.bankAccounts.length > 0 ? call.scamData.bankAccounts.map(acc => <Badge key={acc} variant="outline">{acc}</Badge>) : <p className="text-sm text-muted-foreground">None</p>}
                  </div>
                   <Separator/>
                  <div>
                    <h4 className="font-semibold flex items-center gap-2 mb-2"><Link2 className="h-4 w-4"/>Suspicious Links</h4>
                    {call.scamData.suspiciousLinks.length > 0 ? call.scamData.suspiciousLinks.map(link => <Badge key={link} variant="outline">{link}</Badge>) : <p className="text-sm text-muted-foreground">None</p>}
                  </div>
                   <Separator/>
                   <div>
                    <h4 className="font-semibold flex items-center gap-2 mb-2"><AlertTriangle className="h-4 w-4"/>Identified Risk Factors</h4>
                    <div className="flex flex-wrap gap-2">
                      {call.scamData.riskFactors.map(factor => <Badge key={factor} variant="destructive">{factor}</Badge>)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {call.transcript && (
              <Card>
                <CardHeader>
                  <CardTitle>Full Conversation Transcript</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px] w-full p-4 border rounded-md">
                     <div className="space-y-4">
                      {call.transcript.map((item, index) => (
                        <div key={index} className={cn(
                          "flex items-start gap-3",
                          item.speaker === 'AI' ? "justify-start" : "justify-start"
                        )}>
                           <div className="flex-shrink-0">
                            {item.speaker === 'AI' ? <Bot className="h-6 w-6 text-primary" /> : <User className="h-6 w-6 text-muted-foreground" />}
                          </div>
                          <div className="w-full">
                            <p className={cn("font-semibold", item.speaker === 'AI' ? 'text-primary' : '')}>{item.speaker}</p>
                             <p className="text-foreground/90">{item.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            )}
          </div>
        </ScrollArea>
      </div>
    </AppLayout>
  );
}
