import { Link } from "react-router-dom";
import { ArrowUpRight, Images, Play } from "@phosphor-icons/react";
import { services } from "../../data/services";
import type { Project } from "../../types";

type ProjectCardProps = {
  project: Project;
  ratio?: string;
  // Smaller text and no arrow on phones. Computers look the same either way.
  compact?: boolean;
};

export default function ProjectCard({
  project,
  ratio = "aspect-[4/5]",
  compact = false,
}: ProjectCardProps) {
  const categoryTitle = services.find(
    (service) => service.slug === project.category,
  )?.title;

  // Tall videos get a tall box so the cover isn't cropped to a wide shape.
  const isPortrait = project.media[0]?.orientation === "portrait";
  const boxRatio = isPortrait ? "aspect-[4/5]" : ratio;

  // Tells visitors there is more inside. Only items with a real link count.
  const videoCount = project.media.filter(
    (item) => item.type === "video" && item.url,
  ).length;
  const photoCount = project.media.filter(
    (item) => item.type === "image" && item.url,
  ).length;

  const badgeParts: string[] = [];
  if (videoCount > 0) {
    badgeParts.push(`${videoCount} ${videoCount === 1 ? "video" : "videos"}`);
  }
  if (photoCount > 0) {
    badgeParts.push(`${photoCount} ${photoCount === 1 ? "photo" : "photos"}`);
  }
  const badgeLabel = badgeParts.join(" · ");
  const BadgeIcon = videoCount > 0 ? Play : Images;

  const textTopSpace = compact ? "mt-3 md:mt-5" : "mt-5";
  const categoryText = compact
    ? "text-[0.65rem] leading-snug tracking-[0.08em] md:text-sm md:leading-normal md:tracking-[0.2em]"
    : "text-sm tracking-[0.2em]";
  const titleText = compact
    ? "mt-1.5 text-xl md:mt-2 md:text-4xl"
    : "mt-2 text-3xl md:text-4xl";
  const arrowDisplay = compact ? "hidden md:block" : "";

  return (
    <Link
      to={`/projects/${project.slug}`}
      className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-charcoal"
    >
      <div
        className={`relative isolate overflow-hidden rounded-3xl bg-charcoal/[0.07] ${boxRatio}`}
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

        {badgeLabel && (
          <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-charcoal px-3 py-1.5 text-xs font-medium text-ivory">
            <BadgeIcon
              size={14}
              weight="fill"
              aria-hidden="true"
              className="text-bronze"
            />
            {badgeLabel}
          </span>
        )}
      </div>

      <div className={`${textTopSpace} flex items-start justify-between gap-4`}>
        <div>
          <p className={`uppercase text-stone-deep ${categoryText}`}>
            {categoryTitle}
            {project.occasion ? ` · ${project.occasion}` : ""}
          </p>
          <h3
            className={`font-display font-medium leading-tight text-charcoal transition-transform duration-300 ease-out group-hover:translate-x-1 motion-reduce:transform-none ${titleText}`}
          >
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
          className={`mt-1 flex-none text-charcoal transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 motion-reduce:transform-none ${arrowDisplay}`}
        />
      </div>
    </Link>
  );
}
