import AppLayout from "@/components/app-layout";
import { BrainCircuit } from "lucide-react";

export default function MemoryPage() {
  return (
    <AppLayout>
      <div className="flex flex-col h-full">
        <header className="p-4 md:p-6">
          <h1 className="font-headline text-2xl md:text-3xl font-bold">Memory</h1>
          <p className="text-muted-foreground">AI learned entities and knowledge.</p>
        </header>
        <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
          <BrainCircuit className="w-16 h-16 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold">Coming Soon</h2>
          <p className="text-muted-foreground max-w-sm">
            This section will provide insights into what AI Guardian has learned to better protect you.
          </p>
        </div>
      </div>
    </AppLayout>
  );
}
