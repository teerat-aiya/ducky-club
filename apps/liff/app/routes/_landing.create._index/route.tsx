import React from "react";
import MainContent from "./_components/MainContent";

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
