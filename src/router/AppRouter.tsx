import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import DeveloperProfilePage from '../pages/DeveloperProfilePage';
import LoadingPage from '../pages/LoadingPage';
import profileConfig from '../config/profileConfig.json';

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile/:username" element={<DeveloperProfilePage />}>
          <Route path="/profile/:username/overview" element={<LoadingPage />} />
          <Route path="/profile/:username/projects" element={<LoadingPage />} />
          <Route path="/profile/:username/contributions" element={<LoadingPage />} />
          <Route path="/profile/:username/skills" element={<LoadingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
