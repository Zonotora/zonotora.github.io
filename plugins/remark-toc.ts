import { visit, SKIP } from "unist-util-visit";

type Options = {};

// TODO: Remove if not used
export default function remarkToc(options?: Options) {
  return (tree: any) => {
    const depth: number[] = [];
    const nodes = [];
    let lastDepth = 0;

    visit(tree, "heading", (node, index, parent) => {
      if (index == undefined) return;
      const currDepth = depth.length - 1;

      const title = node.children[0].value;

      if (node.depth > lastDepth) {
        depth.push(1);
      } else if (node.depth == lastDepth) {
        depth[currDepth] += 1;
      } else {
        for (let i = 0; i < lastDepth - node.depth; i++) {
          depth.pop();
        }

        depth[depth.length - 1] += 1;
      }

      lastDepth = node.depth;

      const displayName = depth.join(".");

      nodes.push({
        title,
        displayName,
      });
    });

    visit(tree, "text", (node, index, parent) => {
      console.log(parent);
    });
  };
}
