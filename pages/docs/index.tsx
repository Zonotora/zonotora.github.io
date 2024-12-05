import Header from "../../components/header";
import Tag from "../../components/tag";
import Link from "next/link";

const docs = [
  {
    title: "guidos",
    description: "Operating system from scratch.",
    tags: ["os", "c", "assembly", "x86"],
    link: "https://zonotora.github.io/guidos/book/index.html",
  },
];

export const Home = () => {
  return (
    <div className="main">
      <Header active="docs" />
      <div className="posts">
        {docs.map((doc) => (
          <Link
            key={doc.title}
            href={doc.link}
            className="project-preview"
            style={{ cursor: "pointer" }}
          >
            <div style={{ position: "absolute", right: "0" }}></div>
            <div className="project-preview-title">
              <b>{doc.title}</b>
            </div>
            <div className="project-preview-info tags">
              {doc.tags.map((tag) => (
                <Tag key={tag} name={tag} />
              ))}
            </div>
            <div className="project-preview-content">{doc.description}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
