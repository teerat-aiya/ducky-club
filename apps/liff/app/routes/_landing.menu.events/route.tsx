import { MainContent } from "./_components/MainContent";

export default function EventsRoute() {
  const mockEvents = [
    {
      id: 1,
      title: "Networking Mixer",
      date: "2023-06-15T18:00:00",
      time: "18:00 - 21:00",
      location: "Main Lounge",
      category: "networking",
      capacity: 50,
      registered: 32,
      image: "https://img.freepik.com/free-psd/horizontal-banner-template-professional-business-event_23-2149313270.jpg",
      description:
        "Join us for an evening of networking with fellow professionals.",
    },
    {
      id: 2,
      title: "Startup Workshop",
      date: "2023-06-17T14:00:00",
      time: "14:00 - 16:00",
      location: "Workshop Room 2",
      category: "workshop",
      capacity: 25,
      registered: 18,
      image: "https://img.freepik.com/free-psd/horizontal-banner-template-professional-business-event_23-2149313270.jpg",
      description: "Learn the essentials of launching your startup.",
    },
  ];

  const stats = {
    totalEvents: mockEvents.length,
    totalRegistrations: mockEvents.reduce(
      (sum, event) => sum + event.registered,
      0
    ),
    totalCapacity: mockEvents.reduce((sum, event) => sum + event.capacity, 0),
    categories: [
      { value: "all", label: "All Events", count: mockEvents.length },
      {
        value: "networking",
        label: "Networking",
        count: mockEvents.filter((e) => e.category === "networking").length,
      },
      {
        value: "workshop",
        label: "Workshops",
        count: mockEvents.filter((e) => e.category === "workshop").length,
      },
      {
        value: "social",
        label: "Social",
        count: mockEvents.filter((e) => e.category === "social").length,
      },
    ],
  };
  return (
    <div className="py-4">
      <MainContent events={mockEvents} stats={stats} />
    </div>
  );
}
