import Link from "next/link";
import Tag from "./tag";

type Props = {
  title: string;
  date: string;
  description: string;
  tags: string[];
  slug: string;
};

const PostPreview = ({ title, date, description, tags, slug }: Props) => {
  return (
    <Link href={`/posts/${slug}`} className="post-preview">
      <div className="post-preview-title">
        <b>{title}</b>
      </div>
      <div className="post-preview-info">
        {date}
        <div className="tags">
          {tags.map((tag) => (
            <Tag key={tag} name={tag} />
          ))}
        </div>
      </div>
      <div className="post-preview-content">{description}</div>
    </Link>
  );
};

export default PostPreview;
