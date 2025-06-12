import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { MainContent } from "./_components/MainContent";

// export const loader = async () => {
//   // TODO: Replace with actual data fetching
//   const mockData = {
//     user: {
//       name: 'John Doe',
//       points: 1250,
//       level: 'Gold',
//     },
//     stats: {
//       upcomingEvents: 3,
//       communityMembers: 42,
//       spacesAvailable: 5,
//     },
//     upcomingBookings: [
//       { id: 1, title: 'Team Meeting', date: '2023-06-15T14:00:00', space: 'Meeting Room A' },
//       { id: 2, title: 'Workshop', date: '2023-06-16T10:00:00', space: 'Workshop Room 1' },
//     ],
//   };
//   return json(mockData);
// };

export default function DashboardRoute() {
  const mockData = {
    user: {
      name: "John Doe",
      points: 1250,
      level: "Gold",
    },
    stats: {
      upcomingEvents: 3,
      communityMembers: 42,
      spacesAvailable: 5,
    },
    upcomingBookings: [
      {
        id: 1,
        title: "Team Meeting",
        date: "2023-06-15T14:00:00",
        space: "Meeting Room A",
      },
      {
        id: 2,
        title: "Workshop",
        date: "2023-06-16T10:00:00",
        space: "Workshop Room 1",
      },
    ],
  };
  return (
    <div className="p-4">
      <MainContent {...mockData} />
    </div>
  );
}
