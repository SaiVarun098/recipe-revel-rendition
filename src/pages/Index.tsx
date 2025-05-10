
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChefHat, Utensils, Timer, Users, ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useRecipe } from "@/contexts/RecipeContext";
import RecipeCard from "@/components/recipes/RecipeCard";

export default function HomePage() {
  const { isAuthenticated } = useAuth();
  const { featuredRecipes } = useRecipe();
  
  return (
    <>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-recipe-primary/10 to-background">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-recipe-primary font-medium">
                <ChefHat className="h-5 w-5" />
                <span>Welcome to RecipeHub</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-recipe-primary">Collaborate</span> on recipes with friends and family
              </h1>
              <p className="text-xl text-muted-foreground">
                Create, share, and scale recipes together. Add timers to steps and cook with confidence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                {isAuthenticated ? (
                  <Button asChild size="lg" className="gap-2">
                    <Link to="/create">
                      Start Creating
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                ) : (
                  <Button asChild size="lg" className="gap-2">
                    <Link to="/register">
                      Sign Up Free
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                )}
                <Button asChild variant="outline" size="lg">
                  <Link to="/recipes">Browse Recipes</Link>
                </Button>
              </div>
            </div>
            <div className="relative hidden md:block">
              <img
                src="https://images.unsplash.com/photo-1498837167922-ddd27525d352"
                alt="Recipe Collaboration"
                className="rounded-lg shadow-xl animate-fade-in"
              />
              <div className="absolute -bottom-6 -left-6 bg-background p-4 rounded-lg shadow-lg animate-fade-in">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-recipe-primary" />
                  <span className="font-medium">Real-time collaboration</span>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 bg-background p-4 rounded-lg shadow-lg animate-fade-in">
                <div className="flex items-center gap-2">
                  <Timer className="h-5 w-5 text-recipe-primary" />
                  <span className="font-medium">Built-in timers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Everything you need to create perfect recipes</h2>
            <p className="text-muted-foreground text-lg">
              Our platform makes it easy to create, share, and perfect your favorite recipes.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card rounded-xl p-6 shadow-sm border hover:shadow-md transition-all">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-recipe-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Collaborative Editing</h3>
              <p className="text-muted-foreground">
                Invite friends and family to collaborate on recipes together, just like using a shared document.
              </p>
            </div>
            
            <div className="bg-card rounded-xl p-6 shadow-sm border hover:shadow-md transition-all">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Utensils className="h-6 w-6 text-recipe-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Ingredient Scaling</h3>
              <p className="text-muted-foreground">
                Automatically adjust ingredient quantities for different serving sizes with perfect proportions.
              </p>
            </div>
            
            <div className="bg-card rounded-xl p-6 shadow-sm border hover:shadow-md transition-all">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Timer className="h-6 w-6 text-recipe-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Step-by-step Timers</h3>
              <p className="text-muted-foreground">
                Add timers to any step in your recipe to keep track of cooking times and get notified when it's ready.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Recipes Section */}
      <section className="py-20 bg-muted/40">
        <div className="container">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Recipes</h2>
              <p className="text-muted-foreground">
                Discover our community's best culinary creations
              </p>
            </div>
            <Button asChild variant="outline" className="mt-4 sm:mt-0">
              <Link to="/featured">View All</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredRecipes.slice(0, 8).map((recipe) => (
              <RecipeCard
                key={recipe.id}
                id={recipe.id}
                title={recipe.title}
                description={recipe.description}
                prepTime={recipe.prepTime}
                cookTime={recipe.cookTime}
                tags={recipe.tags}
                image={recipe.image}
                chefName={recipe.chefName || "Anonymous Chef"}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <div className="bg-recipe-primary rounded-xl p-10 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to start cooking together?</h2>
            <p className="text-xl mb-6 max-w-2xl mx-auto opacity-90">
              Join our community of food enthusiasts and start creating amazing recipes today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link to="/register">Create Your Account</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/20">
                <Link to="/recipes">Browse Recipes</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
