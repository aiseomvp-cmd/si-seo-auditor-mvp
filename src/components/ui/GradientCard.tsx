import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GradientCardProps {
  children: ReactNode;
  className?: string;
  elevated?: boolean;
}

export const GradientCard = ({ children, className, elevated = false }: GradientCardProps) => {
  return (
    <div className={cn(
      "card-gradient rounded-xl p-6 backdrop-blur-sm",
      elevated && "card-elevated",
      className
    )}>
      {children}
    </div>
  );
};