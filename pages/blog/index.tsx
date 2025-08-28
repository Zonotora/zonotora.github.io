import { getStaticFiles } from "../../lib/api";
import { StaticFileType } from "../../lib/types";
import Page from "../../components/page";
import Link from "next/link";

type Props = {
  title: string;
  date: string;
  link: string;
};

const Preview = ({ title, date, link }: Props) => {
  return (
    <Link
      href={`/${link}`}
      className="preview"
      style={{
        display: "flex",
        justifyContent: "space-between",
        textDecoration: "none",
        paddingTop: "3px",
        paddingBottom: "3px",
      }}
    >
      <div>{title}</div>
      <div style={{ fontSize: "10pt" }}>{date}</div>
    </Link>
  );
};

export const Blog = ({ files }: { files: StaticFileType[] }) => {
  return (
    <Page active="blog">
      {files.map((file) => (
        <Preview
          key="title"
          title={file.title}
          date={file.date}
          link={file.link}
        />
      ))}
    </Page>
  );
};

export const getStaticProps = async () => {
  const files = getStaticFiles("blog");

  return {
    props: { files },
  };
};

export default Blog;
