import { MainContent } from './components/MainContent';

export default function CommunityRoute() {
  const mockPosts = [
    {
      id: 1,
      user: {
        name: 'Alex Johnson',
        role: 'Community Manager',
        avatar: '/images/avatars/alex.jpg',
        isVerified: true
      },
      content: 'Just launched our new community guidelines! Please take a moment to review them.',
      type: 'announcement',
      timestamp: '2023-06-10T14:30:00',
      likes: 24,
      comments: 5,
      isLiked: false
    },
    {
      id: 2,
      user: {
        name: 'Sam Wilson',
        role: 'Member',
        avatar: '/images/avatars/sam.jpg',
        isVerified: false
      },
      content: 'Looking for recommendations for a good co-working space in downtown. Any suggestions?',
      type: 'question',
      timestamp: '2023-06-09T09:15:00',
      likes: 8,
      comments: 12,
      isLiked: true
    },
    // Add more mock posts as needed
  ];

  const stats = {
    totalMembers: 1243,
    activeToday: 87,
    newThisWeek: 32,
    postFilters: [
      { value: 'all', label: 'All Posts', count: mockPosts.length },
      { value: 'announcement', label: 'Announcements', count: mockPosts.filter(p => p.type === 'announcement').length },
      { value: 'question', label: 'Questions', count: mockPosts.filter(p => p.type === 'question').length },
      { value: 'achievement', label: 'Achievements', count: mockPosts.filter(p => p.type === 'achievement').length },
      { value: 'text', label: 'General', count: mockPosts.filter(p => p.type === 'text').length }
    ]
  };
  return <div className="p-4">
    <MainContent posts={mockPosts} stats={stats} />
  </div>;
}
