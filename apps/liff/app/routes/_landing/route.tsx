import { Outlet } from "@remix-run/react";
import { useEffect } from "react";
import { useLineLiff } from "~/contexts/LineLiffContext";
import { Loading } from "@repo/preline";

const Route = () => {
  const { isLoggedIn, login, isInitialized } =
    useLineLiff();
  // const authen = useLogin();
  // const { data: profile, isLoading, error } = useLineProfile();

  useEffect(() => {
    if (isInitialized) {
      if (!isLoggedIn) {
        login({
          redirectUri: window.location.href,
        }).catch((err) => {
          console.error(err);
        });
      } else {
        console.log("LIFF is already logged in");
        
        // authen.mutateAsync({ IDToken: liff?.getIDToken() || "" });
      }
    }
  }, [isInitialized]);

  if (!isLoggedIn) {
    return (
      <div className="h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <main id="content">
        <Outlet />
      </main>
      {/* <Footer /> */}
    </>
  );
};

export default Route;

const getImageFileFromURL = async (url: string) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const blob = await response.blob();

    const file = new File([blob], "profile.jpg", { type: blob.type });

    return file;
  } catch (error) {
    console.error("Error fetching the image:", error);
  }
};
