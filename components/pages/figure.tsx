import { ReactNode } from "react";

type Props = {
  id: string;
  description: string;
  source?: string;
  children?: ReactNode;
};

const Figure = ({ id, description, children, source }: Props) => {
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
      <label id={id}></label>
      {children}
      <label>
        {description} {sourceNode}
      </label>
    </div>
  );
};

export default Figure;
