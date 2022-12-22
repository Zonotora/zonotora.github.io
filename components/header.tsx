import Link from "next/link";

type Props = {
  active: string;
};

const Header = ({ active }: Props) => {
  const links = ["posts", "mindpalace", "sketches", "instrumentum"];

  const capitalize = (name: string) =>
    name.charAt(0).toUpperCase() + name.slice(1);
  return (
    <header className="header">
      {links.map((link) =>
        link === active ? (
          <span style={{ textDecoration: "underline" }}>
            <Link key={link} href={`/${link}`}>
              {capitalize(link)}
            </Link>
          </span>
        ) : (
          <Link key={link} href={`/${link}`}>
            {capitalize(link)}
          </Link>
        )
      )}
    </header>
  );
};

export default Header;
