
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from '@/contexts/AuthContext';
import { ChefHat, User, LogIn, LogOut, BookOpen, Plus, Heart, Settings, Menu, Search } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link to="/" className="flex items-center space-x-2">
            <ChefHat className="h-6 w-6 text-recipe-primary" />
            <span className="hidden font-bold sm:inline-block text-xl">RecipeHub</span>
          </Link>
          
          <nav className="hidden md:flex gap-6">
            <Link to="/recipes" className="text-sm font-medium transition-colors hover:text-recipe-primary">
              Recipes
            </Link>
            <Link to="/featured" className="text-sm font-medium transition-colors hover:text-recipe-primary">
              Featured
            </Link>
            {isAuthenticated && (
              <Link to="/my-recipes" className="text-sm font-medium transition-colors hover:text-recipe-primary">
                My Recipes
              </Link>
            )}
            {isAuthenticated && (
              <Link to="/saved" className="text-sm font-medium transition-colors hover:text-recipe-primary">
                Saved Recipes
              </Link>
            )}
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search recipes..."
              className="pl-8 w-[200px] lg:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Button asChild variant="ghost" size="icon" className="rounded-full">
                <Link to="/create">
                  <Plus className="h-5 w-5" />
                  <span className="sr-only">Create Recipe</span>
                </Link>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="h-5 w-5" />
                    <span className="sr-only">User Menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span>{user?.username}</span>
                      <span className="text-xs text-muted-foreground">{user?.email}</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/my-recipes" className="cursor-pointer">My Recipes</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/saved" className="cursor-pointer">Saved Recipes</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">Profile Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => logout()} className="cursor-pointer">
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Button variant="ghost" asChild>
                <Link to="/login">Log in</Link>
              </Button>
              <Button asChild>
                <Link to="/register">Sign up</Link>
              </Button>
            </div>
          )}
        </div>

        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="grid gap-6 py-6">
              <div className="flex items-center gap-2">
                <ChefHat className="h-6 w-6 text-recipe-primary" />
                <span className="font-bold text-xl">RecipeHub</span>
              </div>
              
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search recipes..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>

              <nav className="grid gap-4">
                <Link to="/recipes" className="flex items-center gap-2 text-sm font-medium">
                  <BookOpen className="h-4 w-4" />
                  Recipes
                </Link>
                <Link to="/featured" className="flex items-center gap-2 text-sm font-medium">
                  <Heart className="h-4 w-4" />
                  Featured
                </Link>
                {isAuthenticated && (
                  <>
                    <Link to="/my-recipes" className="flex items-center gap-2 text-sm font-medium">
                      <BookOpen className="h-4 w-4" />
                      My Recipes
                    </Link>
                    <Link to="/saved" className="flex items-center gap-2 text-sm font-medium">
                      <Heart className="h-4 w-4" />
                      Saved Recipes
                    </Link>
                    <Link to="/create" className="flex items-center gap-2 text-sm font-medium">
                      <Plus className="h-4 w-4" />
                      Create Recipe
                    </Link>
                    <Link to="/profile" className="flex items-center gap-2 text-sm font-medium">
                      <Settings className="h-4 w-4" />
                      Profile Settings
                    </Link>
                  </>
                )}
              </nav>

              {isAuthenticated ? (
                <Button onClick={() => logout()} className="flex items-center gap-2">
                  <LogOut className="h-4 w-4" />
                  Log out
                </Button>
              ) : (
                <div className="grid gap-2">
                  <Button asChild variant="outline">
                    <Link to="/login" className="flex items-center gap-2">
                      <LogIn className="h-4 w-4" />
                      Log in
                    </Link>
                  </Button>
                  <Button asChild>
                    <Link to="/register">Sign up</Link>
                  </Button>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

export default Navbar;
