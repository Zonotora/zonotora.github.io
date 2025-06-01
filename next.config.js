/** @type {import('next').NextConfig} */
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import rehypeToc from "rehype-toc";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import remarkPrism from "remark-prism";
import mdx from "@next/mdx";
import remarkCitation from "./plugins/remark-citation.ts";
import remarkHeadingHr from "./plugins/remark-heading-hr.ts";
import remarkReference from "./plugins/remark-reference.ts";

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    loader: "akamai",
    path: "",
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/about",
        permanent: false,
      },
    ];
  },
};

const withMDX = mdx({
  options: {
    remarkPlugins: [
      remarkGfm,
      remarkMath,
      remarkPrism,
      remarkCitation,
      remarkReference,
      remarkHeadingHr,
    ],
    rehypePlugins: [rehypeKatex, rehypeSlug, rehypeToc],
  },
});

export default withMDX({
  ...nextConfig,
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
});
