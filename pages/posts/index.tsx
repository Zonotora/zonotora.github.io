import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { getAllPosts } from "../../lib/api";
import Post from "../../interfaces/post";
import Posts from "../../components/posts";

type Props = {
  posts: Post[];
};

export const Home = ({ posts }: Props) => {
  return (
    <div className="main">
      <Posts posts={posts} count={99} />
    </div>
  );
};

export const getStaticProps = async () => {
  const posts = getAllPosts(["title", "date", "slug"]);

  return {
    props: { posts },
  };
};

export default Home;
