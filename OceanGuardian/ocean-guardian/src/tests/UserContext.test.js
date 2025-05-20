import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { UserProvider, useUserContext } from '../context/UserContext';

// Test component that uses the context
const TestComponent = () => {
  const { user, setUserAge, addCompletedAction } = useUserContext();
  
  return (
    <div>
      <div data-testid="user-age">{user.age}</div>
      <div data-testid="completed-actions">{user.completedActions.length}</div>
      <button onClick={() => setUserAge(10)}>Set Age to 10</button>
      <button onClick={() => addCompletedAction('reduce-plastic')}>Add Action</button>
    </div>
  );
};

describe('UserContext', () => {
  test('provides default user state', () => {
    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );
    
    expect(screen.getByTestId('user-age')).toHaveTextContent('0');
    expect(screen.getByTestId('completed-actions')).toHaveTextContent('0');
  });
  
  test('allows setting user age', () => {
    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );
    
    fireEvent.click(screen.getByText('Set Age to 10'));
    expect(screen.getByTestId('user-age')).toHaveTextContent('10');
  });
  
  test('allows adding completed actions', () => {
    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );
    
    fireEvent.click(screen.getByText('Add Action'));
    expect(screen.getByTestId('completed-actions')).toHaveTextContent('1');
  });
}); 