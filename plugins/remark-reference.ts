import { visit, SKIP } from "unist-util-visit";

type Options = {};

type LabelType = {
  type: string;
  value: string;
  id: number;
};

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export default function remarkReference(options?: Options) {
  return (tree: any) => {
    let noOfFigures = 0;
    let noOfTables = 0;
    const linkedItems: LabelType[] = [];

    visit(tree, "mdxJsxFlowElement", (node, index, parent) => {
      if (index == undefined) return;

      if (node["name"] == "label") {
        for (const a of node["attributes"]) {
          if (a["name"] == "id") {
            const type = parent["attributes"][0]["value"];
            let id = 0;
            if (type == "figure") {
              noOfFigures += 1;
              id = noOfFigures;
            } else if (type == "table") {
              noOfTables += 1;
              id = noOfTables;
            }

            linkedItems.push({ type, value: a["value"], id });
            const value = node["children"][0]["children"][0]["value"];

            node["children"][0]["children"][0]["value"] = `${capitalize(
              type
            )} ${id}. ${value}`;
          }
        }
      }
    });

    visit(tree, "text", (node, index, parent) => {
      const regex = /#([a-zA-Z0-9_\-]+)/g;
      let match: any;
      let lastIndex = 0;
      const newNodes = [];

      if (index == undefined) return;

      while ((match = regex.exec(node.value)) !== null) {
        // Text before the tag
        if (match.index > lastIndex) {
          newNodes.push({
            type: "text",
            value: node.value.slice(lastIndex, match.index),
          });
        }

        const index = linkedItems.findIndex((obj) => obj["value"] == match[1]);
        if (index == -1) continue;
        const item = linkedItems[index];

        newNodes.push({
          type: "link",
          url: `#${match[1]}`,
          children: [
            {
              type: "text",
              value: `${capitalize(item.type)} ${item.id}`,
            },
          ],
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
  };
}
