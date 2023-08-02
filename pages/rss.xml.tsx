import { GetServerSideProps } from "next";
import React from "react";
import content from "../data/rss.xml";

const Sitemap: React.FC = () => null;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  if (res) {
    res.setHeader("Content-Type", "text/xml");
    res.write(
      `<?xml version="1.0" encoding="UTF-8"?>
      ${content}
      `
    );
    res.end();
  }
  return {
    props: {},
  };
};

export default Sitemap;
