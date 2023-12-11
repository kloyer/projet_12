// HomePage.jsx
import React from 'react';
import './HomePage.scss'
import { useData } from '../Contexts/DataProvider';

function HomePage() {
  const { selectUser, toggleDataSource } = useData();

  return (
    <div className="home-page">
      <button onClick={() => selectUser(12)}>User 12 Stats</button>
      <button onClick={() => selectUser(18)}>User 18 Stats</button>
      <button onClick={toggleDataSource}>Toggle Data Source</button>
    </div>
  );
}

export default HomePage;
