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
  language: string;
  pages: number;
  title: string;
  year: string;
  yearRead: string;
};

export enum Lexicographical {
  None,
  AZ,
  ZA,
}

export type Filter = {
  title: Lexicographical;
  author: Lexicographical;
  yearSort: Lexicographical;
  yearFilter: string | undefined;
};

export const toggle = (current: Lexicographical) => {
  if (current === Lexicographical.None) return Lexicographical.AZ;
  else if (current === Lexicographical.AZ) return Lexicographical.ZA;
  else if (current === Lexicographical.ZA) return Lexicographical.None;
  else return Lexicographical.None;
};
