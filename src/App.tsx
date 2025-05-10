
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { RecipeProvider } from "@/contexts/RecipeContext";

// Layout
import Layout from "./components/layout/Layout";

// Pages
import HomePage from "./pages/Index";
import NotFound from "./pages/NotFound";

// Recipe Pages
import RecipesPage from "./pages/recipes/RecipesPage";
import FeaturedRecipes from "./pages/recipes/FeaturedRecipes";
import RecipeDetail from "./pages/recipes/RecipeDetail";
import CreateRecipe from "./pages/recipes/CreateRecipe";
import UserRecipes from "./pages/recipes/UserRecipes";
import SavedRecipes from "./pages/recipes/SavedRecipes";
import SearchResults from "./pages/recipes/SearchResults";

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// User Pages
import ProfilePage from "./pages/user/ProfilePage";

// Info Pages
import AboutPage from "./pages/info/AboutPage";
import PrivacyPolicy from "./pages/info/PrivacyPolicy";
import TermsOfService from "./pages/info/TermsOfService";
import ContactPage from "./pages/info/ContactPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <RecipeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                {/* Main Pages */}
                <Route path="/" element={<HomePage />} />
                
                {/* Recipe Pages */}
                <Route path="/recipes" element={<RecipesPage />} />
                <Route path="/recipes/:id" element={<RecipeDetail />} />
                <Route path="/featured" element={<FeaturedRecipes />} />
                <Route path="/create" element={<CreateRecipe />} />
                <Route path="/my-recipes" element={<UserRecipes />} />
                <Route path="/saved" element={<SavedRecipes />} />
                <Route path="/search" element={<SearchResults />} />
                
                {/* Auth Pages */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                {/* User Pages */}
                <Route path="/profile" element={<ProfilePage />} />
                
                {/* Info Pages */}
                <Route path="/about" element={<AboutPage />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="/contact" element={<ContactPage />} />
                
                {/* Catch-all Route */}
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </RecipeProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
