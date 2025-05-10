
import { useSearchParams } from "react-router-dom";
import { useRecipe } from "@/contexts/RecipeContext";
import RecipeList from "@/components/recipes/RecipeList";
import { Search } from "lucide-react";

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
          emptyStateMessage={`No recipes found matching "${searchQuery}"`}
        />
      </div>
    </div>
  );
}
