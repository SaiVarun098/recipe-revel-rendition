
import { useState } from "react";
import { useRecipe } from "@/contexts/RecipeContext";
import RecipeList from "@/components/recipes/RecipeList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function RecipesPage() {
  const { recipes } = useRecipe();
  const [activeTab, setActiveTab] = useState("all");

  // Extract unique categories
  const categories = Array.from(
    new Set(recipes.flatMap((recipe) => recipe.tags))
  ).sort();

  // Filter recipes by selected category
  const filteredRecipes = activeTab === "all"
    ? recipes
    : recipes.filter((recipe) => recipe.tags.includes(activeTab));

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Browse Recipes</h1>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="mb-6 border-b overflow-auto pb-2">
          <TabsList className="inline-flex h-auto bg-transparent p-0 w-auto">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md px-3 py-1.5 text-sm font-medium transition-all"
            >
              All
            </TabsTrigger>
            {categories.slice(0, 10).map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md px-3 py-1.5 text-sm font-medium transition-all"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        
        <TabsContent value={activeTab} className="mt-0 animate-fade-in">
          <RecipeList 
            recipes={filteredRecipes}
            emptyStateMessage={`No ${activeTab !== "all" ? activeTab.toLowerCase() : ""} recipes found`}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
