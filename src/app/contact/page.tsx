import { siteConfig } from "@/content/site";

const consultationTypes = [
  {
    title: "講演・研修",
    body: "企業、学校、地域団体、文化活動など。目的と時間に合わせてテーマを組み立てます。",
  },
  {
    title: "取材・出演",
    body: "近江史、地域の物語、歴史コンテンツづくりについての取材・出演相談。",
  },
  {
    title: "企画・協業",
    body: "ツアー、教材、地域企画、出版、映像など、前川史観を活かした共同制作。",
  },
] as const;

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-sumi/15 bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-5">
          <p className="text-xs font-bold tracking-[0.24em] text-kokihi">
            CONTACT
          </p>
          <h1 className="mt-5 text-4xl font-bold md:text-6xl">
            前川史観を、
            <br />
            新しい場へ。
          </h1>
          <p className="mt-7 max-w-3xl leading-8 text-sumi/75">
            講演、取材、教育、地域企画などのご相談は、現在、公式LINEで受け付けています。
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-5">
          <div className="grid gap-px border border-sumi/15 bg-sumi/15 md:grid-cols-3">
            {consultationTypes.map((item) => (
              <article key={item.title} className="bg-white p-7">
                <h2 className="text-xl font-bold">{item.title}</h2>
                <p className="mt-4 text-sm leading-7 text-sumi/70">
                  {item.body}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-12 border-l-4 border-[#057538] bg-paper p-7 md:p-10">
            <p className="text-xs font-bold tracking-[0.2em] text-[#078c40]">
              HOW TO CONTACT
            </p>
            <h2 className="mt-3 text-2xl font-bold md:text-3xl">
              公式LINEからご連絡ください
            </h2>
            <p className="mt-5 leading-8 text-sumi/70">
              お名前、所属、希望内容、希望時期、折り返し先をお送りいただくと、その後のご案内がスムーズです。
            </p>
            <a
              href={siteConfig.urls.line}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex bg-[#057538] px-8 py-4 font-bold text-white"
            >
              公式LINEを開く
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
