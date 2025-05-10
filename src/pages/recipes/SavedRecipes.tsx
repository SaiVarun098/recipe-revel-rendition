
import { useRecipe } from "@/contexts/RecipeContext";
import { useAuth } from "@/contexts/AuthContext";
import RecipeList from "@/components/recipes/RecipeList";
import { Button } from "@/components/ui/button";
import { Link, Navigate } from "react-router-dom";

export default function SavedRecipes() {
  const { recipes, savedRecipes } = useRecipe();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const savedRecipeObjects = recipes.filter(recipe => savedRecipes.includes(recipe.id));

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold">Saved Recipes</h1>
          <p className="text-muted-foreground">
            Access your favorite recipes anytime
          </p>
        </div>

        <RecipeList
          recipes={savedRecipeObjects}
          emptyStateMessage={
            <>
              <p className="mb-4">You haven't saved any recipes yet.</p>
              <Button asChild>
                <Link to="/recipes">Browse Recipes</Link>
              </Button>
            </>
          }
        />
      </div>
    </div>
  );
}
