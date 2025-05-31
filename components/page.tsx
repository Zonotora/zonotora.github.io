import { ReactNode, useEffect, useRef } from "react";
import Header from "./header";

type Props = {
  active: string;
  children?: ReactNode;
};

const Page = ({ active, children }: Props) => {
  useEffect(() => {
    const anchors = document.querySelectorAll("h1, h2, h3");
    const toc = document.getElementsByClassName("toc");

    if (toc.length == 0) return;

    const nav = toc[0];
    const links = nav.querySelectorAll("a");

    // Make first element active
    if (links.length > 0) {
      links[0].classList.add("active");
    }

    window.addEventListener("scroll", (event) => {
      if (
        typeof anchors != "undefined" &&
        anchors != null &&
        typeof links != "undefined" &&
        links != null
      ) {
        let scrollTop = window.scrollY;

        // highlight the last scrolled-to: set everything inactive first
        links.forEach((link, index) => {
          link.classList.remove("active");
        });

        // then iterate backwards, on the first match highlight it and break
        for (var i = anchors.length - 1; i >= 0; i--) {
          const anchor = anchors[i] as HTMLDivElement;
          if (anchor != null && scrollTop > anchor.offsetTop - 75) {
            links[i].classList.add("active");
            break;
          }
        }
      }
    });
  }, []);

  return (
    <div>
      <Header active={active} />
      <main>{children}</main>
    </div>
  );
};

export default Page;
