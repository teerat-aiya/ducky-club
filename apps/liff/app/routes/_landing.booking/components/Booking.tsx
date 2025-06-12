import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, SlidersHorizontal, MapPin, Star, Clock, Users, Zap } from 'lucide-react';
import { Link } from '@remix-run/react';

interface Space {
  id: string;
  name: string;
  type: string;
  capacity: number;
  hourlyRate: number;
  rating: number;
  reviewCount: number;
  isAvailable: boolean;
  amenities: string[];
  image: string;
  location: string;
}

interface SpaceType {
  value: string;
  label: string;
  count: number;
}

interface SortOption {
  value: string;
  label: string;
}

interface BookingProps {
  spaces: Space[];
  stats: {
    totalSpaces: number;
    availableSpaces: number;
    occupancyRate: number;
  };
  spaceTypes: SpaceType[];
  sortOptions: SortOption[];
}

export function Booking({ spaces, stats, spaceTypes, sortOptions }: BookingProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  
  const filteredSpaces = spaces
    .filter(space => {
      const matchesSearch = space.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType === 'all' || space.type === selectedType;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.hourlyRate - b.hourlyRate;
        case 'rating':
          return b.rating - a.rating;
        case 'capacity':
          return b.capacity - a.capacity;
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const handleBookSpace = (spaceId: string) => {
    // In a real app, this would navigate to a booking page or open a modal
    console.log('Booking space:', spaceId);
  };

  const getSpaceTypeLabel = (type: string) => {
    const typeInfo = spaceTypes.find(t => t.value === type);
    return typeInfo ? typeInfo.label : type;
  };

  return (
    <div className="space-y-6 pb-6">
      {/* Header */}
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Book a Space</h2>
        <p className="text-gray-600">Find and reserve the perfect workspace for your needs</p>
      </motion.div>

      {/* Stats Banner */}
      <motion.div 
        className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-5 text-white relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -mr-10 -mt-10" />
        <div className="relative z-10">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">{stats.totalSpaces}</div>
              <div className="text-sm opacity-80">Total Spaces</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{stats.availableSpaces}</div>
              <div className="text-sm opacity-80">Available Now</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{stats.occupancyRate}%</div>
              <div className="text-sm opacity-80">Occupancy</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Search and Filter */}
      <motion.div 
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search for a space..."
            className="block w-full pl-10 pr-3 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <SlidersHorizontal className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        {/* Space Type Filters */}
        <div className="flex space-x-2 overflow-x-auto pb-2 -mx-4 px-4">
          {spaceTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => setSelectedType(type.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedType === type.value
                  ? 'bg-amber-500 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {type.label} ({type.count})
            </button>
          ))}
        </div>

        {/* Additional Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div 
              className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm space-y-4"
              initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
              transition={{ duration: 0.2 }}
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Sort By
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setSortBy(option.value)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium text-center ${
                        sortBy === option.value
                          ? 'bg-amber-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Spaces Grid */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredSpaces.length > 0 ? (
            filteredSpaces.map((space, index) => (
              <motion.div
                key={space.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="aspect-video bg-gray-100 dark:bg-gray-700 relative">
                  {space.image ? (
                    <img
                      src={space.image}
                      alt={space.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <MapPin className="w-12 h-12" />
                    </div>
                  )}
                  {!space.isAvailable && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                      Booked
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{space.name}</h3>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{space.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 px-2 py-1 rounded text-sm font-medium">
                      {space.hourlyRate > 0 ? `$${space.hourlyRate}/hr` : 'Free'}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center">
                      <div className="flex items-center text-amber-500 mr-4">
                        <Star className="w-4 h-4 fill-current mr-1" />
                        <span className="text-sm font-medium">{space.rating}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">({space.reviewCount})</span>
                      </div>
                      <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                        <Users className="w-4 h-4 mr-1" />
                        <span>{space.capacity} {space.capacity === 1 ? 'person' : 'people'}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleBookSpace(space.id)}
                      disabled={!space.isAvailable}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                        space.isAvailable
                          ? 'bg-amber-500 text-white hover:bg-amber-600'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {space.isAvailable ? 'Book Now' : 'Unavailable'}
                    </button>
                  </div>

                  {space.amenities && space.amenities.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                      <div className="flex flex-wrap gap-2">
                        {space.amenities.map((amenity, i) => (
                          <span 
                            key={i}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              className="text-center py-10 text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              No spaces found matching your criteria.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
