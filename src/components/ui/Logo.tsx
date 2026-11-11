import { site } from "../../data/site";

type LogoProps = {
  className?: string;
};

// The white logo, for dark backgrounds only (nav, menu, footer).
export default function Logo({ className = "h-9 w-auto" }: LogoProps) {
  return <img src="/logo.png" alt={site.name} className={className} />;
}
