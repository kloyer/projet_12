import React from 'react';
import './HomePage.scss'
import { useData } from '../Contexts/DataProvider';

// Defining the HomePage functional component
function HomePage() {
  // Using the useData hook to access shared functions from the DataProvider
  const { selectUser, toggleDataSource } = useData();

  // Returning the JSX for the HomePage component
  return (
    <div className="home-page">
      {/* Button to select user 12 and view their stats */}
      <button onClick={() => selectUser(12)}>User 12 Stats</button>
      {/* Button to select user 18 and view their stats */}
      <button onClick={() => selectUser(18)}>User 18 Stats</button>
      {/* Button to toggle between API and local data source */}
      <button onClick={toggleDataSource}>Toggle Data Source</button>
    </div>
  );
}

export default HomePage;
