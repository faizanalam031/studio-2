import { Shield } from "lucide-react";
import { cn } from "@/lib/utils";

type AiGuardianLogoProps = {
  className?: string;
};

export default function AiGuardianLogo({ className }: AiGuardianLogoProps) {
  return (
    <div className={cn("flex items-center gap-2 text-primary", className)}>
      <Shield className="h-7 w-7" />
      <span className="font-headline text-2xl font-bold tracking-tight">
        AI Guardian
      </span>
    </div>
  );
}
