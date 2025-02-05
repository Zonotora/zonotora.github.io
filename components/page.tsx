import { ReactNode } from "react";
import Header from "./header";

type Props = {
  active: string;
  children?: ReactNode;
};

const Page = ({ active, children }: Props) => {
  return (
    <div>
      <Header active={active} />
      <main>{children}</main>
    </div>
  );
};

export default Page;
