
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { toast } from 'sonner';

interface Recipe {
  id: string;
  title: string;
  description: string;
  servings: number;
  prepTime: number;
  cookTime: number;
  tags: string[];
  ingredients: {
    name: string;
    quantity: number;
    unit: string;
  }[];
  instructions: {
    step: number;
    description: string;
    timer?: number;
  }[];
  createdBy: string;
  collaborators: string[];
  isPublic: boolean;
  image: string;
  createdAt: string;
  updatedAt: string;
}

interface RecipeContextType {
  recipes: Recipe[];
  userRecipes: Recipe[];
  savedRecipes: string[];
  featuredRecipes: Recipe[];
  getRecipeById: (id: string) => Recipe | undefined;
  createRecipe: (recipe: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>) => Promise<string>;
  updateRecipe: (id: string, recipe: Partial<Recipe>) => Promise<void>;
  deleteRecipe: (id: string) => Promise<void>;
  saveRecipe: (id: string) => void;
  unsaveRecipe: (id: string) => void;
  isRecipeSaved: (id: string) => boolean;
  scaleIngredients: (recipe: Recipe, newServings: number) => Recipe['ingredients'];
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

// Mock recipes
const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Classic Chocolate Chip Cookies',
    description: 'Delicious homemade chocolate chip cookies that are crispy on the outside and chewy on the inside.',
    servings: 12,
    prepTime: 15,
    cookTime: 10,
    tags: ['Dessert', 'Baking', 'Cookies'],
    ingredients: [
      { name: 'All-purpose flour', quantity: 2.25, unit: 'cups' },
      { name: 'Baking soda', quantity: 1, unit: 'tsp' },
      { name: 'Salt', quantity: 1, unit: 'tsp' },
      { name: 'Butter', quantity: 1, unit: 'cup' },
      { name: 'Brown sugar', quantity: 0.75, unit: 'cup' },
      { name: 'Granulated sugar', quantity: 0.75, unit: 'cup' },
      { name: 'Vanilla extract', quantity: 1, unit: 'tsp' },
      { name: 'Eggs', quantity: 2, unit: '' },
      { name: 'Chocolate chips', quantity: 2, unit: 'cups' }
    ],
    instructions: [
      { step: 1, description: 'Preheat oven to 375°F (190°C).' },
      { step: 2, description: 'Combine flour, baking soda, and salt in a bowl.' },
      { step: 3, description: 'Cream butter and sugars until light and fluffy.', timer: 3 },
      { step: 4, description: 'Add eggs and vanilla to the butter mixture, mix well.' },
      { step: 5, description: 'Gradually add flour mixture to the wet ingredients.' },
      { step: 6, description: 'Fold in chocolate chips.' },
      { step: 7, description: 'Drop tablespoon-sized dough balls onto baking sheets.' },
      { step: 8, description: 'Bake until golden brown.', timer: 10 },
      { step: 9, description: 'Cool on baking sheets before transferring to wire racks.', timer: 5 }
    ],
    createdBy: '1',
    collaborators: [],
    isPublic: true,
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e',
    createdAt: new Date(2023, 4, 10).toISOString(),
    updatedAt: new Date(2023, 4, 10).toISOString()
  },
  {
    id: '2',
    title: 'Fluffy Pancakes',
    description: 'Light and fluffy pancakes perfect for a weekend breakfast.',
    servings: 4,
    prepTime: 10,
    cookTime: 15,
    tags: ['Breakfast', 'Quick', 'Vegetarian'],
    ingredients: [
      { name: 'All-purpose flour', quantity: 1.5, unit: 'cups' },
      { name: 'Baking powder', quantity: 3.5, unit: 'tsp' },
      { name: 'Salt', quantity: 1, unit: 'tsp' },
      { name: 'Sugar', quantity: 1, unit: 'tbsp' },
      { name: 'Milk', quantity: 1.25, unit: 'cups' },
      { name: 'Egg', quantity: 1, unit: '' },
      { name: 'Butter', quantity: 3, unit: 'tbsp' },
      { name: 'Vanilla extract', quantity: 1, unit: 'tsp' }
    ],
    instructions: [
      { step: 1, description: 'Sift flour, baking powder, salt, and sugar together in a large bowl.' },
      { step: 2, description: 'Make a well in the center and add milk, egg, melted butter, and vanilla.' },
      { step: 3, description: 'Mix until smooth.' },
      { step: 4, description: 'Heat a lightly oiled griddle or frying pan over medium-high heat.' },
      { step: 5, description: 'Pour batter onto the griddle, using approximately 1/4 cup for each pancake.' },
      { step: 6, description: 'Cook until bubbles form and the edges are dry.', timer: 2 },
      { step: 7, description: 'Flip and cook until browned on the other side.', timer: 2 },
      { step: 8, description: 'Serve hot with your favorite toppings.' }
    ],
    createdBy: '2',
    collaborators: ['1'],
    isPublic: true,
    image: 'https://images.unsplash.com/photo-1575853121743-60c24f0a7502',
    createdAt: new Date(2023, 5, 15).toISOString(),
    updatedAt: new Date(2023, 6, 2).toISOString()
  },
  {
    id: '3',
    title: 'Classic Margherita Pizza',
    description: 'Simple and delicious Italian pizza with fresh basil.',
    servings: 4,
    prepTime: 30,
    cookTime: 15,
    tags: ['Italian', 'Dinner', 'Vegetarian'],
    ingredients: [
      { name: 'Pizza dough', quantity: 1, unit: '' },
      { name: 'Tomato sauce', quantity: 0.5, unit: 'cup' },
      { name: 'Fresh mozzarella', quantity: 8, unit: 'oz' },
      { name: 'Fresh basil leaves', quantity: 10, unit: '' },
      { name: 'Olive oil', quantity: 2, unit: 'tbsp' },
      { name: 'Salt', quantity: 0.5, unit: 'tsp' },
      { name: 'Black pepper', quantity: 0.25, unit: 'tsp' }
    ],
    instructions: [
      { step: 1, description: 'Preheat oven to 475°F (245°C) with a pizza stone if you have one.' },
      { step: 2, description: 'Roll out the pizza dough on a floured surface.' },
      { step: 3, description: 'Spread tomato sauce evenly over the dough, leaving a small border for the crust.' },
      { step: 4, description: 'Tear the mozzarella into pieces and distribute evenly on top.' },
      { step: 5, description: 'Drizzle with olive oil and season with salt and pepper.' },
      { step: 6, description: 'Bake until the crust is golden and the cheese is bubbly.', timer: 12 },
      { step: 7, description: 'Remove from oven and immediately scatter fresh basil leaves on top.' },
      { step: 8, description: 'Let cool slightly before slicing and serving.', timer: 3 }
    ],
    createdBy: '1',
    collaborators: [],
    isPublic: true,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002',
    createdAt: new Date(2023, 5, 20).toISOString(),
    updatedAt: new Date(2023, 5, 20).toISOString()
  }
];

