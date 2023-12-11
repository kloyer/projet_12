import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import UserStatsPage from './Pages/UserStatsPage';
import DataProvider from './Contexts/DataProvider';
import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <DataProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/user/:userId" element={<UserStatsPage />} />
        </Routes>
      </DataProvider>
    </BrowserRouter>
  );
}

export default App;
