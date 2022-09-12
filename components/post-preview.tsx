type Props = {
  title: string;
  date: string;
  slug: string;
};

const PostPreview = ({ title, date, slug }: Props) => {
  return (
    <div className="post-preview">
      {title}
      {date}
    </div>
  );
};

export default PostPreview;
