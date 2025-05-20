import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import { UserProvider } from '../context/UserContext';

// Mock useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn()
}));

describe('HomePage', () => {
  test('renders welcome message', () => {
    render(
      <BrowserRouter>
        <UserProvider>
          <HomePage />
        </UserProvider>
      </BrowserRouter>
    );
    
    expect(screen.getByText(/Welcome to Ocean Guardian/i)).toBeInTheDocument();
  });
  
  test('renders age selection section', () => {
    render(
      <BrowserRouter>
        <UserProvider>
          <HomePage />
        </UserProvider>
      </BrowserRouter>
    );
    
    expect(screen.getByText(/How old are you?/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /5-8 years/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /9-12 years/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /13\+ years/i })).toBeInTheDocument();
  });
  
  test('renders feature cards section', () => {
    render(
      <BrowserRouter>
        <UserProvider>
          <HomePage />
        </UserProvider>
      </BrowserRouter>
    );
    
    expect(screen.getByText(/Meet the Animals/i)).toBeInTheDocument();
    expect(screen.getByText(/Learn About Plastic/i)).toBeInTheDocument();
    expect(screen.getByText(/Take Action/i)).toBeInTheDocument();
  });
}); 