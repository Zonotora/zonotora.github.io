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
  ValidPredicates,
} from "../../interfaces/book";
import { useEffect, useState } from "react";

type Props = {
  summaries: BookType[];
};

export const Home = ({ summaries }: Props) => {
  const [slugs, setSlugs] = useState<{ [id: string]: string }>({});
  const [activeBooks, setActiveBooks] = useState<BookPreviewType[]>(books);
  const [filter, setFilter] = useState<Filter>({
    sort: {
      title: Lexicographical.None,
      author: Lexicographical.None,
      year: Lexicographical.None,
    },
    predicate: {
      year: undefined,
      tag: undefined,
    },
  });
  const [validPredicates, setValidPredicates] = useState<ValidPredicates>({
    year: new Set(),
    tags: new Set(),
  });

  useEffect(() => {
    const tSlugs: { [id: string]: string } = {};
    for (const summary of summaries) {
      const key = summary.title.toLowerCase().replaceAll(" ", "-");
      tSlugs[key] = summary.slug;
    }
    setSlugs(tSlugs);

    const tPredicates = { year: new Set<string>(), tags: new Set<string>() };
    for (const book of books) {
      const year = book.date.slice(0, 4);
      tPredicates.year.add(year);
      for (const tag of book.tags) {
        tPredicates.tags.add(tag);
      }
    }
    setValidPredicates(tPredicates);
  }, []);

  useEffect(() => {
    const predicate = (book: BookPreviewType) => {
      let ret = true;
      if (filter.predicate.year) {
        ret &&= book.date.slice(0, 4) === filter.predicate.year;
      }
      if (filter.predicate.tag) {
        ret &&= book.tags.includes(filter.predicate.tag);
      }
      return ret;
    };

    const compareFn = (a: BookPreviewType, b: BookPreviewType) => {
      let ret = 0;
      if (filter.sort.year !== Lexicographical.None) {
        ret ||=
          filter.sort.year === Lexicographical.AZ
            ? a.date.localeCompare(b.date)
            : b.date.localeCompare(a.date);
      }
      if (filter.sort.title !== Lexicographical.None) {
        ret ||=
          filter.sort.title === Lexicographical.AZ
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title);
      }
      if (filter.sort.author !== Lexicographical.None) {
        ret ||=
          filter.sort.author === Lexicographical.AZ
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
      <BookHeader
        filter={filter}
        setFilter={setFilter}
        validPredicates={validPredicates}
      />

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
