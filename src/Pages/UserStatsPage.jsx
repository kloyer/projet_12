import React from 'react';
import { useData } from '../Contexts/DataProvider';
import { useParams } from 'react-router-dom';

function UserStatsPage() {
  const { userId } = useParams(); // This will get the userId from the URL
  const { data } = useData();

  console.log(data);

  return (
    <div>
      <h1>User {userId} Statistics</h1>
      {/* Render statistics based on the data */}
    </div>
  );
}

export default UserStatsPage;