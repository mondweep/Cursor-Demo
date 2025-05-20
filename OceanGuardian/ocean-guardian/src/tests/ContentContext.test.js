import React from 'react';
import { render, screen } from '@testing-library/react';
import { ContentProvider, useContentContext } from '../context/ContentContext';

// Test component that uses the context
const TestComponent = ({ selectedAge = 8 }) => {
  const { getContentByAge, getActionsByAge, getContentForAnimal } = useContentContext();
  
  const ageContent = getContentByAge(selectedAge);
  const actions = getActionsByAge(selectedAge);
  const turtleContent = getContentForAnimal('turtle', selectedAge);
  
  return (
    <div>
      <div data-testid="general-content-count">{ageContent.length}</div>
      <div data-testid="actions-count">{actions.length}</div>
      <div data-testid="animal-content-available">{turtleContent ? 'true' : 'false'}</div>
      {ageContent.length > 0 && (
        <div data-testid="first-content-title">{ageContent[0].title}</div>
      )}
      {actions.length > 0 && (
        <div data-testid="first-action-title">{actions[0].title}</div>
      )}
    </div>
  );
};

describe('ContentContext', () => {
  test('provides default content appropriate for children', () => {
    render(
      <ContentProvider>
        <TestComponent selectedAge={8} />
      </ContentProvider>
    );
    
    // Check if there's content available
    expect(parseInt(screen.getByTestId('general-content-count').textContent)).toBeGreaterThan(0);
    
    // Check if there are actions available
    expect(parseInt(screen.getByTestId('actions-count').textContent)).toBeGreaterThan(0);
    
    // Check if animal-specific content is available
    expect(screen.getByTestId('animal-content-available')).toHaveTextContent('true');
    
    // Check if first content item has a title
    expect(screen.getByTestId('first-content-title')).not.toBeNull();
    
    // Check if first action has a title
    expect(screen.getByTestId('first-action-title')).not.toBeNull();
  });
  
  test('filters content by age appropriateness', () => {
    render(
      <ContentProvider>
        <>
          <div data-testid="child-content">
            <TestComponent selectedAge={7} />
          </div>
          <div data-testid="teen-content">
            <TestComponent selectedAge={14} />
          </div>
        </>
      </ContentProvider>
    );
    
    // Child and teen content should be different
    const childContentCount = screen.getByTestId('child-content').querySelector('[data-testid="general-content-count"]').textContent;
    const teenContentCount = screen.getByTestId('teen-content').querySelector('[data-testid="general-content-count"]').textContent;
    
    // Different age groups should have appropriate content
    expect(childContentCount).not.toBe(teenContentCount);
  });
}); 