import { Check } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";

const nutritionPoints = [
  "Track calories if you want",
  "Ignore them if you don't", 
  "We adapt to you"
];

export const NutritionSection = () => {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Content */}
            <AnimatedSection className="space-y-8">
              <div>
                <span className="inline-block text-primary font-medium uppercase tracking-widest text-sm mb-4">
                  Flexible Nutrition
                </span>
                <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight">
                  Your nutrition,
                  <br />
                  <span className="italic">your rules</span>
                </h2>
              </div>
              
              <div className="space-y-5">
                {nutritionPoints.map((point, index) => (
                  <AnimatedSection key={point} delay={100 + index * 100}>
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="h-5 w-5 text-primary" />
                      </div>
                      <span className="text-lg text-foreground">{point}</span>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </AnimatedSection>

            {/* Visual Mock */}
            <AnimatedSection delay={200}>
              <div className="bg-card rounded-3xl p-6 shadow-lg border border-border">
                {/* Toggle Header */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
                  <span className="font-semibold text-foreground">Nutrition View</span>
                  <div className="flex bg-muted rounded-full overflow-hidden p-1">
                    <button className="px-4 py-2 text-sm font-medium rounded-full bg-primary text-primary-foreground transition-all">
                      Simple
                    </button>
                    <button className="px-4 py-2 text-sm font-medium rounded-full text-muted-foreground transition-all hover:text-foreground">
                      Detailed
                    </button>
                  </div>
                </div>

                {/* Simple Mode Preview */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-4 bg-muted/50 rounded-xl">
                    <span className="font-medium">Calories</span>
                    <span className="text-muted-foreground">~450</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-muted/50 rounded-xl">
                    <span className="font-medium">Protein</span>
                    <span className="text-muted-foreground">High</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-muted/50 rounded-xl">
                    <span className="font-medium">Balance</span>
                    <span className="text-primary font-semibold">Good ✓</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
};
