import { getStaticFiles } from "../../lib/api";
import { StaticFileType } from "../../lib/types";
import Page from "../../components/page";

export const Blog = ({ files }: { files: StaticFileType[] }) => {
  return (
    <Page active="blog">
      Many wow. Such empty. Very lazy.
      {files.map((file) => (
        <div>
          {file.title}
          {file.date}
        </div>
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
