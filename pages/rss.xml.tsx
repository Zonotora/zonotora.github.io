import { GetServerSideProps } from "next";
import React from "react";
import feed from "../data/rss.json";

const Sitemap: React.FC = () => null;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  if (res) {
    res.setHeader("Content-Type", "text/xml");
    res.write(
      `<?xml version="1.0" encoding="UTF-8"?>
      ${feed.xml}
      `
    );
    res.end();
  }
  return {
    props: {},
  };
};

export default Sitemap;
