// HomePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../Contexts/DataProvider';

function HomePage() {
  const navigate = useNavigate();
  const { setUser, toggleDataSource } = useData();

  return (
    <div>
      <button onClick={() => setUser(12, navigate)}>User 12 Stats</button>
      <button onClick={() => setUser(18, navigate)}>User 18 Stats</button>
      <button onClick={toggleDataSource}>Toggle Data Source</button>
    </div>
  );
}

export default HomePage;
