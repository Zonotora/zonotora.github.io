export type StaticFileType = {
  title: string;
  date: string;
  link: string;
};

export type BookType = {
  slug: string;
  title: string;
  date: string;
  description: string;
  content: string;
};
export type PreviewType = {
  author: string;
  country: string;
  date: string;
  language: string;
  pages: number;
  tags: string[];
  title: string;
  year: string;
  type: string;
};

export enum Lexicographical {
  None,
  AZ,
  ZA,
}

export type Sort = {
  title: Lexicographical;
  author: Lexicographical;
  year: Lexicographical;
};

export type Predicate = {
  year: string | undefined;
  tag: string | undefined;
};

export type Filter = {
  sort: Sort;
  predicate: Predicate;
};

export type ValidPredicates = {
  year: Set<string>;
  tags: Set<string>;
};

export type Statistics = {
  books: number;
  pages: number;
};

export type TotalStatistics = {
  total: Statistics;
  predicates: { [key: string]: Statistics };
};

export const toggle = (current: Lexicographical) => {
  if (current === Lexicographical.None) return Lexicographical.AZ;
  else if (current === Lexicographical.AZ) return Lexicographical.ZA;
  else if (current === Lexicographical.ZA) return Lexicographical.None;
  else return Lexicographical.None;
};

export type CheatSheetCommand = {
  command: string;
  description: string;
  example?: string;
};

export type CheatSheetSubsection = {
  title: string;
  commands: CheatSheetCommand[];
};

export type CheatSheetSection = {
  id: string;
  title: string;
  description?: string;
  commands?: CheatSheetCommand[];
  subsections?: CheatSheetSubsection[];
};

export type CheatSheetData = CheatSheetSection[];