// Generate more mock recipes
for (let i = 4; i <= 20; i++) {
  const categories = ['Italian', 'Mexican', 'Asian', 'American', 'Indian', 'French', 'Mediterranean', 'Baking'];
  const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack', 'Appetizer'];
  const diets = ['Vegetarian', 'Vegan', 'Gluten-Free', 'Keto', 'Low-Carb', 'Paleo'];
  
  const randomCategory = categories[Math.floor(Math.random() * categories.length)];
  const randomMealType = mealTypes[Math.floor(Math.random() * mealTypes.length)];
  const randomDiet = Math.random() > 0.5 ? diets[Math.floor(Math.random() * diets.length)] : '';
  
  const tags = [randomCategory, randomMealType];
  if (randomDiet) tags.push(randomDiet);
  
  const creator = Math.random() > 0.5 ? '1' : '2';
  const servings = Math.floor(Math.random() * 6) + 2;
  const prepTime = Math.floor(Math.random() * 30) + 5;
  const cookTime = Math.floor(Math.random() * 60) + 10;
  
  const imageIds = [
    'photo-1512621776951-a57141f2eefd',
    'photo-1546069901-ba9599a7e63c',
    'photo-1555939594-58d7cb561ad1',
    'photo-1565958011703-44f9829ba187',
    'photo-1540189549336-e6e99c3679fe',
    'photo-1567620905732-2d1ec7ab7445',
    'photo-1565299624946-b28f40a0ae38',
    'photo-1484980972926-edee96e0960d',
    'photo-1540914124281-342587941389',
    'photo-1476224203421-9ac39bcb3327'
  ];
  
  mockRecipes.push({
    id: String(i),
    title: `Recipe ${i}`,
    description: `This is a delicious ${randomCategory.toLowerCase()} ${randomMealType.toLowerCase()} recipe.`,
    servings: servings,
    prepTime: prepTime,
    cookTime: cookTime,
    tags: tags,
    ingredients: [
      { name: 'Ingredient 1', quantity: 2, unit: 'cups' },
      { name: 'Ingredient 2', quantity: 1, unit: 'tbsp' },
      { name: 'Ingredient 3', quantity: 0.5, unit: 'tsp' }
    ],
    instructions: [
      { step: 1, description: 'Step 1 description' },
      { step: 2, description: 'Step 2 description', timer: 5 },
      { step: 3, description: 'Step 3 description' }
    ],
    createdBy: creator,
    collaborators: [],
    isPublic: true,
    image: `https://images.unsplash.com/${imageIds[Math.floor(Math.random() * imageIds.length)]}`,
    createdAt: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
    updatedAt: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString()
  });
}

