import "../styles/globals.css";
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
      cookies.set("darkmode", darkmode, { sameSite: "strict" });
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
