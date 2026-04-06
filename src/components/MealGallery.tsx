import { Badge } from "@/components/ui/badge";
import pastaPrimavera from "@/assets/meals/pasta-primavera.jpg";
import thaiCurry from "@/assets/meals/thai-curry.jpg";
import grilledSalmon from "@/assets/meals/grilled-salmon.jpg";
import mushroomRisotto from "@/assets/meals/mushroom-risotto.jpg";
import chickenStirfry from "@/assets/meals/chicken-stirfry.jpg";
import caesarSalad from "@/assets/meals/caesar-salad.jpg";

const meals = [
  { name: "Pasta Primavera", image: pastaPrimavera, cuisine: "Italian", calories: 450 },
  { name: "Thai Green Curry", image: thaiCurry, cuisine: "Thai", calories: 520 },
  { name: "Grilled Salmon", image: grilledSalmon, cuisine: "Mediterranean", calories: 380 },
  { name: "Mushroom Risotto", image: mushroomRisotto, cuisine: "Italian", calories: 490 },
  { name: "Chicken Stir Fry", image: chickenStirfry, cuisine: "Asian", calories: 410 },
  { name: "Caesar Salad", image: caesarSalad, cuisine: "American", calories: 320 },
];

export const MealGallery = () => {
  // Duplicate meals for seamless infinite scroll
  const duplicatedMeals = [...meals, ...meals];

  return (
    <div className="w-full overflow-hidden">
      <div 
        className="flex gap-4 animate-scroll"
        style={{ width: "fit-content" }}
      >
        {duplicatedMeals.map((meal, index) => (
          <div 
            key={`${meal.name}-${index}`}
            className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer flex-shrink-0 w-[280px]"
          >
            <div className="aspect-square overflow-hidden">
              <img
                src={meal.image}
                alt={meal.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            {/* Cuisine Tag */}
            <Badge 
              variant="secondary" 
              className="absolute top-4 left-4 text-xs backdrop-blur-sm bg-card/80"
            >
              {meal.cuisine}
            </Badge>
            {/* Calorie Badge - shows on hover */}
            <Badge 
              variant="outline" 
              className="absolute top-4 right-4 text-xs opacity-0 group-hover:opacity-100 transition-opacity bg-card/80 backdrop-blur-sm"
            >
              {meal.calories} cal
            </Badge>
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <h3 className="text-lg font-semibold text-background">
                {meal.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
