import React from 'react';
import { useData } from '../Contexts/DataProvider';

function ExampleComponent() {
  const { data, toggleDataSource } = useData();

  // You can now render your data in the UI and provide a button to toggle the data source
  return (
    <div>
      <button onClick={toggleDataSource}>
        {`Switch to ${data.useApi ? 'local' : 'API'} data`}
      </button>
      {/* Render your data here */}
    </div>
  );
}

export default ExampleComponent;