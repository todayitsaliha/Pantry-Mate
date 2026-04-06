import { LucideIcon } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { cn } from "@/lib/utils";

interface SmartPointCardProps {
  icon: LucideIcon;
  title: string;
  explanation: string;
  delay?: number;
  align?: "left" | "right";
}

export const SmartPointCard = ({ 
  icon: Icon, 
  title, 
  explanation, 
  delay = 0,
  align = "left",
}: SmartPointCardProps) => {
  return (
    <AnimatedSection delay={delay}>
      <div className={cn(
        "flex items-start gap-5 py-10",
        align === "right" ? "justify-end text-right" : "justify-start text-left"
      )}>
        {align === "left" && (
          <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
            <Icon className="h-5 w-5 text-primary" />
          </div>
        )}
        <div className="max-w-md">
          <h3 className="text-xl md:text-2xl font-serif font-bold text-foreground mb-1.5 leading-tight">
            {title}
          </h3>
          <p className="text-sm md:text-base text-muted-foreground">
            {explanation}
          </p>
        </div>
        {align === "right" && (
          <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
            <Icon className="h-5 w-5 text-primary" />
          </div>
        )}
      </div>
    </AnimatedSection>
  );
};
