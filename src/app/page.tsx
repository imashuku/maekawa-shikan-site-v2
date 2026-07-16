import Link from "next/link";
import Image from "next/image";
import LatestNote from "./components/LatestNote";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 py-8 sm:p-20 relative overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply bg-[url('/noise.svg')] bg-repeat"></div>

      {/* Hero Section */}
      <section className="relative z-10 w-full max-w-5xl flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 py-16 md:py-32">
        {/* Title Group — horizontal on mobile, vertical writing from md */}
        <div className="flex flex-col items-center text-center gap-6 md:flex-row-reverse md:text-left md:gap-12 md:min-h-[60vh] md:h-[75vh] md:items-center md:justify-center md:py-0">
          <h1 className="font-serif font-bold text-sumi-dark tracking-widest leading-snug md:leading-loose animate-fade-in-up drop-shadow-sm select-none text-3xl sm:text-4xl md:text-5xl lg:text-7xl md:[writing-mode:vertical-rl] md:[text-orientation:upright]">
            <span className="text-kokihi">勝者</span>の歴史が、
            <br />
            全てか。
          </h1>
          <div className="flex flex-col gap-3 md:gap-0 md:h-full md:justify-center md:pt-8">
            <p className="font-serif text-sumi tracking-wider md:tracking-widest leading-relaxed md:leading-loose animate-fade-in-up delay-200 select-none text-base md:text-2xl md:[writing-mode:vertical-rl] md:[text-orientation:upright]">
              隠されたルーツ。
              <br />
              敗れし者の祈り。
            </p>
            <p className="font-serif text-sumi/80 tracking-wider md:tracking-widest leading-relaxed md:leading-loose mt-4 md:mt-8 animate-fade-in-up delay-300 select-none text-sm md:text-xl md:[writing-mode:vertical-rl] md:[text-orientation:upright]">
              近江に眠る、
              <br />
              <span className="border-b-2 md:border-b-0 md:border-r-2 border-kokihi pb-0.5 md:pb-0 md:pr-2">
                もう一つの日本史
              </span>
              <br />
              を紐解く。
            </p>
          </div>
        </div>

        {/* Hero Image / Emblem */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-15 md:opacity-20 pointer-events-none select-none mix-blend-multiply">
          <div className="relative w-[260px] h-[260px] md:w-[600px] md:h-[600px] animate-pulse-slow">
            <Image
              src="/kamon.png"
              alt="Maekawa Kamon"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 60vw, 600px"
              priority
            />
          </div>
        </div>

        {/* Introduction Text — flows below hero on mobile, absolute on desktop */}
        <div className="relative md:absolute md:bottom-8 left-0 w-full text-center md:text-left md:pl-12 mt-8 md:mt-0 animate-fade-in">
          <p className="font-serif text-sumi-dark text-sm md:text-base tracking-[0.2em] uppercase mb-3 opacity-80">
            IS THAT THE TRUTH?
          </p>
          <div className="h-px w-24 bg-kokihi mx-auto md:mx-0 mb-3"></div>
          <p className="text-kokihi text-sm font-bold tracking-[0.4em]">
            それはまことですか？
          </p>
        </div>
      </section>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 animate-bounce text-sumi opacity-50 hidden md:block">
        <span className="vertical-rl text-xs tracking-widest">スクロール</span>
      </div>

      {/* --- Section: Salon Announcement (YOOR) --- */}
      <section
        id="salon"
        className="w-full bg-kokihi/5 py-20 md:py-28 border-y border-kokihi/15 text-sumi"
      >
        <div className="max-w-4xl mx-auto px-5 md:px-0">
          <div className="text-center mb-10 md:mb-14">
            <span className="inline-flex items-center gap-2 text-kokihi text-xs font-bold tracking-widest mb-5">
              <span className="rounded-sm bg-kokihi text-white px-2 py-0.5">
                NEW
              </span>
              <span>ONLINE SALON ／ 事前受付中</span>
            </span>
            <h2 className="text-2xl md:text-4xl font-serif font-bold leading-relaxed mb-4 text-sumi-dark">
              オンライン歴史ラウンジ
              <br />
              「近江にみちびかれて」開講
            </h2>
            <p className="font-serif text-sumi text-base md:text-lg tracking-wider">
              今いるこの場所が、もっと好きになる時間。
            </p>
            <p className="text-sumi/60 text-xs md:text-sm mt-3 tracking-wider">
              「近江解体新書」プロジェクト 〜前川史観から読み解く近江の歴史〜
            </p>
          </div>

          {/* Invitation video */}
          <div className="mb-12 md:mb-14">
            <div className="text-center mb-5">
              <span className="text-kokihi text-xs font-bold tracking-widest">
                まずは、無料の招待動画から
              </span>
            </div>
            <div className="relative aspect-video w-full max-w-3xl mx-auto overflow-hidden rounded-sm shadow-lg border border-sumi/10 bg-sumi-dark">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/gjrhWpu5CjY"
                title="オンライン歴史ラウンジ「近江にみちびかれて」へのご招待"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>

          {/* Detail grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-sumi/10 border border-sumi/10 mb-10 md:mb-12 shadow-sm">
            <div className="bg-white p-6 md:p-8">
              <p className="text-kokihi text-xs font-bold tracking-widest mb-2">
                開講
              </p>
              <p className="font-serif text-lg md:text-xl font-bold text-sumi-dark">
                2026年6月11日(木)
              </p>
              <p className="text-sumi/70 text-xs mt-1.5">第1回スタート</p>
            </div>
            <div className="bg-white p-6 md:p-8">
              <p className="text-kokihi text-xs font-bold tracking-widest mb-2">
                形式
              </p>
              <p className="font-serif text-lg md:text-xl font-bold text-sumi-dark">
                毎月第2木曜 19:00〜21:00
              </p>
              <p className="text-sumi/70 text-xs mt-1.5 leading-relaxed">
                全10回（2026年6月〜2027年3月）／オンライン（Zoom）
              </p>
            </div>
            <div className="bg-white p-6 md:p-8">
              <p className="text-kokihi text-xs font-bold tracking-widest mb-2">
                参加費
              </p>
              <p className="font-serif text-lg md:text-xl font-bold text-sumi-dark">
                全10回パス ¥12,000
                <span className="text-xs font-normal text-sumi/60 ml-1">(税込)</span>
              </p>
              <p className="text-sumi/70 text-xs mt-1.5">
                1回あたり1,200円／単発 ¥1,500
              </p>
            </div>
            <div className="bg-white p-6 md:p-8">
              <p className="text-kokihi text-xs font-bold tracking-widest mb-2">
                アーカイブ
              </p>
              <p className="font-serif text-lg md:text-xl font-bold text-sumi-dark">
                見逃しても後日視聴OK
              </p>
              <p className="text-sumi/70 text-xs mt-1.5">
                全回のアーカイブ見放題
              </p>
            </div>
          </div>

          {/* Full 10-session curriculum */}
          <div className="mb-12 md:mb-14">
            <div className="text-center mb-8">
              <h3 className="font-serif text-xl md:text-2xl font-bold mb-2 text-sumi-dark">
                全10回のものがたり
              </h3>
              <p className="text-sumi/60 text-xs md:text-sm tracking-wider">
                各回ひとつの問いから出発し、近江を入口に日本史を読み直します。
              </p>
            </div>
            <ol className="bg-white border border-sumi/10 rounded-sm shadow-sm divide-y divide-sumi/10 px-5 md:px-8">
              {[
                { date: "2026/06/11", title: "近江は、私たちのどこにいたのだろう", sub: "日本史の地図を、近江から広げてみる" },
                { date: "2026/07/09", title: "一万年前の、しあわせのかたち", sub: "東近江の縄文と土偶が語るもの" },
                { date: "2026/08/13", title: "もしかして、ここが「あの国」？", sub: "邪馬台国近江説というロマン" },
                { date: "2026/09/10", title: "兄と弟が、国を二つに分けた日", sub: "ふたつの正義がぶつかった、古代の決断" },
                { date: "2026/10/08", title: "負けた者は、どこへ消えたのか", sub: "近江に残る源平の伝承と、生きのびる人々の物語" },
                { date: "2026/11/12", title: "同じ血が、争うとき", sub: "近江を動かした一族たちの素顔" },
                { date: "2026/12/10", title: "刀を置いて、そろばんを持った人たち", sub: "敗者はなぜ商人になったのか─三井家誕生の物語" },
                { date: "2027/01/14", title: "「悪人」と呼ばれた人の、本当の顔", sub: "教科書が教えなかった、一期一会のある決断" },
                { date: "2027/02/11", title: "あの会社も、近江から始まった", sub: "伊藤忠・丸紅・トヨタ・住友・日本生命─近江商人の挑戦と葛藤" },
                { date: "2027/03/11", title: "あなたの「現在地」が、見えてくる", sub: "近江から、もっと、深い物語の入口へ" },
              ].map((c, i) => (
                <li
                  key={i}
                  className="flex flex-col sm:flex-row sm:items-baseline gap-1.5 sm:gap-6 py-5"
                >
                  <div className="flex items-baseline gap-3 sm:w-44 shrink-0">
                    <span className="text-kokihi font-serif font-bold text-base tracking-widest">
                      第{i + 1}回
                    </span>
                    <span className="text-sumi/45 text-xs tabular-nums">
                      {c.date}（木）
                    </span>
                  </div>
                  <div>
                    <p className="font-serif font-bold text-base md:text-lg leading-relaxed text-sumi-dark">
                      {c.title}
                    </p>
                    <p className="text-sumi/65 text-xs md:text-sm mt-1 leading-relaxed">
                      〜{c.sub}〜
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <p className="text-center text-sumi/80 text-sm md:text-base leading-loose mb-10">
            年号や人物名を覚える歴史講座ではありません。
            <br className="hidden md:block" />
            近江に残る物語を通して、自分自身と、今を暮らす土地を見つめ直す。
            <br className="hidden md:block" />
            大人のための、知的なリフレクションの時間です。
          </p>

          <div className="text-center">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4">
              <a
                href="https://yoor.jp/door/michibikarete"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-sm bg-kokihi px-10 py-5 font-bold text-white shadow-md transition-all duration-300 hover:opacity-90 hover:shadow-xl"
              >
                <span className="mr-2">全10回パスに申し込む（¥12,000）</span>
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:animate-shine" />
              </a>
              <a
                href="https://buy.stripe.com/aFa7sKfPV0yKgaegRn5c401"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-sm border border-sumi/40 bg-white px-10 py-5 font-bold text-sumi-dark transition-all duration-300 hover:bg-sumi hover:text-white hover:border-sumi"
              >
                単発で試す（¥1,500）
              </a>
            </div>
            <p className="text-xs text-sumi/55 mt-5 tracking-wider leading-relaxed">
              全10回パスはYOORのサロンページから／単発は1回ごとのお申込みです。
              <br className="hidden md:block" />
              「まずは1回」から、いつでも全10回パスに切り替えOK。
            </p>
          </div>
        </div>
      </section>

      {/* --- Section: Concept (Thinking) --- */}
      <section
        id="concept"
        className="w-full max-w-4xl py-20 md:py-32 px-5 md:px-0"
      >
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <h2 className="text-2xl md:text-3xl font-serif text-kokihi mb-8 leading-relaxed">
              なぜ今、
              <br />
              近江の歴史なのか。
            </h2>
            <div className="space-y-6 text-sumi leading-loose font-serif text-justify text-sm md:text-base">
              <p>
                歴史とは、勝者の記録ではありません。
                <br />
                それは、そこに生きた人々の「熱量」の集積です。
              </p>
              <p>
                滋賀・近江の地には、教科書が語り落とした
                <br />
                日本の転換点が数多く眠っています。
                <br />
                織田信長、豊臣秀吉、明智光秀。
                <br />
                彼らがこの地で何を感じ、何を決断したのか。
              </p>
              <p>
                このプロジェクトは、既存の解釈を疑い、
                <br />
                一次資料と現地の空気を重ね合わせることで、
                <br />
                埋もれた真実を浮かび上がらせます。
              </p>
            </div>
          </div>
          <div className="md:w-1/2 relative h-64 md:h-80 w-full bg-washi-gray/20 flex items-center justify-center border border-sumi/10 overflow-hidden shadow-lg">
            <Image
              src="/concept.png"
              alt="Lake Biwa Concept Art"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover opacity-80 hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
      </section>

      {/* --- Section: Stories (Episodes) --- */}
      <section
        id="stories"
        className="w-full bg-sumi-dark text-kinari py-20 md:py-32"
      >
        <div className="max-w-5xl mx-auto px-5 md:px-0">
          <div className="flex justify-between items-end mb-12 md:mb-16 border-b border-kinari/20 pb-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2">
                歴史の断片
              </h2>
              <p className="text-xs opacity-60 tracking-widest">EPISODES</p>
            </div>
            <div className="hidden md:block text-right">
              <p className="font-serif text-sm opacity-80">
                独自の視点で読み解く、
                <br />
                知られざる物語。
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Story 1: Kimigahata */}
            <Link href="/story/kimigahata" className="group block">
              <div className="relative aspect-[4/3] overflow-hidden mb-6 opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-sumi/20 group-hover:bg-transparent transition-colors z-10"></div>
                <Image
                  src="/story-kimigahata.png"
                  alt="Kimigahata Village"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="pr-4">
                <span className="text-kokihi text-xs font-bold tracking-widest mb-2 block">
                  EPISODE 01
                </span>
                <h3 className="text-xl font-serif font-bold mb-3 group-hover:text-kokihi transition-colors leading-relaxed">
                  君ヶ畑：
                  <br />
                  木地師の源流
                </h3>
                <p className="text-sm opacity-80 font-serif leading-relaxed line-clamp-3">
                  国家「君が代」の真実とは。1200年の時を超えて守られた、敗れし者たちの祈りと誇りの物語。
                </p>
              </div>
            </Link>

            {/* Story 2: Kagami no Sato */}
            <Link href="/story/kagaminosato" className="group block">
              <div className="relative aspect-[4/3] overflow-hidden mb-6 opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-sumi/20 group-hover:bg-transparent transition-colors z-10"></div>
                <Image
                  src="/story-kagami.png"
                  alt="Kagami no Sato"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="pr-4">
                <span className="text-kokihi text-xs font-bold tracking-widest mb-2 block">
                  EPISODE 02
                </span>
                <h3 className="text-xl font-serif font-bold mb-3 group-hover:text-kokihi transition-colors leading-relaxed">
                  鏡の里：
                  <br />
                  源平の宿命
                </h3>
                <p className="text-sm opacity-80 font-serif leading-relaxed line-clamp-3">
                  源義経の決意と、平宗盛の最期。勝者と敗者が交差する、近江の聖地に眠る二つの正義。
                </p>
              </div>
            </Link>

            {/* Story 3: Zansho */}
            <Link href="/story/zansho" className="group block">
              <div className="relative aspect-[4/3] overflow-hidden mb-6 opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-sumi/20 group-hover:bg-transparent transition-colors z-10"></div>
                <Image
                  src="/story-zansho.png"
                  alt="Ancient high-tech Oumi"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="pr-4">
                <span className="text-kokihi text-xs font-bold tracking-widest mb-2 block">
                  EPISODE 03
                </span>
                <h3 className="text-xl font-serif font-bold mb-3 group-hover:text-kokihi transition-colors leading-relaxed">
                  残照の系譜：
                  <br />
                  渡来の王と技術
                </h3>
                <p className="text-sm opacity-80 font-serif leading-relaxed line-clamp-3">
                  アメノヒボコが伝えた鏡と鉄。ここは日本のハイテク産業の原点、古代のシリコンバレーだった。
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>


      {/* --- Section: Latest Note --- */}
      <LatestNote />

      {/* --- Section: Upcoming Event --- */}
      <section 
        id="upcoming-event"
        className="w-full bg-kinari py-20 md:py-32 text-sumi"
      >
        <div className="max-w-4xl mx-auto px-5 md:px-0 text-center">
          <span className="text-kokihi text-xs font-bold tracking-widest mb-4 block">
            UPCOMING EVENT
          </span>
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-12">
            近々の開催案内
          </h2>

          <div className="bg-white p-8 md:p-12 shadow-lg border border-sumi/10 inline-block text-left w-full max-w-2xl relative">
            <div className="absolute -top-3 -left-3 w-6 h-6 border-l-2 border-t-2 border-kokihi"></div>
            <div className="absolute -bottom-3 -right-3 w-6 h-6 border-r-2 border-b-2 border-kokihi"></div>

            <h3 className="text-xl md:text-2xl font-serif font-bold text-sumi-dark mb-8 text-center border-b border-kokihi/20 pb-6">
              第9回 それまこ会
            </h3>

            <div className="space-y-8 font-serif leading-relaxed">
              <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-8">
                <span className="text-kokihi font-bold text-sm w-20 shrink-0 flex items-center md:h-7 tracking-widest">
                  <span className="bg-kokihi/10 px-2 py-1 rounded text-center w-full">
                    テーマ
                  </span>
                </span>
                <div>
                  <p className="text-base md:text-lg font-bold font-serif text-sumi-dark leading-relaxed">
                    私たちの現在地<br />
                    〜戦後から現代〜
                  </p>
                  <p className="text-sm text-sumi/70 mt-2">
                    詳細は決まり次第、追記します。
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-8">
                <span className="text-kokihi font-bold text-sm w-20 shrink-0 flex items-center md:h-7 tracking-widest">
                  <span className="bg-kokihi/10 px-2 py-1 rounded text-center w-full">
                    日時
                  </span>
                </span>
                <div>
                  <p className="text-xl md:text-2xl font-bold font-serif text-sumi-dark">
                    7月29日(水)
                  </p>
                  <div className="mt-2 space-y-1 text-sm md:text-base">
                    <p>
                      <span className="font-bold mr-2">18:30-20:30</span> 講演会
                    </p>
                    <p>
                      <span className="font-bold mr-2">21:00〜</span> 懇親会{" "}
                      <span className="text-xs opacity-70 ml-1">
                        （リオにて / 任意参加）
                      </span>
                    </p>
                  </div>
                  <p className="text-xs text-kokihi mt-2">
                    ※講演のみ、懇親会のみのご参加も可能です
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-8">
                <span className="text-kokihi font-bold text-sm w-20 shrink-0 flex items-center md:h-7 tracking-widest">
                  <span className="bg-kokihi/10 px-2 py-1 rounded text-center w-full">
                    場所
                  </span>
                </span>
                <div>
                  <p className="font-bold text-lg text-sumi-dark">
                    SATSUKI-RO（さつき楼）
                  </p>
                  <p className="text-sm opacity-80 mt-1">
                    滋賀県東近江市八日市本町9-19（八日市駅前すぐ）
                  </p>
                  <a
                    href="https://maps.app.goo.gl/..."
                    target="_blank"
                    className="text-xs border-b border-sumi/30 hover:text-kokihi transition-colors mt-2 inline-block"
                  >
                    地図を見る
                  </a>
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-8">
                <span className="text-kokihi font-bold text-sm w-20 shrink-0 flex items-center md:h-7 tracking-widest">
                  <span className="bg-kokihi/10 px-2 py-1 rounded text-center w-full">
                    会費
                  </span>
                </span>
                <p className="font-bold text-lg text-sumi-dark">
                  2,000円
                  <span className="text-sm font-normal ml-2 opacity-80">
                    （当日お支払い）
                  </span>
                </p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="text-sm text-sumi/70 mb-6 font-serif leading-loose">
                教科書では語られない近江の真実を、今回も紐解きます。
                <br />
                初めての方も大歓迎です。
              </p>
              <Link
                href="/apply"
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-sm bg-kokihi px-8 py-4 font-bold text-white shadow-md transition-all duration-300 hover:bg-sumi-dark hover:shadow-xl w-full md:w-auto"
              >
                <span className="mr-2">参加を申し込む</span>
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:animate-shine" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- Section: Road to Publication --- */}
      <section className="w-full bg-kokihi/5 py-20 md:py-32">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <span className="text-kokihi text-xs font-bold tracking-widest mb-4 block">
            PROJECT
          </span>
          <h2 className="text-2xl md:text-4xl font-serif text-sumi-dark mb-8 leading-relaxed">
            書籍化プロジェクト
            <br />
            始動。
          </h2>
          <p className="leading-loose text-sumi font-serif mb-12 text-sm md:text-base">
            現在、長年の探究の集大成となる歴史ノンフィクションの執筆を進めています。
            <br />
            足で稼いだ一次情報と、独自の仮説が織りなす「もう一つの日本史」。
            <br />
            完成までの道のりを、ぜひ見届けてください。
          </p>
          <Link href="/support">
            <button className="bg-kokihi text-white px-8 py-4 hover:bg-sumi-dark hover:text-kinari transition-all duration-300 shadow-xl tracking-widest font-serif font-bold text-base md:text-lg rounded-sm w-full md:w-auto">
              書籍化プロジェクトに参加する
            </button>
          </Link>
        </div>
      </section>

      {/* --- Section: Profile Teaser --- */}
      <section
        id="profile"
        className="w-full bg-white/50 py-20 md:py-32 border-y border-sumi/10"
      >
        <div className="max-w-4xl mx-auto px-5 md:px-0 flex flex-col-reverse md:flex-row gap-12 items-center">
          <div className="md:w-1/3 text-right md:text-left">
            <div className="relative inline-block w-48 h-64 md:w-64 md:h-80 shadow-2xl rotate-3 bg-white p-2">
              <div className="w-full h-full bg-sumi/10 relative overflow-hidden">
                <Image
                  src="/profile.png"
                  alt="Shinji Maekawa"
                  fill
                  sizes="(max-width: 768px) 50vw, 256px"
                  className="object-cover opacity-90 grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>
          </div>

          <div className="md:w-2/3">
            <span className="text-kokihi font-bold text-xs tracking-[0.2em] mb-4 block">
              NAVIGATOR
            </span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-sumi-dark mb-8">
              ナビゲーター紹介
            </h2>

            <div className="flex items-center gap-4 mb-2">
              <span className="text-xs font-bold bg-sumi-dark text-white px-2 py-0.5 rounded-sm tracking-widest">
                NAVIGATOR 01
              </span>
              <h3 className="text-2xl font-serif font-bold">
                前川 真司
                <span className="text-lg ml-4 opacity-50 font-normal">
                  Shinji Maekawa
                </span>
              </h3>
            </div>
            <p className="text-sm text-kokihi font-bold mb-6 font-serif tracking-wider">
              近江史コンテンツプロデューサー／歴史講演家
            </p>

            <p className="leading-loose text-sumi mb-8 text-sm md:text-base font-serif">
              滋賀県東近江市を拠点に、近江から日本史を読み解く歴史プロジェクト
              <strong className="text-kokihi">「それはまことですか？」</strong>
              を展開。
              <br />
              絶滅危惧種・紫草を活用した地域事業 MURASAKIno ORGANIC を経て、
              現在は近江史コンテンツの制作・講演・教育に
              <strong className="text-kokihi">「転戦」</strong>。
              <br />
              「日本の歴史を10巻の本にまとめたら、近江の登場しない巻は無い」を合言葉に、教科書が語らなかったもう一つの日本史を発信しています。
            </p>

            <Link
              href="/profile"
              className="inline-flex items-center gap-2 border border-sumi text-sumi px-6 py-3 hover:bg-sumi hover:text-kinari transition-colors duration-300 text-sm font-serif tracking-widest"
            >
              詳しいプロフィールを見る
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* --- Section: Roadmap (Project) --- */}
      <section className="w-full max-w-4xl py-32 px-5 md:px-0">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-serif text-sumi-dark mb-4">
            書籍化への道程
          </h2>
          <p className="text-kokihi tracking-widest">ROAD TO PUBLICATION</p>
        </div>

        <div className="relative border-l-2 border-sumi/20 ml-4 md:ml-0 md:pl-0 space-y-12">
          {/* Step 1 (Completed) */}
          <div className="relative pl-8 md:pl-0 md:flex md:justify-center items-center gap-8 opacity-60">
            <div className="absolute -left-[5px] top-2 md:static w-3 h-3 bg-sumi rounded-full md:order-2"></div>
            <div className="md:w-5/12 md:text-right md:order-1">
              <h3 className="text-xl font-serif font-bold text-sumi-dark">
                企画・構想
              </h3>
              <p className="text-sm text-sumi/60">2026.01 - 2026.04</p>
            </div>
            <div className="md:w-5/12 md:order-3">
              <p className="text-sm text-sumi">
                「それはまことですか？」の核となるテーマを選定。取材開始。
                <br />
                ファンコミュニティの立ち上げ。
              </p>
            </div>
          </div>

          {/* Step 2 (Current) */}
          <div className="relative pl-8 md:pl-0 md:flex md:justify-center items-center gap-8">
            <div className="absolute -left-[9px] top-1 md:static w-5 h-5 border-4 border-kokihi bg-kinari rounded-full md:order-2 z-10"></div>
            <div className="md:w-5/12 md:text-right md:order-1">
              <h3 className="text-xl font-serif font-bold text-kokihi">
                執筆・連載
              </h3>
              <p className="text-sm text-kokihi font-bold">2026.05 -</p>
            </div>
            <div className="md:w-5/12 md:order-3">
              <div className="bg-white p-4 shadow-sm border border-sumi/10 inline-block">
                <p className="text-sm text-sumi">
                  noteにて主要エピソードを先行公開予定。
                  <br />
                  ファンの皆様との対話から物語を深める。
                </p>
              </div>
            </div>
          </div>

          {/* Step 3 (Future) */}
          <div className="relative pl-8 md:pl-0 md:flex md:justify-center items-center gap-8 opacity-50">
            <div className="absolute -left-[5px] md:static w-3 h-3 bg-sumi rounded-full md:order-2"></div>
            <div className="md:w-5/12 md:text-right md:order-1">
              <h3 className="text-xl font-serif font-bold text-sumi-dark">
                出版・記念講演
              </h3>
              <p className="text-sm text-sumi/60">2027 (Planned)</p>
            </div>
            <div className="md:w-5/12 md:order-3">
              <p className="text-sm text-sumi">
                全国書店にて発売予定。東近江市にて記念講演会を開催。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Section: LINE Official Account --- */}
      <section className="w-full bg-white py-20 md:py-32 border-y border-sumi/10">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <span className="text-[#06C755] text-xs font-bold tracking-widest mb-4 block">
            OFFICIAL ACCOUNT
          </span>
          <h2 className="text-2xl md:text-3xl font-serif text-sumi-dark mb-8 leading-relaxed">
            最新情報は
            <br className="md:hidden" />
            LINE公式アカウントで
          </h2>
          <p className="leading-loose text-sumi font-serif mb-10 text-sm md:text-base">
            イベントの開催案内や、執筆の裏側、
            <br />
            ここだけの限定コンテンツをお届けします。
          </p>
          <a
            href="https://lin.ee/KY9xx1E"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-sm bg-[#06C755] px-10 py-5 font-bold text-white shadow-md transition-all duration-300 hover:bg-[#05b54b] hover:shadow-xl w-full md:w-auto"
          >
            <span className="mr-2 fa-lg">LINE友だち追加する</span>
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:animate-shine" />
          </a>
          <p className="text-xs text-sumi/50 mt-6 font-serif">
            ※ID検索：「@918kbaia」でも登録可能です
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-sumi-dark text-kinari pt-24 pb-8">
        <div className="max-w-5xl mx-auto px-5 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 border-b border-kinari/20 pb-16">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-serif font-bold mb-4">それはまことですか？</h2>
            <p className="text-xs opacity-60 leading-relaxed font-serif">
              勝者だけが、歴史をつくるのではない。
              <br />
              語られなかった者たちの声に耳を澄ませ、
              <br />
              ともに「まこと」を問い続ける。
            </p>
          </div>
          <div>
            <h3 className="text-sm font-bold tracking-widest mb-6 opacity-80">
              CONTENT
            </h3>
            <ul className="space-y-4 text-sm font-serif opacity-60">
              <li>
                <Link
                  href="/#stories"
                  className="hover:text-kokihi transition-colors"
                >
                  歴史の断片
                </Link>
              </li>
              <li>
                <Link
                  href="/#salon"
                  className="hover:text-kokihi transition-colors"
                >
                  オンラインサロン
                </Link>
              </li>
              <li>
                <Link
                  href="/#profile"
                  className="hover:text-kokihi transition-colors"
                >
                  ナビゲーター紹介
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="hover:text-kokihi transition-colors"
                >
                  書籍化プロジェクト
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold tracking-widest mb-6 opacity-80">
              CONTACT
            </h3>
            <ul className="space-y-4 text-sm font-serif opacity-60">
              <li>
                <Link
                  href="/contact"
                  className="hover:text-kokihi transition-colors"
                >
                  お問い合わせ
                </Link>
              </li>
              <li>
                <a
                  href="https://x.com"
                  target="_blank"
                  className="hover:text-kokihi transition-colors"
                >
                  X (Twitter)
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@sore-mako"
                  target="_blank"
                  className="hover:text-kokihi transition-colors"
                >
                  YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center text-xs opacity-40 font-serif">
          &copy; {new Date().getFullYear()} Sore wa Makoto desu ka Production Team. All
          Rights Reserved.
        </div>
      </footer>
    </div>
  );
}
