import { CSSProperties, useContext } from "react";
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
  if (alternativeLink) {
    return (
      <a
        style={style}
        href={`/${alternativeLink}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {link}
      </a>
    );
  }
  return (
    <a style={style} href={`/${link}`}>
      {link}
    </a>
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
        <a href={`/feed.xml`}>
          <FontAwesomeIcon icon={faRss} />
        </a>
        <a onClick={toggleDarkmode}>{darkmode ? dark : light}</a>
      </div>
    </>
  );
};

export default Header;
