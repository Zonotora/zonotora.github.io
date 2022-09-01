import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { getPostBySlug, getAllPosts } from "../lib/api";
import type PostType from "../interfaces/post";

type Props = {
  post: PostType;
};

const Home: NextPage = () => {
  return (
    <div>
      <Link href="/posts">Posts</Link>
      <Link href="/mindpalace">Mindpalace</Link>
      <Link href="/sketches">Sketches</Link>
    </div>
  );
};

export default Home;
