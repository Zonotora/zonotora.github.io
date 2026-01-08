import { visit, SKIP } from "unist-util-visit";

type FootnoteData = {
  id: string;
  label: string;
  content: string;
};

type SideFootnote = {
  type: string;
  name: string;
  attributes: Array<{ type: string; name: string; value: string }>;
  children: Array<any>;
};

export default function remarkFootnotes() {
  return (tree: any) => {
    const footnotes: FootnoteData[] = [];
    let footnoteCounter = 0;

    // Helper function to convert AST nodes to JSX children
    const convertNodesToJSX = (nodes: any[]): any[] => {
      const result: any[] = [];

      for (const child of nodes) {
        if (child.type === "text") {
          result.push({
            type: "text",
            value: child.value,
          });
        } else if (child.type === "link") {
          result.push({
            type: "mdxJsxTextElement",
            name: "a",
            attributes: [
              {
                type: "mdxJsxAttribute",
                name: "href",
                value: child.url,
              },
              ...(child.title
                ? [
                    {
                      type: "mdxJsxAttribute",
                      name: "title",
                      value: child.title,
                    },
                  ]
                : []),
            ],
            children: convertNodesToJSX(child.children),
          });
        } else if (child.children) {
          result.push(...convertNodesToJSX(child.children));
        }
      }

      return result;
    };

    // First pass: collect footnote definitions that remarkGfm creates
    visit(tree, "footnoteDefinition", (node, index, parent) => {
      if (index === undefined) return;

      // Extract the footnote content from the definition node
      const label = node.identifier;
      let content = "";

      // Walk through the definition children to extract text content
      visit(node, "text", (textNode) => {
        content += textNode.value;
      });

      footnotes.push({
        id: `footnote-${footnoteCounter++}`,
        label,
        content: content.trim(),
      });

      // Store the AST children for rendering with links
      (footnotes[footnotes.length - 1] as any).children = node.children;

      // Remove the footnote definition from the tree
      parent.children.splice(index, 1);
      return [SKIP, index - 1];
    });

    // Second pass: find paragraphs containing footnote references and wrap them
    visit(tree, "paragraph", (node, index, parent) => {
      if (index === undefined) return;

      let hasFootnoteRef = false;
      const sideFootnotes: SideFootnote[] = [];

      // Check if paragraph contains footnote references
      visit(node, "footnoteReference", (refNode, refIndex, refParent) => {
        hasFootnoteRef = true;
        const label = refNode.identifier;
        const footnote = footnotes.find((fn) => fn.label === label);

        if (footnote) {
          // Convert the footnote's AST children to JSX
          const footnoteChildren = (footnote as any).children
            ? convertNodesToJSX((footnote as any).children)
            : [{ type: "text", value: footnote.content }];

          sideFootnotes.push({
            type: "mdxJsxFlowElement",
            name: "div",
            attributes: [
              {
                type: "mdxJsxAttribute",
                name: "className",
                value: "footnote-side",
              },
              {
                type: "mdxJsxAttribute",
                name: "data-footnote-id",
                value: footnote.id,
              },
            ],
            children: [
              {
                type: "mdxJsxTextElement",
                name: "sup",
                attributes: [
                  {
                    type: "mdxJsxAttribute",
                    name: "className",
                    value: "footnote-number",
                  },
                ],
                children: [
                  {
                    type: "text",
                    value: `${footnotes.indexOf(footnote) + 1}`,
                  },
                ],
              },
              {
                type: "text",
                value: " ",
              },
              ...footnoteChildren,
            ],
          });
          const newRefNode = {
            type: "mdxJsxTextElement",
            name: "sup",
            attributes: [
              {
                type: "mdxJsxAttribute",
                name: "className",
                value: "footnote-ref",
              },
              {
                type: "mdxJsxAttribute",
                name: "data-footnote-id",
                value: footnote.id,
              },
            ],
            children: [
              {
                type: "text",
                value: `${footnotes.indexOf(footnote) + 1}`,
              },
            ],
          };

          refParent.children.splice(refIndex, 1, newRefNode);
          return [SKIP, refIndex];
        }
      });

      if (hasFootnoteRef) {
        // Wrap the paragraph in a container with stacked side footnotes
        const footnoteContainer = {
          type: "mdxJsxFlowElement",
          name: "div",
          attributes: [
            {
              type: "mdxJsxAttribute",
              name: "className",
              value: "footnote-container",
            },
          ],
          children: [
            { ...node },
            {
              type: "mdxJsxFlowElement",
              name: "div",
              attributes: [
                {
                  type: "mdxJsxAttribute",
                  name: "className",
                  value: "footnote-sides",
                },
              ],
              children: sideFootnotes,
            },
          ],
        };

        // Replace the paragraph with the footnote container
        parent.children.splice(index, 1, footnoteContainer);
        return [SKIP, index];
      }
    });
  };
}
