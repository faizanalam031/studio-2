import AppLayout from "@/components/app-layout";
import { FlaskConical } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SimulationPage() {
  return (
    <AppLayout>
      <div className="flex flex-col h-full">
        <header className="p-4 md:p-6 text-center">
          <div className="inline-block p-3 bg-primary/10 rounded-full mb-3">
            <FlaskConical className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-headline text-2xl md:text-3xl font-bold">Scam Simulation</h1>
          <p className="text-muted-foreground">Learn to identify scam patterns in a safe environment.</p>
        </header>

        <div className="flex-1 p-4 md:p-6 space-y-8 overflow-y-auto">
          <Card>
            <CardHeader>
              <CardTitle>Training Mode</CardTitle>
              <CardDescription>This feature is under development.</CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-muted-foreground">
                Get ready to experience fake scam calls and learn how the AI protects you. You'll be able to test your skills and see explanations for every action taken.
              </p>
               <Button disabled>Start Simulation</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
