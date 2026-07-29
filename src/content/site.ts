export const siteConfig = {
  brand: "前川史観",
  project: "それはまことですか？",
  person: "前川真司",
  tagline: "語られなかった歴史に、近江から光を当てる。",
  description:
    "前川真司が近江から日本史を読み解く「前川史観」の公式サイト。オンラインとリアル、二つのサロンにいつからでも参加できます。",
  urls: {
    line: "https://lin.ee/KY9xx1E",
    note: "https://note.com/maekawa_shikan",
    youtubeEmbed: "https://www.youtube.com/embed/gjrhWpu5CjY",
    onlinePass: "https://yoor.jp/door/michibikarete",
    onlineSingle: "https://buy.stripe.com/aFa7sKfPV0yKgaegRn5c401",
  },
} as const;

export const salonChoices = [
  {
    key: "online",
    eyebrow: "ONLINE SALON",
    title: "オンラインサロン",
    summary: "全国から参加でき、これまでの回もアーカイブでたどれます。",
    availability: "開催途中から、いつでも参加できます",
    href: "/online",
  },
  {
    key: "real",
    eyebrow: "REAL SALON",
    title: "リアルサロン",
    summary: "近江で同じ場を囲み、前川真司と対話しながら読み解きます。",
    availability: "表層編未受講でも、深層編から参加できます",
    href: "/real",
  },
] as const;

export const upcomingSalons = {
  online: {
    format: "オンライン",
    date: "2026/08/13（木）",
    time: "19:00–21:00",
    title: "第3回｜もしかして、ここが「あの国」？",
    note: "アーカイブ視聴があるため、途中参加でも第1回から学べます。",
    href: "/online",
  },
  real: {
    format: "リアル",
    date: "2026/08/27（木）",
    time: "18:30–20:30",
    title: "深層編 第1回",
    note: "初めての方へ、冒頭に表層編のダイジェストを用意します。",
    href: "/apply",
  },
} as const;

export const onlineCurriculum = [
  {
    date: "2026/06/11（木）",
    title: "近江は、私たちのどこにいたのだろう",
    subtitle: "日本史の地図を、近江から広げてみる",
  },
  {
    date: "2026/07/09（木）",
    title: "一万年前の、しあわせのかたち",
    subtitle: "東近江の縄文と土偶が語るもの",
  },
  {
    date: "2026/08/13（木）",
    title: "もしかして、ここが「あの国」？",
    subtitle: "邪馬台国近江説というロマン",
  },
  {
    date: "2026/09/10（木）",
    title: "兄と弟が、国を二つに分けた日",
    subtitle: "ふたつの正義がぶつかった、古代の決断",
  },
  {
    date: "2026/10/08（木）",
    title: "負けた者は、どこへ消えたのか",
    subtitle: "近江に残る源平の伝承と、生きのびる人々の物語",
  },
  {
    date: "2026/11/12（木）",
    title: "同じ血が、争うとき",
    subtitle: "近江を動かした一族たちの素顔",
  },
  {
    date: "2026/12/10（木）",
    title: "刀を置いて、そろばんを持った人たち",
    subtitle: "敗者はなぜ商人になったのか─三井家誕生の物語",
  },
  {
    date: "2027/01/14（木）",
    title: "「悪人」と呼ばれた人の、本当の顔",
    subtitle: "教科書が教えなかった、一期一会のある決断",
  },
  {
    date: "2027/02/11（木）",
    title: "あの会社も、近江から始まった",
    subtitle: "近江商人の挑戦と葛藤",
  },
  {
    date: "2027/03/11（木）",
    title: "あなたの「現在地」が、見えてくる",
    subtitle: "近江から、もっと深い物語の入口へ",
  },
] as const;

export const realProgram = {
  surface: {
    title: "表層編",
    label: "入口となる全体地図",
    description:
      "近江の1万3000年を体系的にたどる入門編。第2期は参加希望を受け付けます。",
  },
  deep: {
    title: "深層編",
    label: "地図の下にある、もう一枚の地図",
    description:
      "前川真司が新しい仮説と物語を掘り下げる旗艦編。表層編未受講でも参加できます。",
    dates: ["2026/08/27（木）18:30", "2026/09/30（水）18:30"],
  },
} as const;

export const engagementWays = [
  {
    number: "01",
    title: "参加する",
    body: "オンラインまたはリアル、自分に合う入口から前川史観に触れる。",
    href: "/#salons",
    label: "二つのサロンを見る",
  },
  {
    number: "02",
    title: "紹介する",
    body: "気になった物語やサロンを、歴史の好きな友人へ手渡す。",
    href: "/#stories",
    label: "物語を見る",
  },
  {
    number: "03",
    title: "出版を応援する",
    body: "出版までの現在地を知り、案内を受け取り、物語が本になる過程に関わる。",
    href: "/publication",
    label: "出版への道を見る",
  },
  {
    number: "04",
    title: "共につくる",
    body: "講演、取材、教育、地域企画など、新しい場で前川史観をひらく。",
    href: "/contact",
    label: "相談する",
  },
] as const;
