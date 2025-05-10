
import { ChefHat } from "lucide-react";
import { Link } from "react-router-dom";

export default function AboutPage() {
  return (
    <div className="container py-10">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
            <ChefHat className="h-8 w-8 text-recipe-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-4">About RecipeHub</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A collaborative recipe platform where cooking enthusiasts can create, share, and remix recipes together.
          </p>
        </div>

        <div className="prose prose-neutral dark:prose-invert mx-auto">
          <h2>Our Mission</h2>
          <p>
            At RecipeHub, we believe that cooking is both an art and a science, and it's always better when shared. Our platform is designed to bring people together through food, allowing home cooks to collaborate, experiment, and perfect recipes together.
          </p>
          
          <h2>What We Offer</h2>
          <ul>
            <li>
              <strong>Collaborative Recipe Creation</strong> - Work with friends and family to create and perfect recipes together, just like collaborating on documents.
            </li>
            <li>
              <strong>Smart Scaling</strong> - Automatically adjust ingredient quantities for different serving sizes without losing proportions.
            </li>
            <li>
              <strong>Built-in Timers</strong> - Add timers to any step in your recipe to keep track of cooking times.
            </li>
            <li>
              <strong>Recipe Organization</strong> - Save your favorite recipes in collections for easy access later.
            </li>
          </ul>

          <h2>Our Story</h2>
          <p>
            RecipeHub was founded in 2023 by a group of food enthusiasts who were frustrated with the lack of collaboration tools in existing recipe applications. 
            They wanted to create a platform that would make it easy for friends and family to work on recipes together, 
            similar to how developers collaborate on code through platforms like GitHub.
          </p>
          
          <p>
            The result is RecipeHub - a platform that combines the best features of social cooking sites with powerful collaboration tools. We're constantly improving and adding new features based on user feedback.
          </p>

          <h2>Join Our Community</h2>
          <p>
            Whether you're a professional chef, a home cook, or just starting your culinary journey, RecipeHub is for you. Join our growing community of food lovers and start sharing your recipes today!
          </p>

          <div className="mt-8 not-prose">
            <Link to="/register" className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
              Sign up for RecipeHub
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
