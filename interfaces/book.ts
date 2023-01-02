export type BookType = {
  slug: string;
  title: string;
  date: string;
  description: string;
  content: string;
};
export type BookPreviewType = {
  author: string;
  country: string;
  date: string;
  language: string;
  pages: number;
  tags: string[];
  title: string;
  year: string;
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

export const toggle = (current: Lexicographical) => {
  if (current === Lexicographical.None) return Lexicographical.AZ;
  else if (current === Lexicographical.AZ) return Lexicographical.ZA;
  else if (current === Lexicographical.ZA) return Lexicographical.None;
  else return Lexicographical.None;
};
