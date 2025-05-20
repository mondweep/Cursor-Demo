import React, { createContext, useContext } from 'react';

// Create the context
const ContentContext = createContext();

// Educational content with age ranges
const educationalContent = [
  {
    id: 'plastic-basics',
    title: 'What is Plastic Pollution?',
    content: 'Plastic pollution happens when plastic trash ends up in our oceans and harms the animals that live there. Plastic doesn\'t go away - it just breaks into smaller pieces called microplastics.',
    imageUrl: 'plastic-pollution.jpg',
    ageRange: [5, 9],
    complexity: 'beginner'
  },
  {
    id: 'ocean-plastic-facts',
    title: 'Ocean Plastic Facts',
    content: 'Did you know that about 11 billion kilograms of plastic waste enters the ocean every year? Scientists think that by 2050, there could be more plastic than fish in the ocean if we don\'t change our habits!',
    imageUrl: 'ocean-facts.jpg',
    ageRange: [5, 12],
    complexity: 'beginner'
  },
  {
    id: 'microplastics-explained',
    title: 'What Are Microplastics?',
    content: 'Microplastics are tiny plastic pieces less than 5mm long. They come from larger plastic items breaking down or from microbeads in products like face wash. They\'re harmful because animals can easily eat them by accident.',
    imageUrl: 'microplastics.jpg',
    ageRange: [8, 15],
    complexity: 'explorer'
  },
  {
    id: 'plastic-lifecycle',
    title: 'The Life Cycle of Plastic',
    content: 'Plastic starts as oil extracted from the ground, then gets processed in factories into products. After use, it\'s often thrown away and may end up in landfills or the ocean. Unlike natural materials, most plastic never fully decomposes.',
    imageUrl: 'plastic-lifecycle.jpg',
    ageRange: [10, 15],
    complexity: 'explorer'
  },
  {
    id: 'global-plastic-crisis',
    title: 'Understanding the Global Plastic Crisis',
    content: 'The global plastic pollution crisis affects ecosystems worldwide. Over 700 species of marine animals have been affected by plastic pollution through entanglement, ingestion, or habitat destruction. This has complex effects on food webs and ecosystem health.',
    imageUrl: 'global-crisis.jpg',
    ageRange: [12, 15],
    complexity: 'expert'
  }
];

// Action suggestions with age ranges
const actionSuggestions = [
  {
    id: 'reusable-bags',
    title: 'Use Reusable Bags',
    content: 'Take reusable shopping bags when you go to stores instead of using plastic bags.',
    impact: 'This can save hundreds of plastic bags every year!',
    difficulty: 'easy',
    imageUrl: 'reusable-bags.jpg',
    ageRange: [5, 15]
  },
  {
    id: 'water-bottle',
    title: 'Carry a Reusable Water Bottle',
    content: 'Use a reusable water bottle instead of buying plastic water bottles.',
    impact: 'This can prevent dozens of plastic bottles from ending up in the ocean each month!',
    difficulty: 'easy',
    imageUrl: 'water-bottle.jpg',
    ageRange: [5, 15]
  },
  {
    id: 'plastic-audit',
    title: 'Do a Plastic Audit at Home',
    content: 'Count how many plastic items you use in a day and think about which ones you could replace.',
    impact: 'Understanding your plastic use is the first step to reducing it!',
    difficulty: 'medium',
    imageUrl: 'plastic-audit.jpg',
    ageRange: [8, 15]
  },
  {
    id: 'beach-cleanup',
    title: 'Join a Beach or Park Cleanup',
    content: 'Participate in a local cleanup event with your family to collect litter before it reaches the ocean.',
    impact: 'Every piece of trash you collect is one less threat to marine animals!',
    difficulty: 'medium',
    imageUrl: 'beach-cleanup.jpg',
    ageRange: [5, 15]
  },
  {
    id: 'spread-awareness',
    title: 'Educate Others About Plastic Pollution',
    content: 'Share what you\'ve learned with friends and family to help more people understand the problem.',
    impact: 'When more people know about plastic pollution, more people will take action!',
    difficulty: 'medium',
    imageUrl: 'spread-awareness.jpg',
    ageRange: [8, 15]
  },
  {
    id: 'advocacy',
    title: 'Write to Companies or Local Government',
    content: 'With help from an adult, write to companies or local officials asking them to reduce plastic use.',
    impact: 'Changes in policy and business practices can prevent plastic pollution at the source!',
    difficulty: 'hard',
    imageUrl: 'advocacy.jpg',
    ageRange: [10, 15]
  }
];

