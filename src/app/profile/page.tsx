import Link from "next/link";
import JsonLd from "@/app/components/JsonLd";
import { upcomingSalons } from "@/content/site";
import { buildMetadata, SITE_URL } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "前川真司 公式プロフィール｜近江史・講演・それはまことですか？",
  description:
    "近江史コンテンツプロデューサー／歴史講演家・前川真司の公式プロフィール。紫草事業を経て、近江から日本史を読み解く歴史プロジェクト「それはまことですか？」を展開。",
  path: "/profile",
});

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-kinari text-sumi relative overflow-hidden">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: "前川真司",
          url: `${SITE_URL}/profile`,
          image: `${SITE_URL}/profile.png`,
          jobTitle: ["近江史コンテンツプロデューサー", "歴史講演家"],
          sameAs: ["https://note.com/maekawa_shikan"],
          knowsAbout: ["近江史", "日本史", "地域文化"],
        }}
      />
      {/* Background Noise */}
      <div className="fixed inset-0 pointer-events-none opacity-30 mix-blend-multiply bg-[url('/noise.svg')] bg-repeat z-0"></div>

      {/* Hero */}
      <section className="relative z-10 w-full pt-16 pb-16 md:pt-28 md:pb-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-kokihi text-sm font-bold tracking-[0.2em] mb-6 block animate-fade-in-up">
            OFFICIAL PROFILE
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif font-bold text-sumi-dark mb-6 leading-tight tracking-wide animate-fade-in-up delay-100">
            前川 真司
          </h1>
          <p className="mb-10 text-sm tracking-widest text-sumi/70 animate-fade-in-up delay-150 md:text-base">
            Shinji Maekawa
          </p>
          <p className="text-lg md:text-2xl font-serif text-sumi-dark mb-8 animate-fade-in-up delay-200 leading-relaxed">
            近江史コンテンツプロデューサー
            <span className="mx-2 md:mx-3 text-kokihi">／</span>
            歴史講演家
          </p>
          <div className="h-px w-24 bg-kokihi mx-auto mb-8 animate-fade-in-up delay-300"></div>
          <p className="text-base md:text-xl text-sumi/80 leading-loose max-w-3xl mx-auto font-serif animate-fade-in-up delay-300">
            紫草から、近江史へ。
            <br />
            地域の記憶を、未来のコンテンツに変える。
          </p>
        </div>
      </section>

      {/* Lead */}
      <section className="relative z-10 w-full px-6 pb-16 md:pb-24">
        <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 shadow-sm border border-sumi/10 relative">
          <div className="absolute -top-3 -left-3 w-6 h-6 border-l-2 border-t-2 border-kokihi"></div>
          <div className="absolute -bottom-3 -right-3 w-6 h-6 border-r-2 border-b-2 border-kokihi"></div>
          <p className="text-base leading-8 text-sumi md:leading-loose">
            滋賀県東近江市を拠点に、近江から日本史を読み解く歴史プロジェクト
            <strong className="text-kokihi">「それはまことですか？」</strong>
            を展開しています。
            <br />
            <br />
            元・株式会社みんなの奥永源寺 代表取締役。絶滅危惧種・紫草を活用した地域事業
            <em>MURASAKIno ORGANIC</em>
            で、環境省グッドライフアワード サステナブル・ビジネス賞などを受賞。
            <br />
            <br />
            10年にわたる地域事業を経て、現在は近江史コンテンツの制作・講演・教育に
            <strong className="text-kokihi">「転戦」</strong>
            。「日本の歴史を10巻の本にまとめたら、近江の登場しない巻は無い」を合言葉に、教科書が語らなかったもう一つの日本史を発信しています。
          </p>
        </div>
      </section>

      {/* Section 1: いま何をしているか */}
      <section className="relative z-10 w-full bg-white/50 py-20 md:py-32 border-y border-sumi/10">
        <div className="max-w-4xl mx-auto px-6">
          <span className="text-kokihi text-xs font-bold tracking-widest mb-4 block">
            CURRENT WORK
          </span>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-sumi-dark mb-12 leading-relaxed">
            いま、何をしている人か
          </h2>
          <p className="mb-10 text-base leading-8 text-sumi md:leading-loose">
            近江を起点に、日本史を読み解き直す歴史コンテンツを制作・発信しています。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: "講演会", body: "近江の歴史を学ぶ会／企業・団体・学校向けの歴史講演" },
              { label: "オンライン講座", body: "Zoom歴史ラウンジ「それまこオンライン」" },
              { label: "YouTube", body: "「それはまことですか？」近江百ものがたり、解説シリーズ" },
              { label: "note", body: "「もう一つの日本史」を15年の現地調査から書き下ろし" },
              { label: "ガイド・ツアー", body: "近江ミステリーツアー、MKタクシー連携の歴史解説ガイド" },
              { label: "教材・カリキュラム", body: "『近江解体新書』オンライン版／高校教員として歴史総合の教材制作" },
            ].map((item) => (
              <div key={item.label} className="border-l-2 border-kokihi/60 pl-5 py-2">
                <div className="font-serif font-bold text-sumi-dark mb-1">{item.label}</div>
                <p className="text-base leading-7 text-sumi/80">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: 前川史観 */}
      <section className="relative z-10 w-full py-20 md:py-32 bg-sumi-dark text-kinari">
        <div className="max-w-4xl mx-auto px-6">
          <span className="mb-4 block text-xs font-bold tracking-widest text-gold">
            CORE THESIS
          </span>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-kinari mb-12 leading-relaxed">
            中核資産：「前川史観」
          </h2>

          <blockquote className="border-l-4 border-kokihi pl-6 md:pl-10 my-12">
            <p className="text-xl md:text-3xl font-serif leading-relaxed">
              日本の歴史を10巻の本にまとめたら、
              <br />
              そこに近江の登場しない巻は無い。
            </p>
          </blockquote>

          <p className="mb-8 text-base leading-8 text-kinari/90 md:leading-loose">
            縄文遺跡から、渡来人、古代国家、万葉、壬申の乱、寺社勢力、戦国、近江商人、近代産業、現代まで。近江は日本史の各時代に深く関わっています。
          </p>

          <p className="mb-6 text-base leading-8 text-kinari/90 md:leading-loose">裏テーマは——</p>
          <ul className="mb-10 space-y-2 pl-6 text-base text-kinari/90">
            <li className="leading-relaxed">日本の多民族・多宗教的起源</li>
            <li className="leading-relaxed text-gold">敗者が転戦し、姿を変えて生き残る物語構造</li>
            <li className="leading-relaxed">手塚治虫『火の鳥 太陽編』的な世界観</li>
          </ul>

          <p className="text-base leading-8 text-kinari/90 md:leading-loose">
            単なる郷土史ではなく、<strong className="text-gold">近江を通じて日本史全体を読み替える</strong>歴史コンテンツです。
          </p>

          <aside className="mt-10 border-l-4 border-gold bg-paper p-6 text-sumi">
            <h3 className="text-lg font-bold">前川史観の読み方</h3>
            <p className="mt-3 text-sm leading-7">
              このサイトでは、史資料や先行研究で確認できる事実と、前川真司による仮説・解釈を区別して紹介します。出典を示せるものは明記し、仮説は問いとして開いていきます。
            </p>
          </aside>
        </div>
      </section>

      {/* Section 3: 主な講演テーマ */}
      <section className="relative z-10 w-full py-20 md:py-32 bg-kinari">
        <div className="max-w-4xl mx-auto px-6">
          <span className="text-kokihi text-xs font-bold tracking-widest mb-4 block">
            LECTURE TOPICS
          </span>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-sumi-dark mb-12 leading-relaxed">
            主な講演テーマ
          </h2>

          <ol className="grid grid-cols-1 gap-4 text-base md:grid-cols-2">
            {[
              "近江から見た日本史：教科書が語らなかった10の系譜",
              "万葉の蒲生野：額田王・大海人皇子・中大兄皇子と東近江の文化資源",
              "木地師の源流と「君が代」の真実：君ヶ畑から日本史へ",
              "鏡の里と源平の宿命：近江の聖地が映す敗者の記憶",
              "近江商人の本質：流通・信用・近世経済の源流",
              "紫草と近江：万葉ロマンから現代の地域事業まで",
              "限界集落で会社をつくる：失敗から学んだ地域事業の方法論",
              "転戦の物語：10年事業の閉幕と、第二の人生のはじまり",
            ].map((topic, i) => (
              <li
                key={i}
                className="bg-white p-5 border border-sumi/10 shadow-sm hover:shadow-md transition-shadow flex gap-4"
              >
                <span className="text-kokihi font-bold tracking-widest text-xs pt-1 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="leading-relaxed text-sumi">{topic}</span>
              </li>
            ))}
          </ol>

          <p className="mt-8 text-sm text-sumi/70">
            ※テーマ・尺は柔軟に調整可能（30分／60分／90分／半日ワークショップ）
          </p>
        </div>
      </section>

      {/* Section 4: 経歴 */}
      <section className="relative z-10 w-full py-20 md:py-32 bg-white/50 border-y border-sumi/10">
        <div className="max-w-4xl mx-auto px-6">
          <span className="text-kokihi text-xs font-bold tracking-widest mb-4 block">
            CAREER
          </span>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-sumi-dark mb-12 leading-relaxed">
            経歴
          </h2>

          <div className="relative ml-3 space-y-8 border-l-2 border-sumi/20 pl-8 md:ml-6">
            {[
              { year: "1987", body: "兵庫県宝塚市生まれ" },
              { year: "中学時代", body: "高知県土佐郡大川村で山村留学（3年間）" },
              { year: "〜2010", body: "兵庫県立播磨農業高校 → 東京農業大学 国際食料情報学部 食料環境経済学科" },
              { year: "2010-2011", body: "UCLA Extension ALCセンター（米国）" },
              { year: "2011", body: "滋賀県立八日市南高等学校 非常勤教員（歴史総合・食品流通など）" },
              { year: "2014", body: "東近江市 地域おこし協力隊（奥永源寺地域担当）" },
              { year: "2017", body: "株式会社みんなの奥永源寺 設立、代表取締役就任", highlight: true },
              { year: "2018", body: "オーガニックコスメ「MURASAKIno ORGANIC」販売開始" },
              { year: "2018", body: "環境省 グッドライフアワード サステナブル・ビジネス賞 受賞（国内第1号企業認定）" },
              { year: "2020", body: "第7回ディスカバー農村漁村の宝（近畿・個人部門）" },
              { year: "2024-", body: "歴史コンテンツ事業へ本格シフト。YouTube「それはまことですか？」、近江百ものがたり、講演活動を展開" },
              {
                year: "2026",
                body: "地域事業から近江史コンテンツ事業へ活動の軸足を移し、「転戦」の第二章へ",
                highlight: true,
              },
            ].map((item, i) => (
              <div key={i} className="relative">
                <div
                  className={`absolute -left-[39px] top-1 w-4 h-4 rounded-full ${
                    item.highlight ? "bg-kokihi" : "bg-sumi/30"
                  }`}
                ></div>
                <p className={`text-sm font-bold ${item.highlight ? "text-kokihi" : "text-sumi/70"}`}>
                  {item.year}
                </p>
                <p className="mt-1 text-base leading-7 text-sumi">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: 地域事業フェーズの実績 */}
      <section className="relative z-10 w-full py-20 md:py-32 bg-kokihi/5">
        <div className="max-w-4xl mx-auto px-6">
          <span className="text-kokihi text-xs font-bold tracking-widest mb-4 block">
            FIRST CHAPTER
          </span>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-sumi-dark mb-6 leading-relaxed">
            これまでの実績
            <span className="ml-3 text-base font-normal text-sumi/70">地域事業フェーズ</span>
          </h2>
          <p className="mb-12 text-base leading-8 text-sumi/80 md:leading-loose">
            過去10年の地域事業は、いまの近江史コンテンツの<strong className="text-kokihi">土台</strong>です。
            <br />
            切り離さず、ここに記載します。
          </p>

          <div className="bg-white p-8 md:p-12 shadow-sm border border-sumi/10 mb-8">
            <h3 className="text-xl font-serif font-bold text-sumi-dark mb-6">
              株式会社みんなの奥永源寺（2017-2026）
            </h3>
            <ul className="space-y-3 text-base leading-7 text-sumi">
              <li>・ 滋賀県東近江市 奥永源寺地域・君ヶ畑町を拠点</li>
              <li>・ 絶滅危惧種・紫草（ムラサキ）の有機栽培、耕作放棄地の再生</li>
              <li>
                ・ 紫根を主成分としたオーガニックコスメ <em>MURASAKIno ORGANIC</em> ／{" "}
                <em>bobs ambient root</em> の企画・販売
              </li>
              <li>・ 政所茶の振興、木地師文化の継承支援、鈴鹿10座登山ツアー、永源寺こんにゃくとの連携</li>
              <li>・ 地域おこしの「ファブレス × オーガナイザー」モデルの実証</li>
              <li>・ 「ファザーフォレスト（父なる森）」という奥永源寺の森林保全観の提唱</li>
            </ul>
          </div>

          <div className="bg-white p-8 md:p-12 shadow-sm border border-sumi/10 mb-8">
            <h3 className="text-xl font-serif font-bold text-sumi-dark mb-6">主な受賞・露出</h3>
            <ul className="space-y-2 text-base leading-7 text-sumi">
              <li>・ 環境省 グッドライフアワード サステナブル・ビジネス賞（2018）</li>
              <li>・ ルーヴル国際化粧品展示会</li>
              <li>・ 大阪万博出展</li>
              <li>・ おもてなしセレクション</li>
              <li>・ 70seeds、ここ滋賀、近畿農政局、湖香六根 ほか、第三者メディアでの継続的な紹介</li>
            </ul>
          </div>

          <div className="bg-sumi-dark text-kinari p-8 md:p-12 shadow-sm">
            <h3 className="text-xl font-serif font-bold text-kinari mb-6">この経験から残ったもの</h3>
            <p className="mb-6 text-base leading-8 text-kinari/90 md:leading-loose">
              10期にわたる地域事業では、地域資源を見つけ、育て、社会へ届ける挑戦を続けました。
              <br />
              その経験は、いまの活動へつながっています。
            </p>
            <ul className="space-y-3 text-base leading-7 text-kinari/90">
              <li>・ 地域資源を見つけ、物語化し、商品にし、メディアに届ける一連の経験</li>
              <li>・ 行政・学校・地域・全国流通・海外展示を横断したネットワーク</li>
              <li>・ 「不便を不幸と取り違えない」哲学</li>
              <li className="text-gold">
                ・ そして何より、<strong>“敗者が姿を変えて生き残る”という前川史観の物語構造を、自分の人生で実装した経験</strong>
              </li>
            </ul>
            <p className="mt-8 text-base leading-8 text-kinari/90 md:leading-loose">
              これらは、近江史コンテンツ事業の燃料として、第二章にそのまま持ち越しています。
            </p>
          </div>
        </div>
      </section>

      {/* Section 6: プロジェクト */}
      <section className="relative z-10 w-full py-20 md:py-32 bg-kinari">
        <div className="max-w-4xl mx-auto px-6">
          <span className="text-kokihi text-xs font-bold tracking-widest mb-4 block">
            PROJECTS
          </span>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-sumi-dark mb-12 leading-relaxed">
            進行中のプロジェクト
          </h2>

          <div className="space-y-8">
            <article className="bg-white p-8 md:p-10 shadow-sm border border-sumi/10">
              <h3 className="text-xl font-serif font-bold text-sumi-dark mb-4">
                「それはまことですか？」
              </h3>
              <p className="mb-4 text-base leading-8 text-sumi">
                教科書が語らなかった近江の歴史を、現地調査と一次資料から掘り起こす歴史プロジェクト。YouTube／note／オンライン講座／講演／ツアーを連動させて展開しています。
              </p>
              <p className="text-sm font-bold text-kokihi">
                ▶ 次回：{upcomingSalons.online.date} {upcomingSalons.online.time}
              </p>
            </article>

            <article className="bg-white p-8 md:p-10 shadow-sm border border-sumi/10">
              <h3 className="text-xl font-serif font-bold text-sumi-dark mb-4">近江百ものがたり</h3>
              <p className="text-base leading-8 text-sumi">
                東近江を起点に、近江全域の「もう一つの歴史」を100本のものがたりとして編むシリーズ。講演／映像／書籍の3形態を想定。
              </p>
            </article>

            <article className="bg-white p-8 md:p-10 shadow-sm border border-sumi/10">
              <h3 className="text-xl font-serif font-bold text-sumi-dark mb-4">『近江解体新書』</h3>
              <p className="text-base leading-8 text-sumi">
                近江を解剖するように、土地・人・物語を構造化して伝えるオンライン教材。現在カリキュラム設計中。
              </p>
            </article>

            <article className="bg-white p-8 md:p-10 shadow-sm border border-sumi/10">
              <h3 className="text-xl font-serif font-bold text-sumi-dark mb-4">
                万葉故地サミット（2034年・令和16年）
              </h3>
              <p className="text-base leading-8 text-sumi">
                蒲生野・万葉ロマン関連の地域団体と連携した機運醸成プロジェクト。額田王・大海人皇子・中大兄皇子をめぐる東近江の文化資源を軸に、機運形成を進めています。
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Section 7: 私について */}
      <section className="relative z-10 w-full py-20 md:py-32 bg-white/50 border-y border-sumi/10">
        <div className="max-w-3xl mx-auto px-6">
          <span className="text-kokihi text-xs font-bold tracking-widest mb-4 block">
            ABOUT ME
          </span>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-sumi-dark mb-12 leading-relaxed">
            私について
          </h2>

          <div className="space-y-6 text-base leading-8 text-sumi md:leading-loose">
            <p>
              兵庫県宝塚市で生まれ、中学時代に高知県大川村で山村留学を経験しました。東京農業大学からUCLA Extensionへ。農業と6次産業化を学んだ後、2011年に滋賀の農業高校で
              <strong className="text-kokihi">紫草（ムラサキ）</strong>と出会いました。
            </p>
            <p>
              絶滅危惧種・紫草を活用して、限界集落・奥永源寺で会社を立ち上げ、10年間走り続けました。うまくいったこと、行かなかったこと、両方たくさんありました。
            </p>
            <p>
              10年の地域事業で得た経験を次の活動へつなぎ、2026年からは
              <strong className="text-kokihi">「転戦」</strong>
              の第二章として、近江史コンテンツ事業へ活動の軸足を移しました。
            </p>
            <p>
              これからは、私が15年かけて積み上げてきたもう一つの資産——
              <strong className="text-kokihi">近江を起点に日本史を読み替える「前川史観」</strong>——
              これをコンテンツに変えて、社会に届けていきます。
            </p>
            <p>
              「日本の歴史を10巻にまとめたら、近江の登場しない巻は無い」。教科書が語らなかった、敗者の側から見た日本史を、講演で、映像で、書籍で、教材で、お届けします。
            </p>
          </div>
        </div>
      </section>

      {/* Section 8: 体制 */}
      <section className="relative z-10 w-full py-20 md:py-32 bg-kinari">
        <div className="max-w-3xl mx-auto px-6">
          <span className="text-kokihi text-xs font-bold tracking-widest mb-4 block">
            TEAM
          </span>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-sumi-dark mb-12 leading-relaxed">
            体制
          </h2>

          <div className="bg-white p-8 md:p-10 shadow-sm border border-sumi/10">
            <dl className="divide-y divide-sumi/10">
              <div className="grid grid-cols-1 md:grid-cols-3 py-4 gap-2">
                <dt className="font-bold text-kokihi text-sm md:text-base">講師・制作・執筆</dt>
                <dd className="md:col-span-2 text-sm md:text-base text-sumi">前川 真司</dd>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 py-4 gap-2">
                <dt className="font-bold text-kokihi text-sm md:text-base">
                  企画・コンテンツ編集・ブランディング
                </dt>
                <dd className="md:col-span-2 text-sm md:text-base text-sumi">
                  今宿 裕昭（元博報堂プロデューサー／プロボノ）
                </dd>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 py-4 gap-2">
                <dt className="font-bold text-kokihi text-sm md:text-base">
                  お問い合わせ・取材対応
                </dt>
                <dd className="md:col-span-2 text-sm md:text-base text-sumi">
                  <Link
                    href="/contact"
                    className="border-b border-sumi/30 hover:text-kokihi hover:border-kokihi transition-colors"
                  >
                    お問い合わせフォーム
                  </Link>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 w-full py-20 md:py-32 bg-sumi-dark text-kinari">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <span className="mb-4 block text-xs font-bold tracking-widest text-gold">
            CONTACT
          </span>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-kinari mb-8 leading-relaxed">
            講演・取材・コラボレーション
          </h2>
          <p className="mb-12 text-base leading-8 text-kinari/90 md:leading-loose">
            企業・自治体・学校・地域団体・メディアからのご相談を承ります。
            <br />
            講演テーマや尺の調整、オンライン／対面いずれも対応可能です。
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="bg-kokihi text-white px-10 py-4 hover:bg-white hover:text-kokihi transition-all duration-300 shadow-xl tracking-widest font-serif font-bold text-base rounded-sm w-full md:w-auto"
            >
              お問い合わせへ
            </Link>
            <a
              href="https://lin.ee/KY9xx1E"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-kinari/40 text-kinari px-10 py-4 hover:bg-kinari hover:text-sumi-dark transition-all duration-300 tracking-widest font-serif font-bold text-base rounded-sm w-full md:w-auto"
            >
              公式LINEで最新情報
            </a>
          </div>

          <div className="mt-16 flex flex-col items-center justify-center gap-6 text-sm text-kinari/70 md:flex-row">
            <a
              href="https://note.com/maekawa_shikan"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-kokihi transition-colors"
            >
              note
            </a>
            <span className="hidden md:inline opacity-40">/</span>
            <a
              href="https://www.youtube.com/@sore-mako"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-kokihi transition-colors"
            >
              YouTube
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
