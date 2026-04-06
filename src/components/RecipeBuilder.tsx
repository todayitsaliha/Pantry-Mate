import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { StepCard } from "@/components/StepCard";
import { IngredientInput } from "@/components/IngredientInput";
import { CuisineSelector } from "@/components/CuisineSelector";
import { MealTypeSelector } from "@/components/MealTypeSelector";
import { MealPlanSelector } from "@/components/MealPlanSelector";
import { AllergiesInput } from "@/components/AllergiesInput";
import { MacroGoalsInput } from "@/components/MacroGoalsInput";
import { Sparkles, AlertTriangle, Target, UtensilsCrossed, ChefHat } from "lucide-react";

interface MacroGoals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface RecipeBuilderProps {
  ingredients: string[];
  onIngredientsChange: (ingredients: string[]) => void;
  cuisine: string;
  onCuisineChange: (cuisine: string) => void;
  mealType: string;
  onMealTypeChange: (mealType: string) => void;
  allergies: string[];
  onAllergiesChange: (allergies: string[]) => void;
  planType: "single" | "weekly";
  onPlanTypeChange: (planType: "single" | "weekly") => void;
  macroGoals: MacroGoals;
  onMacroGoalsChange: (goals: MacroGoals) => void;
  isLoading: boolean;
  onGenerate: () => void;
}

export const RecipeBuilder = ({
  ingredients,
  onIngredientsChange,
  cuisine,
  onCuisineChange,
  mealType,
  onMealTypeChange,
  allergies,
  onAllergiesChange,
  planType,
  onPlanTypeChange,
  macroGoals,
  onMacroGoalsChange,
  isLoading,
  onGenerate,
}: RecipeBuilderProps) => {
  const totalSteps = planType === "weekly" ? 5 : 4;
  const completedSteps = [
    true,
    ingredients.length > 0,
    cuisine !== "Any" || mealType !== "Any",
    true,
    planType === "weekly" ? true : null,
  ].filter((step, index) => step !== null && index < totalSteps).filter(Boolean).length;

  const progressValue = (completedSteps / totalSteps) * 100;

  return (
    <div className="space-y-4">
      {/* Progress indicator */}
      <div className="bg-card/60 backdrop-blur-sm border border-border rounded-xl p-4 mb-2">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-muted-foreground">Build your recipe</span>
          <span className="font-medium text-primary">
            {completedSteps}/{totalSteps} steps
          </span>
        </div>
        <Progress value={progressValue} className="h-2" />
      </div>

      {/* All steps visible as a flowing form */}
      <div className="bg-card/60 backdrop-blur-sm border border-border rounded-2xl p-6 md:p-8 space-y-8">
        <StepCard
          stepNumber={1}
          title="What do you need?"
          isCompleted={true}
          icon={<UtensilsCrossed className="h-4 w-4" />}
        >
          <MealPlanSelector value={planType} onChange={onPlanTypeChange} />
        </StepCard>

        <StepCard
          stepNumber={2}
          title="Add your ingredients"
          isCompleted={ingredients.length > 0}
          icon={<ChefHat className="h-4 w-4" />}
        >
          <IngredientInput
            ingredients={ingredients}
            onIngredientsChange={onIngredientsChange}
          />
        </StepCard>

        <StepCard
          stepNumber={3}
          title="Cuisine & meal preferences"
          isCompleted={cuisine !== "Any" || mealType !== "Any"}
        >
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2.5 text-muted-foreground">
                Cuisine
              </label>
              <CuisineSelector value={cuisine} onChange={onCuisineChange} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2.5 text-muted-foreground">
                Meal Type
              </label>
              <MealTypeSelector value={mealType} onChange={onMealTypeChange} />
            </div>
          </div>
        </StepCard>

        <StepCard
          stepNumber={4}
          title="Allergies & dietary restrictions"
          isCompleted={allergies.length > 0}
          icon={<AlertTriangle className="h-4 w-4" />}
        >
          <AllergiesInput allergies={allergies} onAllergiesChange={onAllergiesChange} />
        </StepCard>

        {planType === "weekly" && (
          <StepCard
            stepNumber={5}
            title="Daily macro goals"
            isCompleted={macroGoals.calories > 0 || macroGoals.protein > 0}
            icon={<Target className="h-4 w-4" />}
          >
            <p className="text-sm text-muted-foreground mb-3">
              Optional: Set your daily nutrition targets
            </p>
            <MacroGoalsInput goals={macroGoals} onGoalsChange={onMacroGoalsChange} />
          </StepCard>
        )}
      </div>

      {/* Generate button */}
      <Button
        onClick={onGenerate}
        disabled={isLoading || ingredients.length === 0}
        className="w-full gap-2 h-14 text-lg shadow-lg"
        size="lg"
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary-foreground/30 border-t-primary-foreground" />
            Generating...
          </>
        ) : (
          <>
            <Sparkles className="h-5 w-5" />
            {planType === "weekly" ? "Generate Diet Plan" : "Generate Recipe"}
          </>
        )}
      </Button>
    </div>
  );
};
