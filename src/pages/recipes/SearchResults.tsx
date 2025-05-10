
import { useSearchParams } from "react-router-dom";
import { useRecipe } from "@/contexts/RecipeContext";
import RecipeList from "@/components/recipes/RecipeList";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const { recipes } = useRecipe();
  const { isAuthenticated } = useAuth();
  const [loginPromptOpen, setLoginPromptOpen] = useState(false);
  const [recipeToView, setRecipeToView] = useState<string | null>(null);

  const filteredRecipes = recipes.filter(recipe => 
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
    recipe.chefName.toLowerCase().includes(searchQuery.toLowerCase()) || // Search by chef name
    recipe.ingredients.some(ing => ing.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleRecipeClick = (recipeId: string) => {
    if (!isAuthenticated) {
      setRecipeToView(recipeId);
      setLoginPromptOpen(true);
      return false;
    }
    return true;
  };

  const emptyStateMessage = (
    <>
      <p className="text-xl mb-4">
        No chef has made a recipe for "{searchQuery}" in our collection yet.
      </p>
      <p className="mb-6">Would you like to be the first?</p>
      <Button asChild>
        <Link to="/create">Create Recipe</Link>
      </Button>
    </>
  );

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <Search className="h-6 w-6 text-muted-foreground" />
          <div>
            <h1 className="text-3xl font-bold">Search Results</h1>
            <p className="text-muted-foreground">
              {filteredRecipes.length} results for "{searchQuery}"
            </p>
          </div>
        </div>
        
        <RecipeList
          recipes={filteredRecipes}
          emptyStateMessage={emptyStateMessage}
          onRecipeClick={handleRecipeClick}
        />

        <Dialog open={loginPromptOpen} onOpenChange={setLoginPromptOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Sign in required</DialogTitle>
              <DialogDescription>
                You need to be signed in to view detailed recipe information.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setLoginPromptOpen(false)}>
                Cancel
              </Button>
              <Button asChild onClick={() => setLoginPromptOpen(false)}>
                <Link to="/login">Sign in</Link>
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
