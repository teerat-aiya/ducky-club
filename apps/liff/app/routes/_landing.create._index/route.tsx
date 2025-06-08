import React from "react";
import MainContent from "./components/MainContent";

interface routeProps {}

const route: React.FC<routeProps> = () => {
  // const { isAuthenticated } = useAppSelector((state) => state.auth);
  

  return (
    <>
      <MainContent />
    </>
  );
};

export default route;
