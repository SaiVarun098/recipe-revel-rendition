
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRecipe } from "@/contexts/RecipeContext";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface RecipeCardProps {
  id: string;
  title: string;
  description: string;
  prepTime: number;
  cookTime: number;
  tags: string[];
  image: string;
  className?: string;
}

export function RecipeCard({ id, title, description, prepTime, cookTime, tags, image, className }: RecipeCardProps) {
  const { isRecipeSaved, saveRecipe, unsaveRecipe } = useRecipe();
  const { isAuthenticated } = useAuth();
  const [loginPromptOpen, setLoginPromptOpen] = useState(false);
  
  const saved = isRecipeSaved(id);
  const totalTime = prepTime + cookTime;
  
  const toggleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      setLoginPromptOpen(true);
      return;
    }
    
    if (saved) {
      unsaveRecipe(id);
    } else {
      saveRecipe(id);
    }
  };
  
  return (
    <>
      <Card className={cn("overflow-hidden transition-all hover:shadow-md hover:-translate-y-1 animate-fade-in", className)}>
        <Link to={`/recipes/${id}`}>
          <div className="relative aspect-video overflow-hidden">
            <img
              src={image}
              alt={title}
              className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-background/90"
              onClick={toggleSave}
            >
              <Heart className={cn("h-5 w-5", saved ? "fill-red-500 text-red-500" : "text-muted-foreground")} />
              <span className="sr-only">{saved ? "Unsave" : "Save"} recipe</span>
            </Button>
          </div>
          
          <CardHeader className="p-4">
            <CardTitle className="line-clamp-1">{title}</CardTitle>
            <CardDescription className="line-clamp-2">{description}</CardDescription>
          </CardHeader>
          
          <CardContent className="p-4 pt-0">
            <div className="flex items-center text-sm text-muted-foreground gap-2">
              <Clock className="h-4 w-4" />
              <span>{totalTime} mins</span>
            </div>
          </CardContent>
          
          <CardFooter className="p-4 pt-0 flex flex-wrap gap-2">
            {tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="hover-scale">
                {tag}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge variant="outline">+{tags.length - 3}</Badge>
            )}
          </CardFooter>
        </Link>
      </Card>

      <Dialog open={loginPromptOpen} onOpenChange={setLoginPromptOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign in required</DialogTitle>
            <DialogDescription>
              You need to be signed in to save recipes to your collection.
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
    </>
  );
}

export default RecipeCard;
