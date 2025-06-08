import { visit, SKIP } from "unist-util-visit";
import fs from "fs";

const DEFAULT_FILEPATH = ["./bib/run.json", "./bib/ml.json"];

type Options = {
  filepath: string;
};

type AuthorType = {
  firstname: string;
  lastname: string;
};

type BibType = {
  type: string;
  title: string;
  authors: AuthorType[];
  parenAuthors: string;
  referenceAuthors: string;
  year: string;
  url: string;
};

function parseBibtex(filepath: string) {
  const text = fs.readFileSync(filepath, "utf-8");
  const data = JSON.parse(text);
  const items = data["items"];
  const bibItems: { [key: string]: BibType } = {};
  // {firstname: c["firstName"], lastname: "lastName"]}
  for (const item of items) {
    if (!("citationKey" in item)) continue;
    const type = item["itemType"] || "type";
    const title = item["title"] || "title";
    const authors: AuthorType[] = item["creators"]
      ? item["creators"].map((c: any) => ({
          firstname: c["firstName"],
          lastname: c["lastName"],
        }))
      : [];
    const website = item["websiteTitle"];

    let parenAuthors = "";
    let referenceAuthors = "";
    const getInitial = (name: string) => {
      if (name == "") return name;
      const parts = name.split(" ");
      let s = "";
      for (const p of parts) s += `${p.charAt(0)}.`;
      return s;
    };

    if (authors.length == 0 && website) {
      authors.push({ firstname: "", lastname: website });
    } else if (authors.length == 0) {
      authors.push({ firstname: "", lastname: "Unknown" });
    }

    if (authors.length == 1) {
      parenAuthors = authors[0].lastname;
    } else if (authors.length == 2) {
      parenAuthors = `${authors[0].lastname} & ${authors[1].lastname}`;
    } else if (authors.length > 2) {
      parenAuthors = `${authors[0].lastname} et al.`;
    }

    for (let i = 0; i < authors.length; i++) {
      const a = authors[i];
      referenceAuthors += `${a.lastname}, ${getInitial(a.firstname)}`;
      // If not last, += ",", if second last, += "&"
      if (i == authors.length - 2) {
        referenceAuthors += " & ";
      } else if (i != authors.length - 1) {
        referenceAuthors += ", ";
      }
    }

    const url = item["url"] || "#";
    let year = "";
    if ("date" in item) {
      year = item["date"].split("-")[0];
    } else if ("accessDate" in item) {
      year = "Accessed: " + item["accessDate"].split("-")[0];
    }

    const bibItem: BibType = {
      type,
      title,
      authors,
      parenAuthors,
      referenceAuthors,
      year,
      url,
    };
    const key: string = item["citationKey"];
    bibItems[key] = bibItem;
  }

  return bibItems;
}

function createReferenceNode(bibItem: BibType) {
  return {
    type: "mdxJsxTextElement",
    name: "p",
    attributes: [
      { type: "mdxJsxAttribute", name: "className", value: "reference-item" },
    ],
    children: [
      {
        type: "text",
        value: `${bibItem.referenceAuthors} (${bibItem.year}). `,
      },
      {
        type: "emphasis",
        children: [
          {
            type: "text",

            value: `${bibItem.title}. `,
          },
        ],
      },
      {
        type: "link",
        url: bibItem.url,
        children: [
          {
            type: "text",
            value: bibItem.url,
          },
        ],
      },
    ],
  };
}

export default function remarkCitation(options?: Options) {
  const filepath = options?.filepath ? options.filepath : DEFAULT_FILEPATH;
  let bibtex: { [key: string]: BibType } = {};
  for (const path of filepath) {
    const ret = parseBibtex(path);
    bibtex = Object.assign({}, ret, bibtex);
  }

  return (tree: any) => {
    const used: string[] = [];

    visit(tree, "text", (node, index, parent) => {
      const regex = /@([a-zA-Z0-9_,\-]+)/g;
      let match;
      let lastIndex = 0;
      const newNodes = [];

      if (index == undefined) return;

      while ((match = regex.exec(node.value)) !== null) {
        const multiple = match[1].split(",");

        // Text before the tag
        if (match.index > lastIndex) {
          newNodes.push({
            type: "text",
            value: node.value.slice(lastIndex, match.index),
          });
        }
        // The link node
        newNodes.push({
          type: "text",
          value: "(",
        });

        for (let i = 0; i < multiple.length; i++) {
          const key = multiple[i];

          if (!(key in bibtex)) continue;

          const bibItem = bibtex[key];

          // Add key to used if not already present
          if (!used.includes(key)) used.push(key);

          newNodes.push({
            type: "link",
            url: bibItem.url,
            children: [
              {
                type: "text",
                value: `${bibItem.parenAuthors}, ${bibItem.year}`,
              },
            ],
          });

          if (i != multiple.length - 1) {
            newNodes.push({
              type: "text",
              value: "; ",
            });
          }
        }

        newNodes.push({
          type: "text",
          value: ")",
        });

        lastIndex = regex.lastIndex;
      }

      // Remaining text after the last tag
      if (lastIndex < node.value.length) {
        newNodes.push({
          type: "text",
          value: node.value.slice(lastIndex),
        });
      }

      // Replace the node if we found any tags
      if (newNodes.length) {
        parent.children.splice(index, 1, ...newNodes);
        // Adjust traversal since we've changed the tree
        return [SKIP, index + newNodes.length];
      }
    });

    // Add all references at the end of the page under references heading
    visit(tree, "heading", (node, index, parent) => {
      if (index == undefined) return;

      const regex = /(references|bibliography)/gi;
      if (node.depth == 1 && regex.exec(node.children[0].value)) {
        const isLast = index == parent.children.length - 1;
        for (let i = 0; i < used.length; i++) {
          const key = used[i];
          const bibItem = bibtex[key];
          const newNode = createReferenceNode(bibItem);
          if (isLast) {
            parent.children.push(newNode);
          } else {
            parent.children.splice(index + i + 1, 0, newNode);
          }
        }
      }
    });
  };
}
