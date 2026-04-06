import { cn } from "@/lib/utils";

interface MealTypeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const mealTypes = [
  { id: "Any", emoji: "✨" },
  { id: "Breakfast", emoji: "🍳" },
  { id: "Lunch", emoji: "🥗" },
  { id: "Dinner", emoji: "🍽️" },
  { id: "Beverage", emoji: "🥤" },
];

export const MealTypeSelector = ({ value, onChange }: MealTypeSelectorProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {mealTypes.map((type) => (
        <button
          key={type.id}
          type="button"
          onClick={() => onChange(type.id)}
          className={cn(
            "inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium border transition-all duration-200 cursor-pointer select-none",
            value === type.id
              ? "bg-primary text-primary-foreground border-primary shadow-md scale-105"
              : "bg-card/60 text-foreground border-border hover:border-primary/50 hover:bg-primary/5 hover:shadow-sm"
          )}
        >
          <span className="text-base leading-none">{type.emoji}</span>
          {type.id}
        </button>
      ))}
    </div>
  );
};
