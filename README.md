
# RecipeHub: Social Recipe Sharing Platform

## Project Overview

RecipeHub is a dynamic web application that allows users to create, share, and discover recipes. It provides a social platform for cooking enthusiasts to collaborate on recipes, save their favorites, and build a personalized collection of culinary creations.

### Live Demo

https://lovable.dev/projects/9871beb4-b38b-4aba-853d-5a678963a794

## Features

### Core Functionality
- **Recipe Management**: Create, view, edit, and delete recipes
- **Social Sharing**: Share recipes publicly or keep them private
- **Recipe Discovery**: Browse and search for recipes by title, ingredients, or tags
- **User Authentication**: Secure login, registration, and profile management
- **Responsive Design**: Fully responsive interface that works on mobile, tablet, and desktop

### Key Features
- **User Dashboard**: Personal dashboard showing user's recipes, saved recipes, and collaborations
- **Collaboration**: Invite other users to collaborate on recipes
- **Recipe Details**: Detailed view of recipes including ingredients, instructions, prep time, cook time, and more
- **Recipe Search**: Powerful search functionality with filters
- **Saved Recipes**: Bookmark favorite recipes for quick access
- **User Profiles**: Personalized profiles with user's recipes and settings
- **Chef Attribution**: Display of chef/creator name with each recipe

## Technology Stack

### Frontend
- **React**: JavaScript library for building user interfaces
- **TypeScript**: Typed superset of JavaScript for improved developer experience
- **Vite**: Next-generation frontend build tool
- **React Router DOM**: Declarative routing for React
- **TanStack Query (React Query)**: Data fetching and state management library
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn UI**: High-quality React components built with Radix UI and Tailwind CSS
- **Lucide React**: Beautiful and consistent icon set
- **React Hook Form**: Form validation and handling
- **Sonner**: Toast notification system

### Development Tools
- **ESLint**: JavaScript and TypeScript linter
- **Prettier**: Code formatter
- **TypeScript**: Static type checking

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── layout/       # Layout components (Navbar, Footer, etc.)
│   ├── recipes/      # Recipe-related components
│   └── ui/           # UI components from shadcn/ui
├── contexts/         # React context providers
│   ├── AuthContext   # Authentication state management
│   └── RecipeContext # Recipe data management
├── hooks/            # Custom React hooks
├── lib/              # Utility functions and helpers
├── pages/            # Page components
│   ├── auth/         # Authentication pages (Login, Register)
│   ├── info/         # Information pages (About, Privacy, etc.)
│   ├── recipes/      # Recipe pages (List, Detail, Create, etc.)
│   └── user/         # User pages (Profile, Dashboard)
└── App.tsx           # Main application component
```

## Features In Detail

### Authentication System
- **Login**: Secure login with email and password
- **Registration**: User registration with validation
- **Profile Management**: Update user profile info, change password
- **Account Deletion**: Option to delete account and associated data

### Recipe Management
- **Create Recipe**: Add new recipes with title, description, ingredients, instructions, etc.
- **Edit Recipe**: Modify existing recipes
- **Delete Recipe**: Remove recipes from the system
- **Visibility Control**: Set recipes as public or private
- **Collaboration**: Invite others to co-edit recipes

### Recipe Discovery
- **Browse Recipes**: View all public recipes
- **Featured Recipes**: Highlighted recipes on the homepage
- **Recipe Search**: Search by title, ingredients, or other criteria
- **Filtering**: Filter recipes by various attributes
- **Tagging**: Categorize and find recipes by tags

### User Experience
- **Responsive Design**: Works on all device sizes
- **Dark/Light Mode**: Theme support (via shadcn/ui)
- **Notifications**: Toast notifications for important actions
- **Loading States**: Visual feedback during data operations

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd recipehub

# Install dependencies
npm install

# Start development server
npm run dev
```

### Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## User Flow

1. **New User**
   - Register with email, username, and password
   - Explore featured recipes
   - Create first recipe
   - Save favorite recipes

2. **Returning User**
   - Login with credentials
   - View dashboard with personal recipes and saved items
   - Create or edit recipes
   - Collaborate with other users

## Future Enhancements

- **Comments & Ratings**: Allow users to comment on and rate recipes
- **Meal Planning**: Calendar integration for meal planning
- **Nutritional Information**: Display nutritional facts for recipes
- **Shopping Lists**: Generate shopping lists from recipes
- **Social Integration**: Share recipes on social media platforms
- **Advanced Filtering**: More detailed search and filter options
- **Recipe Scaling**: Adjust ingredient quantities based on serving size

## Credits

This project was built using [Lovable](https://lovable.dev), an AI-powered web application development platform.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
