import React from "react";
import { useParams } from "@remix-run/react";
import MainContent from "./_components/MainContent";

interface RouteProps {}

const Route: React.FC<RouteProps> = () => {
  const { id } = useParams();

  return (
    <>
      <MainContent eventId={id} />
    </>
  );
};

export default Route;
