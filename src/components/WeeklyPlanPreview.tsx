import { Badge } from "@/components/ui/badge";
import { AnimatedSection } from "@/components/AnimatedSection";

const weeklyMeals = [
  { day: "Mon", meal: "Pasta Primavera" },
  { day: "Tue", meal: "Thai Curry" },
  { day: "Wed", meal: "Grilled Salmon" },
  { day: "Thu", meal: "Chicken Stir Fry" },
  { day: "Fri", meal: "Caesar Salad" },
  { day: "Sat", meal: "Mushroom Risotto" },
  { day: "Sun", meal: "Sunday Roast" },
];

export const WeeklyPlanPreview = () => {
  return (
    <section className="py-24 md:py-32 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block text-primary font-medium uppercase tracking-widest text-sm mb-4">
              Weekly Planning
            </span>
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-4 leading-tight">
              One plan. Seven days.
              <br />
              <span className="italic">Zero stress.</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Let PantryMate handle the thinking for an entire week.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <div className="bg-card rounded-3xl p-6 md:p-8 shadow-lg border border-border">
              {/* Summary Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-border">
                <div className="flex items-center gap-4">
                  <span className="font-semibold text-foreground">Weekly Summary</span>
                  <Badge variant="outline" className="text-xs">
                    Fully customizable
                  </Badge>
                </div>
                <div className="flex gap-4 text-sm text-muted-foreground">
                  <span>~12,600 cal</span>
                  <span className="text-border">•</span>
                  <span>Balanced macros</span>
                </div>
              </div>

              {/* Weekly Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
                {weeklyMeals.map((item, index) => (
                  <AnimatedSection 
                    key={item.day} 
                    delay={100 + index * 50}
                    className="text-center"
                  >
                    <div className="bg-background rounded-2xl p-4 h-full border border-border hover:border-primary/50 transition-colors">
                      <span className="block text-xs font-semibold uppercase tracking-wider text-primary mb-2">
                        {item.day}
                      </span>
                      <span className="block text-sm text-foreground font-medium">
                        {item.meal}
                      </span>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};
