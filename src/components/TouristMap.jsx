import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { MapPin, Clock, Camera, Coffee, Church, Castle, Building, Eye, UtensilsCrossed, Pizza, Filter } from 'lucide-react';

// Define the categories configuration
const CATEGORIES = [
  { id: 'all', name: 'All Places', icon: MapPin },
  { id: 'architectural', name: 'Architectural', icon: Building },
  { id: 'observation', name: 'Observation Points', icon: Eye },
  { id: 'restaurant', name: 'Restaurants', icon: UtensilsCrossed },
  { id: 'streetfood', name: 'Street Food', icon: Pizza }
];

// Define icon mapping for different attraction types
const ICON_MAPPING = {
  castle: Castle,
  building: Building,
  church: Church,
  restaurant: UtensilsCrossed,
  streetfood: Pizza,
  observation: Eye,
  camera: Camera,
  coffee: Coffee,
  default: MapPin
};

const TouristMap = ({ 
  attractions = [], 
  title = "Tourist Attractions",
  categories = CATEGORIES,
  defaultCategories = ['all']
}) => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState(defaultCategories);

  const handleAttractionClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const toggleCategory = (categoryId) => {
    if (categoryId === 'all') {
      setSelectedCategories(['all']);
    } else {
      const newCategories = selectedCategories.filter(cat => cat !== 'all');
      if (selectedCategories.includes(categoryId)) {
        const filtered = newCategories.filter(cat => cat !== categoryId);
        setSelectedCategories(filtered.length ? filtered : ['all']);
      } else {
        setSelectedCategories([...newCategories, categoryId]);
      }
    }
  };

  const getIcon = (iconName) => {
    return ICON_MAPPING[iconName] || ICON_MAPPING.default;
  };

  const filteredAttractions = attractions.filter(attraction =>
    selectedCategories.includes('all') || selectedCategories.includes(attraction.category)
  );

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Category filters */}
        <div className="mb-4 flex flex-wrap gap-2">
          {categories.map(category => {
            const Icon = category.icon;
            const isSelected = selectedCategories.includes(category.id);
            return (
              <button
                key={category.id}
                onClick={() => toggleCategory(category.id)}
                className={`flex items-center px-3 py-1 rounded-full text-sm transition-colors ${
                  isSelected 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-4 h-4 mr-1" />
                {category.name}
              </button>
            );
          })}
        </div>

        <div className="relative w-full h-96 bg-blue-50 border-2 border-gray-200 rounded-lg overflow-hidden">
          {/* Map container */}
          <div className="absolute inset-0">
            {filteredAttractions.map((place) => {
              const Icon = getIcon(place.iconType);
              return (
                <div
                  key={place.id}
                  className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform"
                  style={{ top: place.position.top, left: place.position.left }}
                  onMouseEnter={() => setSelectedPlace(place)}
                  onMouseLeave={() => setSelectedPlace(null)}
                  onClick={() => handleAttractionClick(place.googleMapsUrl)}
                >
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
              );
            })}
          </div>

          {/* Info panel */}
          <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 p-4">
            {selectedPlace ? (
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg">{selectedPlace.name}</h3>
                  <button
                    onClick={() => handleAttractionClick(selectedPlace.googleMapsUrl)}
                    className="flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">Open in Google Maps</span>
                  </button>
                </div>
                <p className="text-sm text-gray-600">{selectedPlace.description}</p>
                <div className="flex items-center mt-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>Suggested time: {selectedPlace.timeNeeded}</span>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">Click on markers to open in Google Maps, or hover to see details</p>
            )}
          </div>
        </div>

        {/* Attractions list */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAttractions.map((place) => {
            const Icon = getIcon(place.iconType);
            return (
              <div
                key={place.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
                onClick={() => handleAttractionClick(place.googleMapsUrl)}
              >
                <div className="flex items-center">
                  <Icon className="w-4 h-4 text-blue-600 mr-2" />
                  <div>
                    <span className="text-sm font-medium">{place.name}</span>
                    <div className="text-xs text-gray-500">{place.timeNeeded}</div>
                  </div>
                </div>
                <MapPin className="w-4 h-4 text-gray-400" />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default TouristMap;
