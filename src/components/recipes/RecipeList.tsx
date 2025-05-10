import { useState } from "react";
import RecipeCard from "./RecipeCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { useRecipe } from "@/contexts/RecipeContext";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ReactNode } from "react";

interface RecipeListProps {
  title?: string;
  recipes: any[];
  emptyStateMessage?: string | ReactNode;
}

export function RecipeList({ title, recipes, emptyStateMessage }: RecipeListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("newest");

  // Extract all unique tags from recipes
  const allTags = Array.from(
    new Set(recipes.flatMap((recipe) => recipe.tags))
  ).sort();

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch = recipe.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase()) || 
      recipe.description.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.every((tag) => recipe.tags.includes(tag));
      
    return matchesSearch && matchesTags;
  });

  const sortedRecipes = [...filteredRecipes].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case "oldest":
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case "az":
        return a.title.localeCompare(b.title);
      case "za":
        return b.title.localeCompare(a.title);
      case "prepTime":
        return a.prepTime - b.prepTime;
      case "cookTime":
        return a.cookTime - b.cookTime;
      case "totalTime":
        return (a.prepTime + a.cookTime) - (b.prepTime + b.cookTime);
      default:
        return 0;
    }
  });

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSelectedTags([]);
    setSortBy("newest");
  };

  return (
    <div className="space-y-6">
      {title && <h2 className="text-2xl font-bold">{title}</h2>}

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search recipes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter & Sort
              {(selectedTags.length > 0 || sortBy !== "newest") && (
                <span className="ml-1 rounded-full bg-primary w-2 h-2"></span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filter & Sort Recipes</SheetTitle>
            </SheetHeader>
            
            <div className="grid gap-6 py-6">
              <div>
                <Label htmlFor="sort-by" className="mb-2 block">Sort by</Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger id="sort-by">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest first</SelectItem>
                    <SelectItem value="oldest">Oldest first</SelectItem>
                    <SelectItem value="az">A-Z</SelectItem>
                    <SelectItem value="za">Z-A</SelectItem>
                    <SelectItem value="prepTime">Prep time (shortest first)</SelectItem>
                    <SelectItem value="cookTime">Cook time (shortest first)</SelectItem>
                    <SelectItem value="totalTime">Total time (shortest first)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="mb-2 block">Filter by tags</Label>
                <div className="grid grid-cols-2 gap-2 max-h-64 overflow-auto">
                  {allTags.map((tag) => (
                    <div key={tag} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`tag-${tag}`} 
                        checked={selectedTags.includes(tag)} 
                        onCheckedChange={() => handleTagToggle(tag)}
                      />
                      <Label htmlFor={`tag-${tag}`} className="text-sm">{tag}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <SheetFooter>
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
              <SheetClose asChild>
                <Button>Apply</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      {sortedRecipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {sortedRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              id={recipe.id}
              title={recipe.title}
              description={recipe.description}
              prepTime={recipe.prepTime}
              cookTime={recipe.cookTime}
              tags={recipe.tags}
              image={recipe.image}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-xl text-muted-foreground">
            {emptyStateMessage || "No recipes found matching your criteria"}
          </p>
        </div>
      )}
    </div>
  );
}

export default RecipeList;
