import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AnimalsPage from './pages/AnimalsPage';

// Placeholder components for routes we haven't implemented yet
const AnimalDetailPage = () => <div>Animal Detail Page</div>;
const LearnPage = () => <div>Learn Page</div>;
const ActionsPage = () => <div>Actions Page</div>;
const RescueMissionPage = () => <div>Rescue Mission Page</div>;

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/animals" element={<AnimalsPage />} />
      <Route path="/animals/:animalId" element={<AnimalDetailPage />} />
      <Route path="/animals/:animalId/rescue" element={<RescueMissionPage />} />
      <Route path="/learn" element={<LearnPage />} />
      <Route path="/actions" element={<ActionsPage />} />
    </Routes>
  );
};

export default AppRouter; 