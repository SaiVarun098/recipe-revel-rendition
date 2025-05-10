
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  Heart,
  Users,
  ChevronLeft,
  Share,
  Pencil,
  Trash2,
  AlertTriangle,
} from "lucide-react";
import { useRecipe } from "@/contexts/RecipeContext";
import { useAuth } from "@/contexts/AuthContext";
import RecipeTimer from "@/components/recipes/RecipeTimer";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export default function RecipeDetail() {
  const { id } = useParams<{ id: string }>();
  const { getRecipeById, isRecipeSaved, saveRecipe, unsaveRecipe, scaleIngredients, deleteRecipe } = useRecipe();
  const { user, isAuthenticated } = useAuth();
  const [recipe, setRecipe] = useState<any>(null);
  const [servings, setServings] = useState<number>(0);
  const [ingredients, setIngredients] = useState<any[]>([]);
  const [isOwner, setIsOwner] = useState(false);
  const [isCollaborator, setIsCollaborator] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchedRecipe = getRecipeById(id);
      if (fetchedRecipe) {
        setRecipe(fetchedRecipe);
        setServings(fetchedRecipe.servings);
        setIngredients(fetchedRecipe.ingredients);

        if (user) {
          setIsOwner(fetchedRecipe.createdBy === user.id);
          setIsCollaborator(fetchedRecipe.collaborators.includes(user.id));
        }
      }
    }
  }, [id, getRecipeById, user]);

  const handleServingsChange = (value: string) => {
    const newServings = parseInt(value, 10);
    setServings(newServings);
    
    if (recipe) {
      const newIngredients = scaleIngredients(recipe, newServings);
      setIngredients(newIngredients);
    }
  };

  const handleRecipeDelete = async () => {
    try {
      await deleteRecipe(id!);
      toast.success("Recipe deleted successfully");
      navigate("/my-recipes");
    } catch (error) {
      toast.error("Failed to delete recipe");
      console.error(error);
    }
  };

  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
        title: recipe.title,
        text: recipe.description,
        url: window.location.href,
      }).catch(err => {
        console.error('Error sharing:', err);
        copyToClipboard();
      });
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard");
  };

  if (!recipe) {
    return (
      <div className="container py-10">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Recipe not found</h2>
          <Button asChild>
            <Link to="/recipes">Browse Recipes</Link>
          </Button>
        </div>
      </div>
    );
  }

  const saved = isRecipeSaved(id!);
  
  const toggleSave = () => {
    if (!isAuthenticated) {
      toast.error("Please log in to save recipes", {
        action: {
          label: "Log in",
          onClick: () => navigate("/login"),
        },
      });
      return;
    }
    
    if (saved) {
      unsaveRecipe(id!);
    } else {
      saveRecipe(id!);
    }
  };

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-6">
        {/* Navigation */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link to="/recipes" className="flex items-center gap-1">
              <ChevronLeft className="h-4 w-4" />
              Back to recipes
            </Link>
          </Button>
        </div>

        {/* Header */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold">{recipe.title}</h1>
            <p className="text-muted-foreground text-lg">{recipe.description}</p>
            
            <div className="flex flex-wrap gap-2 my-3">
              {recipe.tags.map((tag: string) => (
                <Badge key={tag} className="hover-scale">{tag}</Badge>
              ))}
            </div>
            
            <div className="flex gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>Prep: {recipe.prepTime} min</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>Cook: {recipe.cookTime} min</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>Total: {recipe.prepTime + recipe.cookTime} min</span>
              </div>
            </div>
            
            <div className="flex gap-4 mt-4">
              <Button
                onClick={toggleSave}
                variant={saved ? "default" : "outline"}
                className="flex items-center gap-2"
              >
                <Heart className={cn("h-4 w-4", saved && "fill-current")} />
                {saved ? "Saved" : "Save Recipe"}
              </Button>
              
              <Button variant="outline" onClick={handleShareClick} className="flex items-center gap-2">
                <Share className="h-4 w-4" />
                Share
              </Button>

              {(isOwner || isCollaborator) && (
                <Button
                  variant="outline"
                  asChild
                  className="flex items-center gap-2"
                >
                  <Link to={`/recipes/${id}/edit`}>
                    <Pencil className="h-4 w-4" />
                    Edit
                  </Link>
                </Button>
              )}

              {isOwner && (
                <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="destructive" className="flex items-center gap-2">
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-destructive" />
                        Delete Recipe
                      </DialogTitle>
                      <DialogDescription>
                        Are you sure you want to delete this recipe? This action cannot be undone.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button variant="destructive" onClick={handleRecipeDelete}>
                        Delete Recipe
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>

          <div className="relative rounded-lg overflow-hidden aspect-video">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-3 gap-8 mt-8">
          {/* Ingredients */}
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                Ingredients
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <Select
                    value={String(servings)}
                    onValueChange={handleServingsChange}
                  >
                    <SelectTrigger className="w-[100px]">
                      <SelectValue placeholder="Servings" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 12 }, (_, i) => i + 1).map(
                        (num) => (
                          <SelectItem key={num} value={String(num)}>
                            {num} {num === 1 ? "serving" : "servings"}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </CardTitle>
              <CardDescription>
                All ingredients needed for this recipe
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {ingredients.map((ingredient, index) => (
                  <li key={index} className="flex justify-between">
                    <span>{ingredient.name}</span>
                    <span className="font-medium">
                      {ingredient.quantity} {ingredient.unit}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Instructions */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Instructions</CardTitle>
                <CardDescription>
                  Follow these steps to prepare {recipe.title}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {recipe.instructions.map((instruction: any, index: number) => (
                    <AccordionItem
                      key={index}
                      value={`step-${index}`}
                      className="border-b"
                    >
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center gap-3 text-left">
                          <div className="flex h-7 w-7 items-center justify-center rounded-full border bg-muted">
                            {instruction.step}
                          </div>
                          <span className="font-medium">
                            {instruction.description.split(".")[0]}
                          </span>
                          {instruction.timer && (
                            <Badge variant="outline" className="ml-2">
                              <Clock className="h-3 w-3 mr-1" />
                              {instruction.timer} min
                            </Badge>
                          )}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pl-10">
                        <div className="space-y-4">
                          <p>{instruction.description}</p>
                          {instruction.timer && (
                            <RecipeTimer
                              minutes={instruction.timer}
                              stepDescription={instruction.description}
                            />
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
