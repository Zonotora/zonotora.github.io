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
        <div className="post-preview-title">
          <b>{title}</b>
        </div>
        <div className="post-preview-info">
          {date}
        {title}
        </div>
        <div className="post-preview-content">{description}</div>
      </div>
    </Link>
  );
};

export default PostPreview;