// Animal-specific content
const animalContent = [
  {
    animalId: 'turtle',
    content: [
      {
        id: 'turtle-basics',
        title: 'Sea Turtles and Plastic',
        content: 'Sea turtles often mistake plastic bags for jellyfish, their favorite food. When they eat plastic, it can make them very sick or even cause them to starve.',
        imageUrl: 'turtle-plastic.jpg',
        ageRange: [5, 9]
      },
      {
        id: 'turtle-facts',
        title: 'How Plastic Affects Sea Turtles',
        content: 'When sea turtles eat plastic, it can block their digestive system. This makes them feel full when they\'re not, causing them to starve. About 52% of all sea turtles have eaten plastic.',
        imageUrl: 'turtle-impact.jpg',
        ageRange: [8, 15]
      }
    ]
  },
  {
    animalId: 'dolphin',
    content: [
      {
        id: 'dolphin-basics',
        title: 'Dolphins and Plastic',
        content: 'Dolphins can get tangled in plastic trash like fishing nets and six-pack rings. They can also swallow small pieces of plastic by accident when they\'re eating fish.',
        imageUrl: 'dolphin-plastic.jpg',
        ageRange: [5, 9]
      },
      {
        id: 'dolphin-facts',
        title: 'How Plastic Affects Dolphins',
        content: 'Dolphins consume microplastics both directly and by eating fish that have already consumed plastic. These plastics can release harmful chemicals inside their bodies and cause health problems.',
        imageUrl: 'dolphin-impact.jpg',
        ageRange: [8, 15]
      }
    ]
  },
  {
    animalId: 'seabird',
    content: [
      {
        id: 'seabird-basics',
        title: 'Seabirds and Plastic',
        content: 'Seabirds like albatrosses pick up floating plastic from the ocean, thinking it\'s food. They also feed it to their babies, which can make them very sick.',
        imageUrl: 'seabird-plastic.jpg',
        ageRange: [5, 9]
      },
      {
        id: 'seabird-facts',
        title: 'How Plastic Affects Seabirds',
        content: 'Scientists have discovered a disease called "plasticosis" in seabirds that eat plastic. This causes scarring in their digestive tract and can affect multiple organs, leading to dehydration and even death.',
        imageUrl: 'seabird-impact.jpg',
        ageRange: [10, 15]
      }
    ]
  },
  {
    animalId: 'coral',
    content: [
      {
        id: 'coral-basics',
        title: 'Coral Reefs and Plastic',
        content: 'Coral reefs can be covered by plastic trash, which blocks the sunlight they need to survive. Plastic can also scratch and damage the delicate coral animals.',
        imageUrl: 'coral-plastic.jpg',
        ageRange: [5, 9]
      },
      {
        id: 'coral-facts',
        title: 'How Plastic Affects Coral Reefs',
        content: 'When plastic comes in contact with coral, it can transfer harmful bacteria and pathogens. This can cause diseases like black band disease, which literally eats away the coral tissue.',
        imageUrl: 'coral-impact.jpg',
        ageRange: [10, 15]
      }
    ]
  }
];

// Provider component
export const ContentProvider = ({ children }) => {
  // Get content appropriate for user's age
  const getContentByAge = (age) => {
    return educationalContent.filter(content => 
      age >= content.ageRange[0] && age <= content.ageRange[1]
    );
  };
  
  // Get actions appropriate for user's age
  const getActionsByAge = (age) => {
    return actionSuggestions.filter(action => 
      age >= action.ageRange[0] && age <= action.ageRange[1]
    );
  };
  
  // Get content specific to an animal and appropriate for user's age
  const getContentForAnimal = (animalId, age) => {
    const animal = animalContent.find(item => item.animalId === animalId);
    
    if (!animal) return null;
    
    return animal.content.filter(content => 
      age >= content.ageRange[0] && age <= content.ageRange[1]
    );
  };
  
  // Get content by complexity level
  const getContentByComplexity = (complexity) => {
    return educationalContent.filter(content => content.complexity === complexity);
  };
  
  // Context value
  const value = {
    getContentByAge,
    getActionsByAge,
    getContentForAnimal,
    getContentByComplexity
  };

  return (
    <ContentContext.Provider value={value}>
      {children}
    </ContentContext.Provider>
  );
};

// Custom hook to use the context
export const useContentContext = () => {
  const context = useContext(ContentContext);
  
  if (context === undefined) {
    throw new Error('useContentContext must be used within a ContentProvider');
  }
  
  return context;
}; 