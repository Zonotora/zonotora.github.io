import fs from "fs";
import path from "path";
import { join } from "path";
import { StaticFileType } from "./types";
import metadata from "../data/metadata.json";

const PAGES_PATH = join(process.cwd(), "pages");

type MetadataType = {
  [link: string]: {
    title: string;
    date: string;
  };
};

const typedMetadata: MetadataType = metadata;

export function getStaticFiles(directory: string): StaticFileType[] {
  const files = fs.readdirSync(join(PAGES_PATH, directory));
  const staticFiles: StaticFileType[] = [];

  for (const file of files) {
    const filePath = join(PAGES_PATH, directory, file);
    const fileWebPath = path.join(directory, file);
    const extname = path.extname(filePath);
    if (extname !== ".mdx") {
      continue;
    }

    const link = fileWebPath.replace(/\.mdx$/, "");
    let title = "<title>";
    let date = "<date>";
    if (link in typedMetadata) {
      const info = typedMetadata[link];
      title = info.title;
      date = info.date;
    }

    const content = {
      title,
      date,
      link,
    };
    staticFiles.push(content);
  }

  return staticFiles.sort((a, b) => (a.date > b.date ? -1 : 1));
}
