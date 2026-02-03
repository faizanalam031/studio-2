import { cn } from "@/lib/utils";
import { Shield } from "lucide-react";

export function GuardianSphere() {
  const sphereStyle: React.CSSProperties = {
    background:
      "radial-gradient(circle, hsl(var(--primary) / 0.2) 0%, hsl(var(--background)) 70%)",
  };

  return (
    <div
      className="relative flex h-64 w-64 items-center justify-center rounded-full"
      style={sphereStyle}
    >
      <div className="absolute inset-0 z-0 animate-pulse rounded-full border-2 border-primary/30"></div>
      <div
        className="absolute inset-[2rem] z-0 animate-pulse rounded-full border border-primary/20"
        style={{ animationDelay: "250ms" }}
      ></div>
      <div
        className="absolute inset-[4rem] z-0 animate-pulse rounded-full border border-primary/10"
        style={{ animationDelay: "500ms" }}
      ></div>

      <div className="relative z-10 flex h-32 w-32 items-center justify-center rounded-full bg-background shadow-lg">
        <Shield className="h-16 w-16 text-primary" />
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.05);
            opacity: 1;
          }
        }
        .animate-pulse {
          animation: pulse 4s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}
