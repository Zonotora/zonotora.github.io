import ProjectPreview from "../components/project-preview";
import Page from "../components/page";
import projects from "../data/projects.json";

export const Home = () => {
  return (
    <Page active="projects">
      <div className="posts">
        {projects.map((project) => (
          <ProjectPreview
            key={project.title}
            title={project.title}
            description={project.description}
            tags={project.tags}
            link={project.link}
            githubLink={project.githubLink}
            archived={project.archived}
          />
        ))}
      </div>
    </Page>
  );
};

export default Home;
