import AppLayout from "@/components/app-layout";
import { Users, ShieldCheck } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function FamilyPage() {
  return (
    <AppLayout>
      <div className="flex flex-col h-full">
        <header className="p-4 md:p-6 text-center">
          <div className="inline-block p-3 bg-primary/10 rounded-full mb-3">
            <Users className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-headline text-2xl md:text-3xl font-bold">Family Shield</h1>
          <p className="text-muted-foreground">Extend your protection to your loved ones.</p>
        </header>

        <div className="flex-1 p-4 md:p-6 space-y-8 overflow-y-auto">
          <Card>
            <CardHeader>
              <CardTitle>Manage Protected Family Members</CardTitle>
              <CardDescription>This feature is coming soon! You'll be able to add and manage family members to protect them from scams.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="family-phone">Add Family Member's Number</Label>
                <div className="flex gap-2">
                    <Input id="family-phone" placeholder="+91 00000 00000" disabled/>
                    <Button disabled>Add Member</Button>
                </div>
              </div>
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
              <CardTitle>Protected Members</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground text-center">No family members added yet.</p>
            </CardContent>
           </Card>
        </div>
      </div>
    </AppLayout>
  );
}
