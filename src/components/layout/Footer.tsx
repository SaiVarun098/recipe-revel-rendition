
import { Link } from 'react-router-dom';
import { ChefHat, Mail, GitHub, Twitter, Instagram, Facebook } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-muted mt-auto py-8">
      <div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-2">
          <Link to="/" className="flex items-center gap-2">
            <ChefHat className="h-6 w-6 text-recipe-primary" />
            <span className="font-bold text-xl">RecipeHub</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            Create, share, and collaborate on recipes with friends and family.
          </p>
        </div>
        
        <div>
          <h3 className="mb-4 text-sm font-medium">Quick Links</h3>
          <ul className="grid gap-2 text-sm text-muted-foreground">
            <li>
              <Link to="/recipes" className="hover:text-foreground transition-colors">
                Browse Recipes
              </Link>
            </li>
            <li>
              <Link to="/featured" className="hover:text-foreground transition-colors">
                Featured Recipes
              </Link>
            </li>
            <li>
              <Link to="/create" className="hover:text-foreground transition-colors">
                Create a Recipe
              </Link>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 className="mb-4 text-sm font-medium">Information</h3>
          <ul className="grid gap-2 text-sm text-muted-foreground">
            <li>
              <Link to="/about" className="hover:text-foreground transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-foreground transition-colors">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-foreground transition-colors">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 className="mb-4 text-sm font-medium">Connect With Us</h3>
          <div className="flex gap-4">
            <a href="#" className="text-muted-foreground hover:text-foreground">
              <Facebook size={20} />
              <span className="sr-only">Facebook</span>
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              <Twitter size={20} />
              <span className="sr-only">Twitter</span>
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              <Instagram size={20} />
              <span className="sr-only">Instagram</span>
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              <GitHub size={20} />
              <span className="sr-only">GitHub</span>
            </a>
          </div>
          
          <div className="mt-4">
            <a href="mailto:hello@recipehub.com" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Mail size={14} />
              hello@recipehub.com
            </a>
          </div>
        </div>
      </div>
      
      <div className="container mt-8 border-t pt-8">
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} RecipeHub. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
