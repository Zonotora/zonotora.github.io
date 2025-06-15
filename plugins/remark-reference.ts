import { visit, SKIP } from "unist-util-visit";

type Options = {};

type LabelType = {
  type: string;
  value: string;
  id: number;
};

export default function remarkReference(options?: Options) {
  return (tree: any) => {
    let noOfFigures = 0;
    let noOfTables = 0;
    const linkedItems: LabelType[] = [];

    visit(tree, "mdxJsxFlowElement", (node, index, parent) => {
      // console.log(node);
      if (index == undefined) return;

      if (node.name == "Figure" || node.name == "Table") {
        const idNode = node.attributes.find((e: any) => e.name == "id");
        const descNode = node.attributes.find(
          (e: any) => e.name == "description"
        );

        let id = 0;
        if (node.name == "Figure") {
          noOfFigures += 1;
          id = noOfFigures;
        } else if (node.name == "Table") {
          noOfTables += 1;
          id = noOfTables;
        }

        linkedItems.push({ type: node.name, value: idNode.value, id });
        descNode.value = `${node.name} ${id}. ${descNode.value}`;
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
              value: `${item.type} ${item.id}`,
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
