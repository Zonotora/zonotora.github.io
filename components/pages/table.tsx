import { ReactNode } from "react";

type Props = {
  id: string;
  description: string;
  children?: ReactNode;
};

const Table = ({ id, description, children }: Props) => {
  return (
    <div className="table">
      <label id={id}>{description}</label>
      {children}
    </div>
  );
};

export default Table;
