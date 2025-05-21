import { CSSProperties, useContext } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRss } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../pages/_app";
import { dark, light } from "./icons";

type HeaderProps = {
  active: string;
};

type HeaderLinkProps = {
  active: string;
  link: string;
  alternativeLink?: string;
};

function HeaderLink({ active, link, alternativeLink }: HeaderLinkProps) {
  const style: CSSProperties = {};
  if (active == link) style["textDecoration"] = "underline";
  const href = alternativeLink ? alternativeLink : link;

  return (
    <Link key={link} style={style} href={`/${href}`}>
      {link}
    </Link>
  );
}

const Header = ({ active }: HeaderProps) => {
  const { darkmode, setDarkmode } = useContext(UserContext);

  const toggleDarkmode = () => {
    setDarkmode(!darkmode);
  };

  return (
    <>
      <header>
        <HeaderLink active={active} link="about" />
        <HeaderLink active={active} link="blog" />
        <HeaderLink active={active} link="reading" />
        <HeaderLink active={active} link="running" />
        <HeaderLink active={active} link="c" />
        <HeaderLink
          active={active}
          link="os"
          alternativeLink="guidos/book/index.html"
        />
      </header>
      <div className="box helper-icons">
        <Link href={`/feed.xml`}>
          <FontAwesomeIcon icon={faRss} />
        </Link>
        <a onClick={toggleDarkmode}>{darkmode ? dark : light}</a>
      </div>
    </>
  );
};

export default Header;
