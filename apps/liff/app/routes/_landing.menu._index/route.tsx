import { useLineProfile } from "~/contexts/LineLiffContext";
import { MainContent } from "./_components/MainContent";
import { Loading } from "@repo/preline";

interface RouteProps {}

const Route: React.FC<RouteProps> = () => {
  const { data: profile, isLoading: isProfileLoading } = useLineProfile();
  const mockData = {
    stats: {
      upcomingEvents: 1,
      communityMembers: 565,
      spacesAvailable: 5,
    },
    upcomingEvents: [
      {
        id: 1,
        title: "AiBots Creator #10th",
        date: "2025-06-24T13:30:00",
        space: "Ducky Duck Innovative Space",
        to: "https://lu.ma/gdsha5mr",
      },
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
