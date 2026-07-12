import Realm from "@/components/universe/Realm";
import RealmHeader from "@/components/ui/RealmHeader";

import { projects } from "@/data/projects";

import FeaturedProject from "./FeaturedProjects";
import ProjectPreview from "./ProjectPreview";

export default function Projects() {
  const featuredProject = projects.find(
    (project) => project.featured
  );

  const otherProjects = projects.filter(
    (project) => !project.featured
  );

  return (
    <Realm id="projects">

      <RealmHeader
        eyebrow="Selected Work"
        title="Building software that begins with curiosity and ends with impact."
        description="Every project is an exploration of an idea—from understanding the problem to engineering a thoughtful solution."
      />

      {featuredProject && (
        <FeaturedProject project={featuredProject} />
      )}

      {otherProjects.map((project) => (
        <ProjectPreview
          key={project.id}
          project={project}
        />
      ))}

    </Realm>
  );
}