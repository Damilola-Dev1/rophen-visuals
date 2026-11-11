import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "@phosphor-icons/react";
import { demoProjects, projects } from "../../data/projects";
import { services } from "../../data/services";

// Asymmetric pattern: card widths, shapes and offsets repeat every four cards.
const spans = [
  "md:col-span-7",
  "md:col-span-5",
  "md:col-span-5",
  "md:col-span-7",
];
const ratios = [
  "aspect-[4/5] md:aspect-[4/3]",
  "aspect-[4/5]",
  "aspect-[4/5]",
  "aspect-[4/5] md:aspect-[4/3]",
];
const offsets = ["", "md:mt-16", "", "md:mt-16"];

export default function FeaturedProjects() {
  const [filter, setFilter] = useState<string>("all");

  const usingDemo = import.meta.env.DEV && projects.length === 0;
  const source = usingDemo ? demoProjects : projects;
  const featured = source.filter((project) => project.featured);

  // Live site: nothing to show means the whole section stays hidden.
  if (featured.length === 0) return null;

  const categories = services.filter((service) =>
    featured.some((project) => project.category === service.slug),
  );
  const visible =
    filter === "all"
      ? featured
      : featured.filter((project) => project.category === filter);

  const chipBase =
    "rounded-full border px-5 py-2.5 text-sm font-medium transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal";
  const chipOn = "border-charcoal bg-charcoal text-ivory";
  const chipOff =
    "border-charcoal/30 text-charcoal hover:bg-charcoal hover:text-ivory";

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
            {usingDemo && (
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
          <div
            role="group"
            aria-label="Filter projects by category"
            className="mt-10 flex flex-wrap gap-2"
          >
            <button
              type="button"
              aria-pressed={filter === "all"}
              onClick={() => setFilter("all")}
              className={`${chipBase} ${filter === "all" ? chipOn : chipOff}`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category.slug}
                type="button"
                aria-pressed={filter === category.slug}
                onClick={() => setFilter(category.slug)}
                className={`${chipBase} ${
                  filter === category.slug ? chipOn : chipOff
                }`}
              >
                {category.title}
              </button>
            ))}
          </div>
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
          <ul className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-12 md:items-start md:gap-x-8 md:gap-y-16">
            {visible.map((project, index) => {
              const pattern = index % 4;
              const categoryTitle = services.find(
                (service) => service.slug === project.category,
              )?.title;

              return (
                <li
                  key={project.slug}
                  className={`${spans[pattern]} ${offsets[pattern]}`}
                >
                  <Link
                    to={`/projects/${project.slug}`}
                    className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-charcoal"
                  >
                    <div
                      className={`relative isolate overflow-hidden rounded-3xl bg-charcoal/[0.07] ${ratios[pattern]}`}
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
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
