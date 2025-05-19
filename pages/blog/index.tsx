import { getAllPosts } from "../../lib/api";
import PostType from "../../interfaces/post";
import PostPreview from "../../components/post-preview";
import Page from "../../components/page";

type Props = {
  posts: PostType[];
};

export const Home = ({ posts }: Props) => {
  return (
    <Page active="blog">
      {posts.map((post) => (
        <PostPreview
          key={post.title}
          title={post.title}
          date={post.date}
          description={post.description}
          tags={post.tags}
          slug={post.slug}
        />
      ))}
    </Page>
  );
};

export const getStaticProps = async () => {
  const posts = getAllPosts(["title", "date", "description", "slug", "tags"]);

  return {
    props: { posts },
  };
};

export default Home;
