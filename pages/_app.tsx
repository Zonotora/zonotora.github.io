import "../styles/globals.css";
import "../styles/prism.css";
import "katex/dist/katex.min.css";
import type { AppProps } from "next/app";
import React, { useState, useEffect } from "react";
import colors from "../data/colors.json";
import Cookies from "universal-cookie";

const userContextDefault = {
  darkmode: true,
  setDarkmode: (value: boolean) => {},
};

export const UserContext = React.createContext(userContextDefault);

function MyApp({ Component, pageProps }: AppProps) {
  const [darkmode, setDarkmode_] = useState(userContextDefault.darkmode);
  const [cookies, _] = useState(new Cookies());

  const changeDarkmode = (value: boolean) => {
    let background, backgroundHover, border, borderHover, color;
    const mode = value ? "dark" : "light";

    background = colors[mode].background.color;
    backgroundHover = colors[mode].background.hover;
    color = colors[mode].color;
    border = colors[mode].border.color;
    borderHover = colors[mode].border.hover;

    document.documentElement.style.setProperty(
      "--background-color",
      background
    );
    document.documentElement.style.setProperty(
      "--background-hover-color",
      backgroundHover
    );
    document.documentElement.style.setProperty("--color", color);
    document.documentElement.style.setProperty("--border-color", border);
    document.documentElement.style.setProperty(
      "--border-hover-color",
      borderHover
    );

    // Set code block colors based on theme
    if (value) {
      // Dark mode - keep existing dark colors
      document.documentElement.style.setProperty("--code-bg", "#141920");
      document.documentElement.style.setProperty("--code-text", "#ccc");
      document.documentElement.style.setProperty("--code-comment", "#999");
      document.documentElement.style.setProperty("--code-punctuation", "#ccc");
      document.documentElement.style.setProperty("--code-tag", "#e2777a");
      document.documentElement.style.setProperty("--code-function", "#6196cc");
      document.documentElement.style.setProperty("--code-number", "#f08d49");
      document.documentElement.style.setProperty("--code-property", "#f8c555");
      document.documentElement.style.setProperty("--code-keyword", "#cc99cd");
      document.documentElement.style.setProperty("--code-string", "#7ec699");
      document.documentElement.style.setProperty("--code-operator", "#67cdcc");
    } else {
      // Light mode - use light theme colors
      document.documentElement.style.setProperty("--code-bg", "#f8f8f8");
      document.documentElement.style.setProperty("--code-text", "#333");
      document.documentElement.style.setProperty("--code-comment", "#888");
      document.documentElement.style.setProperty("--code-punctuation", "#333");
      document.documentElement.style.setProperty("--code-tag", "#d73a49");
      document.documentElement.style.setProperty("--code-function", "#005cc5");
      document.documentElement.style.setProperty("--code-number", "#e36209");
      document.documentElement.style.setProperty("--code-property", "#b58900");
      document.documentElement.style.setProperty("--code-keyword", "#6f42c1");
      document.documentElement.style.setProperty("--code-string", "#22863a");
      document.documentElement.style.setProperty("--code-operator", "#0086b3");
    }
  };

  const setDarkmode = (mode: boolean) => {
    cookies.set("darkmode", mode, { sameSite: "strict" });
    changeDarkmode(mode);
    setDarkmode_(mode);
  };

  useEffect(() => {
    const cookie = cookies.get("darkmode");
    const mode = cookie === "true";

    if (!cookie) {
      // cookie does not exist yet
      // if the client prefers dark mode, set that appropriately
      const prefersDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      cookies.set("darkmode", prefersDarkMode, { sameSite: "strict" });
    } else {
      setDarkmode(mode);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{ darkmode: darkmode, setDarkmode: setDarkmode }}
    >
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export default MyApp;
