import { useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
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
  const [activePhoto, setActivePhoto] = useState(0);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const reduceMotion = useReducedMotion();

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
  const videos = items.filter((item) => item.type === "video");
  const photos = items.filter((item) => item.type === "image");
  const lightboxImages: LightboxImage[] = photos
    .filter((item) => item.url)
    .map((item) => ({ url: item.url, alt: item.alt }));

  const details = [project.year, project.clientName].filter(Boolean);

  // Fade-up on page load (top of the page). Skipped if "reduce motion" is on.
  const riseOnLoad = (delay: number) =>
    reduceMotion
      ? {}
      : ({
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: "easeOut" },
        } as const);

  // Fade-up when scrolled into view (lower blocks). Plays once.
  const riseInView = reduceMotion
    ? {}
    : ({
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.1 },
        transition: { duration: 0.7, ease: "easeOut" },
      } as const);

  // Phone swipe row: work out which photo is in view, for the counter.
  const handlePhotoScroll = () => {
    const scroller = scrollerRef.current;
    const first = scroller?.firstElementChild as HTMLElement | null;
    if (!scroller || !first) return;
    const gap = 12; // matches gap-3
    const step = first.offsetWidth + gap;
    const index = Math.round(scroller.scrollLeft / step);
    setActivePhoto(Math.min(Math.max(index, 0), photos.length - 1));
  };

  return (
    <>
      <section className="px-6 pb-20 pt-36 md:px-16 md:pb-28">
        <div className="mx-auto max-w-[1400px]">
          <motion.div {...riseOnLoad(0)}>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-sm font-medium text-charcoal underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-charcoal"
            >
              <ArrowLeft size={18} weight="regular" aria-hidden="true" />
              All projects
            </Link>
          </motion.div>

          <motion.p
            {...riseOnLoad(0.08)}
            className="mt-10 text-sm uppercase tracking-[0.2em] text-stone-deep"
          >
            {categoryTitle}
            {project.occasion ? ` · ${project.occasion}` : ""}
          </motion.p>
          <motion.h1
            {...riseOnLoad(0.16)}
            className="mt-4 font-display text-5xl font-medium leading-[0.95] text-charcoal md:text-7xl"
          >
            {project.title}
          </motion.h1>
          {project.description && (
            <motion.p
              {...riseOnLoad(0.26)}
              className="mt-6 max-w-2xl text-base leading-relaxed text-stone-deep md:text-lg"
            >
              {project.description}
            </motion.p>
          )}
          {details.length > 0 && (
            <motion.p
              {...riseOnLoad(0.32)}
              className="mt-4 text-sm text-stone-deep"
            >
              {details.join(" · ")}
            </motion.p>
          )}

          {videos.length > 0 && (
            <motion.ul
              {...riseInView}
              className="mt-12 grid grid-cols-1 gap-4 md:mt-16 md:grid-cols-2 md:gap-6"
            >
              {videos.map((item, itemIndex) => {
                // Tall videos get a tall box. Two tall videos sit side by side.
                const portrait = item.orientation === "portrait";
                const alone = videos.length === 1;
                return (
                  <li
                    key={`${itemIndex}-${item.url}`}
                    className={portrait && !alone ? "" : "md:col-span-2"}
                  >
                    <VideoPlayer
                      videoUrl={item.url}
                      posterImage={item.posterImage}
                      title={item.alt}
                      aspect={portrait ? "portrait" : "landscape"}
                      className={
                        portrait
                          ? "mx-auto w-full max-w-sm rounded-3xl"
                          : "rounded-3xl"
                      }
                    />
                  </li>
                );
              })}
            </motion.ul>
          )}

          {photos.length > 0 && (
            <motion.div {...riseInView} className="mt-12 md:mt-16">
              {/* Phone: swipe row. Computer: three columns, kept narrow so photos are smaller. */}
              <ul
                ref={scrollerRef}
                onScroll={handlePhotoScroll}
                className="-mx-6 flex snap-x snap-mandatory scroll-px-6 gap-3 overflow-x-auto px-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-auto md:grid md:max-w-5xl md:snap-none md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0"
              >
                {photos.map((item, itemIndex) => {
                  if (!item.url) {
                    return (
                      <li
                        key={`${itemIndex}-slot`}
                        className="w-[78%] flex-none snap-start md:w-auto"
                      >
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
                    <li
                      key={`${itemIndex}-${item.url}`}
                      className="w-[78%] flex-none snap-start md:w-auto"
                    >
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

              {photos.length > 1 && (
                <p
                  className="mt-4 text-center text-sm text-stone-deep md:hidden"
                  aria-live="polite"
                >
                  {activePhoto + 1} / {photos.length}
                </p>
              )}
            </motion.div>
          )}

          <motion.div
            {...riseInView}
            className="mt-16 flex flex-col items-start gap-4 sm:flex-row"
          >
            <Link
              to={`/contact?service=${project.category}`}
              className="inline-flex items-center gap-2 rounded-full bg-charcoal px-7 py-3.5 text-base font-medium text-ivory transition-opacity duration-300 hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-charcoal"
            >
              Start a similar project
              <ArrowUpRight size={20} weight="regular" aria-hidden="true" />
            </Link>
          </motion.div>
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
