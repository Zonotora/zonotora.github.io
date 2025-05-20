import fs from "fs";
import path from "path";
import { join } from "path";
import matter from "gray-matter";
import { StaticFileType } from "./types";

const PAGES_PATH = join(process.cwd(), "pages");

export function getStaticFiles(directory: string): StaticFileType[] {
  const files = fs.readdirSync(join(PAGES_PATH, directory));
  const staticFiles: StaticFileType[] = [];

  for (const file of files) {
    const filePath = join(PAGES_PATH, directory, file);
    const fileWebPath = path.join(directory, file);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const extname = path.extname(filePath);
    if (extname !== ".mdx") {
      continue;
    }
    const { data } = matter(fileContents);
    const { title, date } = data;
    const link = fileWebPath.replace(/\.mdx$/, "");
    const content = {
      title,
      date,
      link,
    };
    staticFiles.push(content);
  }
  console.log(staticFiles);

  return staticFiles.sort((a, b) => (a.date > b.date ? -1 : 1));
}
