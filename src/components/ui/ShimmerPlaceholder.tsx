import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ShimmerPlaceholderProps {
  children: ReactNode;
  className?: string;
  message?: string;
}

export const ShimmerPlaceholder = ({ 
  children, 
  className, 
  message = "Live when API is connected!" 
}: ShimmerPlaceholderProps) => {
  return (
    <div className={cn("api-placeholder shimmer", className)}>
      <div className="flex flex-col items-center justify-center text-center p-4">
        <div className="mb-2 text-2xl">🔗</div>
        <p className="text-sm text-muted-foreground font-mono">{message}</p>
      </div>
      <div className="mt-4 opacity-40">
        {children}
      </div>
    </div>
  );
};