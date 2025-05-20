import React, { createContext, useContext, useState } from 'react';

// Create the context
const AnimalContext = createContext();

// Initial animals data
const initialAnimals = [
  {
    id: 'turtle',
    name: 'Timmy the Turtle',
    species: 'Sea Turtle',
    problem: 'entanglement',
    description: 'Timmy is a green sea turtle who got entangled in plastic fishing nets. Sea turtles often mistake plastic bags for jellyfish and consume them, causing internal blockages.',
    facts: [
      'Sea turtles have a 22% mortality rate from ingesting just a single piece of plastic',
      'About 52% of the world\'s sea turtles have ingested plastic',
      'They have a strong preference for clear, sheet plastic items like plastic bags'
    ],
    image: 'turtle.jpg',
    rescued: false,
    ageRange: [5, 15]
  },
  {
    id: 'dolphin',
    name: 'Delia the Dolphin',
    species: 'Bottlenose Dolphin',
    problem: 'ingestion',
    description: 'Delia is a bottlenose dolphin who has consumed microplastics that have accumulated in her body. Dolphins can ingest plastic directly or by eating fish that have already consumed plastic.',
    facts: [
      'Dolphins can ingest thousands of pieces of microplastic daily',
      'Plastic can transfer harmful chemicals and toxins into dolphins\' bodies',
      'Even small amounts of plastic can cause digestive issues for dolphins'
    ],
    image: 'dolphin.jpg',
    rescued: false,
    ageRange: [5, 15]
  },
  {
    id: 'seabird',
    name: 'Sammy the Seabird',
    species: 'Albatross',
    problem: 'feeding',
    description: 'Sammy is an albatross who mistakenly feeds plastic to her chicks, thinking it\'s food. Seabirds are highly affected by plastic pollution as they pick up floating plastic from the ocean surface.',
    facts: [
      'Scientists have discovered a disease called "plasticosis" in seabirds caused by plastic ingestion',
      'Research shows 60% of all seabird species have eaten pieces of plastic',
      'By 2050, this is projected to increase to 99.8% of seabird species'
    ],
    image: 'seabird.jpg',
    rescued: false,
    ageRange: [8, 15]
  },
  {
    id: 'coral',
    name: 'Cora the Coral',
    species: 'Coral Reef',
    problem: 'habitat',
    description: 'Cora represents a coral reef ecosystem being smothered by plastic waste. Plastics can block sunlight and transfer harmful bacteria to coral surfaces.',
    facts: [
      'Plastic waste can smother corals, preventing them from receiving necessary sunlight',
      'Plastic transfers harmful bacteria and pathogens to coral surfaces',
      'Plastic can cause diseases such as black band disease, which eats away coral tissue'
    ],
    image: 'coral.jpg',
    rescued: false,
    ageRange: [10, 15]
  }
];

// Provider component
export const AnimalProvider = ({ children }) => {
  const [animals, setAnimals] = useState(initialAnimals);
  
  // Get all rescued animals
  const rescuedAnimals = animals.filter(animal => animal.rescued);
  
  // Get all animals
  const getAllAnimals = () => animals;
  
  // Get animal by ID
  const getAnimalById = (id) => animals.find(animal => animal.id === id);
  
  // Get age-appropriate animals
  const getAnimalsByAge = (age) => {
    return animals.filter(animal => 
      age >= animal.ageRange[0] && age <= animal.ageRange[1]
    );
  };
  
  // Mark an animal as rescued
  const rescueAnimal = (id) => {
    setAnimals(prevAnimals => 
      prevAnimals.map(animal => 
        animal.id === id 
          ? { ...animal, rescued: true } 
          : animal
      )
    );
  };
  
  // Reset all animals to not rescued (for testing or restarting)
  const resetAnimals = () => {
    setAnimals(initialAnimals);
  };
  
  // Context value
  const value = {
    animals,
    rescuedAnimals,
    getAllAnimals,
    getAnimalById,
    getAnimalsByAge,
    rescueAnimal,
    resetAnimals
  };

  return (
    <AnimalContext.Provider value={value}>
      {children}
    </AnimalContext.Provider>
  );
};

// Custom hook to use the context
export const useAnimalContext = () => {
  const context = useContext(AnimalContext);
  
  if (context === undefined) {
    throw new Error('useAnimalContext must be used within an AnimalProvider');
  }
  
  return context;
}; 