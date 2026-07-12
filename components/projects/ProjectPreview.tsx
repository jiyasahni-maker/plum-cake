import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { Project } from "@/types/content";

interface ProjectPreviewProps {
  project: Project;
}

export default function ProjectPreview({
  project,
}: ProjectPreviewProps) {
  return (
    <Container>

      <article className="border-b border-white/10 py-20">

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">

          <div className="max-w-3xl">

            <h3 className="text-4xl font-bold">
              {project.title}
            </h3>

            <p className="mt-6 text-xl opacity-80">
              {project.tagline}
            </p>

            <p className="mt-8 leading-8 opacity-70">
              {project.description}
            </p>

            <div className="mt-10 flex flex-wrap gap-3">

              {project.technologies.map((tech) => (
                <Badge key={tech}>
                  {tech}
                </Badge>
              ))}

            </div>

          </div>

          <div className="flex flex-col gap-4">

            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button>
                  GitHub
                </Button>
              </a>
            )}

            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline">
                  Live Demo
                </Button>
              </a>
            )}

          </div>

        </div>

      </article>

    </Container>
  );
}