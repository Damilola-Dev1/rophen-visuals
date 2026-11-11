import { Link } from "react-router-dom";
import { ArrowUpRight } from "@phosphor-icons/react";
import { services } from "../../data/services";
import type { Project } from "../../types";

type ProjectCardProps = {
  project: Project;
  ratio?: string;
};

export default function ProjectCard({
  project,
  ratio = "aspect-[4/5]",
}: ProjectCardProps) {
  const categoryTitle = services.find(
    (service) => service.slug === project.category,
  )?.title;

  return (
    <Link
      to={`/projects/${project.slug}`}
      className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-charcoal"
    >
      <div
        className={`relative isolate overflow-hidden rounded-3xl bg-charcoal/[0.07] ${ratio}`}
      >
        {project.coverImage ? (
          <img
            src={project.coverImage}
            alt={`${project.title} cover`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transform-none"
          />
        ) : (
          import.meta.env.DEV && (
            <div className="flex h-full w-full items-center justify-center p-6 text-center text-sm text-stone-deep">
              Dev slot: cover image
            </div>
          )
        )}
      </div>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-stone-deep">
            {categoryTitle}
            {project.occasion ? ` · ${project.occasion}` : ""}
          </p>
          <h3 className="mt-2 font-display text-3xl font-medium leading-tight text-charcoal transition-transform duration-300 ease-out group-hover:translate-x-1 motion-reduce:transform-none md:text-4xl">
            {project.title}
          </h3>
          {project.description && (
            <p className="mt-2 max-w-md text-base leading-relaxed text-stone-deep">
              {project.description}
            </p>
          )}
        </div>
        <ArrowUpRight
          size={26}
          weight="regular"
          aria-hidden="true"
          className="mt-1 flex-none text-charcoal transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 motion-reduce:transform-none"
        />
      </div>
    </Link>
  );
}
