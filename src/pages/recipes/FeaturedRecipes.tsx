
import { useRecipe } from "@/contexts/RecipeContext";
import RecipeList from "@/components/recipes/RecipeList";

export default function FeaturedRecipes() {
  const { featuredRecipes } = useRecipe();

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Featured Recipes</h1>
          <p className="text-muted-foreground">
            Discover our curated collection of delicious recipes
          </p>
        </div>
        
        <RecipeList recipes={featuredRecipes} />
      </div>
    </div>
  );
}
