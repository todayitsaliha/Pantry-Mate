import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Target, CheckCircle, Leaf, ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ReviewCard } from "@/components/ReviewCard";
import { MealGallery } from "@/components/MealGallery";
import { InteractiveTeaser } from "@/components/InteractiveTeaser";
import { WeeklyPlanPreview } from "@/components/WeeklyPlanPreview";
import { NutritionSection } from "@/components/NutritionSection";
import { SmartPointCard } from "@/components/SmartPointCard";
import DecorativeBackground from "@/components/DecorativeBackground";
import { useParallax } from "@/hooks/useParallax";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import fridgeProblem from "@/assets/fridge-problem.jpg";
import peopleCooking from "@/assets/people-cooking.jpg";
import cookingCta from "@/assets/cooking-cta.jpg";

const reviews = [
  {
    name: "Alex T.",
    avatar: "A",
    rating: 5,
    review: "As a college student, this saves me so much money. I actually use the random stuff in my mini-fridge now.",
    role: "Student"
  },
  {
    name: "Maria S.",
    avatar: "M",
    rating: 5,
    review: "I work 12-hour shifts. Coming home and knowing exactly what to cook with whatever's left? Game changer.",
    role: "Nurse"
  },
  {
    name: "David K.",
    avatar: "D",
    rating: 4,
    review: "My kids are picky eaters. PantryMate suggested a pasta dish they actually loved using ingredients I was about to throw out.",
    role: "Parent"
  },
  {
    name: "Jennifer L.",
    avatar: "J",
    rating: 5,
    review: "No more '30 ingredients you definitely don't have' recipes. This actually works with what's in my kitchen.",
    role: "Home Cook"
  }
];

const smartPoints = [
  {
    icon: Target,
    title: "No random recipes",
    explanation: "Every suggestion uses exactly what you have",
  },
  {
    icon: CheckCircle,
    title: "No missing ingredients",
    explanation: "No last-minute grocery store runs",
  },
  {
    icon: Leaf,
    title: "No wasted groceries",
    explanation: "Use what's in your fridge before it goes bad",
  }
];

const Landing = () => {
  const navigate = useNavigate();
  const heroParallax = useParallax(0.3);
  const peopleParallax = useParallax(0.35);
  const ctaParallax = useParallax(0.3);

  return (
    <div className="bg-gradient-to-b from-background via-muted/30 to-background text-foreground overflow-hidden">
      <Header />
      
      {/* Section 1: Emotional Hero - Bold Editorial Style */}
      <section className="min-h-screen relative flex flex-col items-center justify-center px-4 pt-20 pb-16 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div ref={heroParallax.ref} className="absolute inset-0 z-0">
          <img 
            src={fridgeProblem} 
            alt="Person looking in fridge" 
            className="w-full h-full object-cover" 
            style={{
              transform: `translateY(${heroParallax.offset}px) scale(1.1)`,
            }} 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </div>
        
        <AnimatedSection className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Large Editorial Typography */}
          <div className="space-y-6 mb-12">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold leading-[0.95] tracking-tight">
              You're hungry.
              <br />
              <span className="text-primary">Your fridge is full.</span>
            </h1>
            <p className="text-2xl md:text-3xl lg:text-4xl font-serif italic text-muted-foreground">
              And somehow... nothing makes sense.
            </p>
          </div>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10">
            PantryMate tells you exactly what to cook — using what you already have.
          </p>
          
          <Button 
            size="lg" 
            className="text-lg group" 
            onClick={() => navigate("/pantry")}
          >
            Check What You Can Cook
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </AnimatedSection>
      </section>

      {/* Section 2: Interactive Teaser */}
      <section className="relative">
        <DecorativeBackground />
        <InteractiveTeaser />
      </section>

      {/* Section 3: Food Carousel */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-muted/60 via-background to-muted/40 relative">
        <DecorativeBackground />
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block text-primary font-medium uppercase tracking-widest text-sm mb-4">
              Visual Inspiration
            </span>
            <h2 className="text-4xl md:text-6xl font-serif font-bold leading-tight">
              Meals you can make
              <br />
              <span className="italic text-primary">right now</span>
            </h2>
          </AnimatedSection>
        </div>
        
        <MealGallery />
      </section>

      {/* Section 4: The "Smart" Section - Editorial Layout */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-accent/5 via-muted/40 to-primary/10 relative">
        <DecorativeBackground />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <AnimatedSection className="mb-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
                <h2 className="text-4xl md:text-6xl font-serif font-bold leading-tight">
                  Why PantryMate
                  <br />
                  <span className="italic">actually works</span>
                </h2>
                <p className="text-lg text-muted-foreground lg:text-right">
                  No buzzwords. No AI jargon. Just practical solutions for real kitchens.
                </p>
              </div>
            </AnimatedSection>
            
            <div className="divide-y divide-border/50">
              {smartPoints.map((point, index) => (
                <SmartPointCard
                  key={point.title}
                  icon={point.icon}
                  title={point.title}
                  explanation={point.explanation}
                  delay={index * 100}
                  align={index % 2 === 0 ? "left" : "right"}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Weekly Meal Planning */}
      <WeeklyPlanPreview />

      {/* Section 6: Nutrition Without Obsession */}
      <NutritionSection />

      {/* Section 7: Reviews - Editorial Grid */}
      <section className="py-24 md:py-32 relative overflow-hidden bg-gradient-to-tl from-primary/8 via-background to-accent/8">
        <div ref={peopleParallax.ref} className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src={peopleCooking} 
            alt="People enjoying home-cooked meal" 
            className="w-full h-full object-cover" 
            style={{
              transform: `translateY(${peopleParallax.offset}px) scale(1.15)`
            }} 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/80 to-background/90" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block text-primary font-medium uppercase tracking-widest text-sm mb-4">
              Real Stories
            </span>
            <h2 className="text-4xl md:text-6xl font-serif font-bold">
              Loved by <span className="italic">home cooks</span>
            </h2>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {reviews.map((review, index) => (
              <AnimatedSection key={review.name} delay={index * 100}>
                <ReviewCard 
                  name={review.name} 
                  avatar={review.avatar} 
                  rating={review.rating} 
                  review={review.review}
                  role={review.role}
                />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Section 8: Final CTA - Bold & Clean */}
      <section className="py-32 md:py-40 relative overflow-hidden bg-gradient-to-br from-accent/5 via-background to-primary/10">
        <div ref={ctaParallax.ref} className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src={cookingCta} 
            alt="Happy person cooking" 
            className="w-full h-full object-cover" 
            style={{
              transform: `translateY(${ctaParallax.offset}px) scale(1.15)`
            }} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/50" />
        </div>
        
        <AnimatedSection className="relative z-10 container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-tight">
            Your next meal is already
            <br />
            <span className="italic text-primary">in your fridge.</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-md mx-auto">
            Stop overthinking. Start cooking.
          </p>
          <Button 
            size="lg" 
            className="text-lg group" 
            onClick={() => navigate("/pantry")}
          >
            Start Using PantryMate
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </AnimatedSection>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;
