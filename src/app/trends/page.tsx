import AppLayout from "@/components/app-layout";
import { LineChart, Clock, AlertTriangle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function TrendsPage() {
  return (
    <AppLayout>
      <div className="flex flex-col h-full">
        <header className="p-4 md:p-6 text-center">
          <div className="inline-block p-3 bg-primary/10 rounded-full mb-3">
            <LineChart className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-headline text-2xl md:text-3xl font-bold">Scam Activity Near You</h1>
          <p className="text-muted-foreground">Stay informed about local and national scam trends.</p>
        </header>

        <div className="flex-1 p-4 md:p-6 space-y-8 overflow-y-auto">
          <Card>
            <CardHeader>
              <CardTitle>Scam Heatmap & Trends</CardTitle>
              <CardDescription>This feature is coming soon!</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">
                Soon, you'll be able to see scam peak hours, common scam types, and region-based threats right here.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Clock/> Scam Peak Hours</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">Data not yet available.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><AlertTriangle/> Common Scam Types Today</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
                <Badge variant="outline">KYC Update</Badge>
                <Badge variant="outline">Electricity Bill</Badge>
                <Badge variant="outline">Lottery Prize</Badge>
            </CardContent>
          </Card>

        </div>
      </div>
    </AppLayout>
  );
}
