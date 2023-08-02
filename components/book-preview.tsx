import Link from "next/link";
import { BookPreviewType } from "../interfaces/book";

type Props = {
  book: BookPreviewType;
  summary?: boolean;
  slug: string;
};

const BookPreview = ({ book, summary, slug }: Props) => {
  const content = (
    <>
      <div>{book.title}</div>
      <div>{book.author}</div>
      <div style={{ fontSize: "10pt" }}>{book.date}</div>
    </>
  );
  const withLink = (
    <Link
      href={`/books/${slug}`}
      className={`book-preview${summary ? " summary" : ""}`}
    >
      {content}
    </Link>
  );

  const withoutLink = (
    <div className={`book-preview${summary ? " summary" : ""}`}>{content}</div>
  );

  return summary ? withLink : withoutLink;
};

export default BookPreview;
