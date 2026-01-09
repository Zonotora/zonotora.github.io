import { ReactNode } from "react";

type Props = {
  id: string;
  description: string;
  source?: string;
  width?: string;
  children?: ReactNode;
};

const Figure = ({ id, description, children, source, width }: Props) => {
  const sourceNode = source ? (
    <>
      (See{" "}
      <a href={source} target="_blank" rel="noopener noreferrer">
        source
      </a>
      )
    </>
  ) : (
    <></>
  );
  return (
    <div className="figure">
      <div style={{ width: width ? width : "100%" }}>
        <label id={id}></label>
        {children}
        <label>
          {description} {sourceNode}
        </label>
      </div>
    </div>
  );
};

export default Figure;
