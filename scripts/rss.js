import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";
import matter from "gray-matter";
import fs from "fs";

async function process(data) {
  const text = matter(data);
  const content = text.content;
  const meta = text.data;

  const file = await unified()
    .use(remarkParse)
    .use(remarkHtml)
    .process(content);

  return {
    title: meta.title,
    description: meta.description,
    published: meta.date,
    updated: meta.date,
    category: meta.tags,
    content: file,
  };
}

async function xmlItem(file, options) {
  const url =
    options.postsUrl + "/" + file.title.toLowerCase().replaceAll(" ", "-");
  return `
  <entry>
    <title type="html">
      ${file.title}
    </title>
    <link
      href="${url}"
      rel="alternate"
      type="text/html"
      title="${file.title}"
    />
    <published>${file.published}T00:00:00+00:00</published>
    <updated>${file.updated}T00:00:00+00:00</updated>
    <id>${url}</id>
    <content type="html" xml:base="${url}">
      ${file.content}
    </content>
    <author>
      <name>${options.author.name}</name>
      <email>${options.author.email}</email>
    </author>
    ${file.category.map((c) => `<category>${c}"</category>`).join("")}
    <summary type="html" />
  </entry>
  `;
}

async function xmlFeed(items, updated, options) {
  return `
<?xml version="1.0" encoding="utf-8"?>
<feed>
  <link
    href="${options.feedUrl}"
    rel="self"
    type="application/atom+xml"
  />
  <link href="${options.postsUrl}" rel="alternate" type="text/html" />
  <updated>${updated}T00:00:00+00:00</updated>
  <id>${options.feedUrl}</id>
  <title type="html">${options.title}</title>
  <author>
    <name>${options.author.name}</name>
    <email>${options.author.email}</email>
  </author>
  ${items.join("")}
</feed>
  `;
}

async function main() {
  const files = fs.readdirSync("posts", { withFileTypes: true });
  const options = {
    title: "Axel Lundberg",
    feedUrl: "https://axellundberg.se/feed.xml",
    postsUrl: "https://axellundberg.se/posts",
    author: {
      name: "Axel Lundberg",
      email: "",
    },
  };

  const items = [];
  let updated = "";

  for (const file of files) {
    const data = fs.readFileSync(`posts/${file.name}`, "utf8");
    const fileData = await process(data);
    const xml = await xmlItem(fileData, options);
    if (updated === "") updated = fileData.updated;
    else {
      const value = updated.localeCompare(fileData.updated);
      if (value < 0) updated = fileData.updated;
    }

    items.push(xml);
  }

  const xml = await xmlFeed(items, updated, options);
  fs.writeFileSync("out/feed.xml", xml, "utf8");
}

main();
