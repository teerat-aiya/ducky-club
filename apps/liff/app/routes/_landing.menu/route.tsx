import { Outlet } from "@remix-run/react";
import BottomBar from "./_components/BottomBar";
import Header from "./_components/Header";
import { Loading } from "@repo/preline";
import { useLineProfile } from "~/contexts/LineLiffContext";

const Route = () => {
  const { data: profile, isLoading: isProfileLoading } = useLineProfile();

  if (isProfileLoading) {
    return (
      <div className="h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header profile={profile} />
      <main id="content">
        <div className="h-full">
          <Outlet />
        </div>
      </main>
      <BottomBar />
      {/* <Footer /> */}
    </div>
  );
};

export default Route;
