import Page from "../components/page";
import markdownToHtml from "../lib/markdown";
import { readFile } from "../lib/api";

type Props = {
  content: string;
};

export const Home = ({ content }: Props) => {
  return (
    <Page active="running">
      <div className="content" dangerouslySetInnerHTML={{ __html: content }} />
    </Page>
  );
};

export async function getStaticProps() {
  const { content } = readFile("running.md");
  const html = await markdownToHtml(content || "");

  return {
    props: {
      content: html,
    },
  };
}

export default Home;
