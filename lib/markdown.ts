import rehypeKatex from "rehype-katex";
import rehypeStringify from "rehype-stringify";
import rehypeSlug from "rehype-slug";
import rehypeToc from "rehype-toc";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import remarkPrism from "remark-prism";
import { unified } from "unified";

export default async function markdownToHtml(markdown: string) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkMath)
    .use(remarkPrism)
    .use(remarkRehype)
    .use(rehypeKatex)
    .use(rehypeStringify)
    .use(rehypeSlug)
    .use(rehypeToc)
    .process(markdown);

  return result.toString();
}
