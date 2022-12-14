import Link from "next/link";

type Props = {
  active: string;
};

const Header = ({ active }: Props) => {
  const links = ["posts", "books", "mindpalace", "sketches", "instrumentum"];

  const capitalize = (name: string) =>
    name.charAt(0).toUpperCase() + name.slice(1);
  return (
    <header>
      <div className="header">
        {links.map((link) =>
          link === active ? (
            <span key={link} style={{ textDecoration: "underline" }}>
              <Link href={`/${link}`}>{capitalize(link)}</Link>
            </span>
          ) : (
            <Link key={link} href={`/${link}`}>
              {capitalize(link)}
            </Link>
          )
        )}
      </div>
    </header>
  );
};

export default Header;
