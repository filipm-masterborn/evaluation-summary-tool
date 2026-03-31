import { EvaluationData } from "@/types/evaluation";

export const defaultData: EvaluationData = {
  photo: "",
  name: "Imię Nazwisko",
  title: "Stanowisko",
  badge: { text: "LIGHT TOUCH", color: "cyan" },

  mbSince: "7 msc. - 20.08.2025",
  promotionDate: "2 msc. - 01.02.2026",
  evaluationType: "Pierwsza",

  rating: {
    score: 3.4,
    maxScore: 4,
    respondents: 9,
    comment:
      "Spójne z growth modelem - w kilku obszarach operuje powyżej oczekiwań na juniora.",
  },

  promotion: {
    decision: "TAK - potencjał | NIE - za wcześnie",
    bullets: [
      "Biznes, klient, teamwork: powyżej juniora.",
      "Warsztat Figmowy i MVP mindset: jeszcze dojrzewają. Potrzeba więcej projektów żeby wyrównać poziom.",
    ],
  },

  delta: [
    "Intern → Junior. Awans 01.02.2026, na podstawie widocznego progresu w Aptus i Conlego.",
    "Samodzielne przejęcie relacji z trudnym klientem (Jonathan). Odciążył cały zespół bez większego nadzoru.",
    "Jednoczesna praca w 2 projektach (Aptus + Conlego AI Discovery), efektywne balansowanie priorytetów.",
    "Aktywnie inicjował feedback. W grudniu sam poprosił cały Aptus o ocenę, widoczna poprawa od tamtego czasu.",
  ],

  strengths: [
    {
      id: "s1",
      icon: "Zap",
      title: "Adaptacja i proaktywność",
      description:
        "Szybki onboarding w Aptus (Proposed Models) i Conlego. Hackathon od razu po wejściu do firmy.",
    },
    {
      id: "s2",
      icon: "Handshake",
      title: "Komunikacja z klientem",
      description:
        'Zbudował zaufanie Jonathana. "Jonathan bardzo się uspokoił i zgadza się na odważniejsze podejścia." - Aneta',
    },
    {
      id: "s3",
      icon: "ShieldCheck",
      title: "Samodzielność i ownership",
      description:
        'Dowozi bez nadzoru. Damian: "Wiem że Aptus jest w dobrych rękach. Oczekuję tego od Filipa/Konrada, nie od Kacpra." - Preski na spotkanie, daje opcje do wyboru, sprawdza z zespołem',
    },
    {
      id: "s4",
      icon: "UsersRound",
      title: "Współpraca i atmosfera",
      description:
        'Aneta: "Dobra dusza - mnóstwo spokoju i uśmiechu." Uwzględnia perspektywy FE i QA, dopytuje, wbija sam spotkania itp.',
    },
  ],

  improvements: [
    {
      id: "i1",
      icon: "Layers",
      title: "Figma — porządek i techniki",
      description:
        "Solidne podstawy, ale pliki rosną i trudno się w nich poruszać. Do rozwinięcia: warianty, variables, higiena pliku. Edge Case'y: error states itp",
    },
    {
      id: "i2",
      icon: "RefreshCw",
      title: "Feedback loopy",
      description:
        "Tendencja do zamykania się przed wyjściem z updatem. Krótsze pętle, więcej widoczności w toku pracy. [Damian - silos i slack odpowiedź]",
    },
    {
      id: "i3",
      icon: "Crosshair",
      title: "MVP mindset",
      description:
        'Projektuje long-term ("co GDYBY"). Do ćwiczenia: priorytetyzacja pod natychmiastową wartość dla użytkownika i biznesu.',
    },
    {
      id: "i4",
      icon: "MessagesSquare",
      title: "Pewność siebie w dyskusjach",
      description:
        'Zdarza się, że ustępuje zamiast bronić przemyślanych rozwiązań.\nMaciej Z.: "Jego designy nie odbiegają od midów."',
    },
  ],

  overall: {
    text: "Kacper w 7 miesiącach zrobił progres, którego oczekuje się od kogoś z większym stażem. Dojrzałość, samodzielność i relacje z klientem na poziomie mida. Obszary rozwoju naturalne dla etapu kariery i aktywnie przez niego adresowane.",
    quote: {
      text: "Kacper zrobił taki progres w te pół roku, że aż szok.",
      author: "Damian Fejdasz",
    },
    closing:
      "Na najbliższy okres warto żeby Kacper wybrał 2–3 priorytety rozwojowe i ułożył konkretną roadmapę zamiast gryźć wszystko naraz. Zaawansowana Figma przyjdzie naturalnie z praktyką w projektach, nie ma tu skrótu.",
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
