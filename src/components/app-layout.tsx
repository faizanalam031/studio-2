"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Shield,
  History,
  Settings,
  User,
  Bell,
  BrainCircuit,
  LineChart,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import AiGuardianLogo from "./ai-guardian-logo";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import LiveProtectionStatus from "./live-protection-status";

const navItems = [
  { href: "/dashboard", icon: Shield, label: "Hub" },
  { href: "/history", icon: History, label: "Encounters" },
  { href: "/memory", icon: BrainCircuit, label: "Intelligence" },
  { href: "/trends", icon: LineChart, label: "Trends" },
  { href: "/help", icon: HelpCircle, label: "Help", highlight: true },
  { href: "/settings", icon: Settings, label: "Controls" },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const userAvatar = PlaceHolderImages.find(
    (p) => p.id === "user-profile-avatar"
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/95 px-4 backdrop-blur-sm md:hidden">
        <AiGuardianLogo />
        <div className="flex items-center gap-2">
          <LiveProtectionStatus />
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-destructive" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-9 w-9 cursor-pointer">
                {userAvatar && (
                  <AvatarImage src={userAvatar.imageUrl} alt="User avatar" />
                )}
                <AvatarFallback>
                  <User />
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuSeparator />
              <Link href="/">
                <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive">
                  Log out
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="md:grid md:grid-cols-[240px_1fr]">
        <aside className="hidden md:block border-r p-4">
          <div className="flex items-center justify-between mb-8">
            <AiGuardianLogo />
            <div className="flex items-center gap-1">
                <LiveProtectionStatus />
                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-destructive" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>No new notifications</DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>
            </div>
          </div>
          <nav className="flex flex-col gap-2 sticky top-6">
            {navItems.map((item) => {
              const isActive =
                item.href === "/dashboard"
                  ? pathname === item.href
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-foreground/70 transition-colors hover:bg-muted hover:text-foreground",
                    isActive && "bg-muted font-semibold text-foreground",
                    item.highlight && !isActive && "text-primary hover:bg-primary/10 hover:text-primary font-medium"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
            <div className="absolute bottom-4">
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-3 cursor-pointer">
                    <Avatar className="h-9 w-9">
                        {userAvatar && (
                        <AvatarImage src={userAvatar.imageUrl} alt="User avatar" />
                        )}
                        <AvatarFallback>
                        <User />
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold">User</p>
                        <p className="text-xs text-muted-foreground">+91 98765 43210</p>
                    </div>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuSeparator />
              <Link href="/">
                <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive">
                  Log out
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
            </div>
        </aside>

        <main className="pb-20 md:pb-0">{children}</main>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-card md:hidden">
        <div className="grid h-16 grid-cols-5">
          {navItems.slice(0, 4).map((item) => {
            const isActive =
              item.href === "/dashboard"
                ? pathname === item.href
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 pt-1 text-xs text-foreground/60 transition-colors",
                  isActive && "text-primary",
                  item.highlight && !isActive && "text-orange-500 hover:text-orange-600"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <span className="mt-0.5 block h-1 w-1 rounded-full bg-primary"></span>
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
