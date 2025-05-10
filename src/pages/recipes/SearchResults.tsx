
import { useSearchParams } from "react-router-dom";
import { useRecipe } from "@/contexts/RecipeContext";
import RecipeList from "@/components/recipes/RecipeList";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const { recipes } = useRecipe();

  const filteredRecipes = recipes.filter(recipe => 
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
    recipe.ingredients.some(ing => ing.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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
        />
      </div>
    </div>
  );
}
