import BookPreview from "../../components/book-preview";
import Page from "../../components/page";
import BookHeader from "../../components/book-header";
import books from "../../data/books.json";
import { getAllBooks } from "../../lib/api";
import {
  BookType,
  BookPreviewType,
  Filter,
  Lexicographical,
  ValidPredicates,
  TotalStatistics,
  Statistics,
} from "../../interfaces/book";
import { useEffect, useState } from "react";

type Props = {
  summaries: BookType[];
};

const convertTitle = (title: string) => {
  return title.toLowerCase().replaceAll(":", " ").replaceAll(/\s+/g, "-");
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
  const [showStats, setShowStats] = useState<boolean>(false);
  const [statistics, setStatistics] = useState<TotalStatistics>({
    total: { books: 0, pages: 0 },
    predicates: {},
  });

  useEffect(() => {
    const tSlugs: { [id: string]: string } = {};
    for (const summary of summaries) {
      const key = convertTitle(summary.title);
      tSlugs[key] = summary.slug;
    }
    setSlugs(tSlugs);

    const tPredicates = { year: new Set<string>(), tags: new Set<string>() };
    const stats: Statistics = {
      books: 0,
      pages: 0,
    };
    const tStatistics: TotalStatistics = {
      total: structuredClone(stats),
      predicates: {},
    };

    const addStatistics = (key: string, book: BookPreviewType) => {
      if (!(key in tStatistics.predicates)) {
        tStatistics.predicates[key] = structuredClone(stats);
      }

      tStatistics.predicates[key].books += 1;
      tStatistics.predicates[key].pages += book.pages;
    };
    for (const book of books) {
      const year = book.date.slice(0, 4);
      tPredicates.year.add(year);

      for (const tag of book.tags) {
        tPredicates.tags.add(tag);
        addStatistics(tag, book);
      }
      tStatistics.total.books += 1;
      tStatistics.total.pages += book.pages;

      addStatistics(year, book);
    }

    setValidPredicates(tPredicates);
    setStatistics(tStatistics);
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

  const statsNode = (
    <div className="statistics">
      <table>
        <thead>
          <tr>
            <td></td>
            <td>Books</td>
            <td>Pages</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Total</td>
            <td>{statistics.total.books}</td>
            <td>{statistics.total.pages}</td>
          </tr>
          {Object.entries(statistics.predicates)
            .sort(([a], [b]) => b.localeCompare(a))
            .map(([k, v]) => (
              <tr key={k}>
                <td>{k}</td>
                <td>{v.books}</td>
                <td>{v.pages}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );

  const booksNode = (
    <>
      {activeBooks.map((book) => (
        <BookPreview
          key={book.title}
          book={book}
          summary={convertTitle(book.title) in slugs}
          slug={slugs[convertTitle(book.title)]}
        />
      ))}
    </>
  );

  return (
    <Page active="books">
      <BookHeader
        filter={filter}
        setFilter={setFilter}
        validPredicates={validPredicates}
        showStats={showStats}
        setShowStats={setShowStats}
      />

      {showStats ? statsNode : booksNode}
    </Page>
  );
};

export const getStaticProps = async () => {
  const summaries = getAllBooks(["title", "date", "description", "slug"]);

  return {
    props: { summaries },
  };
};

export default Home;
