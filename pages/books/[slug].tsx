import { useRouter } from "next/router";
import ErrorPage from "next/error";
import { getBookBySlug, getAllBooks } from "../../lib/api";
import Page from "../../components/page";
import markdownToHtml from "../../lib/markdown";
import type PostType from "../../interfaces/post";

type Props = {
  post: PostType;
};

export default function Post({ post }: Props) {
  const router = useRouter();
  const { pid } = router.query;

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Page active="books">
      <div className="posts">
        <div className="post">
          <h1>{post.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </div>
    </Page>
  );
}

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const post = getBookBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "author",
    "content",
    "ogImage",
    "coverImage",
  ]);
  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllBooks(["slug"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
