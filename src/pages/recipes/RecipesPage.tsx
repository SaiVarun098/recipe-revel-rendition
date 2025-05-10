
import { useState } from "react";
import { useRecipe } from "@/contexts/RecipeContext";
import RecipeList from "@/components/recipes/RecipeList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function RecipesPage() {
  const { recipes } = useRecipe();
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("all");
  const [loginPromptOpen, setLoginPromptOpen] = useState(false);
  const [recipesToView, setRecipesToView] = useState<string | null>(null);

  // Extract unique categories
  const categories = Array.from(
    new Set(recipes.flatMap((recipe) => recipe.tags))
  ).sort();

  // Filter recipes by selected category
  const filteredRecipes = activeTab === "all"
    ? recipes
    : recipes.filter((recipe) => recipe.tags.includes(activeTab));

  const handleRecipeClick = (recipeId: string) => {
    if (!isAuthenticated) {
      setRecipesToView(recipeId);
      setLoginPromptOpen(true);
      return false;
    }
    return true;
  };

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
  );
}
