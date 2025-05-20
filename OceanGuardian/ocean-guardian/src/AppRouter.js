import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AnimalsPage from './pages/AnimalsPage';
import AnimalDetailPage from './pages/AnimalDetailPage';
import RescueMissionPage from './pages/RescueMissionPage';
import LearnPage from './pages/LearnPage';
import ActionsPage from './pages/ActionsPage';

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