import { getStaticFiles } from "../../lib/api";
import { StaticFileType } from "../../lib/types";
import Page from "../../components/page";
import Link from "next/link";

type Props = {
  color: string;
  title: string;
  date: string;
  link: string;
};

const colors = ["#ffa4e2", "#ffff7e", "#7ef9ff", "#ff9890"];
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296 - 0.001;
  };
}

const Preview = ({ color, title, date, link }: Props) => {
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
      <div style={{ color: color }}>{title}</div>
      <div style={{ fontSize: "10pt" }}>
        {new Date(date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </div>
    </Link>
  );
};

export const Blog = ({ files }: { files: StaticFileType[] }) => {
  const rng = mulberry32(1337);
  return (
    <Page active="blog">
      {files.map((file) => (
        <Preview
          key="title"
          color={colors[Math.floor(rng() * colors.length)]}
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
