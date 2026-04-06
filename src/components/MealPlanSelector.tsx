import { cn } from "@/lib/utils";
import { Calendar, Utensils } from "lucide-react";

interface MealPlanSelectorProps {
  value: "single" | "weekly";
  onChange: (value: "single" | "weekly") => void;
}

export const MealPlanSelector = ({ value, onChange }: MealPlanSelectorProps) => {
  const options = [
    { 
      id: "single" as const, 
      label: "Single Recipe", 
      icon: Utensils, 
      description: "Get one perfect recipe" 
    },
    { 
      id: "weekly" as const, 
      label: "Weekly Diet Plan", 
      icon: Calendar, 
      description: "Healthy meals for the week" 
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          onClick={() => onChange(option.id)}
          className={cn(
            "flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all duration-300",
            value === option.id
              ? "bg-primary text-primary-foreground border-primary shadow-lg"
              : "bg-card/60 border-border hover:border-primary/50 hover:shadow-md"
          )}
        >
          <option.icon className={cn(
            "h-6 w-6",
            value === option.id ? "text-primary-foreground" : "text-primary"
          )} />
          <span className="font-semibold text-sm">{option.label}</span>
          <span className={cn(
            "text-xs text-center",
            value === option.id ? "text-primary-foreground/80" : "text-muted-foreground"
          )}>
            {option.description}
          </span>
        </button>
      ))}
    </div>
  );
};