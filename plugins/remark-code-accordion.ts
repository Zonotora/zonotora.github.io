import { visit } from "unist-util-visit";

type Options = {
  // Option to control which languages should be wrapped in accordions
  languages?: string[];
  // Option to control accordion title format
  titleFormat?: (lang: string, meta?: string) => string;
  // Minimum number of lines before wrapping in accordion
  minLines?: number;
};

export default function remarkCodeAccordion(options?: Options) {
  const languages = options?.languages; // If undefined, all code blocks will be wrapped
  const titleFormat =
    options?.titleFormat || ((lang: string) => `Show ${lang || "code"}`);
  const minLines = options?.minLines || 50;

  return (tree: any) => {
    visit(tree, "code", (node, index, parent) => {
      if (index === undefined || !parent) return;

      const lang = node.lang || "text";
      const meta = node.meta || "";
      
      // Count lines in the code block
      const lineCount = (node.value || "").split('\n').length;
      
      // Only wrap in accordion if code has more than minLines
      if (lineCount <= minLines) {
        return;
      }

      // If languages filter is provided, only wrap specified languages
      if (languages && !languages.includes(lang)) {
        return;
      }

      // Create accordion wrapper
      const accordionNode = {
        type: "mdxJsxFlowElement",
        name: "details",
        attributes: [
          {
            type: "mdxJsxAttribute",
            name: "className",
            value: "code-accordion",
          },
        ],
        children: [
          {
            type: "mdxJsxFlowElement",
            name: "summary",
            attributes: [
              {
                type: "mdxJsxAttribute",
                name: "className",
                value: "code-accordion-summary",
              },
            ],
            children: [
              {
                type: "text",
                value: titleFormat(lang, meta),
              },
            ],
          },
          {
            type: "mdxJsxFlowElement",
            name: "div",
            attributes: [
              {
                type: "mdxJsxAttribute",
                name: "className",
                value: "code-accordion-content",
              },
            ],
            children: [node], // The original code block
          },
        ],
      };

      // Replace the code node with the accordion wrapper
      parent.children[index] = accordionNode;
    });
  };
}
