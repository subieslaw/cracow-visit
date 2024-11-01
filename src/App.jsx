import React from 'react';
import TouristMap from './components/TouristMap';
import { attractions } from './lib/attractions';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <TouristMap 
          attractions={attractions}
          title="Krakow Tour Attractions"
        />
      </div>
    </div>
  );
}

export default App;