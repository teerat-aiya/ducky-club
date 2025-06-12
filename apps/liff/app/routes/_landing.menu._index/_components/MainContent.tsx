import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Users,
  MapPin,
  Clock,
  ArrowRight,
  Zap,
  Coffee,
  MessageSquare,
  Star as StarIcon,
} from "lucide-react";
import { useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";

interface MainContentProps {
  user: {
    name: string;
    points: number;
    level: string;
  };
  stats: {
    upcomingEvents: number;
    communityMembers: number;
    spacesAvailable: number;
  };
  upcomingBookings: Array<{
    id: number;
    title: string;
    date: string;
    space: string;
  }>;
}

// Animation variants for staggered children
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function MainContent({
  user,
  stats,
  upcomingBookings,
}: MainContentProps) {
  const navigate = useNavigate();
  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12
      ? "Good morning"
      : currentHour < 18
        ? "Good afternoon"
        : "Good evening";
  const greetingEmoji =
    currentHour < 12 ? "🌅" : currentHour < 18 ? "🌤️" : "🌙";
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="space-y-6 pb-24">
      {/* Welcome Banner */}
      <motion.div
        className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-6 text-white relative overflow-hidden shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        <div className="absolute top-0 right-0 w-40 h-40 bg-white bg-opacity-10 rounded-full -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white bg-opacity-5 rounded-full -ml-16 -mb-16" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-1">
            <div>
              <p className="text-indigo-100 text-sm font-medium mb-1">
                {greeting}
              </p>
              <h1 className="text-2xl md:text-3xl font-bold">
                {user.name} {greetingEmoji}
              </h1>
            </div>
            <div className="w-12 h-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
              <Zap className="w-5 h-5 text-yellow-300" fill="currentColor" />
            </div>
          </div>
          <p className="text-indigo-100/90 text-sm mt-2 mb-4">
            Welcome back to your workspace! What&apos;s on your mind today?
          </p>
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl text-sm font-medium flex items-center space-x-2">
              <StarIcon className="w-4 h-4 text-yellow-300" />
              <span>{user.points} pts</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl text-sm font-medium">
              {user.level} Tier
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        className="grid grid-cols-2 gap-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item}>
          <button
            onClick={() => navigate("/menu/events")}
            className="w-full h-full"
          >
            <div className="bg-white dark:bg-gray-800/80 backdrop-blur-sm p-4 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700/50 h-full hover:-translate-y-1">
              <div className="flex items-start justify-between">
                <div className="flex flex-col items-start">
                  <div className="p-2.5 bg-amber-100 dark:bg-amber-900/20 rounded-xl mr-3 inline-block mb-3">
                    <Calendar className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    Upcoming
                  </p>
                  <div className="font-bold text-start text-xl text-gray-800 dark:text-white">
                    <p>{stats.upcomingEvents}</p>
                    <p>Events</p>
                  </div>
                </div>
                <div className="text-amber-500 opacity-80">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </div>
          </button>
        </motion.div>

        <motion.div variants={item}>
          <button
            onClick={() => navigate("/menu/community")}
            className="block h-full"
          >
            <div className="bg-white dark:bg-gray-800/80 backdrop-blur-sm p-4 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700/50 h-full hover:-translate-y-1">
              <div className="flex items-start justify-between">
                <div className="flex flex-col items-start">
                  <div className="p-2.5 bg-blue-100 dark:bg-blue-900/20 rounded-xl mr-3 inline-block mb-3">
                    <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    Community
                  </p>
                  <div className="font-bold text-start text-xl text-gray-800 dark:text-white">
                    <p className="font-bold text-start text-xl text-gray-800 dark:text-white">
                      {stats.communityMembers}
                    </p>
                    <p className="font-bold text-start text-xl text-gray-800 dark:text-white">
                      Members
                    </p>
                  </div>
                </div>
                <div className="text-blue-500 opacity-80">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </div>
          </button>
        </motion.div>

        {/* <motion.div variants={item} className="col-span-2">
          <div className="bg-gradient-to-r from-amber-50 to-amber-50/70 dark:from-amber-900/20 dark:to-amber-900/10 p-4 rounded-2xl border border-amber-100 dark:border-amber-900/30">
            <div className="flex items-center">
              <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-xl mr-3">
                <Zap className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="font-medium text-amber-900 dark:text-amber-100">
                  Available Spaces
                </p>
                <p className="text-2xl font-bold text-amber-700 dark:text-amber-300">
                  {stats.spacesAvailable} Ready
                </p>
              </div>
            </div>
          </div>
        </motion.div> */}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        className="bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700/50"
        variants={item}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-bold text-lg text-gray-800 dark:text-white">
            Quick Actions
          </h2>
          <div className="text-xs px-2.5 py-1 bg-gray-100 dark:bg-gray-700/50 rounded-full text-gray-500 dark:text-gray-400">
            Tap to explore
          </div>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {[
            {
              icon: <Calendar className="w-5 h-5" />,
              label: "Events",
              color:
                "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
              to: "/menu/events",
            },
            {
              icon: <Users className="w-5 h-5" />,
              label: "Community",
              color:
                "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
              to: "/menu/community",
            },
            {
              icon: <Coffee className="w-5 h-5" />,
              label: "Book Space",
              color:
                "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
              to: "/booking",
            },
            {
              icon: <MessageSquare className="w-5 h-5" />,
              label: "Chat",
              color:
                "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
              to: "/menu/chat",
            },
          ].map((action, index) => (
            <motion.div
              key={action.label}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="flex-1"
            >
              <button
                onClick={() => navigate(action.to)}
                className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group w-full"
              >
                <div
                  className={`w-10 h-10 ${action.color} rounded-2xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}
                >
                  {action.icon}
                </div>
                <span className="text-xs font-medium text-center text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                  {action.label}
                </span>
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Upcoming Bookings */}
      <motion.div variants={item} className="space-y-1">
        <div className="flex items-center justify-between px-1">
          <h2 className="font-bold text-lg text-gray-800 dark:text-white">
            Upcoming Bookings
          </h2>
          <button
            onClick={() => navigate("/booking")}
            className="text-sm text-amber-600 dark:text-amber-400 font-medium flex items-center group"
          >
            View all
            <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        <AnimatePresence>
          {upcomingBookings.length > 0 ? (
            <div className="space-y-2">
              {upcomingBookings.map((booking, index) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ y: -2 }}
                >
                  <button
                    onClick={() => navigate(`/booking/${booking.id}`)}
                    className="w-full p-4 bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-700/50 transition-all duration-300 group"
                  >
                    <div className="flex items-start">
                      <div className="bg-amber-100 dark:bg-amber-900/20 p-2.5 rounded-xl mr-3 flex-shrink-0">
                        <Calendar className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                            {booking.title}
                          </h3>
                          <span className="ml-2 px-2 py-0.5 text-xs bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full">
                            {new Date(booking.date).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                          <MapPin className="w-3.5 h-3.5 mr-1.5 flex-shrink-0" />
                          <span className="truncate">{booking.space}</span>
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center text-xs text-amber-600 dark:text-amber-400 font-medium">
                            <Clock className="w-3.5 h-3.5 mr-1" />
                            {new Date(booking.date).toLocaleDateString(
                              undefined,
                              {
                                weekday: "short",
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </div>
                          <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  </button>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              className="bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 text-center border border-dashed border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Calendar className="w-8 h-8 mx-auto text-gray-400 mb-2" />
              <h3 className="font-medium text-gray-700 dark:text-gray-300">
                No upcoming bookings
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Book a space to get started
              </p>
              <button
                onClick={() => navigate("/booking")}
                className="mt-4 inline-flex items-center justify-center px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium rounded-lg transition-colors"
              >
                <MapPin className="w-4 h-4 mr-2" />
                Book Now
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
