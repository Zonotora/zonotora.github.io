import { useEffect } from "react";
import Router from "next/router";
import Header from "../components/header";

export const Home = () => {
  useEffect(() => {
    const { pathname } = Router;

    if (pathname == "/") {
      location.replace("/posts");
    }
  }, []);

  return (
    <div className="main">
      <Header active="" />
    </div>
  );
};

export default Home;
