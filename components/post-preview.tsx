type Props = {
  title: string;
  date: string;
  description: string;
  slug: string;
};

const PostPreview = ({ title, date, description, slug }: Props) => {
  return (
    <div className="post-preview">
      {title}
      <div className="post-preview-content">{description}</div>
    </div>
  );
};

export default PostPreview;
