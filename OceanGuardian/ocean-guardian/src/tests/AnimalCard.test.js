import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AnimalCard from '../components/Animal/AnimalCard';

describe('AnimalCard', () => {
  const mockAnimal = {
    id: 'turtle',
    name: 'Timmy the Turtle',
    species: 'Sea Turtle',
    problem: 'entanglement',
    description: 'Timmy is a green sea turtle who got entangled in plastic fishing nets.',
    image: 'turtle.jpg',
    rescued: false
  };
  
  const mockRescuedAnimal = {
    ...mockAnimal,
    rescued: true
  };
  
  test('renders animal information', () => {
    render(
      <BrowserRouter>
        <AnimalCard animal={mockAnimal} />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Timmy the Turtle')).toBeInTheDocument();
    expect(screen.getByText('Sea Turtle')).toBeInTheDocument();
    expect(screen.getByText(/entangled in plastic/i)).toBeInTheDocument();
  });
  
  test('displays not rescued status for unrescued animal', () => {
    render(
      <BrowserRouter>
        <AnimalCard animal={mockAnimal} />
      </BrowserRouter>
    );
    
    expect(screen.getByText(/needs your help/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /help timmy/i })).toBeInTheDocument();
  });
  
  test('displays rescued status for rescued animal', () => {
    render(
      <BrowserRouter>
        <AnimalCard animal={mockRescuedAnimal} />
      </BrowserRouter>
    );
    
    expect(screen.getByText(/is now safe from plastic pollution/i)).toBeInTheDocument();
    expect(screen.getByText(/has been rescued/i)).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /help timmy/i })).not.toBeInTheDocument();
  });
}); 