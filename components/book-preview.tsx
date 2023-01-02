import Link from "next/link";
import { BookPreviewType } from "../interfaces/book";

type Props = {
  book: BookPreviewType;
  summary?: boolean;
  slug: string;
};

const BookPreview = ({ book, summary, slug }: Props) => {
  const content = (
    <div className={`book-preview${summary ? " summary" : ""}`}>
      <div>{book.title}</div>
      <div>{book.author}</div>
      <div style={{ fontSize: "10pt", color: "antiquewhite" }}>{book.date}</div>
    </div>
  );
  const withLink = <Link href={`/books/${slug}`}>{content}</Link>;

  return summary ? withLink : content;
};

export default BookPreview;
