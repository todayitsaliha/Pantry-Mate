import { ReactNode } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepCardProps {
  stepNumber: number;
  title: string;
  summary?: string;
  isCompleted: boolean;
  children: ReactNode;
  icon?: ReactNode;
  // Keep these for API compat but ignore them
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const StepCard = ({
  stepNumber,
  title,
  isCompleted,
  children,
  icon,
}: StepCardProps) => {
  return (
    <div className="relative">
      {/* Connecting line */}
      <div className="absolute left-[19px] top-12 bottom-0 w-px bg-border" />

      <div className="relative">
        {/* Header row */}
        <div className="flex items-center gap-4 mb-4">
          <div
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors flex-shrink-0 z-10",
              isCompleted
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-muted text-muted-foreground"
            )}
          >
            {isCompleted ? (
              <Check className="h-4 w-4" />
            ) : icon ? (
              icon
            ) : (
              stepNumber
            )}
          </div>

          <h3 className="text-lg font-serif font-semibold text-foreground">
            {title}
          </h3>
        </div>

        {/* Content — always visible */}
        <div className="pl-14 pb-2">
          {children}
        </div>
      </div>
    </div>
  );
};
