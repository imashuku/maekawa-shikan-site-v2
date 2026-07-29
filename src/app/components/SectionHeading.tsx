export default function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={
        align === "center"
          ? "mx-auto max-w-3xl text-center"
          : "max-w-3xl text-left"
      }
    >
      <p className="text-xs font-bold tracking-[0.24em] text-kokihi">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl font-bold leading-snug md:text-5xl">
        {title}
      </h2>
      {lead ? (
        <p className="mt-5 leading-8 text-sumi/75 md:text-lg">{lead}</p>
      ) : null}
    </div>
  );
}
