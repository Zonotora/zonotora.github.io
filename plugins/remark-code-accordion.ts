import { visit } from "unist-util-visit";

type Options = {
  // Option to control which languages should be wrapped in accordions
  languages?: string[];
  // Option to control accordion title format
  titleFormat?: (lang: string, meta?: string) => string;
  // Minimum number of lines before wrapping in accordion
  minLines?: number;
  // Whether to default to open state
  defaultOpen?: boolean;
};

export default function remarkCodeAccordion(options?: Options) {
  const languages = options?.languages; // If undefined, all code blocks will be wrapped
  const titleFormat =
    options?.titleFormat ||
    ((lang: string) =>
      lang ? lang.charAt(0).toUpperCase() + lang.slice(1) : "Code");
  const minLines = options?.minLines ?? 0; // Default to 0 to wrap all code blocks
  const defaultOpen = options?.defaultOpen ?? true; // Default to open

  return (tree: any) => {
    visit(tree, "code", (node, index, parent) => {
      if (index === undefined || !parent) return;

      const lang = node.lang || "text";
      const meta = node.meta || "";

      // Count lines in the code block
      const lineCount = (node.value || "").split("\n").length;

      // Only wrap in accordion if code has at least minLines
      if (lineCount < minLines) {
        return;
      }

      // If languages filter is provided, only wrap specified languages
      if (languages && !languages.includes(lang.split(" ")[0])) {
        return;
      }

      // Parse language and toggle modifiers
      const actualLang = lang || "code";
      let shouldBeOpen = defaultOpen;

      // Check for toggle modifiers in the meta field
      if (meta) {
        if (meta.includes("toggle:closed")) {
          shouldBeOpen = false;
        } else if (meta.includes("toggle:open")) {
          shouldBeOpen = true;
        }
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
          ...(shouldBeOpen
            ? [
                {
                  type: "mdxJsxAttribute",
                  name: "open",
                  value: null, // This creates just the "open" attribute without a value
                },
              ]
            : []),
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
                value: titleFormat(actualLang, meta),
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
