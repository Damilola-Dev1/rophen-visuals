import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "@phosphor-icons/react";
import Lightbox from "../components/ui/Lightbox";
import type { LightboxImage } from "../components/ui/Lightbox";
import VideoPlayer from "../components/ui/VideoPlayer";
import { getProjects } from "../data/projects";
import { services } from "../data/services";
import { usePageTitle } from "../hooks/usePageTitle";

export default function ProjectDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = getProjects().find((item) => item.slug === slug);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  usePageTitle(project ? project.title : "Project not found", {
    noindex: !project,
    description: project?.description,
  });

  if (!project) {
    return (
      <section className="px-6 pb-20 pt-36 md:px-16 md:pb-28">
        <div className="mx-auto max-w-[1400px]">
          <h1 className="font-display text-5xl font-medium leading-[0.95] text-charcoal md:text-7xl">
            Project not found
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-stone-deep md:text-lg">
            That project doesn&rsquo;t exist, or it may have been removed.
          </p>
          <Link
            to="/projects"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-charcoal px-7 py-3.5 text-base font-medium text-ivory transition-opacity duration-300 hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-charcoal"
          >
            <ArrowLeft size={20} weight="regular" aria-hidden="true" />
            All projects
          </Link>
        </div>
      </section>
    );
  }

  const categoryTitle = services.find(
    (service) => service.slug === project.category,
  )?.title;

  // Live site: items without a link are skipped. On your computer they show as slots.
  const items = project.media.filter((item) => item.url || import.meta.env.DEV);
  const lightboxImages: LightboxImage[] = items
    .filter((item) => item.type === "image" && item.url)
    .map((item) => ({ url: item.url, alt: item.alt }));

  const details = [project.year, project.clientName].filter(Boolean);

  return (
    <>
      <section className="px-6 pb-20 pt-36 md:px-16 md:pb-28">
        <div className="mx-auto max-w-[1400px]">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-charcoal underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-charcoal"
          >
            <ArrowLeft size={18} weight="regular" aria-hidden="true" />
            All projects
          </Link>

          <p className="mt-10 text-sm uppercase tracking-[0.2em] text-stone-deep">
            {categoryTitle}
            {project.occasion ? ` · ${project.occasion}` : ""}
          </p>
          <h1 className="mt-4 font-display text-5xl font-medium leading-[0.95] text-charcoal md:text-7xl">
            {project.title}
          </h1>
          {project.description && (
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-stone-deep md:text-lg">
              {project.description}
            </p>
          )}
          {details.length > 0 && (
            <p className="mt-4 text-sm text-stone-deep">
              {details.join(" · ")}
            </p>
          )}

          {items.length > 0 && (
            <ul className="mt-12 grid grid-cols-1 gap-4 md:mt-16 md:grid-cols-2 md:gap-6">
              {items.map((item, itemIndex) => {
                if (item.type === "video") {
                  return (
                    <li
                      key={`${itemIndex}-${item.url}`}
                      className="md:col-span-2"
                    >
                      <VideoPlayer
                        videoUrl={item.url}
                        posterImage={item.posterImage}
                        title={item.alt}
                        className="rounded-3xl"
                      />
                    </li>
                  );
                }

                if (!item.url) {
                  return (
                    <li key={`${itemIndex}-slot`}>
                      <div className="flex aspect-[4/5] w-full items-center justify-center rounded-3xl border-2 border-dashed border-charcoal/25 p-6 text-center text-sm text-stone-deep">
                        Dev slot: gallery photo
                      </div>
                    </li>
                  );
                }

                const lightboxIndex = lightboxImages.findIndex(
                  (image) => image.url === item.url,
                );

                return (
                  <li key={`${itemIndex}-${item.url}`}>
                    <button
                      type="button"
                      onClick={() => setOpenIndex(lightboxIndex)}
                      aria-label={`View larger: ${item.alt}`}
                      className="group block w-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-charcoal"
                    >
                      <span className="relative isolate block aspect-[4/5] overflow-hidden rounded-3xl bg-charcoal/[0.07]">
                        <img
                          src={item.url}
                          alt={item.alt}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transform-none"
                        />
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}

          <div className="mt-16 flex flex-col items-start gap-4 sm:flex-row">
            <Link
              to={`/contact?service=${project.category}`}
              className="inline-flex items-center gap-2 rounded-full bg-charcoal px-7 py-3.5 text-base font-medium text-ivory transition-opacity duration-300 hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-charcoal"
            >
              Start a similar project
              <ArrowUpRight size={20} weight="regular" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <Lightbox
        images={lightboxImages}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onChange={setOpenIndex}
      />
    </>
  );
}
