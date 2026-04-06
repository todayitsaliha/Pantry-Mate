import { cn } from "@/lib/utils";

interface CuisineSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const cuisines = [
  { id: "Any", emoji: "🌍" },
  { id: "Italian", emoji: "🍝" },
  { id: "Asian", emoji: "🥢" },
  { id: "Mexican", emoji: "🌮" },
  { id: "Mediterranean", emoji: "🦐" },
  { id: "Indian", emoji: "🍛" },
  { id: "American", emoji: "🍔" },
  { id: "French", emoji: "🥐" },
  { id: "Thai", emoji: "🍜" },
  { id: "Middle Eastern", emoji: "🧆" },
];

export const CuisineSelector = ({ value, onChange }: CuisineSelectorProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {cuisines.map((cuisine) => (
        <button
          key={cuisine.id}
          type="button"
          onClick={() => onChange(cuisine.id)}
          className={cn(
            "inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium border transition-all duration-200 cursor-pointer select-none",
            value === cuisine.id
              ? "bg-primary text-primary-foreground border-primary shadow-md scale-105"
              : "bg-card/60 text-foreground border-border hover:border-primary/50 hover:bg-primary/5 hover:shadow-sm"
          )}
        >
          <span className="text-base leading-none">{cuisine.emoji}</span>
          {cuisine.id}
        </button>
      ))}
    </div>
  );
};
