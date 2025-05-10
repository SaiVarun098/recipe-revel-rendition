
import { useRecipe } from "@/contexts/RecipeContext";
import { useAuth } from "@/contexts/AuthContext";
import RecipeList from "@/components/recipes/RecipeList";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link, Navigate } from "react-router-dom";

export default function UserRecipes() {
  const { recipes } = useRecipe();
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const userRecipes = recipes.filter(
    (recipe) => recipe.createdBy === user?.id || recipe.collaborators.includes(user?.id || "")
  );

  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">My Recipes</h1>
          <p className="text-muted-foreground">
            Manage and organize your personal recipe collection
          </p>
        </div>
        <Button asChild className="flex items-center gap-2">
          <Link to="/create">
            <Plus className="h-4 w-4" />
            Create Recipe
          </Link>
        </Button>
      </div>

      <RecipeList
        recipes={userRecipes}
        emptyStateMessage={
          <>
            <p className="mb-4">You haven't created any recipes yet.</p>
            <Button asChild className="mt-4">
              <Link to="/create">Create Your First Recipe</Link>
            </Button>
          </>
        }
      />
    </div>
  );
}
