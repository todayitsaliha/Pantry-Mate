import { useState, lazy, Suspense } from "react";
import { RecipeBuilder } from "@/components/RecipeBuilder";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Sparkles } from "lucide-react";

const RecipeDisplay = lazy(() => import("@/components/RecipeDisplay").then(m => ({ default: m.RecipeDisplay })));
const WeeklyPlanDisplay = lazy(() => import("@/components/WeeklyPlanDisplay").then(m => ({ default: m.WeeklyPlanDisplay })));
const DecorativeBackground = lazy(() => import("@/components/DecorativeBackground"));
import { useToast } from "@/hooks/use-toast";

interface Recipe {
  name: string;
  ingredients: string[];
  instructions: string[];
  imageUrl?: string;
  cookingTime?: string;
  servings?: string;
  difficulty?: string;
}

interface DietRecipe extends Recipe {
  calories?: string;
  protein?: string;
  carbs?: string;
  fat?: string;
  nutritionTip?: string;
}

interface WeeklyPlan {
  [day: string]: DietRecipe;
}

interface MacroGoals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

const Pantry = () => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [cuisine, setCuisine] = useState<string>("Any");
  const [mealType, setMealType] = useState<string>("Any");
  const [allergies, setAllergies] = useState<string[]>([]);
  const [planType, setPlanType] = useState<"single" | "weekly">("single");
  const [macroGoals, setMacroGoals] = useState<MacroGoals>({ calories: 0, protein: 0, carbs: 0, fat: 0 });
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [weeklyPlan, setWeeklyPlan] = useState<WeeklyPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const generateRecipe = async () => {
    if (ingredients.length === 0) {
      toast({
        title: "No ingredients",
        description: "Please add at least one ingredient",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setRecipe(null);
    setWeeklyPlan(null);
    
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-recipe`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            ingredients,
            cuisine,
            mealType,
            allergies,
            planType,
            macroGoals: planType === "weekly" ? macroGoals : undefined,
          }),
        }
      );

      if (response.status === 429) {
        toast({
          title: "Rate limit exceeded",
          description: "Please wait a moment and try again.",
          variant: "destructive",
        });
        return;
      }

      if (response.status === 402) {
        toast({
          title: "Credits required",
          description: "Please add credits to continue generating recipes.",
          variant: "destructive",
        });
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to generate recipe");
      }

      const parsedResult = await response.json();
      
      if (planType === "weekly") {
        setWeeklyPlan(parsedResult);
        toast({
          title: "Diet plan ready!",
          description: "Your weekly diet plan is ready to help you eat healthier.",
        });
      } else {
        setRecipe(parsedResult);
        toast({
          title: "Recipe ready!",
          description: `Your ${parsedResult.name} recipe is ready to cook.`,
        });
      }
    } catch (error) {
      console.error("Error generating recipe:", error);
      toast({
        title: "Error",
        description: "Failed to generate recipe. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/40 via-background to-muted/60 flex flex-col relative">
      <Suspense fallback={null}>
        <DecorativeBackground />
      </Suspense>
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-3xl flex-1 pt-24 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-10 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4" />
            AI-Powered Recipe Generation
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-3">
            What's in your pantry?
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto text-lg">
            Add your ingredients and let our AI create the perfect recipe for you
          </p>
        </div>

        {/* Recipe Builder - Step-based UI */}
        <div className="animate-fade-in mb-8" style={{ animationDelay: "100ms" }}>
          <RecipeBuilder
            ingredients={ingredients}
            onIngredientsChange={setIngredients}
            cuisine={cuisine}
            onCuisineChange={setCuisine}
            mealType={mealType}
            onMealTypeChange={setMealType}
            allergies={allergies}
            onAllergiesChange={setAllergies}
            planType={planType}
            onPlanTypeChange={setPlanType}
            macroGoals={macroGoals}
            onMacroGoalsChange={setMacroGoals}
            isLoading={isLoading}
            onGenerate={generateRecipe}
          />
        </div>

        <Suspense fallback={null}>
          <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
            {planType === "single" ? (
              <RecipeDisplay
                recipe={recipe}
                isLoading={isLoading}
                onRegenerate={generateRecipe}
              />
            ) : (
              weeklyPlan && (
                <WeeklyPlanDisplay 
                  weeklyPlan={weeklyPlan}
                  macroGoals={macroGoals}
                  onRegenerate={generateRecipe}
                />
              )
            )}
          </div>
        </Suspense>
      </main>
      
      <Footer />
    </div>
  );
};

export default Pantry;
