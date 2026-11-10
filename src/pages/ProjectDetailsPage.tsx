import { Link, useParams } from "react-router-dom";
import { usePageTitle } from "../hooks/usePageTitle";

export default function ProjectDetailsPage() {
  const { slug } = useParams();
  usePageTitle("Project");

  return (
    <section className="px-6 py-20 md:px-16">
      <h1 className="font-display text-5xl md:text-6xl">Project details</h1>
      <p className="mt-4 max-w-xl text-stone-deep">
        Development placeholder for the project with slug: {slug}. Project pages
        are built in Phase 3.
      </p>
      <Link
        to="/projects"
        className="mt-8 inline-block text-sm font-medium underline underline-offset-4"
      >
        Back to projects
      </Link>
    </section>
  );
}
