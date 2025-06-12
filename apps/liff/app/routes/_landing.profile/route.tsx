import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Profile } from './components/Profile';

// TODO: Replace with actual data fetching
export const loader = async () => {
  const mockUser = {
    displayName: 'Alex Johnson',
    pictureUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces',
    statusMessage: 'Building the future of workspaces',
    email: 'alex.johnson@example.com',
    joinDate: '2022-01-15',
    membershipLevel: 'Gold',
    points: 1250,
    nextLevelPoints: 1500,
    levelProgress: 83,
    stats: {
      hoursSpent: 247,
      bookings: 42,
      eventsAttended: 18,
      connections: 87,
    },
    upcomingBookings: [
      { id: 1, title: 'Team Meeting', date: '2023-06-15T14:00:00', space: 'Meeting Room A' },
      { id: 2, title: 'Workshop', date: '2023-06-16T10:00:00', space: 'Workshop Room 1' },
    ],
    achievements: [
      { id: 1, title: 'Early Bird', description: 'First to arrive 5 times', icon: '🏆', color: 'bg-amber-50 border-amber-200' },
      { id: 2, title: 'Productive', description: '100+ hours worked', icon: '💼', color: 'bg-blue-50 border-blue-200' },
      { id: 3, title: 'Networker', description: '10+ connections made', icon: '🤝', color: 'bg-green-50 border-green-200' },
      { id: 4, title: 'Learner', description: '5+ workshops attended', icon: '🎓', color: 'bg-purple-50 border-purple-200' },
      { id: 5, title: 'Eco Warrior', description: '100kg CO₂ saved', icon: '🌱', color: 'bg-emerald-50 border-emerald-200' },
      { id: 6, title: 'Community Star', description: '20+ helpful posts', icon: '⭐', color: 'bg-yellow-50 border-yellow-200' }
    ]
  };

  return json({ user: mockUser });
};

export default function ProfileRoute() {
  const data = useLoaderData<typeof loader>();
  return <Profile {...data} />;
}
