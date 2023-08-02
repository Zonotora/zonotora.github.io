import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faToggleOff,
  faToggleOn,
  faRss,
} from "@fortawesome/free-solid-svg-icons";

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
        <div className="header-icons">
          <Link href={`/rss.xml`}>
            <FontAwesomeIcon className="darkmode-toggle" icon={faRss} />
          </Link>
          <FontAwesomeIcon className="darkmode-toggle" icon={faToggleOff} />
        </div>
      </div>
    </header>
  );
};

export default Header;
