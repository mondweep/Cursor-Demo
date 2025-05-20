import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../components/Navigation/Navbar';

describe('Navbar', () => {
  test('renders app title', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    
    expect(screen.getByText(/Ocean Guardian/i)).toBeInTheDocument();
  });
  
  test('renders navigation links', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Animals/i)).toBeInTheDocument();
    expect(screen.getByText(/Learn/i)).toBeInTheDocument();
    expect(screen.getByText(/Actions/i)).toBeInTheDocument();
  });
  
  test('has accessible navigation', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
  });
}); 