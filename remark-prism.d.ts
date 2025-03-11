declare module "remark-prism" {
  import { Plugin } from "unified";
  import { Root } from "mdast";

  const remarkPrism: Plugin<void[], Root>;

  export = remarkPrism;
}
