import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "@phosphor-icons/react";
import FilterChips from "../ui/FilterChips";
import ProjectCard from "../ui/ProjectCard";
import { getProjects, isUsingDemoProjects } from "../../data/projects";
import { services } from "../../data/services";

export default function FeaturedProjects() {
  const [filter, setFilter] = useState<string>("all");

  const featured = getProjects().filter((project) => project.featured);

  // Live site: nothing to show means the whole section stays hidden.
  if (featured.length === 0) return null;

  const categories = services.filter((service) =>
    featured.some((project) => project.category === service.slug),
  );
  const visible =
    filter === "all"
      ? featured
      : featured.filter((project) => project.category === filter);

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="bg-ivory px-6 pb-20 pt-8 md:px-16 md:pb-28 md:pt-16"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-stone-deep">
              Selected work
            </p>
            <h2
              id="projects-heading"
              className="mt-4 font-display text-5xl font-medium leading-[0.95] text-charcoal md:text-7xl"
            >
              Featured Projects
            </h2>
            {isUsingDemoProjects && (
              <p className="mt-4 text-sm text-stone-deep">
                Dev only: these are demo cards. Add real projects in
                src/data/projects.ts.
              </p>
            )}
          </div>

          <Link
            to="/projects"
            className="inline-flex items-center gap-2 self-start rounded-full bg-charcoal px-7 py-3.5 text-base font-medium text-ivory transition-opacity duration-300 hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-charcoal md:self-auto"
          >
            View All Projects
            <ArrowUpRight size={20} weight="regular" aria-hidden="true" />
          </Link>
        </div>

        {categories.length > 1 && (
          <FilterChips
            categories={categories}
            value={filter}
            onChange={setFilter}
          />
        )}

        {visible.length === 0 ? (
          <div className="mt-12 rounded-3xl border border-charcoal/15 p-8 text-center">
            <p className="text-base text-stone-deep">
              No projects in this category yet.
            </p>
            <button
              type="button"
              onClick={() => setFilter("all")}
              className="mt-4 text-sm font-medium text-charcoal underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-charcoal"
            >
              Show all projects
            </button>
          </div>
        ) : (
          <ul className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2 md:gap-x-8 md:gap-y-16 lg:grid-cols-3">
            {visible.map((project) => (
              <li key={project.slug}>
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
