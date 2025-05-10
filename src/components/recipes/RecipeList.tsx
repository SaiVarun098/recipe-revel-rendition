
import { ReactNode } from "react";
import { Grid } from "lucide-react";
import { cn } from "@/lib/utils";
import RecipeCard from "./RecipeCard";

interface Recipe {
  id: string;
  title: string;
  description: string;
  prepTime: number;
  cookTime: number;
  tags: string[];
  image: string;
  chefName: string; // Add chef name field
}

interface RecipeListProps {
  recipes: Recipe[];
  emptyStateMessage: ReactNode;
  className?: string;
  onRecipeClick?: (id: string) => boolean;
}

export default function RecipeList({
  recipes,
  emptyStateMessage,
  className,
  onRecipeClick,
}: RecipeListProps) {
  if (recipes.length === 0) {
    return (
      <div className="text-center py-12 space-y-4">
        <Grid className="mx-auto h-12 w-12 text-muted-foreground" />
        {emptyStateMessage}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",
        className
      )}
    >
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          id={recipe.id}
          title={recipe.title}
          description={recipe.description}
          prepTime={recipe.prepTime}
          cookTime={recipe.cookTime}
          tags={recipe.tags}
          image={recipe.image}
          chefName={recipe.chefName} // Pass chef name
        />
      ))}
    </div>
  );
}
