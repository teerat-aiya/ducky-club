import React from 'react';
import { motion } from 'framer-motion';
import { Edit, Calendar, Award, MapPin, Mail, Settings, LogOut, Star, TrendingUp, Users, Clock } from 'lucide-react';
import { Link } from '@remix-run/react';

interface User {
  displayName: string;
  pictureUrl: string;
  statusMessage: string;
  email: string;
  joinDate: string;
  membershipLevel: string;
  points: number;
  nextLevelPoints: number;
  levelProgress: number;
  stats: {
    hoursSpent: number;
    bookings: number;
    eventsAttended: number;
    connections: number;
  };
  upcomingBookings: Array<{
    id: number;
    title: string;
    date: string;
    space: string;
  }>;
  achievements: Array<{
    id: number;
    title: string;
    description: string;
    icon: string;
    color: string;
  }>;
}

interface ProfileProps {
  user: User;
}

export function Profile({ user }: ProfileProps) {
  const membershipBadgeColor = 'bg-gradient-to-r from-amber-500 to-orange-500 text-white';

  const handleLogout = () => {
    // In a real app, this would call the logout function from an auth context
    console.log('Logging out...');
  };

  return (
    <div className="space-y-6 pb-6">
      {/* Profile Header */}
      <motion.div 
        className="bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 rounded-2xl p-6 text-white relative overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -mr-16 -mt-16" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-10 rounded-full -ml-12 -mb-12" />
        <div className="relative z-10">
          <div className="flex items-center space-x-5 mb-5">
            <motion.img 
              src={user.pictureUrl} 
              alt={user.displayName}
              className="w-20 h-20 rounded-full border-4 border-white border-opacity-30"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold truncate">{user.displayName}</h1>
                <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${membershipBadgeColor}`}>
                  {user.membershipLevel}
                </span>
              </div>
              <p className="text-amber-100 text-sm truncate">{user.statusMessage}</p>
              <div className="flex items-center mt-1 text-xs text-amber-100">
                <Star className="w-3.5 h-3.5 mr-1 fill-current" />
                <span>{user.points} points</span>
                <span className="mx-2">•</span>
                <span>Member since {new Date(user.joinDate).getFullYear()}</span>
              </div>
            </div>
            <Link 
              to="/profile/edit"
              className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-colors"
            >
              <Edit className="w-5 h-5" />
            </Link>
          </div>
          
          {/* Level Progress */}
          <div className="mt-4">
            <div className="flex justify-between text-xs mb-1">
              <span>Level Progress</span>
              <span>{user.levelProgress}% to next level</span>
            </div>
            <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
              <div 
                className="bg-white h-2 rounded-full" 
                style={{ width: `${user.levelProgress}%` }}
              />
            </div>
            <div className="text-xs text-center mt-1 opacity-80">
              {user.points} / {user.nextLevelPoints} points to {user.membershipLevel} Elite
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-3">
              <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Hours Spent</p>
              <p className="font-semibold text-lg">{user.stats.hoursSpent}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg mr-3">
              <Calendar className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Bookings</p>
              <p className="font-semibold text-lg">{user.stats.bookings}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg mr-3">
              <Award className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Events</p>
              <p className="font-semibold text-lg">{user.stats.eventsAttended}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg mr-3">
              <Users className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Connections</p>
              <p className="font-semibold text-lg">{user.stats.connections}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Bookings */}
      {user.upcomingBookings.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-lg">Upcoming Bookings</h2>
            <Link to="/booking" className="text-sm text-amber-600 dark:text-amber-400 font-medium">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {user.upcomingBookings.slice(0, 2).map((booking) => (
              <Link
                key={booking.id}
                to={`/booking/${booking.id}`}
                className="block p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-start">
                  <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-lg mr-3">
                    <Calendar className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{booking.title}</h3>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                      <Clock className="w-3.5 h-3.5 mr-1" />
                      <span>{new Date(booking.date).toLocaleString()}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                      <MapPin className="w-3.5 h-3.5 mr-1" />
                      <span>{booking.space}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Achievements */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-lg">Achievements</h2>
          <Link to="/profile/achievements" className="text-sm text-amber-600 dark:text-amber-400 font-medium">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {user.achievements.slice(0, 6).map((achievement) => (
            <motion.div
              key={achievement.id}
              className={`p-3 rounded-xl border ${achievement.color} text-center`}
              whileHover={{ y: -5, scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="text-2xl mb-1">{achievement.icon}</div>
              <h3 className="font-medium text-sm truncate">{achievement.title}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                {achievement.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Account Actions */}
      <div className="space-y-2">
        <Link
          to="/profile/settings"
          className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <div className="flex items-center">
            <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg mr-3">
              <Settings className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </div>
            <span>Account Settings</span>
          </div>
          <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
        >
          <div className="flex items-center">
            <div className="p-2 bg-red-50 dark:bg-red-900/30 rounded-lg mr-3">
              <LogOut className="w-5 h-5 text-red-500 dark:text-red-400" />
            </div>
            <span className="text-red-600 dark:text-red-400">Log Out</span>
          </div>
          <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
