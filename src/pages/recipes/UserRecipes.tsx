
import { useState } from "react";
import { useRecipe } from "@/contexts/RecipeContext";
import { useAuth } from "@/contexts/AuthContext";
import RecipeList from "@/components/recipes/RecipeList";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function UserRecipes() {
  const { recipes } = useRecipe();
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("all");

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const userCreatedRecipes = recipes.filter(
    (recipe) => recipe.createdBy === user?.id
  );

  const collaboratedRecipes = recipes.filter(
    (recipe) => recipe.createdBy !== user?.id && recipe.collaborators.includes(user?.id || "")
  );

  const allUserRecipes = [...userCreatedRecipes, ...collaboratedRecipes];

  const emptyState = (
    <>
      <p className="mb-4">You haven't created any recipes yet.</p>
      <Button asChild className="mt-4">
        <Link to="/create">Create Your First Recipe</Link>
      </Button>
    </>
  );

  const emptyCollaboratedState = (
    <p className="mb-4">You don't have any recipes you're collaborating on.</p>
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

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mt-6">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Recipes</TabsTrigger>
          <TabsTrigger value="created">Created by Me</TabsTrigger>
          <TabsTrigger value="collaborated">Collaborations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <RecipeList
            recipes={allUserRecipes}
            emptyStateMessage={emptyState}
          />
        </TabsContent>
        
        <TabsContent value="created">
          <RecipeList
            recipes={userCreatedRecipes}
            emptyStateMessage={emptyState}
          />
        </TabsContent>
        
        <TabsContent value="collaborated">
          <RecipeList
            recipes={collaboratedRecipes}
            emptyStateMessage={emptyCollaboratedState}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
