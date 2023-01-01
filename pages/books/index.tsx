import BookPreview from "../../components/book-preview";
import Header from "../../components/header";
import BookHeader from "../../components/book-header";
import books from "../../data/books.json";
import { getAllBooks } from "../../lib/api";
import {
  BookType,
  BookPreviewType,
  Filter,
  Lexicographical,
} from "../../interfaces/book";
import { useEffect, useState } from "react";

type Props = {
  summaries: BookType[];
};

export const Home = ({ summaries }: Props) => {
  const [slugs, setSlugs] = useState<{ [id: string]: string }>({});
  const [activeBooks, setActiveBooks] = useState<BookPreviewType[]>(books);
  const [filter, setFilter] = useState<Filter>({
    title: Lexicographical.None,
    author: Lexicographical.None,
    yearSort: Lexicographical.None,
    yearFilter: undefined,
  });

  useEffect(() => {
    const tSlugs: { [id: string]: string } = {};
    for (const summary of summaries) {
      const key = summary.title.toLowerCase().replaceAll(" ", "-");
      tSlugs[key] = summary.slug;
    }
    setSlugs(tSlugs);
  }, []);

  useEffect(() => {
    const predicate = (book: BookPreviewType) => {
      let ret = true;
      if (filter.yearFilter) {
        ret &&= book.yearRead === filter.yearFilter;
      }
      return ret;
    };

    const compareFn = (a: BookPreviewType, b: BookPreviewType) => {
      let ret = 0;
      if (filter.yearSort !== Lexicographical.None) {
        ret ||=
          filter.yearSort === Lexicographical.AZ
            ? a.yearRead.localeCompare(b.yearRead)
            : b.yearRead.localeCompare(a.yearRead);
      }
      if (filter.title !== Lexicographical.None) {
        ret ||=
          filter.title === Lexicographical.AZ
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title);
      }
      if (filter.author !== Lexicographical.None) {
        ret ||=
          filter.author === Lexicographical.AZ
            ? a.author.localeCompare(b.author)
            : b.author.localeCompare(a.author);
      }
      return ret;
    };

    const tBooks = books.filter(predicate).sort(compareFn);
    setActiveBooks(tBooks);
  }, [filter]);

  return (
    <div className="main">
      <Header active="books" />
      <BookHeader filter={filter} setFilter={setFilter} />

      <div className="books">
        {activeBooks.map((book) => (
          <BookPreview
            key={book.title}
            book={book}
            summary={book.title.toLowerCase().replaceAll(" ", "-") in slugs}
            slug={slugs[book.title.toLowerCase().replaceAll(" ", "-")]}
          />
        ))}

        {[1, 2, 3].map((i) => (
          <div key={i} className="book-preview-dummy" />
        ))}
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  const summaries = getAllBooks(["title", "date", "description", "slug"]);

  return {
    props: { summaries },
  };
};

export default Home;
