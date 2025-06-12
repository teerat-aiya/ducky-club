import { Booking } from "./components/Booking";

export default function BookingRoute() {
  const mockSpaces = [
    {
      id: "1",
      name: "Meeting Room A",
      type: "meeting_room",
      capacity: 6,
      hourlyRate: 25,
      rating: 4.7,
      reviewCount: 42,
      isAvailable: true,
      amenities: ["TV", "Whiteboard", "Video Call"],
      image: "/images/spaces/meeting-room-a.jpg",
      location: "2nd Floor, Wing A",
    },
    {
      id: "2",
      name: "Focus Pod 3",
      type: "focus_pod",
      capacity: 1,
      hourlyRate: 15,
      rating: 4.9,
      reviewCount: 36,
      isAvailable: true,
      amenities: ["Noise-canceling", "Adjustable Desk"],
      image: "/images/spaces/focus-pod-3.jpg",
      location: "3rd Floor, Quiet Zone",
    },
    {
      id: "3",
      name: "Lounge Area",
      type: "lounge",
      capacity: 12,
      hourlyRate: 0,
      rating: 4.5,
      reviewCount: 28,
      isAvailable: true,
      amenities: ["Casual Seating", "Coffee Station"],
      image: "/images/spaces/lounge.jpg",
      location: "Ground Floor",
    },
    {
      id: "4",
      name: "Phone Booth 2",
      type: "phone_booth",
      capacity: 1,
      hourlyRate: 0,
      rating: 4.8,
      reviewCount: 19,
      isAvailable: false,
      amenities: ["Soundproof", "Charging Station"],
      image: "/images/spaces/phone-booth-2.jpg",
      location: "2nd Floor, Near Elevators",
    },
    {
      id: "5",
      name: "Event Space",
      type: "event_space",
      capacity: 50,
      hourlyRate: 100,
      rating: 4.6,
      reviewCount: 31,
      isAvailable: true,
      amenities: ["Projector", "Catering", "Stage"],
      image: "/images/spaces/event-space.jpg",
      location: "1st Floor, Main Hall",
    },
    {
      id: "6",
      name: "Hot Desk",
      type: "desk",
      capacity: 1,
      hourlyRate: 10,
      rating: 4.3,
      reviewCount: 24,
      isAvailable: true,
      amenities: ["Power Outlets", "Monitor"],
      image: "/images/spaces/hot-desk.jpg",
      location: "3rd Floor, Open Space",
    },
  ];

  const spaceTypes = [
    { value: "all", label: "All Spaces", count: mockSpaces.length },
    {
      value: "desk",
      label: "Desks",
      count: mockSpaces.filter((s) => s.type === "desk").length,
    },
    {
      value: "meeting_room",
      label: "Meeting Rooms",
      count: mockSpaces.filter((s) => s.type === "meeting_room").length,
    },
    {
      value: "phone_booth",
      label: "Phone Booths",
      count: mockSpaces.filter((s) => s.type === "phone_booth").length,
    },
    {
      value: "focus_pod",
      label: "Focus Pods",
      count: mockSpaces.filter((s) => s.type === "focus_pod").length,
    },
    {
      value: "event_space",
      label: "Event Spaces",
      count: mockSpaces.filter((s) => s.type === "event_space").length,
    },
    {
      value: "lounge",
      label: "Lounges",
      count: mockSpaces.filter((s) => s.type === "lounge").length,
    },
  ];

  const availableSpaces = mockSpaces.filter((s) => s.isAvailable).length;
  const occupancyRate = Math.round(
    ((mockSpaces.length - availableSpaces) / mockSpaces.length) * 100
  );

  return (
    <Booking
      spaces={mockSpaces}
      spaceTypes={spaceTypes}
      stats={{
        totalSpaces: mockSpaces.length,
        availableSpaces,
        occupancyRate,
      }}
      sortOptions={[
        { value: "name", label: "Name (A-Z)" },
        { value: "price", label: "Price (Low to High)" },
        { value: "rating", label: "Highest Rated" },
        { value: "capacity", label: "Capacity" },
      ]}
    />
  );
}
