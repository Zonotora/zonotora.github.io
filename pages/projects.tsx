import ProjectPreview from "../components/project-preview";
import Page from "../components/page";
import projects from "../data/projects.json";

export const Home = () => {
  return (
    <Page active="projects">
      {projects.map((project) => (
        <ProjectPreview
          key={project.title}
          title={project.title}
          description={project.description}
          tags={project.tags}
          link={project.link}
          githubLink={project.githubLink}
          documentationLink={project.documentationLink}
          archived={project.archived}
        />
      ))}
    </Page>
  );
};

export default Home;
