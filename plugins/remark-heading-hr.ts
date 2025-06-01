import { visit } from "unist-util-visit";

type Options = {};

export default function remarkHeadingHr(options?: Options) {
  return (tree: any) => {
    visit(tree, "heading", (node, index, parent) => {
      if (index == undefined) return;

      const newNode = {
        type: "thematicBreak",
      };
      if (index == parent.children.length - 1) {
        parent.children.push(newNode);
      } else {
        parent.children.splice(index + 1, 0, newNode);
      }
    });
  };
}
