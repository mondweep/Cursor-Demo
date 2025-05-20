import React, { createContext, useContext, useState } from 'react';

// Create the context
const UserContext = createContext();

// Initial state for the user
const defaultInitialState = {
  age: 0,
  progress: 0,
  completedActions: [],
  visitedAnimals: [],
};

// Provider component
export const UserProvider = ({ children, initialAge = 0 }) => {
  const [user, setUser] = useState({
    ...defaultInitialState,
    age: initialAge
  });

  // Set the user's age and adapt content accordingly
  const setUserAge = (age) => {
    setUser(prevState => ({
      ...prevState,
      age
    }));
  };

  // Add a completed action to the user's record
  const addCompletedAction = (actionId) => {
    setUser(prevState => ({
      ...prevState,
      completedActions: [...prevState.completedActions, actionId]
    }));
  };

  // Mark an animal as visited
  const visitAnimal = (animalId) => {
    if (!user.visitedAnimals.includes(animalId)) {
      setUser(prevState => ({
        ...prevState,
        visitedAnimals: [...prevState.visitedAnimals, animalId]
      }));
    }
  };

  // Increase progress
  const increaseProgress = (amount) => {
    setUser(prevState => ({
      ...prevState,
      progress: prevState.progress + amount
    }));
  };

  // Reset user state
  const resetUser = () => {
    setUser(defaultInitialState);
  };

  // Context value
  const value = {
    user,
    setUserAge,
    addCompletedAction,
    visitAnimal,
    increaseProgress,
    resetUser
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the context
export const useUserContext = () => {
  const context = useContext(UserContext);
  
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  
  return context;
}; 