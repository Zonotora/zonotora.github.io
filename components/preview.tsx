import Link from "next/link";
import Tag from "./tag";
import { github, arrowlink, documentation } from "./icons";

type Props = {
  title: string;
  description: string;
  tags: string[];
  link: string;
  githubLink?: string;
  documentationLink?: string;
  archived?: boolean;
};

const Preview = ({
  title,
  description,
  tags,
  link,
  githubLink,
  documentationLink,
  archived,
}: Props) => {
  const githubIcon = githubLink ? (
    <Link href={githubLink}>{github}</Link>
  ) : (
    <></>
  );
  const linkIcon = link ? <Link href={link}>{arrowlink}</Link> : <></>;
  const documentationIcon = documentationLink ? (
    <Link href={documentationLink}>{documentation}</Link>
  ) : (
    <></>
  );

  return (
    <div className="box">
      <div className="project-preview-links">
        {documentationIcon}
        {githubIcon}
        {linkIcon}
      </div>
      <div className="project-preview-title">
        <b>{title}</b>
        {archived ? <span className="archived">archived</span> : <></>}
      </div>
      <div className="project-preview-info tags">
        {tags.map((tag) => (
          <Tag key={tag} name={tag} />
        ))}
      </div>
      <div className="project-preview-content">{description}</div>
    </div>
  );
};

export default Preview;
