"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function LiveProtectionStatus() {

  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="pl-2 pr-3 h-8 flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-sm font-medium text-muted-foreground hidden sm:inline">Guardian Active</span>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64">
            <DropdownMenuLabel>Live Protection Status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
                <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span>Guardian Active</span>
                </div>
            </DropdownMenuItem>
             <DropdownMenuItem>
                <div className="flex items-center gap-2 text-muted-foreground/70">
                    <span className="relative flex h-2 w-2">
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
                    </span>
                    <span>High Scam Activity</span>
                </div>
            </DropdownMenuItem>
             <DropdownMenuItem>
                <div className="flex items-center gap-2 text-muted-foreground/70">
                    <span className="relative flex h-2 w-2">
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                    <span>AI Engaging Scam</span>
                </div>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  );
}
