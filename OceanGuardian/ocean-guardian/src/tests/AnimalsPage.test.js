import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AnimalsPage from '../pages/AnimalsPage';
import { AnimalProvider } from '../context/AnimalContext';
import { UserProvider } from '../context/UserContext';

// Mock useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn()
}));

describe('AnimalsPage', () => {
  test('renders page title and subtitle', () => {
    render(
      <BrowserRouter>
        <UserProvider>
          <AnimalProvider>
            <AnimalsPage />
          </AnimalProvider>
        </UserProvider>
      </BrowserRouter>
    );
    
    expect(screen.getByText(/Meet the Animals/i)).toBeInTheDocument();
    expect(screen.getByText(/These marine animals need your help/i)).toBeInTheDocument();
  });
  
  test('displays animal cards', () => {
    render(
      <BrowserRouter>
        <UserProvider>
          <AnimalProvider>
            <AnimalsPage />
          </AnimalProvider>
        </UserProvider>
      </BrowserRouter>
    );
    
    // We should have at least one animal card
    expect(screen.getByText('Timmy the Turtle')).toBeInTheDocument();
  });
  
  test('shows rescue progress stats', () => {
    render(
      <BrowserRouter>
        <UserProvider>
          <AnimalProvider>
            <AnimalsPage />
          </AnimalProvider>
        </UserProvider>
      </BrowserRouter>
    );
    
    expect(screen.getByText(/Animals Rescued/i)).toBeInTheDocument();
  });
}); 