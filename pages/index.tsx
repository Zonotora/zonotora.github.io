import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { getAllPosts } from "../lib/api";
import PostType from "../interfaces/post";
import Posts from "../components/posts";

type Props = {
  posts: PostType[];
};

export const Home = ({ posts }: Props) => {
  return (
    <div className="main">
      <Link href="/posts">Posts</Link>
      <Link href="/mindpalace">Mindpalace</Link>
      <Link href="/sketches">Sketches</Link>

      <Posts posts={posts} count={3} />
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
