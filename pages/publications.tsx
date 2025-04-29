import ProjectPreview from "../components/project-preview";
import Page from "../components/page";
import publications from "../data/publications.json";

export const Home = () => {
  return (
    <Page active="publications">
      {publications.map((publication) => (
        <ProjectPreview
          key={publication.title}
          title={publication.title}
          description={publication.conference}
          tags={publication.authors}
          link=""
          githubLink=""
          archived={false}
        />
      ))}
    </Page>
  );
};

export default Home;
