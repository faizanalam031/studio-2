import AppLayout from "@/components/app-layout";
import { BrainCircuit, ShieldCheck, FlaskConical } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const intelligenceMaturity = [
  {
    name: 'SOCIAL ENGINEERING DETECTION',
    value: 98,
    color: '221 83% 53%',
  },
  {
    name: 'UPI FRAUD RECOGNITION',
    value: 85,
    color: '260 80% 60%',
  },
  {
    name: 'IMPERSONATION ANALYSIS',
    value: 92,
    color: '250 85% 65%',
  },
  {
    name: 'DIALECT & ORIGIN DETECTION',
    value: 78,
    color: '190 80% 60%',
  },
];

const learnedPatterns = [
  {
    count: 12,
    title: 'KYC Update Scam',
    description: 'Detected 12 variations of this tactic in Mumbai region.',
  },
  {
    count: 8,
    title: 'Electricity Bill Alert',
    description: 'AI now identifies the specific fake payment links used.',
  },
];

export default function MemoryPage() {
  return (
    <AppLayout>
      <div className="flex flex-col h-full">
        <header className="p-4 md:p-6 text-center">
          <div className="inline-block p-3 bg-primary/10 rounded-full mb-3">
            <BrainCircuit className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-headline text-2xl md:text-3xl font-bold">AI Intelligence</h1>
          <p className="text-muted-foreground">Guardian is learning from every attack.</p>
        </header>

        <div className="flex-1 p-4 md:p-6 space-y-8 overflow-y-auto">
          
          <Card>
            <CardHeader className="flex-row items-center gap-3 space-y-0">
              <ShieldCheck className="w-6 h-6 text-primary" />
              <CardTitle>Intelligence Maturity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 pt-4">
              {intelligenceMaturity.map((item) => (
                <div key={item.name}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs font-medium text-muted-foreground tracking-wider uppercase">{item.name}</span>
                    <span className="text-sm font-bold">{item.value}%</span>
                  </div>
                  <div style={{ '--primary': item.color } as React.CSSProperties}>
                    <Progress value={item.value} className="h-2" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
                <CardTitle>Learned Patterns</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {learnedPatterns.map((pattern, index) => (
                <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                      <span className="text-xl font-bold text-muted-foreground">{pattern.count}</span>
                    </div>
                    <div className="pt-1">
                      <h3 className="font-semibold">{pattern.title}</h3>
                      <p className="text-sm text-muted-foreground">{pattern.description}</p>
                    </div>
                </div>
              ))}
            </CardContent>
          </Card>
          
           <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><FlaskConical className="text-primary"/> Scam Simulation Mode</CardTitle>
              <CardDescription>Experience fake scam calls to learn patterns safely. The AI will explain its actions afterward.</CardDescription>
            </CardHeader>
            <CardContent>
                <Link href="/simulation">
                    <Button className="w-full">Start Simulation</Button>
                </Link>
            </CardContent>
           </Card>
        </div>
      </div>
    </AppLayout>
  );
}
