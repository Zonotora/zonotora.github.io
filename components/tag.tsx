type Props = {
  name: string;
};

const PostPreview = ({ name }: Props) => {
  return <div className="tag">{name}</div>;
};

export default PostPreview;
