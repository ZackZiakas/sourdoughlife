# SourdoughLife

**Helping Every Baker Rise.**

SourdoughLife is a React web application built to help sourdough bakers discover recipes, keep track of their bakes, save favorites, and share their progress with other bakers.

I chose to build SourdoughLife as my final project because I wanted to create something that could grow beyond a course project. My goal was to combine the skills I learned throughout the Software Engineering program into an application with practical features, reusable components, and room for future development.

## Features

### Recipe Discovery

Users can browse curated sourdough recipes, filter recipes by category, and search for additional recipes.

Current recipe categories include:

- Beginner
- Artisan Bread
- Discard
- Pizza Dough
- Bagels
- Focaccia
- Sandwich Bread
- Whole Wheat

### Spoonacular API Integration

SourdoughLife integrates with the Spoonacular Food API to provide additional recipe discovery.

When a user enters a search on the Recipes page, the application sends a request to Spoonacular and displays matching recipes using the same card-based interface as the rest of the application.

The API integration includes:

- Recipe searching
- Recipe images
- Recipe categories
- Cooking/preparation times
- Links to external recipe sources
- Loading states
- Error handling
- Empty search states

API requests are debounced to reduce unnecessary requests and help conserve the API's daily request quota.

### Recipe Details

Curated SourdoughLife recipes have dedicated recipe pages containing:

- Recipe descriptions
- Difficulty levels
- Estimated preparation times
- Ingredients
- Step-by-step instructions

### Favorites

Users can save recipes to their favorites and access their saved recipes through their profile.

### Baking Journal

The Bake Log gives users a place to record and review their sourdough journey.

Users can:

- Create bake journal entries
- Record the recipe and bake date
- Give a bake a star rating
- Write baking notes
- View previous entries
- Edit entries
- Delete entries
- Search and sort their baking history

The application also calculates baking statistics such as total bakes, average rating, most-baked recipe, highest-rated bake, and latest bake.

### Community

The Community section allows users to share baking experiences and view posts from other bakers.

Current functionality includes:

- Creating community posts
- Selecting the recipe that was baked
- Rating the bake
- Writing notes about the result
- Viewing community posts
- Liking and unliking posts
- Deleting user-created posts

### Local Persistence

Several frontend features use browser local storage so user data can persist between page refreshes while the backend portion of the application is still under development.

## Technologies Used

- React
- JavaScript
- HTML5
- CSS3
- Vite
- React Router
- Context API
- Spoonacular Food API
- Local Storage
- ESLint
- Git
- GitHub

## Project Structure

The frontend follows a component-based React architecture.

```text
src/
├── assets/
├── components/
├── contexts/
├── data/
├── hooks/
├── pages/
├── services/
├── styles/
└── utils/
```

Reusable components are used throughout the application for shared UI and functionality, including recipe cards, buttons, modals, section headings, star ratings, and statistics cards.

API-related code is separated into the `services` directory so external data handling remains separate from presentation components.

## Running the Project Locally

Clone the repository:

```bash
git clone https://github.com/ZackZiakas/sourdoughlife.git
```

Navigate to the frontend:

```bash
cd sourdoughlife/frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `frontend` directory:

```env
VITE_SPOONACULAR_API_KEY=your_spoonacular_api_key
```

A Spoonacular API key is required for third-party recipe searching.

Start the development server:

```bash
npm run dev
```

Then open the local URL provided by Vite.

## Environment Variables

API credentials are stored using environment variables and are not committed to the repository.

The application currently expects:

```env
VITE_SPOONACULAR_API_KEY=
```

The `.env` file is excluded through `.gitignore`.

## Live Project

The current frontend version of SourdoughLife is deployed using GitHub Pages.

**Live Site:** https://zackziakas.github.io/sourdoughlife/

## Project Pitch Video

**Video:** Project walkthrough link coming soon.

## Current Project Status

SourdoughLife is currently in active development.

Stage 1 includes the frontend application, responsive interface, recipe discovery, Spoonacular API integration, favorites, baking journal, profile dashboard, community features, local data persistence, and deployment.

Future development will include backend persistence, user authentication and authorization, expanded community functionality, additional accessibility improvements, and continued UI polish.

## Author

**Zachary Ziakas**

Software Engineering Final Project
