import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AnimalProvider, useAnimalContext } from '../context/AnimalContext';

// Test component that uses the context
const TestComponent = () => {
  const { animals, rescuedAnimals, rescueAnimal, getAllAnimals, getAnimalById } = useAnimalContext();
  
  // Get first animal for testing
  const firstAnimal = animals.length > 0 ? animals[0] : null;
  
  return (
    <div>
      <div data-testid="animals-count">{animals.length}</div>
      <div data-testid="rescued-animals-count">{rescuedAnimals.length}</div>
      {firstAnimal && (
        <>
          <div data-testid="first-animal-name">{firstAnimal.name}</div>
          <div data-testid="first-animal-rescued">{firstAnimal.rescued ? 'true' : 'false'}</div>
          <button onClick={() => rescueAnimal(firstAnimal.id)}>Rescue Animal</button>
        </>
      )}
    </div>
  );
};

describe('AnimalContext', () => {
  test('provides default animals state with at least one animal', () => {
    render(
      <AnimalProvider>
        <TestComponent />
      </AnimalProvider>
    );
    
    // Check if there's at least one animal
    expect(parseInt(screen.getByTestId('animals-count').textContent)).toBeGreaterThan(0);
    
    // No animals should be rescued by default
    expect(screen.getByTestId('rescued-animals-count')).toHaveTextContent('0');
    
    // Check if first animal has a name and is not rescued
    expect(screen.getByTestId('first-animal-name')).not.toBeNull();
    expect(screen.getByTestId('first-animal-rescued')).toHaveTextContent('false');
  });
  
  test('allows marking an animal as rescued', () => {
    render(
      <AnimalProvider>
        <TestComponent />
      </AnimalProvider>
    );
    
    // Rescue the first animal
    fireEvent.click(screen.getByText('Rescue Animal'));
    
    // The animal should be marked as rescued
    expect(screen.getByTestId('first-animal-rescued')).toHaveTextContent('true');
    
    // The rescued animals count should increase
    expect(screen.getByTestId('rescued-animals-count')).toHaveTextContent('1');
  });
}); 