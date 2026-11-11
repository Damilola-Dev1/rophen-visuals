type FilterChipsProps = {
  categories: { slug: string; title: string }[];
  value: string;
  onChange: (value: string) => void;
};

const chipBase =
  "flex-none whitespace-nowrap rounded-full border px-5 py-2.5 text-sm font-medium transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal";
const chipOn = "border-charcoal bg-charcoal text-ivory";
const chipOff =
  "border-charcoal/30 text-charcoal hover:bg-charcoal hover:text-ivory";

// One swipeable row on phones, wrapping normally on larger screens.
export default function FilterChips({
  categories,
  value,
  onChange,
}: FilterChipsProps) {
  return (
    <div
      role="group"
      aria-label="Filter projects by category"
      className="-mx-6 mt-10 flex gap-2 overflow-x-auto px-6 pb-2 [scrollbar-width:none] md:mx-0 md:flex-wrap md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden"
    >
      <button
        type="button"
        aria-pressed={value === "all"}
        onClick={() => onChange("all")}
        className={`${chipBase} ${value === "all" ? chipOn : chipOff}`}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category.slug}
          type="button"
          aria-pressed={value === category.slug}
          onClick={() => onChange(category.slug)}
          className={`${chipBase} ${value === category.slug ? chipOn : chipOff}`}
        >
          {category.title}
        </button>
      ))}
    </div>
  );
}
