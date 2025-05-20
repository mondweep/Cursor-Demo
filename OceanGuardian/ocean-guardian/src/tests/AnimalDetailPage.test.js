import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AnimalDetailPage from '../pages/AnimalDetailPage';
import { AnimalProvider } from '../context/AnimalContext';
import { ContentProvider } from '../context/ContentContext';
import { UserProvider } from '../context/UserContext';

// Mock useParams and useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ animalId: 'turtle' }),
  useNavigate: () => jest.fn()
}));

describe('AnimalDetailPage', () => {
  test('renders animal details', () => {
    render(
      <BrowserRouter>
        <UserProvider>
          <AnimalProvider>
            <ContentProvider>
              <AnimalDetailPage />
            </ContentProvider>
          </AnimalProvider>
        </UserProvider>
      </BrowserRouter>
    );
    
    // Check if animal name is rendered
    expect(screen.getByText('Timmy the Turtle')).toBeInTheDocument();
    
    // Check if species is rendered
    expect(screen.getByText('Sea Turtle')).toBeInTheDocument();
    
    // Check if problem type is rendered
    expect(screen.getByText(/entanglement/i)).toBeInTheDocument();
  });
  
  test('renders animal facts section', () => {
    render(
      <BrowserRouter>
        <UserProvider>
          <AnimalProvider>
            <ContentProvider>
              <AnimalDetailPage />
            </ContentProvider>
          </AnimalProvider>
        </UserProvider>
      </BrowserRouter>
    );
    
    expect(screen.getByText(/Facts About Plastic Impact/i)).toBeInTheDocument();
    expect(screen.getByText(/52% of the world's sea turtles/i)).toBeInTheDocument();
  });
  
  test('renders educational content', () => {
    render(
      <BrowserRouter>
        <UserProvider initialAge={8}>
          <AnimalProvider>
            <ContentProvider>
              <AnimalDetailPage />
            </ContentProvider>
          </AnimalProvider>
        </UserProvider>
      </BrowserRouter>
    );
    
    expect(screen.getByText(/Learn More/i)).toBeInTheDocument();
    // Should display the appropriate content for the animal
    expect(screen.getByText(/Sea Turtles and Plastic/i)).toBeInTheDocument();
  });
  
  test('renders rescue button for non-rescued animal', () => {
    render(
      <BrowserRouter>
        <UserProvider>
          <AnimalProvider>
            <ContentProvider>
              <AnimalDetailPage />
            </ContentProvider>
          </AnimalProvider>
        </UserProvider>
      </BrowserRouter>
    );
    
    expect(screen.getByRole('button', { name: /Rescue Timmy/i })).toBeInTheDocument();
  });
}); 