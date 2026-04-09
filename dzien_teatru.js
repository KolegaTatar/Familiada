const roundsData = [
    // KATEGORIA 1: Teoria dramatu i teatr (Antyczny i Szekspirowski)
    {
        pytanie: "Tekst poboczny w dramacie?",
        multiplier: 1,
        odpowiedzi: [
            { text: "DIDASKALIA", points: 80 },
            { text: "WSKAZÓWKI", points: 15 },
            { text: "OPISY", points: 5 }
        ]
    },
    {
        pytanie: "Gatunek dramatyczny?",
        multiplier: 1,
        odpowiedzi: [
            { text: "TRAGEDIA", points: 40 },
            { text: "KOMEDIA", points: 35 },
            { text: "DRAMAT ROMANTYCZNY", points: 20 },
            { text: "DRAMAT", points: 5 }
        ]
    },
    {
        pytanie: "Zasada w dramacie klasycznym?",
        multiplier: 1,
        odpowiedzi: [
            { text: "TRZY JEDNOŚCI", points: 45 },
            { text: "DECORUM", points: 30 },
            { text: "JEDNOŚĆ STYLU", points: 25 }
        ]
    },
    {
        pytanie: "Rodzaj dramatu ze względu na epokę?",
        multiplier: 1,
        odpowiedzi: [
            { text: "ANTYCZNY", points: 45 },
            { text: "SZEKSPIROWSKI", points: 30 },
            { text: "ROMANTYCZNY", points: 15 },
            { text: "KLASYCZNY", points: 10 }
        ]
    },
    {
        pytanie: "Osoba pracująca w teatrze?",
        multiplier: 1,
        odpowiedzi: [
            { text: "AKTOR", points: 40 },
            { text: "REŻYSER", points: 25 },
            { text: "SCENOGRAF", points: 15 },
            { text: "KOSTIUMOLOG", points: 10 },
            { text: "SUFLER", points: 10 }
        ]
    },
    {
        pytanie: "Część budowli greckiego amfiteatru?",
        multiplier: 1,
        odpowiedzi: [
            { text: "ORCHESTRA", points: 35 },
            { text: "SKENE", points: 30 },
            { text: "THEATRON", points: 20 },
            { text: "PROSKENION", points: 10 },
            { text: "PARODOS", points: 5 }
        ]
    },
    {
        pytanie: "Jakie emocje przedstawiały maski?",
        multiplier: 1,
        odpowiedzi: [
            { text: "SMUTEK", points: 35 },
            { text: "RADOŚĆ", points: 30 },
            { text: "STRACH", points: 20 },
            { text: "GNIEW", points: 15 }
        ]
    },
    {
        pytanie: "Co kojarzy się z teatrem „The Globe”?",
        multiplier: 1,
        odpowiedzi: [
            { text: "SZEKSPIR", points: 40 },
            { text: "LONDYN", points: 30 },
            { text: "BRAK DACHU", points: 20 },
            { text: "OKRĄGŁA SCENA", points: 10 }
        ]
    },
    {
        pytanie: "Rodzaj komizmu?",
        multiplier: 1,
        odpowiedzi: [
            { text: "SŁOWNY", points: 40 },
            { text: "SYTUACYJNY", points: 35 },
            { text: "POSTACI", points: 25 }
        ]
    },

    // KATEGORIA 2: Dramat antyczny ("Antygona")
    {
        pytanie: "Jedna z trzech jedności w dramacie antycznym?",
        multiplier: 1,
        odpowiedzi: [
            { text: "MIEJSCA", points: 40 },
            { text: "CZASU", points: 35 },
            { text: "AKCJI", points: 25 }
        ]
    },
    {
        pytanie: "Zadanie chóru w dramacie?",
        multiplier: 1,
        odpowiedzi: [
            { text: "KOMENTOWANIE AKCJI", points: 40 },
            { text: "OCENA MORALNA", points: 30 },
            { text: "ŚPIEW", points: 20 },
            { text: "TANIEC", points: 10 }
        ]
    },
    {
        pytanie: "Rodzaj pieśni chóru?",
        multiplier: 1,
        odpowiedzi: [
            { text: "PARODOS", points: 40 },
            { text: "STASIMON", points: 35 },
            { text: "EXODOS", points: 25 }
        ]
    },
    {
        pytanie: "Co czuje widz po obejrzeniu tragedii?",
        multiplier: 2,
        odpowiedzi: [
            { text: "KATHARSIS", points: 60 },
            { text: "LITOŚĆ", points: 20 },
            { text: "TRWOGĘ", points: 20 }
        ]
    },
    {
        pytanie: "Sytuacja bez wyjścia w tragedii?",
        multiplier: 2,
        odpowiedzi: [
            { text: "KONFLIKT TRAGICZNY", points: 50 },
            { text: "IRONIA TRAGICZNA", points: 30 },
            { text: "FATUM", points: 20 }
        ]
    },
    {
        pytanie: "Postać z tragedii „Antygona”?",
        multiplier: 2,
        odpowiedzi: [
            { text: "ANTYGONA", points: 40 },
            { text: "KREON", points: 30 },
            { text: "ISMENA", points: 15 },
            { text: "HAJMON", points: 10 },
            { text: "TYREZJASZ", points: 5 }
        ]
    },
    {
        pytanie: "Członek rodziny Edypa i Antygony?",
        multiplier: 2,
        odpowiedzi: [
            { text: "ISMENA", points: 40 },
            { text: "POLINEJKES", points: 30 },
            { text: "ETEOKLES", points: 20 },
            { text: "JOKASTA", points: 10 }
        ]
    },
    {
        pytanie: "Kim z zawodu był Tyrezjasz?",
        multiplier: 2,
        odpowiedzi: [
            { text: "WRÓŻBITĄ", points: 60 },
            { text: "PROROKIEM", points: 20 },
            { text: "ŚLEPCEM", points: 10 },
            { text: "WIZJONEREM", points: 10 }
        ]
    },
    {
        pytanie: "Kogo pochowała Antygona wbrew zakazowi?",
        multiplier: 2,
        odpowiedzi: [
            { text: "BRATA", points: 60 },
            { text: "POLINEJKESA", points: 30 },
            { text: "ZMARŁEGO", points: 10 }
        ]
    },

    // KATEGORIA 3: Dramat szekspirowski ("Makbet")
    {
        pytanie: "Co przepowiedziały wiedźmy Makbetowi?",
        multiplier: 2,
        odpowiedzi: [
            { text: "KRÓLESTWO", points: 45 },
            { text: "TYTUŁ TANA", points: 30 },
            { text: "WŁADZĘ", points: 15 }
        ]
    },
    {
        pytanie: "Co doprowadziło Makbeta do zguby?",
        multiplier: 2,
        odpowiedzi: [
            { text: "AMBICJA", points: 40 },
            { text: "ŻONA", points: 25 },
            { text: "PRZEPOWIEDNIA", points: 20 },
            { text: "ZBRODNIA", points: 15 }
        ]
    },
    {
        pytanie: "Miejsce akcji w „Makbecie”?",
        multiplier: 2,
        odpowiedzi: [
            { text: "SZKOCJA", points: 50 },
            { text: "ZAMEK", points: 25 },
            { text: "WRZOSOWISKO", points: 15 },
            { text: "LAS BIRNAMSKI", points: 10 }
        ]
    },
    {
        pytanie: "Zjawisko nadprzyrodzone u Szekspira?",
        multiplier: 2,
        odpowiedzi: [
            { text: "WIEDŹMY", points: 40 },
            { text: "DUCHY", points: 30 },
            { text: "ZJAWY", points: 20 },
            { text: "PRZEPOWIEDNIE", points: 10 }
        ]
    },
    {
        pytanie: "Postać z tragedii „Makbet”?",
        multiplier: 2,
        odpowiedzi: [
            { text: "MAKBET", points: 40 },
            { text: "LADY MAKBET", points: 30 },
            { text: "BANKO", points: 15 },
            { text: "DUNKAN", points: 10 },
            { text: "MAKDUF", points: 5 }
        ]
    },
    {
        pytanie: "Co Lady Makbet próbowała zmyć z rąk w obłędzie?",
        multiplier: 2,
        odpowiedzi: [
            { text: "KREW", points: 70 },
            { text: "WINĘ", points: 20 },
            { text: "PLAMY", points: 10 }
        ]
    },

    // KATEGORIA 4: Dramat romantyczny ("Dziady" cz. II i III)
    {
        pytanie: "Kto brał udział w obrzędzie (II cz.)?",
        multiplier: 3,
        odpowiedzi: [
            { text: "GUŚLARZ", points: 45 },
            { text: "CHÓR", points: 30 },
            { text: "WIEŚNIACY", points: 15 },
            { text: "DUCHY", points: 10 }
        ]
    },
    {
        pytanie: "Rodzaj ducha w „Dziadach”?",
        multiplier: 3,
        odpowiedzi: [
            { text: "LEKKI", points: 40 },
            { text: "CIĘŻKI", points: 30 },
            { text: "POŚREDNI", points: 20 },
            { text: "WIDMO", points: 10 }
        ]
    },
    {
        pytanie: "Jak nazywało się rodzeństwo (duchy lekkie) z II części?",
        multiplier: 3,
        odpowiedzi: [
            { text: "JÓZIO", points: 50 },
            { text: "RÓZIA", points: 50 }
        ]
    },
    {
        pytanie: "Co przynosili wieśniacy na obrzęd Dziadów?",
        multiplier: 3,
        odpowiedzi: [
            { text: "JEDZENIE", points: 40 },
            { text: "KĄDZIEL", points: 30 },
            { text: "ZIARNO", points: 20 },
            { text: "WÓDKĘ", points: 10 }
        ]
    },
    {
        pytanie: "Co kojarzy się z Konradem (III cz.)?",
        multiplier: 3,
        odpowiedzi: [
            { text: "MONOLOG", points: 40 },
            { text: "WIĘZIENIE", points: 30 },
            { text: "POEZJA", points: 20 },
            { text: "PROMETEIZM", points: 10 }
        ]
    },
    {
        pytanie: "Kto kłócił się z Bogiem w Improwizacji?",
        multiplier: 3,
        odpowiedzi: [
            { text: "KONRAD", points: 60 },
            { text: "POETA", points: 25 },
            { text: "WIĘZIEŃ", points: 15 }
        ]
    },
    {
        pytanie: "Czego Konrad żądał od Boga?",
        multiplier: 3,
        odpowiedzi: [
            { text: "RZĄDU DUSZ", points: 65 },
            { text: "WŁADZY", points: 20 },
            { text: "MOCY", points: 10 },
            { text: "ODPOWIEDZI", points: 5 }
        ]
    },
    {
        pytanie: "Z czym kojarzy się Widzenie Księdza Piotra?",
        multiplier: 3,
        odpowiedzi: [
            { text: "LICZBA 44", points: 50 },
            { text: "MESJANIZM", points: 30 },
            { text: "POLSKA", points: 15 },
            { text: "KRZYŻ", points: 5 }
        ]
    },
    {
        pytanie: "Co kojarzy się z mesjanizmem?",
        multiplier: 3,
        odpowiedzi: [
            { text: "POLSKA", points: 40 },
            { text: "CHRYSTUS NARODÓW", points: 35 },
            { text: "CIERPIENIE", points: 15 },
            { text: "ZBAWIENIE", points: 10 }
        ]
    },
    {
        pytanie: "Miejsce akcji III części „Dziadów”?",
        multiplier: 3,
        odpowiedzi: [
            { text: "WILNO", points: 45 },
            { text: "WARSZAWA", points: 25 },
            { text: "CELA", points: 20 },
            { text: "LWÓW", points: 10 }
        ]
    },
    {
        pytanie: "Postać obecna w scenie więziennej?",
        multiplier: 3,
        odpowiedzi: [
            { text: "KONRAD", points: 35 },
            { text: "JAN SOBOLSKI", points: 25 },
            { text: "ŻEGOTA", points: 20 },
            { text: "TOMASZ", points: 20 }
        ]
    },
    {
        pytanie: "Co stało się z Rollisonem w III części?",
        multiplier: 3,
        odpowiedzi: [
            { text: "WYRZUCONY PRZEZ OKNO", points: 60 },
            { text: "POBITY", points: 30 },
            { text: "UWIĘZIONY", points: 10 }
        ]
    },

    // KATEGORIA 5: "Balladyna", "Zemsta", "Skąpiec"
    {
        pytanie: "Jak Balladyna pozbyła się siostry?",
        multiplier: 3,
        odpowiedzi: [
            { text: "ZABIŁA NOŻEM", points: 50 },
            { text: "ZADŹGAŁA", points: 30 },
            { text: "W LESIE", points: 20 }
        ]
    },
    {
        pytanie: "Co Balladyna miała na czole po zbrodni?",
        multiplier: 3,
        odpowiedzi: [
            { text: "PLAMĘ Z KRWI", points: 60 },
            { text: "ZNAMIĘ", points: 30 },
            { text: "RANĘ", points: 10 }
        ]
    },
    {
        pytanie: "Symbol władzy w dramacie? (Balladyna / Makbet)",
        multiplier: 3,
        odpowiedzi: [
            { text: "KORONA", points: 80 },
            { text: "MIECZ", points: 10 },
            { text: "BERŁO", points: 10 }
        ]
    },
    {
        pytanie: "O co kłócili się Cześnik z Rejentem? (Zemsta)",
        multiplier: 3,
        odpowiedzi: [
            { text: "MUR", points: 80 },
            { text: "ZAMEK", points: 10 },
            { text: "GRANICA", points: 10 }
        ]
    },
    {
        pytanie: "Ulubione powiedzonko Cześnika? (Zemsta)",
        multiplier: 3,
        odpowiedzi: [
            { text: "MOCIUM PANIE", points: 85 },
            { text: "NIECH SIĘ DZIEJE WOLA NIEBA", points: 15 }
        ]
    },
    {
        pytanie: "Postać z „Zemsty”?",
        multiplier: 3,
        odpowiedzi: [
            { text: "PAPKIN", points: 40 },
            { text: "CZEŚNIK", points: 25 },
            { text: "REJENT", points: 20 },
            { text: "KLARA", points: 10 },
            { text: "WACŁAW", points: 5 }
        ]
    },
    {
        pytanie: "Nazwisko bohatera „Zemsty”?",
        multiplier: 3,
        odpowiedzi: [
            { text: "RAPTUSIEWICZ", points: 50 },
            { text: "MILCZEK", points: 40 },
            { text: "DYNDALSKI", points: 10 }
        ]
    },
    {
        pytanie: "Jak kończy się „Zemsta”?",
        multiplier: 3,
        odpowiedzi: [
            { text: "ZGODA", points: 60 },
            { text: "ŚLUB", points: 30 },
            { text: "POJEDNANIE", points: 10 }
        ]
    },
    {
        pytanie: "Co Harpagon trzymał w szkatułce? (Skąpiec)",
        multiplier: 3,
        odpowiedzi: [
            { text: "PIENIĄDZE", points: 60 },
            { text: "ZŁOTO", points: 30 },
            { text: "MAJĄTEK", points: 10 }
        ]
    }
];