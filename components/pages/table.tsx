import { ReactNode } from "react";

type Props = {
  id: string;
  description: string;
  width?: string;
  children?: ReactNode;
};

const Table = ({ id, description, width, children }: Props) => {
  return (
    <div className="table">
      <div style={{ width: width ? width : "100%" }}>
        <label id={id}>{description}</label>
        {children}
      </div>
    </div>
  );
};

export default Table;
