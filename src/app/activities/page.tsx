import Link from "next/link";
import Image from "next/image";

// 活動報告データ
const activities = [
  {
    id: "php-tsudoi-131",
    date: "2026年1月31日",
    title: "第131回「PHPの集い」講演",
    location: "能登川コミュニティーセンター",
    organizer: "PHPはーとふる滋賀・きぬがさ",
    theme: "あなたの知らない日本の原点、歴史が動いた舞台は東近江市にあった",
    description:
      "東近江市の自然・歴史・文化資源について「前川史観」として系統立てて語りました。2億年前から現代へと続く壮大な物語の中で、なぜこの土地が日本史の重要な舞台であり続けたのかを解き明かしました。",
    topics: [
      '東近江の地層の特異さの理由とは？2億年前の赤道から',
      "太郎坊山を生んだ「1.5億年前の巨大カルデラ」とは？",
      "日本最古級の定住集落はなぜこの地に生まれたのか？",
      "万葉集に詠まれた「近江」の知られざる黄金時代",
      "聖徳太子が東近江に残した足跡とは？",
      "あの三井財閥のルーツが東近江にある理由",
    ],
  },
];

export default function ActivitiesPage() {
  return (
    <main className="min-h-screen bg-kinari">
      {/* Header Navigation */}
      <header className="fixed top-0 left-0 right-0 bg-kinari/95 backdrop-blur-sm z-50 border-b border-sumi/10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link
            href="/"
            className="text-xl font-serif font-bold text-sumi-dark hover:text-kokihi transition-colors"
          >
            それはまことですか
          </Link>
          <nav className="flex gap-6 text-sm font-serif">
            <Link
              href="/#stories"
              className="text-sumi hover:text-kokihi transition-colors"
            >
              歴史の断片
            </Link>
            <Link href="/activities" className="text-kokihi font-bold">
              活動報告
            </Link>
            <Link
              href="/support"
              className="text-sumi hover:text-kokihi transition-colors"
            >
              書籍化プロジェクト
            </Link>
          </nav>
        </div>
      </header>

      {/* Page Title */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-kokihi text-xs font-bold tracking-widest mb-4 block">
            ACTIVITIES
          </span>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-sumi-dark mb-6">
            活動報告
          </h1>
          <p className="text-sumi/80 font-serif leading-relaxed">
            前川真司が各地で行った講演や勉強会の記録です。
            <br />
            「それはまことですか？」を通じて、近江の歴史の深層を伝え続けています。
          </p>
        </div>
      </section>

      {/* Activities List */}
      <section className="pb-24 px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          {activities.map((activity, index) => (
            <article
              key={activity.id}
              className="bg-white p-8 md:p-12 shadow-lg border border-sumi/10 relative"
            >
              {/* Corner Decorations */}
              <div className="absolute -top-3 -left-3 w-6 h-6 border-l-2 border-t-2 border-kokihi"></div>
              <div className="absolute -bottom-3 -right-3 w-6 h-6 border-r-2 border-b-2 border-kokihi"></div>

              {/* Activity Number */}
              <span className="text-kokihi text-xs font-bold tracking-widest mb-4 block">
                REPORT {String(index + 1).padStart(2, "0")}
              </span>

              {/* Date & Location & Organizer */}
              <div className="flex flex-wrap gap-4 mb-4 text-sm text-sumi/70 font-serif">
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 inline-block bg-kokihi/10 rounded-full"></span>
                  {activity.date}
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 inline-block bg-sumi/10 rounded-full"></span>
                  {activity.location}
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 inline-block bg-sumi/10 rounded-full"></span>
                  主催：{activity.organizer}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-sumi-dark mb-4">
                {activity.title}
              </h2>

              {/* Theme */}
              <div className="bg-kinari p-4 mb-6 border-l-4 border-kokihi">
                <p className="text-sumi font-serif text-sm">
                  <span className="text-kokihi font-bold">テーマ：</span>
                  {activity.theme}
                </p>
              </div>

              {/* Description */}
              <p className="text-sumi leading-loose font-serif mb-8">
                {activity.description}
              </p>

              {/* Topics */}
              <div>
                <h3 className="text-sm font-bold text-kokihi mb-4 tracking-widest">
                  講演トピック
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {activity.topics.map((topic, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-sumi font-serif"
                    >
                      <span className="text-kokihi mt-1">・</span>
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-sumi-dark text-kinari py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-6">
            講演のご依頼について
          </h2>
          <p className="text-kinari/80 font-serif leading-relaxed mb-10">
            企業研修、地域イベント、教育機関など、
            <br />
            様々な場での講演を承っております。
            <br />
            「それはまことですか？」を通じて、歴史の新たな視点をお届けします。
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center bg-kokihi text-white px-8 py-4 hover:bg-white hover:text-sumi-dark transition-all duration-300 shadow-lg font-serif font-bold"
          >
            講演のご依頼・お問い合わせ
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-sumi-dark text-kinari pt-16 pb-8">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-t border-kinari/20 pt-8">
            <Link
              href="/"
              className="text-xl font-serif font-bold hover:text-kokihi transition-colors"
            >
              それはまことですか
            </Link>
            <nav className="flex gap-6 text-sm font-serif opacity-60">
              <Link
                href="/#stories"
                className="hover:text-kokihi transition-colors"
              >
                歴史の断片
              </Link>
              <Link
                href="/activities"
                className="hover:text-kokihi transition-colors"
              >
                活動報告
              </Link>
              <Link
                href="/support"
                className="hover:text-kokihi transition-colors"
              >
                書籍化プロジェクト
              </Link>
              <Link
                href="/contact"
                className="hover:text-kokihi transition-colors"
              >
                お問い合わせ
              </Link>
            </nav>
          </div>
          <div className="text-center text-xs opacity-40 font-serif mt-8">
            &copy; {new Date().getFullYear()} Sore wa Makoto desu ka Production Team.
            All Rights Reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
