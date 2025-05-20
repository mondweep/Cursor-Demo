import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FeatureCard from '../components/Navigation/FeatureCard';

describe('FeatureCard', () => {
  const mockOnClick = jest.fn();
  
  beforeEach(() => {
    mockOnClick.mockClear();
  });
  
  test('renders title and description', () => {
    render(
      <FeatureCard 
        title="Rescue Animals" 
        description="Help marine animals affected by plastic pollution" 
        icon="🐢"
        onClick={mockOnClick}
      />
    );
    
    expect(screen.getByText('Rescue Animals')).toBeInTheDocument();
    expect(screen.getByText('Help marine animals affected by plastic pollution')).toBeInTheDocument();
    expect(screen.getByText('🐢')).toBeInTheDocument();
  });
  
  test('calls onClick handler when clicked', () => {
    render(
      <FeatureCard 
        title="Rescue Animals" 
        description="Help marine animals affected by plastic pollution" 
        icon="🐢"
        onClick={mockOnClick}
      />
    );
    
    fireEvent.click(screen.getByRole('button'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
  
  test('uses provided background color', () => {
    render(
      <FeatureCard 
        title="Rescue Animals" 
        description="Help marine animals affected by plastic pollution" 
        icon="🐢"
        backgroundColor="#e3f2fd"
        onClick={mockOnClick}
      />
    );
    
    const card = screen.getByRole('button');
    expect(card).toHaveStyle('background-color: #e3f2fd');
  });
}); 