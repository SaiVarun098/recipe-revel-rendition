
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
  chefName: string; // Added chef name
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
  addCollaborator: (recipeId: string, collaboratorEmail: string) => Promise<boolean>;
  removeCollaborator: (recipeId: string, collaboratorId: string) => Promise<void>;
  getChefNameById: (id: string) => string;
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

// Updated mock recipe data with real recipe names and detailed instructions
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
      { name: 'Eggs', quantity: 2, unit: 'large' },
      { name: 'Chocolate chips', quantity: 2, unit: 'cups' }
    ],
    instructions: [
      { step: 1, description: 'Preheat oven to 375°F (190°C). Line a baking sheet with parchment paper.' },
      { step: 2, description: 'In a medium bowl, whisk together flour, baking soda, and salt. Set aside.' },
      { step: 3, description: 'In a large bowl, beat butter, brown sugar, and granulated sugar until light and fluffy.', timer: 3 },
      { step: 4, description: 'Add eggs one at a time, beating well after each addition. Stir in vanilla extract.' },
      { step: 5, description: 'Gradually add the dry ingredients to the wet ingredients, mixing until just combined.' },
      { step: 6, description: 'Fold in the chocolate chips until evenly distributed throughout the dough.' },
      { step: 7, description: 'Drop rounded tablespoons of dough onto the prepared baking sheets, spacing them about 2 inches apart.' },
      { step: 8, description: 'Bake until the edges are golden but the centers are still soft, about 9-11 minutes.', timer: 10 },
      { step: 9, description: 'Allow cookies to cool on the baking sheet for 5 minutes before transferring to a wire rack to cool completely.', timer: 5 }
    ],
    createdBy: '1',
    chefName: 'Chef Julia',
    collaborators: [],
    isPublic: true,
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e',
    createdAt: new Date(2023, 4, 10).toISOString(),
    updatedAt: new Date(2023, 4, 10).toISOString()
  },
  {
    id: '2',
    title: 'Fluffy Buttermilk Pancakes',
    description: 'Light and fluffy pancakes perfect for a weekend breakfast.',
    servings: 4,
    prepTime: 10,
    cookTime: 15,
    tags: ['Breakfast', 'Quick', 'Vegetarian'],
    ingredients: [
      { name: 'All-purpose flour', quantity: 1.5, unit: 'cups' },
      { name: 'Baking powder', quantity: 3.5, unit: 'tsp' },
      { name: 'Baking soda', quantity: 0.5, unit: 'tsp' },
      { name: 'Salt', quantity: 0.5, unit: 'tsp' },
      { name: 'Sugar', quantity: 2, unit: 'tbsp' },
      { name: 'Buttermilk', quantity: 1.5, unit: 'cups' },
      { name: 'Eggs', quantity: 2, unit: 'large' },
      { name: 'Butter', quantity: 3, unit: 'tbsp' },
      { name: 'Vanilla extract', quantity: 1, unit: 'tsp' }
    ],
    instructions: [
      { step: 1, description: 'In a large bowl, whisk together flour, baking powder, baking soda, salt, and sugar.' },
      { step: 2, description: 'In a separate bowl, whisk together buttermilk, eggs, melted butter, and vanilla extract.' },
      { step: 3, description: 'Pour the wet ingredients into the dry ingredients and stir just until combined. There should still be small lumps; do not overmix.' },
      { step: 4, description: 'Let the batter rest for 5 minutes while heating a non-stick griddle or skillet over medium heat.', timer: 5 },
      { step: 5, description: 'Lightly grease the griddle with butter or cooking spray. Pour 1/4 cup of batter for each pancake.' },
      { step: 6, description: 'Cook until bubbles form on the surface and the edges look set, about 2 minutes.', timer: 2 },
      { step: 7, description: 'Flip and cook until browned on the other side, about 1-2 minutes more.', timer: 2 },
      { step: 8, description: 'Serve warm with maple syrup, fresh berries, or whipped cream.' }
    ],
    createdBy: '2',
    chefName: 'Chef Michael',
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
      { name: 'Pizza dough', quantity: 1, unit: 'ball' },
      { name: 'Tomato sauce', quantity: 0.5, unit: 'cup' },
      { name: 'Fresh mozzarella', quantity: 8, unit: 'oz' },
      { name: 'Fresh basil leaves', quantity: 10, unit: '' },
      { name: 'Olive oil', quantity: 2, unit: 'tbsp' },
      { name: 'Salt', quantity: 0.5, unit: 'tsp' },
      { name: 'Black pepper', quantity: 0.25, unit: 'tsp' }
    ],
    instructions: [
      { step: 1, description: 'Preheat oven to 475°F (245°C) with a pizza stone if you have one.' },
      { step: 2, description: 'On a floured surface, stretch or roll the pizza dough into a 12-inch round.' },
      { step: 3, description: 'Transfer the dough to a parchment-lined pizza peel or baking sheet.' },
      { step: 4, description: 'Spread tomato sauce evenly over the dough, leaving a 1/2-inch border for the crust.' },
      { step: 5, description: 'Tear the mozzarella into pieces and distribute evenly on top of the sauce.' },
      { step: 6, description: 'Drizzle with olive oil and season with salt and pepper.' },
      { step: 7, description: 'Slide the pizza onto the preheated stone or baking sheet and bake until the crust is golden and the cheese is bubbly and lightly browned, about 10-12 minutes.', timer: 12 },
      { step: 8, description: 'Remove from the oven and immediately scatter fresh basil leaves on top.' },
      { step: 9, description: 'Let cool for 3-5 minutes before slicing and serving.', timer: 3 }
    ],
    createdBy: '1',
    chefName: 'Chef Julia',
    collaborators: [],
    isPublic: true,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002',
    createdAt: new Date(2023, 5, 20).toISOString(),
    updatedAt: new Date(2023, 5, 20).toISOString()
  }
];

