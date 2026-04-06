import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ArrowRight } from "lucide-react";

const sampleIngredients = ["Eggs", "Tomatoes", "Rice", "Cheese"];

export const InteractiveTeaser = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <AnimatedSection className="max-w-2xl mx-auto">
          <div 
            className="bg-card rounded-3xl p-8 md:p-12 shadow-lg border border-border cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            onClick={() => navigate("/pantry")}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-8">
              See what's <span className="italic text-primary">possible</span>
            </h2>
            
            {/* Mock Input */}
            <div className="bg-background rounded-2xl p-5 mb-6 border border-border">
              <p className="text-muted-foreground text-sm mb-4">Your ingredients go here...</p>
              <div className="flex flex-wrap gap-2">
                {sampleIngredients.map((ingredient) => (
                  <Badge 
                    key={ingredient}
                    variant="secondary"
                    className="text-sm py-2 px-4"
                  >
                    {ingredient}
                  </Badge>
                ))}
              </div>
            </div>
            
            {/* Animated Button */}
            <Button 
              size="lg" 
              className="w-full text-lg py-6 animate-pulse pointer-events-none group"
              disabled
            >
              Generate Recipe
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            {/* Teaser Note */}
            <p className="text-center text-muted-foreground text-sm mt-6">
              Click anywhere to try it yourself →
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
