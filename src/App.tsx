const swatches = [
  {
    name: "Deep Charcoal",
    token: "charcoal",
    hex: "#24231F",
    style: "bg-charcoal text-ivory",
  },
  {
    name: "Warm Ivory",
    token: "ivory",
    hex: "#F2EEE6",
    style: "bg-ivory text-charcoal border border-charcoal/30",
  },
  {
    name: "Muted Bronze",
    token: "bronze",
    hex: "#C5A77D",
    style: "bg-bronze text-charcoal",
  },
  {
    name: "Stone Grey",
    token: "stone-grey",
    hex: "#817B70",
    style: "bg-stone-grey text-charcoal",
  },
  {
    name: "Stone Deep (proposed)",
    token: "stone-deep",
    hex: "#5E5950",
    style: "bg-stone-deep text-ivory",
  },
];

export default function App() {
  return (
    <div>
      <section className="bg-charcoal px-6 py-20 text-ivory md:px-16 md:py-28">
        <p className="text-sm uppercase tracking-[0.2em] text-bronze">
          Token check · dark section
        </p>
        <h1 className="mt-6 max-w-3xl font-display text-5xl leading-[1.05] md:text-7xl">
          Visual stories, captured with intention.
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-ivory/80">
          From personal moments to brand campaigns and live events, Rophen
          Visuals creates videos and photographs that bring your ideas to life.
        </p>
        <a
          href="#palette"
          className="mt-10 inline-block border border-bronze px-6 py-3 text-sm font-medium tracking-wide text-bronze transition-colors hover:bg-bronze hover:text-charcoal"
        >
          Explore Our Work
        </a>
      </section>

      <section id="palette" className="px-6 py-20 md:px-16">
        <h2 className="font-display text-4xl md:text-5xl">
          Typography and colour check
        </h2>
        <p className="mt-4 max-w-xl leading-relaxed text-stone-deep">
          Body text is DM Sans. Small secondary text uses Stone Deep so it stays
          readable on ivory.
        </p>
        <p className="mt-8 font-display text-3xl italic text-stone-grey md:text-4xl">
          Stone Grey is reserved for large display text like this.
        </p>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {swatches.map((s) => (
            <li key={s.token} className={`p-6 ${s.style}`}>
              <p className="text-lg font-medium">{s.name}</p>
              <p className="mt-8 text-sm">{s.hex}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
