import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Plus, Users, Camera, Paperclip, Filter } from 'lucide-react';
import { Link } from '@remix-run/react';

interface User {
  name: string;
  role: string;
  avatar: string;
  isVerified: boolean;
}

interface Post {
  id: number;
  user: User;
  content: string;
  type: string;
  timestamp: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  image?: string;
}

interface CommunityProps {
  posts: Post[];
  stats: {
    totalMembers: number;
    activeToday: number;
    newThisWeek: number;
    postFilters: Array<{
      value: string;
      label: string;
      count: number;
    }>;
  };
}

export function Community({ posts, stats }: CommunityProps) {
  const [newPost, setNewPost] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const handleCreatePost = () => {
    if (newPost.trim()) {
      // In a real app, this would dispatch an action to create a post
      console.log('Creating post:', newPost);
      setNewPost('');
    }
  };

  const filteredPosts = posts.filter(post => 
    selectedFilter === 'all' || post.type === selectedFilter
  );

  return (
    <div className="space-y-6 pb-6">
      {/* Header */}
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Community Feed</h2>
        <p className="text-gray-600">Connect with fellow members and share updates</p>
      </motion.div>

      {/* Community Stats */}
      <motion.div 
        className="grid grid-cols-3 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <motion.div 
          className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm text-center"
          whileHover={{ y: -2 }}
        >
          <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{stats.totalMembers}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Total Members</div>
        </motion.div>
        <motion.div 
          className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm text-center"
          whileHover={{ y: -2 }}
        >
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.activeToday}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Active Today</div>
        </motion.div>
        <motion.div 
          className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm text-center"
          whileHover={{ y: -2 }}
        >
          <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">{stats.newThisWeek}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">New This Week</div>
        </motion.div>
      </motion.div>

      {/* Create Post */}
      <motion.div 
        className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0" />
          <div className="flex-1">
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full border-0 focus:ring-0 resize-none text-gray-900 dark:text-white bg-transparent placeholder-gray-400 dark:placeholder-gray-500"
              rows={2}
            />
            <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700">
              <div className="flex space-x-2">
                <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                  <Camera className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                  <Paperclip className="w-5 h-5" />
                </button>
              </div>
              <button
                onClick={handleCreatePost}
                disabled={!newPost.trim()}
                className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                  newPost.trim()
                    ? 'bg-amber-500 text-white hover:bg-amber-600'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                }`}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Post Filters */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 -mx-4 px-4">
        <Filter className="w-4 h-4 text-gray-500 dark:text-gray-400 flex-shrink-0" />
        {stats.postFilters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setSelectedFilter(filter.value)}
            className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap ${
              selectedFilter === filter.value
                ? 'bg-amber-500 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            {filter.label} ({filter.count})
          </button>
        ))}
      </div>

      {/* Posts */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <motion.div
                key={post.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-1">
                      <h3 className="font-medium text-gray-900 dark:text-white truncate">
                        {post.user.name}
                      </h3>
                      {post.user.isVerified && (
                        <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23 12l-2.44-2.79.34-3.69-3.61-.82-1.89-3.2L12 3 8.6 1.54 6.71 4.75l-3.61.81.34 3.7L1 12l2.44 2.79-.34 3.7 3.61.82 1.89 3.2L12 21l3.4 1.46 1.89-3.2 3.61-.82-.34-3.69L23 12zm-12.91 4.72l-3.8-3.81 1.48-1.48 2.32 2.33 5.85-5.87 1.48 1.48-7.33 7.35z" />
                        </svg>
                      )}
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        • {new Date(post.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{post.user.role}</p>
                    <p className="mt-2 text-gray-800 dark:text-gray-200">{post.content}</p>
                    {post.image && (
                      <div className="mt-3 rounded-lg overflow-hidden">
                        <img
                          src={post.image}
                          alt="Post content"
                          className="w-full h-auto rounded-lg"
                        />
                      </div>
                    )}
                    <div className="mt-3 flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                      <button className="flex items-center space-x-1 hover:text-amber-500">
                        <svg
                          className={`w-5 h-5 ${post.isLiked ? 'text-red-500 fill-current' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                        <span>{post.likes}</span>
                      </button>
                      <button className="flex items-center space-x-1 hover:text-amber-500">
                        <MessageSquare className="w-5 h-5" />
                        <span>{post.comments}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              className="text-center py-10 text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              No posts found in this category.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
