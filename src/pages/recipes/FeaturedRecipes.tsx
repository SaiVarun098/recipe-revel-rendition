
import RecipeList from "@/components/recipes/RecipeList";
import { useRecipe } from "@/contexts/RecipeContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function FeaturedRecipes() {
  const { featuredRecipes } = useRecipe();

  const emptyStateMessage = (
    <>
      <p className="text-xl mb-4">
        There are no featured recipes available at the moment.
      </p>
      <p className="mb-6">Would you like to create your own recipes?</p>
      <Button asChild>
        <Link to="/create">Create Recipe</Link>
      </Button>
    </>
  );

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold">Featured Recipes</h1>
        <RecipeList 
          recipes={featuredRecipes} 
          emptyStateMessage={emptyStateMessage}
        />
      </div>
    </div>
  );
}
