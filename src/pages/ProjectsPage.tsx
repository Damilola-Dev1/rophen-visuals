import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "@phosphor-icons/react";
import FilterChips from "../components/ui/FilterChips";
import ProjectCard from "../components/ui/ProjectCard";
import { getProjects, isUsingDemoProjects } from "../data/projects";
import { services } from "../data/services";
import { usePageTitle } from "../hooks/usePageTitle";

export default function ProjectsPage() {
  usePageTitle("Projects");

  const [filter, setFilter] = useState<string>("all");

  const all = getProjects();
  const categories = services.filter((service) =>
    all.some((project) => project.category === service.slug),
  );
  const visible =
    filter === "all"
      ? all
      : all.filter((project) => project.category === filter);

  return (
    <section className="px-6 pb-20 pt-36 md:px-16 md:pb-28">
      <div className="mx-auto max-w-[1400px]">
        <p className="text-sm uppercase tracking-[0.2em] text-stone-deep">
          Selected work
        </p>
        <h1 className="mt-4 font-display text-5xl font-medium leading-[0.95] text-charcoal md:text-7xl">
          Projects
        </h1>

        {isUsingDemoProjects && (
          <p className="mt-4 text-sm text-stone-deep">
            Dev only: these are demo cards. Add real projects in
            src/data/projects.ts.
          </p>
        )}

        {all.length === 0 ? (
          <div className="mt-12 max-w-xl">
            <p className="text-base leading-relaxed text-stone-deep md:text-lg">
              New projects are being added. Check back soon, or tell me about
              your idea in the meantime.
            </p>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-charcoal px-7 py-3.5 text-base font-medium text-ivory transition-opacity duration-300 hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-charcoal"
            >
              Start a Project
              <ArrowUpRight size={20} weight="regular" aria-hidden="true" />
            </Link>
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
    </section>
  );
}
