"use client";

import Link from "next/link";
import { CheckCircle, Search, Wand2 } from "lucide-react";

import AppLayout from "@/components/app-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="p-4 space-y-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search numbers or names..."
            className="pl-11 h-12 text-base bg-card rounded-xl"
          />
        </div>

        <Card className="overflow-hidden text-center shadow-sm border rounded-2xl">
          <CardContent className="p-6 pt-8 bg-card relative">
            <CheckCircle className="absolute top-4 right-4 h-7 w-7 text-green-500 fill-background" />

            <div className="relative mx-auto flex h-48 w-48 items-center justify-center">
              <div
                className="absolute inset-0 rounded-full animate-pulse"
                style={{
                  background:
                    "radial-gradient(circle, hsl(var(--primary)/0.15) 0%, transparent 70%)",
                }}
              />
              <div
                className="absolute inset-8 rounded-full animate-pulse [animation-delay:200ms]"
                style={{
                  background:
                    "radial-gradient(circle, hsl(var(--primary)/0.1) 0%, transparent 70%)",
                }}
              />
              <div className="absolute h-32 w-32 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xl font-bold shadow-2xl shadow-primary/40">
                Active
              </div>
            </div>

            <h1 className="text-2xl font-bold font-headline mt-6">
              Guardian Hub
            </h1>
            <p className="text-muted-foreground">
              Watching 42 suspected scammers today
            </p>

            <Link href="/call-simulation" className="mt-6 block">
              <Button size="lg" className="w-full h-14 text-lg font-bold">
                <Wand2 className="h-5 w-5" />
                Let AI Handle Scam Calls
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
