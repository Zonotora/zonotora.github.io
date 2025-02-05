import { useEffect } from "react";
import Router from "next/router";
import Page from "../components/page";

export const Home = () => {
  useEffect(() => {
    const { pathname } = Router;

    if (pathname == "/") {
      location.replace("/posts");
    }
  }, []);

  return <Page active=""></Page>;
};

export default Home;
