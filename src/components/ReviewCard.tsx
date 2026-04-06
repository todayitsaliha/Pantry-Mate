import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReviewCardProps {
  name: string;
  review: string;
  rating: number;
  avatar: string;
  role?: string;
  delay?: number;
}

export const ReviewCard = ({ name, review, rating, avatar, role, delay = 0 }: ReviewCardProps) => {
  return (
    <div
      className={cn(
        "bg-card rounded-2xl p-6 border border-border",
        "shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-lg font-semibold text-primary">
          {avatar}
        </div>
        <div>
          <h4 className="font-semibold">{name}</h4>
          {role && (
            <span className="text-xs text-muted-foreground">{role}</span>
          )}
          <div className="flex gap-0.5 mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-3.5 w-3.5",
                  i < rating ? "text-primary fill-primary" : "text-muted"
                )}
              />
            ))}
          </div>
        </div>
      </div>
      <p className="text-muted-foreground text-sm leading-relaxed">{review}</p>
    </div>
  );
};
