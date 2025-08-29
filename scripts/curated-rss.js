import fs from "fs";

async function xmlItem(post) {
  return `
  <entry>
    <title type="html">
      ${post.title}
    </title>
    <link
      href="${post.link}"
      rel="alternate"
      type="text/html"
      title="${post.title}"
    />
    <published>${post.published}T00:00:00+00:00</published>
    <updated>${post.updated}T00:00:00+00:00</updated>
    <id>${post.link}</id>
    <content type="html" xml:base="${post.link}">
      ${post.description}
    </content>
    <author>
      <name>${post.author}</name>
    </author>
    ${post.category.map((c) => `<category>${c}</category>`).join("")}
    <summary type="html">${post.description}</summary>
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
  <subtitle>${options.description}</subtitle>
  ${items.join("")}
</feed>`;
}

async function main() {
  const curatedData = fs.readFileSync("data/curated.json", "utf8");
  const posts = JSON.parse(curatedData);

  const options = {
    title: "Axel Lundberg - Curated Posts",
    description: "A curated collection of interesting blog posts and articles",
    feedUrl: "https://zonotora.github.io/curated-feed.xml",
    blogUrl: "https://zonotora.github.io",
    author: {
      name: "Axel Lundberg",
      email: "",
    },
  };

  const items = [];
  let updated = "";

  posts.sort((a, b) => b.published.localeCompare(a.published));

  for (const post of posts) {
    const xml = await xmlItem(post);

    // Track the most recent update date
    if (updated === "") {
      updated = post.updated;
    } else {
      const comparison = updated.localeCompare(post.updated);
      if (comparison < 0) {
        updated = post.updated;
      }
    }

    items.push(xml);
  }

  const xml = await xmlFeed(items, updated, options);
  fs.writeFileSync("out/curated-feed.xml", xml, "utf8");
}

main();