// More detailed mock recipes with specific ingredients and instructions
const recipeNames = [
  'Spicy Thai Basil Chicken',
  'Creamy Mushroom Risotto',
  'Homemade Beef Burger',
  'Spinach and Feta Stuffed Chicken',
  'Lemon Garlic Roasted Salmon',
  'Vegetable Stir-Fry with Tofu',
  'Classic Beef Lasagna',
  'Crispy Roasted Potatoes',
  'Honey Glazed Roast Chicken',
  'Mediterranean Quinoa Salad',
  'Shrimp Scampi Pasta',
  'Beef and Broccoli Stir-Fry',
  'Homemade Mac and Cheese',
  'French Onion Soup',
  'Vegetable Curry with Coconut Milk',
  'Grilled Steak with Chimichurri',
  'Lemon Blueberry Pancakes'
];

// Sample chef names
const chefNames = [
  'Chef Julia', 
  'Chef Michael', 
  'Chef Sophia', 
  'Chef David', 
  'Chef Olivia',
  'Chef Thomas',
  'Chef Emma',
  'Chef James',
  'Chef Ava',
  'Chef William'
];

// Adding more detailed recipes
for (let i = 0; i < recipeNames.length; i++) {
  const categories = ['Italian', 'Mexican', 'Asian', 'American', 'Indian', 'French', 'Mediterranean', 'Baking'];
  const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack', 'Appetizer'];
  const diets = ['Vegetarian', 'Vegan', 'Gluten-Free', 'Keto', 'Low-Carb', 'Paleo'];
  
  const randomCategory = categories[Math.floor(Math.random() * categories.length)];
  const randomMealType = mealTypes[Math.floor(Math.random() * mealTypes.length)];
  const randomDiet = Math.random() > 0.5 ? diets[Math.floor(Math.random() * diets.length)] : '';
  
  const tags = [randomCategory, randomMealType];
  if (randomDiet) tags.push(randomDiet);
  
  const creator = Math.random() > 0.5 ? '1' : '2';
  const chefName = chefNames[Math.floor(Math.random() * chefNames.length)];
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

  // Generate specific ingredients based on recipe type
  const ingredients = [];
  const ingredientsList = getIngredientsForRecipe(recipeNames[i]);
  
  for (let j = 0; j < ingredientsList.length; j++) {
    ingredients.push({
      name: ingredientsList[j].name,
      quantity: ingredientsList[j].quantity,
      unit: ingredientsList[j].unit
    });
  }
  
  // Generate specific instructions
  const instructionsList = getInstructionsForRecipe(recipeNames[i]);
  const instructions = instructionsList.map((desc, idx) => {
    const hasTimer = desc.timer !== undefined;
    return {
      step: idx + 1,
      description: desc.text,
      timer: hasTimer ? desc.timer : undefined
    };
  });
  
  mockRecipes.push({
    id: String(i + 4),
    title: recipeNames[i],
    description: `A delicious ${randomCategory.toLowerCase()} ${randomMealType.toLowerCase()} recipe that's perfect for any occasion.`,
    servings,
    prepTime,
    cookTime,
    tags,
    ingredients,
    instructions,
    createdBy: creator,
    chefName: chefName,
    collaborators: [],
    isPublic: true,
    image: `https://images.unsplash.com/${imageIds[Math.floor(Math.random() * imageIds.length)]}`,
    createdAt: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
    updatedAt: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString()
  });
}

