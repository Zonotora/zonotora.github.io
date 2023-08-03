import ProjectPreview from "../components/project-preview";
import Header from "../components/header";
import projects from "../data/projects.json";

export const Home = () => {
  return (
    <div className="main">
      <Header active="projects" />

      <div className="posts">
        {projects.map((project) => (
          <ProjectPreview
            key={project.title}
            title={project.title}
            description={project.description}
            tags={project.tags}
            link={project.link}
            githubLink={project.githubLink}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
