import { useLineProfile } from "~/contexts/LineLiffContext";
import { MainContent } from "./_components/MainContent";
import { Loading } from "@repo/preline";

interface RouteProps {}

const Route: React.FC<RouteProps> = () => {
  const { data: profile, isLoading: isProfileLoading } = useLineProfile();
  const mockData = {
    stats: {
      upcomingEvents: 3,
      communityMembers: 42,
      spacesAvailable: 5,
    },
    upcomingEvents: [
      // {
      //   id: 1,
      //   title: "AI Business Ignite Bangkok",
      //   date: "2025-06-17T00:00:00",
      //   space: "Ducky Duck Innovative Space",
      // },
    ],
  };

  if (isProfileLoading) {
    return (
      <div className="h-screen">
        <Loading />
      </div>
    );
  }
  return (
    <div className="p-4">
      <MainContent {...mockData} profile={profile} />
    </div>
  );
};

export default Route;