// Helper function to generate specific ingredients for recipes
function getIngredientsForRecipe(recipeName: string) {
  switch (recipeName) {
    case 'Spicy Thai Basil Chicken':
      return [
        { name: 'Chicken breast', quantity: 1, unit: 'lb' },
        { name: 'Thai basil leaves', quantity: 2, unit: 'cups' },
        { name: 'Thai chilies', quantity: 4, unit: '' },
        { name: 'Garlic cloves', quantity: 4, unit: '' },
        { name: 'Fish sauce', quantity: 2, unit: 'tbsp' },
        { name: 'Oyster sauce', quantity: 1, unit: 'tbsp' },
        { name: 'Soy sauce', quantity: 1, unit: 'tbsp' },
        { name: 'Brown sugar', quantity: 1, unit: 'tsp' },
        { name: 'Vegetable oil', quantity: 2, unit: 'tbsp' }
      ];
    case 'Creamy Mushroom Risotto':
      return [
        { name: 'Arborio rice', quantity: 1.5, unit: 'cups' },
        { name: 'Mixed mushrooms', quantity: 8, unit: 'oz' },
        { name: 'Shallots', quantity: 2, unit: '' },
        { name: 'Garlic cloves', quantity: 2, unit: '' },
        { name: 'White wine', quantity: 0.5, unit: 'cup' },
        { name: 'Vegetable broth', quantity: 4, unit: 'cups' },
        { name: 'Parmesan cheese', quantity: 0.5, unit: 'cup' },
        { name: 'Butter', quantity: 2, unit: 'tbsp' },
        { name: 'Fresh thyme', quantity: 1, unit: 'tbsp' },
        { name: 'Olive oil', quantity: 2, unit: 'tbsp' }
      ];
    case 'Vegetable Stir-Fry with Tofu':
      return [
        { name: 'Firm tofu', quantity: 14, unit: 'oz' },
        { name: 'Broccoli', quantity: 1, unit: 'head' },
        { name: 'Carrots', quantity: 2, unit: '' },
        { name: 'Bell peppers', quantity: 2, unit: '' },
        { name: 'Snow peas', quantity: 1, unit: 'cup' },
        { name: 'Garlic', quantity: 3, unit: 'cloves' },
        { name: 'Ginger', quantity: 1, unit: 'tbsp' },
        { name: 'Soy sauce', quantity: 3, unit: 'tbsp' },
        { name: 'Sesame oil', quantity: 1, unit: 'tsp' },
        { name: 'Cornstarch', quantity: 1, unit: 'tbsp' },
        { name: 'Vegetable oil', quantity: 2, unit: 'tbsp' }
      ];
    // Add more recipes as needed
    default:
      // Generic ingredients for other recipes
      return [
        { name: 'Main ingredient', quantity: 1, unit: 'lb' },
        { name: 'Secondary ingredient', quantity: 2, unit: 'cups' },
        { name: 'Spice 1', quantity: 1, unit: 'tsp' },
        { name: 'Spice 2', quantity: 0.5, unit: 'tsp' },
        { name: 'Liquid ingredient', quantity: 0.5, unit: 'cup' },
        { name: 'Oil or butter', quantity: 2, unit: 'tbsp' },
        { name: 'Garnish', quantity: 2, unit: 'tbsp' }
      ];
  }
}

