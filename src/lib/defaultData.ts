import { EvaluationData } from "@/types/evaluation";

export const defaultData: EvaluationData = {
  photo: "",
  name: "Jan Kowalski",
  title: "Mid Product Designer",
  badge: { text: "STANDARD", color: "emerald" },

  mbSince: "14 msc. — 01.01.2025",
  promotionDate: "3 msc. — 01.01.2026",
  evaluationType: "Półroczna",

  rating: {
    score: 3.1,
    maxScore: 4,
    respondents: 7,
    comment:
      "<p>Konsekwentnie spełnia oczekiwania na nowym poziomie. W kilku obszarach operuje już powyżej standardu dla mida.</p>",
  },

  promotion: {
    content:
      '<p><strong>Silne argumenty za TAK</strong></p><ul><li>Samodzielnie prowadzi projekty od discovery do handoff — bez eskalacji do seniora.</li><li>Jakość decyzji designerskich i relacje z klientem konsekwentnie potwierdzone przez cały team.</li></ul>',
  },

  delta:
    '<ul><li>Junior → Mid Designer. Awans 01.01.2026 po 14 miesiącach w firmie, oparty na widocznym progresi w projektach Apollo i Vega.</li><li>Pierwsze samodzielne poprowadzenie discovery z klientem — warsztat + synteza bez udziału seniora.</li><li>Wdrożenie nowego komponentu do design systemu — inicjatywa własna, zaadoptowana przez dwa inne projekty.</li><li>Aktywny udział w onboardingu młodszego designera — mentoring nieoficjalny, ale zauważony przez zespół.</li></ul>',

  strengths: [
    {
      id: "s1",
      icon: "Lightbulb",
      title: "Myślenie produktowe",
      description:
        "Wychodzi poza ekrany — regularnie zadaje pytania o cel biznesowy i kwestionuje scope zanim zacznie projektować.",
    },
    {
      id: "s2",
      icon: "FileText",
      title: "Jakość dokumentacji",
      description:
        "Handofty są kompletne i dobrze opisane. Developerzy rzadko wracają z pytaniami — widać że Jan myśli o implementacji na etapie projektu.",
    },
    {
      id: "s3",
      icon: "ShieldCheck",
      title: "Niezawodność i dowożenie",
      description:
        "Zadania trafiają na czas i w umówionym zakresie. Zespół może planować sprint nie martwiąc się o design bottleneck.",
    },
    {
      id: "s4",
      icon: "UsersRound",
      title: "Współpraca cross-funkcyjna",
      description:
        "Naturalnie angażuje developerów i QA już na etapie wireframe'ów. Rozwiązania są realistyczne i rzadko wymagają renegocjacji.",
    },
  ],

  improvements: [
    {
      id: "i1",
      icon: "Clock",
      title: "Estymacja czasu pracy",
      description:
        "Tendencja do niedoszacowania scope'u, szczególnie przy zadaniach zależnych od innych. Warto budować bufor i komunikować ryzyko wcześniej.",
    },
    {
      id: "i2",
      icon: "RefreshCw",
      title: "Widoczność w trakcie pracy",
      description:
        "Przy dłuższych zadaniach bywa cicho za długo. Krótsze check-iny i wcześniejszy WIP pozwoliłyby unikać późnych korekt.",
    },
    {
      id: "i3",
      icon: "Mic2",
      title: "Prezentowanie decyzji",
      description:
        'Dobre rozwiązania — ale narracja przed klientem bywa zbyt techniczna. Warto ćwiczyć prezentowanie przez pryzmat celu użytkownika, nie procesu.',
    },
    {
      id: "i4",
      icon: "Layers",
      title: "Skalowanie do design systemu",
      description:
        "Projektuje lokalnie, nie zawsze myśląc o reużywalności. Nowy komponent w DS to dobry sygnał — warto kontynuować tę praktykę.",
    },
  ],

  overall: {
    content:
      '<p>Jan solidnie stawia pierwsze kroki na poziomie mida. Progres jest widoczny i konsekwentny — zwłaszcza w zakresie samodzielności i jakości pracy z klientem. Kolejny etap to świadome budowanie wpływu poza własnym projektem.</p><blockquote><p>"Jan to ktoś, na kim można polegać — zawsze dowozi i nie trzeba go pilnować." — PM projektu Apollo</p></blockquote><p>Na najbliższy okres warto żeby Jan wybrał jeden obszar do głębszego rozwinięcia zamiast rozłożyć energię na wszystko równomiernie. Potencjał na seniora jest — pytanie o tempo i kierunek.</p>',
  },

  sections: {
    rating: true,
    promotion: true,
    delta: true,
    strengths: true,
    improvements: true,
    overall: true,
  },

  layout: "classic",
};
