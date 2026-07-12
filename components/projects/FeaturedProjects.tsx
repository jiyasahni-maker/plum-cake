import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import { Project } from "@/types/content";

interface FeaturedProjectProps {
  project: Project;
}

export default function FeaturedProject({
  project,
}: FeaturedProjectProps) {
  return (
    <Container>
      <article className="py-32">

        <p className="mb-6 uppercase tracking-[0.35em] text-sm opacity-70">
          Featured Project
        </p>

        <h3 className="text-5xl md:text-7xl font-black leading-tight">
          {project.title}
        </h3>

        <p className="mt-8 max-w-3xl text-2xl leading-relaxed opacity-85">
          {project.tagline}
        </p>

        <p className="mt-10 max-w-3xl leading-8 opacity-70">
          {project.description}
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          {project.technologies.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>

        <div className="mt-12 flex gap-4 flex-wrap">

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button>
                View Source
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

      </article>
    </Container>
  );
}