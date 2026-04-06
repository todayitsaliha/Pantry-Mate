import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, Clock, Users, ChefHat, Sparkles, Flame, Beef, Wheat, Droplet, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { generateRecipePdf } from "@/lib/generateRecipePdf";

interface DietRecipe {
  name: string;
  ingredients: string[];
  instructions: string[];
  imageUrl?: string;
  cookingTime?: string;
  servings?: string;
  difficulty?: string;
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

interface WeeklyPlanDisplayProps {
  weeklyPlan: WeeklyPlan;
  macroGoals?: MacroGoals;
  onRegenerate: () => void;
}

const dayOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export const WeeklyPlanDisplay = ({ weeklyPlan, macroGoals, onRegenerate }: WeeklyPlanDisplayProps) => {
  const [openDays, setOpenDays] = useState<string[]>([]);

  const toggleDay = (day: string) => {
    setOpenDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const sortedDays = Object.keys(weeklyPlan)
    .filter((key) => dayOrder.includes(key))
    .sort((a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b));

  // Calculate weekly totals
  const weeklyTotals = sortedDays.reduce(
    (acc, day) => {
      const recipe = weeklyPlan[day];
      const calories = parseInt(recipe.calories?.replace(/[^\d]/g, "") || "0");
      const protein = parseInt(recipe.protein?.replace(/[^\d]/g, "") || "0");
      const carbs = parseInt(recipe.carbs?.replace(/[^\d]/g, "") || "0");
      const fat = parseInt(recipe.fat?.replace(/[^\d]/g, "") || "0");
      return {
        calories: acc.calories + calories,
        protein: acc.protein + protein,
        carbs: acc.carbs + carbs,
        fat: acc.fat + fat,
      };
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  const dailyAverage = {
    calories: Math.round(weeklyTotals.calories / 7),
    protein: Math.round(weeklyTotals.protein / 7),
    carbs: Math.round(weeklyTotals.carbs / 7),
    fat: Math.round(weeklyTotals.fat / 7),
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-serif font-bold">Your Weekly Diet Plan</h2>
        <p className="text-muted-foreground text-sm mt-1">
          Balanced meals to help you achieve your health goals
        </p>
      </div>

      {/* Weekly Summary */}
      <div className="bg-primary/10 border-2 border-foreground rounded-brutalist p-4 shadow-[4px_4px_0_hsl(var(--foreground))]">
        <h3 className="font-bold text-sm mb-3">Daily Average</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-2">
            <Flame className="h-4 w-4 text-accent" />
            <div>
              <p className="text-lg font-bold">{dailyAverage.calories}</p>
              <p className="text-xs text-muted-foreground">
                kcal
                {macroGoals?.calories ? ` / ${macroGoals.calories}` : ""}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Beef className="h-4 w-4 text-destructive" />
            <div>
              <p className="text-lg font-bold">{dailyAverage.protein}g</p>
              <p className="text-xs text-muted-foreground">
                protein
                {macroGoals?.protein ? ` / ${macroGoals.protein}g` : ""}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Wheat className="h-4 w-4 text-accent" />
            <div>
              <p className="text-lg font-bold">{dailyAverage.carbs}g</p>
              <p className="text-xs text-muted-foreground">
                carbs
                {macroGoals?.carbs ? ` / ${macroGoals.carbs}g` : ""}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Droplet className="h-4 w-4 text-primary" />
            <div>
              <p className="text-lg font-bold">{dailyAverage.fat}g</p>
              <p className="text-xs text-muted-foreground">
                fat
                {macroGoals?.fat ? ` / ${macroGoals.fat}g` : ""}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Recipes */}
      <div className="space-y-3">
        {sortedDays.map((day) => {
          const recipe = weeklyPlan[day];
          const isOpen = openDays.includes(day);

          return (
            <Collapsible key={day} open={isOpen} onOpenChange={() => toggleDay(day)}>
              <div className="bg-card border-2 border-foreground rounded-brutalist shadow-[3px_3px_0_hsl(var(--foreground))] overflow-hidden">
                <CollapsibleTrigger className="w-full">
                  <div className="p-4 flex items-start gap-4 hover:bg-muted/50 transition-colors">
                    {recipe.imageUrl && (
                      <img
                        src={recipe.imageUrl}
                        alt={recipe.name}
                        className="w-16 h-16 object-cover rounded-brutalist flex-shrink-0 border-2 border-foreground"
                      />
                    )}
                    <div className="flex-1 min-w-0 text-left">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-primary">{day}</h3>
                        <ChevronDown
                          className={cn(
                            "h-5 w-5 text-foreground transition-transform",
                            isOpen && "rotate-180"
                          )}
                        />
                      </div>
                      <p className="font-bold text-lg truncate">{recipe.name}</p>
                      <div className="flex flex-wrap gap-2 text-sm text-muted-foreground mt-1">
                        {recipe.cookingTime && <span>⏱ {recipe.cookingTime}</span>}
                        {recipe.calories && <span>🔥 {recipe.calories}</span>}
                        {recipe.difficulty && <span>📊 {recipe.difficulty}</span>}
                      </div>
                      {recipe.nutritionTip && (
                        <p className="text-xs text-primary mt-2 italic line-clamp-1 font-medium">
                          {recipe.nutritionTip}
                        </p>
                      )}
                    </div>
                  </div>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <div className="px-4 pb-4 space-y-4 border-t-2 border-foreground pt-4">
                    {/* Nutrition Info */}
                    <div className="grid grid-cols-4 gap-2">
                      {recipe.calories && (
                        <div className="bg-accent/10 border-2 border-foreground rounded-brutalist p-2 text-center">
                          <Flame className="h-4 w-4 mx-auto text-accent mb-1" />
                          <p className="text-sm font-bold">{recipe.calories}</p>
                        </div>
                      )}
                      {recipe.protein && (
                        <div className="bg-destructive/10 border-2 border-foreground rounded-brutalist p-2 text-center">
                          <Beef className="h-4 w-4 mx-auto text-destructive mb-1" />
                          <p className="text-sm font-bold">{recipe.protein}</p>
                        </div>
                      )}
                      {recipe.carbs && (
                        <div className="bg-accent/10 border-2 border-foreground rounded-brutalist p-2 text-center">
                          <Wheat className="h-4 w-4 mx-auto text-accent mb-1" />
                          <p className="text-sm font-bold">{recipe.carbs}</p>
                        </div>
                      )}
                      {recipe.fat && (
                        <div className="bg-primary/10 border-2 border-foreground rounded-brutalist p-2 text-center">
                          <Droplet className="h-4 w-4 mx-auto text-primary mb-1" />
                          <p className="text-sm font-bold">{recipe.fat}</p>
                        </div>
                      )}
                    </div>

                    {/* Recipe Meta */}
                    <div className="flex flex-wrap gap-2">
                      {recipe.cookingTime && (
                        <Badge variant="secondary" className="gap-1">
                          <Clock className="h-3 w-3" />
                          {recipe.cookingTime}
                        </Badge>
                      )}
                      {recipe.servings && (
                        <Badge variant="secondary" className="gap-1">
                          <Users className="h-3 w-3" />
                          {recipe.servings} serving{recipe.servings !== "1" ? "s" : ""}
                        </Badge>
                      )}
                      {recipe.difficulty && (
                        <Badge variant="secondary" className="gap-1">
                          <ChefHat className="h-3 w-3" />
                          {recipe.difficulty}
                        </Badge>
                      )}
                    </div>

                    {/* Nutrition Tip */}
                    {recipe.nutritionTip && (
                      <div className="bg-primary/10 border-2 border-foreground rounded-brutalist p-3">
                        <p className="text-sm text-primary font-medium italic">
                          💡 {recipe.nutritionTip}
                        </p>
                      </div>
                    )}

                    {/* Ingredients */}
                    <div className="bg-muted border-2 border-foreground rounded-brutalist p-4">
                      <h4 className="font-bold text-sm mb-2">Ingredients</h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
                        {recipe.ingredients.map((ingredient, idx) => (
                          <li
                            key={idx}
                            className="flex items-center gap-2 text-sm text-muted-foreground"
                          >
                            <span className="w-2 h-2 bg-primary border border-foreground shrink-0" />
                            {ingredient}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Instructions */}
                    <div>
                      <h4 className="font-bold text-sm mb-2">Instructions</h4>
                      <ol className="space-y-2">
                        {recipe.instructions.map((instruction, idx) => (
                          <li key={idx} className="flex gap-3 text-sm">
                            <span className="shrink-0 w-6 h-6 rounded-brutalist bg-muted border-2 border-foreground text-foreground font-bold text-xs flex items-center justify-center">
                              {idx + 1}
                            </span>
                            <p className="text-muted-foreground pt-0.5">{instruction}</p>
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Download Button */}
                    <Button
                      onClick={() => generateRecipePdf(recipe)}
                      variant="outline"
                      size="sm"
                      className="w-full gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Download {day}'s Recipe PDF
                    </Button>
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          );
        })}
      </div>

      <Button onClick={onRegenerate} variant="outline" className="w-full">
        <Sparkles className="h-4 w-4 mr-2" />
        Regenerate Diet Plan
      </Button>
    </div>
  );
};