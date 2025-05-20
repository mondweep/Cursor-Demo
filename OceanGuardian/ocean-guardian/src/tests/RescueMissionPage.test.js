import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RescueMissionPage from '../pages/RescueMissionPage';
import { AnimalProvider } from '../context/AnimalContext';
import { UserProvider } from '../context/UserContext';

// Mock useParams and useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ animalId: 'turtle' }),
  useNavigate: () => jest.fn()
}));

describe('RescueMissionPage', () => {
  test('renders rescue mission title and instructions', () => {
    render(
      <BrowserRouter>
        <UserProvider>
          <AnimalProvider>
            <RescueMissionPage />
          </AnimalProvider>
        </UserProvider>
      </BrowserRouter>
    );
    
    expect(screen.getByText(/rescue mission/i)).toBeInTheDocument();
    expect(screen.getByText(/help timmy/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /back to animals/i })).toBeInTheDocument();
  });
  
  test('renders game elements', () => {
    render(
      <BrowserRouter>
        <UserProvider>
          <AnimalProvider>
            <RescueMissionPage />
          </AnimalProvider>
        </UserProvider>
      </BrowserRouter>
    );
    
    // Check for game items (plastic pieces to collect)
    expect(screen.getAllByTestId('plastic-item').length).toBeGreaterThan(0);
    
    // Check for progress indicator
    expect(screen.getByTestId('progress-indicator')).toBeInTheDocument();
  });
  
  test('allows collecting plastic items', () => {
    render(
      <BrowserRouter>
        <UserProvider>
          <AnimalProvider>
            <RescueMissionPage />
          </AnimalProvider>
        </UserProvider>
      </BrowserRouter>
    );
    
    const firstPlasticItem = screen.getAllByTestId('plastic-item')[0];
    fireEvent.click(firstPlasticItem);
    
    // Progress should increase
    const progressText = screen.getByTestId('progress-text').textContent;
    expect(parseInt(progressText)).toBeGreaterThan(0);
  });
  
  test('shows completion message when all items are collected', () => {
    render(
      <BrowserRouter>
        <UserProvider>
          <AnimalProvider>
            <RescueMissionPage />
          </AnimalProvider>
        </UserProvider>
      </BrowserRouter>
    );
    
    // Click all plastic items
    const plasticItems = screen.getAllByTestId('plastic-item');
    plasticItems.forEach(item => {
      fireEvent.click(item);
    });
    
    // Check for completion elements
    expect(screen.getByText(/great job/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /continue/i })).toBeInTheDocument();
  });
}); 