import Link from "next/link";

type Props = {
  title: string;
  date: string;
  description: string;
  slug: string;
};

const PostPreview = ({ title, date, description, slug }: Props) => {
  return (
    <Link href={`/posts/${slug}`}>
      <div className="post-preview">
        {title}
        <div className="post-preview-content">{description}</div>
      </div>
    </Link>
  );
};

export default PostPreview;
