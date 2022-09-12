import PostType from "../interfaces/post";
import PostPreview from "./post-preview";
import Link from "next/link";

type Props = {
  links: string[];
};

const Header = ({ links }: Props) => {
  const capitalize = (name: string) =>
    name.charAt(0).toUpperCase() + name.slice(1);
  return (
    <header className="header">
      {links.map((link) => (
        <Link href={`/${link}`}>{capitalize(link)}</Link>
      ))}
    </header>
  );
};

export default Header;