// Helper function to generate specific instructions for recipes
function getInstructionsForRecipe(recipeName: string) {
  switch (recipeName) {
    case 'Spicy Thai Basil Chicken':
      return [
        { text: 'Mince the garlic and Thai chilies.' },
        { text: 'Cut the chicken into small bite-sized pieces.' },
        { text: 'Heat oil in a wok or large skillet over high heat.', timer: 1 },
        { text: 'Add garlic and chilies, stir-fry for 30 seconds until fragrant.', timer: 0.5 },
        { text: 'Add chicken and stir-fry until no longer pink, about 3-4 minutes.', timer: 4 },
        { text: 'Add fish sauce, oyster sauce, soy sauce, and brown sugar. Stir well.' },
        { text: 'Toss in the Thai basil leaves and stir until wilted, about 30 seconds.', timer: 0.5 },
        { text: 'Serve hot with steamed jasmine rice.' }
      ];
    case 'Creamy Mushroom Risotto':
      return [
        { text: 'Clean and slice mushrooms.' },
        { text: 'Finely dice shallots and mince garlic.' },
        { text: 'In a large pot, heat olive oil over medium heat and sauté mushrooms until browned, about 5 minutes.', timer: 5 },
        { text: 'Remove mushrooms and set aside.' },
        { text: 'In the same pot, add butter and sauté shallots until translucent, about 2-3 minutes.', timer: 3 },
        { text: 'Add garlic and cook for 30 seconds.', timer: 0.5 },
        { text: 'Add Arborio rice and stir to coat with butter for 1-2 minutes.', timer: 2 },
        { text: 'Pour in white wine and stir until absorbed.', timer: 1 },
        { text: 'Add warm broth one ladle at a time, stirring frequently and waiting until liquid is absorbed before adding more.', timer: 18 },
        { text: 'When rice is creamy and al dente, stir in mushrooms, Parmesan cheese, and fresh thyme.' },
        { text: 'Season with salt and pepper to taste. Serve immediately.' }
      ];
    case 'Vegetable Stir-Fry with Tofu':
      return [
        { text: 'Press tofu between paper towels with a heavy object for 30 minutes to remove excess water.', timer: 30 },
        { text: 'Cut tofu into 1-inch cubes.' },
        { text: 'Cut vegetables into bite-sized pieces.' },
        { text: 'Mix soy sauce, 2 tbsp water, and cornstarch in a small bowl.' },
        { text: 'Heat vegetable oil in a wok or large skillet over high heat.' },
        { text: 'Add tofu and cook until golden brown on all sides, about 5-7 minutes.', timer: 7 },
        { text: 'Remove tofu and set aside.' },
        { text: 'Add a bit more oil if needed, then add garlic and ginger, stir-frying for 30 seconds.', timer: 0.5 },
        { text: 'Add vegetables in order of cooking time: carrots first, then broccoli, bell peppers, and finally snow peas.' },
        { text: 'Stir-fry for 3-5 minutes until vegetables are crisp-tender.', timer: 5 },
        { text: 'Return tofu to the wok, then add sauce mixture and stir until thickened, about 1 minute.', timer: 1 },
        { text: 'Drizzle with sesame oil, toss to combine, and serve immediately.' }
      ];
    // Add more recipes as needed
    default:
      return [
        { text: 'Prepare all ingredients as described in the ingredients list.' },
        { text: 'Heat cooking vessel over appropriate heat level.', timer: 2 },
        { text: 'Cook main ingredients until properly done.', timer: 8 },
        { text: 'Add secondary ingredients and continue cooking.', timer: 5 },
        { text: 'Add seasonings and liquids as needed.' },
        { text: 'Finish cooking until everything is properly cooked through.', timer: 3 },
        { text: 'Serve hot with appropriate garnishes.' }
      ];
  }
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

  const getChefNameById = (id: string) => {
    const chef = recipes.find(recipe => recipe.createdBy === id);
    return chef ? chef.chefName : "Unknown Chef";
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

  // Functions for collaboration
  const addCollaborator = async (recipeId: string, collaboratorEmail: string) => {
    return new Promise<boolean>((resolve, reject) => {
      setTimeout(() => {
        const recipeIndex = recipes.findIndex(r => r.id === recipeId);
        
        if (recipeIndex === -1) {
          toast.error('Recipe not found');
          reject(new Error('Recipe not found'));
          return;
        }
        
        // Mock user lookup by email - in a real app this would be a database query
        const mockUserId = collaboratorEmail === "user1@example.com" ? "1" : 
                          collaboratorEmail === "user2@example.com" ? "2" : null;
        
        if (!mockUserId) {
          toast.error('User not found');
          resolve(false);
          return;
        }
        
        // Check if user is already a collaborator
        if (recipes[recipeIndex].collaborators.includes(mockUserId)) {
          toast.error('User is already a collaborator');
          resolve(false);
          return;
        }
        
        const updatedRecipe = {
          ...recipes[recipeIndex],
          collaborators: [...recipes[recipeIndex].collaborators, mockUserId],
          updatedAt: new Date().toISOString()
        };
        
        const newRecipes = [...recipes];
        newRecipes[recipeIndex] = updatedRecipe;
        
        setRecipes(newRecipes);
        toast.success('Collaborator added successfully!');
        resolve(true);
      }, 1000);
    });
  };

  const removeCollaborator = async (recipeId: string, collaboratorId: string) => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const recipeIndex = recipes.findIndex(r => r.id === recipeId);
        
        if (recipeIndex === -1) {
          toast.error('Recipe not found');
          reject(new Error('Recipe not found'));
          return;
        }
        
        if (!recipes[recipeIndex].collaborators.includes(collaboratorId)) {
          toast.error('User is not a collaborator');
          reject(new Error('User is not a collaborator'));
          return;
        }
        
        const updatedRecipe = {
          ...recipes[recipeIndex],
          collaborators: recipes[recipeIndex].collaborators.filter(id => id !== collaboratorId),
          updatedAt: new Date().toISOString()
        };
        
        const newRecipes = [...recipes];
        newRecipes[recipeIndex] = updatedRecipe;
        
        setRecipes(newRecipes);
        toast.success('Collaborator removed successfully!');
        resolve();
      }, 1000);
    });
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
      scaleIngredients,
      addCollaborator,
      removeCollaborator,
      getChefNameById
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
