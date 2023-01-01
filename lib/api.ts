import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const postsDirectory = join(process.cwd(), "posts");
const booksDirectory = join(process.cwd(), "books");

export function getPostSlugs() {
  return getSlugs(postsDirectory);
}

export function getPostBySlug(slug: string, fields: string[] = []) {
  return getBySlug(slug, fields, postsDirectory);
}

export function getAllPosts(fields: string[] = []) {
  return getAll(fields, getPostSlugs, getPostBySlug);
}

export function getBookSlugs() {
  return getSlugs(booksDirectory);
}

export function getBookBySlug(slug: string, fields: string[] = []) {
  return getBySlug(slug, fields, booksDirectory);
}

export function getAllBooks(fields: string[] = []) {
  return getAll(fields, getBookSlugs, getBookBySlug);
}

function getSlugs(directory: string) {
  return fs.readdirSync(directory);
}

function getAll(
  fields: string[],
  getSlugs: () => any[],
  getBySlug: (slug: string, fields: string[]) => any
) {
  const slugs = getSlugs();
  const posts = slugs
    .map((slug) => getBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

function getBySlug(slug: string, fields: string[], directory: string) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(directory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  type Items = {
    [key: string]: string;
  };

  const items: Items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "content") {
      items[field] = content;
    }

    if (typeof data[field] !== "undefined") {
      items[field] = data[field];
    }
  });

  return items;
}
