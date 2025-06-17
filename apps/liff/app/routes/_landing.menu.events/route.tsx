import { MainContent } from "./_components/MainContent";

export default function EventsRoute() {
  const mockEvents = [
    {
      id: 1,
      title: "AI Business Ignite Bangkok",
      date: "2025-06-17T00:00:00",
      time: "13:00 - 18:00",
      location: "Ducky Duck Innovative Space",
      category: "seminar",
      status: "ongoing",
      capacity: 40,
      registered: 37,
      image: "/asset/images/AI_Business_Ignite_1.jpg",
      description:
        'Register for N8N seminar with อาจารย์หนึ่ง สิทธิ เทียมเมฆา 🔥 ปลุกพลัง Automation ในตัวคุณ! 🔥 เตรียมพบกับปรากฏการณ์ใหม่แห่งวงการ N8N',
      to: "https://lu.ma/x8vaz2vf",
      owner: "Ignite Club",
      ownerPic: "/asset/images/logo_Ignite_club.png",
    },
    {
      id: 2,
      title: "AiBots Creator #10th",
      date: "2025-06-24T00:00:00",
      time: "13:30 - 17:30",
      location: "Ducky Duck Innovative Space",
      category: "workshop",
      status: "upcoming",
      capacity: 40,
      registered: 0,
      image: "/asset/images/AIBOTS_Creator_10_16_9.jpg",
      description:
        '🚀 ปลดล็อกศักยภาพธุรกิจด้วย AI! สร้าง Chatbot ขั้นเทพ...ไม่ใช้โค้ด! ✨',
      to: "https://lu.ma/gdsha5mr",
      owner: "Ignite Club",
      ownerPic: "/asset/images/logo_Ignite_club.png",
    },
  ];

  const categories = [
    { id: "all", name: "All Events" },
    { id: "seminar", name: "Seminar" },
    { id: "workshop", name: "Workshops" },
    { id: "conference", name: "Conferences" },
    { id: "social", name: "Social" },
    { id: "networking", name: "Networking" },
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
      <MainContent events={mockEvents} categories={categories} stats={stats} />
    </div>
  );
}
