import PostType from "../interfaces/post";
import PostPreview from "./post-preview";

type Props = {
  posts: PostType[];
  count: number;
};

const Posts = ({ posts, count }: Props) => {
  return (
    <div className="posts">
      {posts.map((post) => (
        <PostPreview
          title={post.title}
          date={post.date}
          description={post.description}
          slug={post.slug}
        />
      ))}
    </div>
  );
};

export default Posts;
