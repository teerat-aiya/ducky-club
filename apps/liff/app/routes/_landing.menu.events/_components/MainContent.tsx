import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { useNavigate, useSearchParams } from "@remix-run/react";
import { useLineProfile } from "~/contexts/LineLiffContext";
import { Loading } from "@repo/preline";

type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  image: string;
  capacity: number;
  registered: number;
  status: "upcoming" | "ongoing" | "completed";
  owner: string;
  ownerPic: string;
  to: string;
};

type EventStats = {
  totalEvents: number;
  totalRegistrations: number;
  totalCapacity: number;
  upcomingEvents: number;
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

interface MainContentProps {
  events: Event[];
  categories: string[];
  stats: EventStats;
}

export function MainContent({ events, categories, stats }: MainContentProps) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const controls = useAnimation();
  const { data: profile, isLoading: isProfileLoading } = useLineProfile();

  // Sync state with URL params, defaulting to "all" / empty
  useEffect(() => {
    const categoryParam = searchParams.get("category") ?? "all";
    const searchParam = searchParams.get("search") ?? "";
    setSelectedCategory(categoryParam);
    setSearchQuery(searchParam);
  }, [searchParams]);

  // Filter + sort
  const filteredEvents = useMemo(() => {
    return events
      .filter((event) => {
        const matchesCategory =
          selectedCategory === "all" || event.category === selectedCategory;
        const matchesSearch =
          !searchQuery ||
          event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.location.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [events, selectedCategory, searchQuery]);

  useEffect(() => {
    controls.start("show");
  }, [controls, filteredEvents]);

  const registrationRate =
    stats.totalCapacity > 0
      ? Math.round(
          (stats.totalRegistrations / Math.max(stats.totalCapacity, 1)) * 100
        )
      : 0;

  // Handle category select -> update state + URL
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    const newParams = new URLSearchParams(searchParams.toString());
    if (category === "all") newParams.delete("category");
    else newParams.set("category", category);
    setSearchParams(newParams, { replace: true });
    controls.start("show");
  };

  // Debounced search -> update URL
  useEffect(() => {
    const id = setTimeout(() => {
      const newParams = new URLSearchParams(searchParams.toString());
      if (!searchQuery.trim()) newParams.delete("search");
      else newParams.set("search", searchQuery.trim());
      setSearchParams(newParams, { replace: true });
    }, 300);
    return () => clearTimeout(id);
  }, [searchQuery, searchParams, setSearchParams]);

  const handleRedirect = (url: string) => {
    // runs any logic, then:
    window.location.href = url;
  };

  if (isProfileLoading)
    return (
      <div className="h-screen">
        <Loading />
      </div>
    );

  return (
    <div className="space-y-6 pb-24">
      {/* Header */}

      <div className="px-4 space-y-4">
        <motion.div
          className="px-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            Community Events
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Connect, learn, and grow with fellow members
          </p>
        </motion.div>

        {/* Search and Filter */}
        {/* <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div> */}
        {/* Stats Banner */}
        <motion.div
          className="bg-gradient-to-br from-primary to-primary-dark dark:from-primary-dark dark:to-primary rounded-2xl p-6 text-white relative overflow-hidden shadow-lg mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 dark:bg-black/20 rounded-full -mr-10 -mt-10" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/20 dark:bg-black/20 rounded-full -ml-10 -mb-6" />
          <div className="relative z-10">
            <div className="grid grid-cols-3 gap-4">
              <motion.div
                variants={item}
                className="bg-white/20 dark:bg-black/20 backdrop-blur-sm p-4 rounded-xl hover:bg-white/30 dark:hover:bg-black/30 transition-colors duration-200"
              >
                <div className="text-2xl font-bold text-white">
                  {stats.totalEvents}
                </div>
                <div className="text-sm text-white/90 mt-1">Total Events</div>
              </motion.div>
              <motion.div
                variants={item}
                className="bg-white/20 dark:bg-black/20 backdrop-blur-sm p-4 rounded-xl hover:bg-white/30 dark:hover:bg-black/30 transition-colors duration-200"
                transition={{ delay: 0.1 }}
              >
                <div className="text-2xl font-bold text-white">
                  {stats.totalRegistrations}
                </div>
                <div className="text-sm text-white/90 mt-1">Participants</div>
              </motion.div>
              <motion.div
                variants={item}
                className="bg-white/20 dark:bg-black/20 backdrop-blur-sm p-4 rounded-xl hover:bg-white/30 dark:hover:bg-black/30 transition-colors duration-200"
                transition={{ delay: 0.2 }}
              >
                <div className="text-2xl font-bold text-white">
                  {registrationRate}%
                </div>
                <div className="text-sm text-white/90 mt-1">
                  Registration Rate
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
      {/* Category Tabs */}
      <div className="mb-6">
        <div
          className=" flex overflow-x-auto  pb-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div className="mx-4 flex space-x-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(category.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category.id
                    ? "bg-primary text-white shadow-md"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {category.name} ({events.filter((e) => e.category === category.id || category.id === "all").length})
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="px-4">
        {/* Events Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <motion.div
                  key={event.id}
                  variants={item}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                  whileHover={{ y: -5 }}
                  layout
                >
                  <div className="relative aspect-video bg-gray-200 dark:bg-gray-700">
                    <img
                      src={event.image || "/images/event-placeholder.jpg"}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-0 right-0 p-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          event.status === "upcoming"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                            : event.status === "ongoing"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {event.status
                          ? event.status.charAt(0).toUpperCase() +
                            event.status.slice(1)
                          : "Event"}
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <span className={`inline-flex items-center space-x-3`}>
                        <img
                          className="shrink-0 size-9 sm:size-12 bg-white ring-2 ring-white rounded-full"
                          src={event.ownerPic}
                          alt="Avatar"
                        />
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-white">
                            {event.owner}
                          </span>
                          <span className="text-xs text-gray-200">Creator</span>
                        </div>
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2">
                        {event.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                      {event.description}
                    </p>

                    <div className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>
                          {new Date(event.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span className="truncate">{event.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span>{event.registered}/{event.capacity} registered</span>
                      </div>
                      <div className="pt-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span>{event.registered < event.capacity ? "Registration Progress" : "Full"}</span>
                          <span>
                            {event.capacity - event.registered} spots left
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{
                              width: `${Math.min(100, (event.registered / event.capacity) * 100)}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <button
                        onClick={() => handleRedirect(event.to)}
                        className="w-full inline-flex justify-center items-center px-4 py-3 border border-transparent rounded-xl shadow-md text-sm font-medium text-white bg-primary focus:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
                      >
                        Register Now
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                className="col-span-full text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
                  <svg
                    className="w-full h-full"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                  No events found
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {searchQuery || selectedCategory !== "all"
                    ? "Try adjusting your search or filter criteria."
                    : "Check back later for upcoming events."}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Floating Action Button */}
        {/* <motion.div
          className="fixed bottom-6 right-6 z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to="/events/new"
            className="w-14 h-14 rounded-full bg-primary hover:bg-blue-700 text-white shadow-lg flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <Plus className="h-6 w-6" />
            <span className="sr-only">Create Event</span>
          </Link>
        </motion.div> */}
      </div>
    </div>
  );
}
