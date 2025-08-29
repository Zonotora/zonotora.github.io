import fs from "fs";
import path from "path";

async function process(key, data) {
  const text = fs.readFileSync("data/metadata.json");
  const metadata = JSON.parse(text);
  let title = "title";
  let date = "";
  let desc = "description";
  if (key in metadata) {
    title = metadata[key].title;
    date = metadata[key].date;
  }
  return {
    title: title,
    description: desc,
    published: date,
    updated: date,
    category: [],
    content: data,
  };
}

async function xmlItem(file, options) {
  const url =
    options.blogUrl + "/" + file.title.toLowerCase().replaceAll(" ", "-");
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
  return `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <link
    href="${options.feedUrl}"
    rel="self"
    type="application/atom+xml"
  />
  <link href="${options.blogUrl}" rel="alternate" type="text/html" />
  <updated>${updated}T00:00:00+00:00</updated>
  <id>${options.feedUrl}</id>
  <title type="html">${options.title}</title>
  <author>
    <name>${options.author.name}</name>
    <email>${options.author.email}</email>
  </author>
  ${items.join("")}
</feed>`;
}

async function main() {
  const files = fs.readdirSync("pages/blog", { withFileTypes: true });
  const options = {
    title: "Axel Lundberg",
    feedUrl: "https://zonotora.github.io/feed.xml",
    blogUrl: "https://zonotora.github.io/blog",
    author: {
      name: "Axel Lundberg",
      email: "",
    },
  };

  const items = [];
  let updated = "";

  for (const file of files) {
    const data = fs.readFileSync(`pages/blog/${file.name}`, "utf8");
    const extname = path.extname(file.name);
    if (extname !== ".md" && extname !== ".mdx") continue;
    const key = `blog/${file.name.replace(/\.mdx$/, "")}`;
    const fileData = await process(key, data);
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