export function RecipeProvider({ children }: { children: ReactNode }) {
  const [recipes, setRecipes] = useState<Recipe[]>(mockRecipes);
  const [savedRecipes, setSavedRecipes] = useState<string[]>([]);

  useEffect(() => {
    // Load saved recipes from localStorage
    const storedSavedRecipes = localStorage.getItem('recipehub_saved_recipes');
    if (storedSavedRecipes) {
      try {
        setSavedRecipes(JSON.parse(storedSavedRecipes));
      } catch (error) {
        console.error('Failed to parse saved recipes data', error);
        localStorage.removeItem('recipehub_saved_recipes');
      }
    }
  }, []);

  const userRecipes = (userId?: string) => {
    if (!userId) return [];
    return recipes.filter(recipe => recipe.createdBy === userId || recipe.collaborators.includes(userId));
  };

  const featuredRecipes = recipes.slice(0, 20);

  const getRecipeById = (id: string) => {
    return recipes.find(recipe => recipe.id === id);
  };

  const createRecipe = async (newRecipe: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>) => {
    return new Promise<string>((resolve) => {
      setTimeout(() => {
        const id = String(recipes.length + 1);
        const now = new Date().toISOString();
        
        const recipe = {
          ...newRecipe,
          id,
          createdAt: now,
          updatedAt: now
        };
        
        setRecipes(prev => [...prev, recipe]);
        toast.success('Recipe created successfully!');
        resolve(id);
      }, 1000);
    });
  };

  const updateRecipe = async (id: string, recipeUpdate: Partial<Recipe>) => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const recipeIndex = recipes.findIndex(r => r.id === id);
        
        if (recipeIndex === -1) {
          toast.error('Recipe not found');
          reject(new Error('Recipe not found'));
          return;
        }
        
        const updatedRecipe = {
          ...recipes[recipeIndex],
          ...recipeUpdate,
          updatedAt: new Date().toISOString()
        };
        
        const newRecipes = [...recipes];
        newRecipes[recipeIndex] = updatedRecipe;
        
        setRecipes(newRecipes);
        toast.success('Recipe updated successfully!');
        resolve();
      }, 1000);
    });
  };

  const deleteRecipe = async (id: string) => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const recipeIndex = recipes.findIndex(r => r.id === id);
        
        if (recipeIndex === -1) {
          toast.error('Recipe not found');
          reject(new Error('Recipe not found'));
          return;
        }
        
        const newRecipes = recipes.filter(r => r.id !== id);
        setRecipes(newRecipes);
        
        // Remove from saved recipes if it's there
        if (savedRecipes.includes(id)) {
          const newSavedRecipes = savedRecipes.filter(recipeId => recipeId !== id);
          setSavedRecipes(newSavedRecipes);
          localStorage.setItem('recipehub_saved_recipes', JSON.stringify(newSavedRecipes));
        }
        
        toast.success('Recipe deleted successfully!');
        resolve();
      }, 1000);
    });
  };

  const saveRecipe = (id: string) => {
    if (!savedRecipes.includes(id)) {
      const newSavedRecipes = [...savedRecipes, id];
      setSavedRecipes(newSavedRecipes);
      localStorage.setItem('recipehub_saved_recipes', JSON.stringify(newSavedRecipes));
      toast.success('Recipe saved!');
    }
  };

  const unsaveRecipe = (id: string) => {
    if (savedRecipes.includes(id)) {
      const newSavedRecipes = savedRecipes.filter(recipeId => recipeId !== id);
      setSavedRecipes(newSavedRecipes);
      localStorage.setItem('recipehub_saved_recipes', JSON.stringify(newSavedRecipes));
      toast.success('Recipe removed from saved recipes');
    }
  };

  const isRecipeSaved = (id: string) => {
    return savedRecipes.includes(id);
  };

  const scaleIngredients = (recipe: Recipe, newServings: number) => {
    const scaleFactor = newServings / recipe.servings;
    
    return recipe.ingredients.map(ingredient => ({
      ...ingredient,
      quantity: parseFloat((ingredient.quantity * scaleFactor).toFixed(2))
    }));
  };

  return (
    <RecipeContext.Provider value={{
      recipes,
      userRecipes: userRecipes(),
      savedRecipes,
      featuredRecipes,
      getRecipeById,
      createRecipe,
      updateRecipe,
      deleteRecipe,
      saveRecipe,
      unsaveRecipe,
      isRecipeSaved,
      scaleIngredients
    }}>
      {children}
    </RecipeContext.Provider>
  );
}

export function useRecipe() {
  const context = useContext(RecipeContext);
  if (context === undefined) {
    throw new Error('useRecipe must be used within a RecipeProvider');
  }
  return context;
}
