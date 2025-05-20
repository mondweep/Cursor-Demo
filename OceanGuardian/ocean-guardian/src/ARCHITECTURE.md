# Ocean Guardian Architecture

## Component Structure

```
App
├── AppContext (State Management)
│   ├── UserContext (age, progress, completed actions)
│   ├── AnimalContext (animal data, rescue status)
│   └── ContentContext (educational content)
│
├── Pages
│   ├── HomePage
│   ├── AnimalDetailPage
│   ├── RescueMissionPage
│   ├── LearnPage
│   ├── ActionPage
│   └── ImpactPage
│
├── Core Components
│   ├── Navigation
│   │   ├── Navbar
│   │   └── FeatureCard
│   │
│   ├── Animal Characters
│   │   ├── AnimalCard
│   │   ├── AnimalStory
│   │   └── AnimalFact
│   │
│   ├── Educational
│   │   ├── ContentCard
│   │   ├── FactSlider
│   │   └── ImpactVisualizer
│   │
│   ├── Interactive
│   │   ├── RescueGame
│   │   ├── DragDropInterface
│   │   └── ProgressTracker
│   │
│   ├── Actions
│   │   ├── ActionCard
│   │   ├── ActionTracker
│   │   └── ActionImpact
│   │
│   └── Common
│       ├── Button
│       ├── Card
│       ├── Modal
│       └── ProgressBar
│
└── Utils
    ├── ageAdapter.js (adjusts content based on age)
    ├── contentLoader.js (handles progressive loading)
    └── impactCalculator.js (calculates environmental impact)
```

## Data Flow

1. User enters app and selects age group (stored in UserContext)
2. App loads appropriate content based on age from ContentContext
3. User navigates to animal character (fetches data from AnimalContext)
4. User interacts with rescue game (updates status in AnimalContext)
5. User views action suggestions based on completed activities
6. Impact visualization shows effect of actions (calculated with impactCalculator)

## State Management

We'll use React Context API for state management with the following structure:

- **UserContext**: Manages user preferences, progress, and history
- **AnimalContext**: Stores animal character data and rescue mission status
- **ContentContext**: Contains educational content with tiered complexity

## Responsive Design Strategy

- Mobile-first approach using flexbox and CSS Grid
- Breakpoints at: 
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px

## Performance Optimization

- Lazy loading for routes and larger components
- Optimized image assets with multiple resolution options
- Progressive content loading based on user navigation

## Accessibility Considerations

- Semantic HTML structure
- Appropriate contrast ratios
- Keyboard navigation support
- Screen reader compatible content
- Alternative text for all images 