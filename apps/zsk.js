const roundsData = [
    // RUNDY Z MNOŻNIKIEM X1
      {
        pytanie: "Pytanie test: Czy przyciski działają?",
        multiplier: 0,
        odpowiedzi: [
            { text: "TAK", points: 50 },
            { text: "NIE", points: 50 },
        ]
    },
    {
        pytanie: "Państwa, które mają krzyż na fladze?",
        multiplier: 1,
        odpowiedzi: [
            { text: "SZWAJCARIA", points: 37 },
            { text: "SZWECJA", points: 22 },
            { text: "ANGLIA", points: 17 },
            { text: "DANIA", points: 13 },
            { text: "NORWEGIA", points: 7 }
        ]
    },
    {
        pytanie: "Znane miejsca w pobliżu lub okolicy szkoły (ZSK)?",
        multiplier: 1,
        odpowiedzi: [
            { text: "ROGALIKI STAROMIEJSKIE", points: 35 },
            { text: "OKRĄGLAK", points: 21 },
            { text: "ŻABKA", points: 13 },
            { text: "TEATR", points: 12 },
            { text: "ZAMEK", points: 11 }
        ]
    },
        {
        pytanie: "Więcej niż jedno zwierzę to...?",
        multiplier: 1,
        odpowiedzi: [
            { text: "OWCA", points: 43 },
            { text: "LAMA", points: 26 },
            { text: "STADO", points: 13 },
            { text: "WIELE", points: 11 },
            { text: "DWA", points: 6 }
        ]
    },
        // RUNDY Z MNOŻNIKIEM X2
    {
        pytanie: "Najczęstsza wymówka w usprawiedliwieniu to?",
        multiplier: 2,
        odpowiedzi: [
            { text: "CHOROBA", points: 38 },
            { text: "ZŁE SAMOPOCZUCIE", points: 24 },
            { text: "PROBLEMY Z KOMUNIKACJĄ", points: 22 },
            { text: "WIZYTA U LEKARZA", points: 14 },
            { text: "ZASPANIE", points: 5 }
        ]
    },

    {
        pytanie: "Coś, co ma nogi, ale nie chodzi?",
        multiplier: 2,
        odpowiedzi: [
            { text: "STÓŁ", points: 42 },
            { text: "INWALIDA", points: 22 },
            { text: "KRZESŁO", points: 17 },
            { text: "ŁÓŻKO", points: 15 }
        ]
    },
        {
        pytanie: "Co uczeń trzyma w plecaku?",
        multiplier: 3,
        odpowiedzi: [
            { text: "KRAWAT", points: 40 },
            { text: "ŚNIADANIE", points: 21 },
            { text: "LAPTOP", points: 18 },
            { text: "ZESZYT", points: 12 },
            { text: "NIC", points: 3 }
        ]
    },

];

const finalData = [
    {
        pytanie: "Co najbardziej denerwuje nauczyciela?",
        multiplier: 1,
        odpowiedzi: [
            { text: "BRAK MUNDURKA", points: 38 },
            { text: "GADANIE NA LEKCJI", points: 24 },
            { text: "WYCHODZENIE DO TOAL.", points: 14 },
            { text: "NIEOBECNOŚCI", points: 12 },
            { text: "UŻYWANIE TELEFONU", points: 7 }
        ]
    },
    {
        pytanie: "Co najczęściej gubimy?",
        multiplier: 1,
        odpowiedzi: [
            { text: "CHĘCI", points: 36 },
            { text: "KLUCZE", points: 29 },
            { text: "KRAWAT", points: 28 },
            { text: "TELEFON", points: 4 }
        ]
    },
    {
        pytanie: "Co robimy w nocy (oprócz spania)?",
        multiplier: 1,
        odpowiedzi: [
            { text: "GRAMY", points: 37 },
            { text: "OGLĄDAMY", points: 28 },
            { text: "UCZYMY SIĘ", points: 18 },
            { text: "PISZEMY", points: 13 },
            { text: "LEŻYMY", points: 4 }
        ]
    },
    {
        pytanie: "Co rośnie, ale nie jest rośliną?",
        multiplier: 1,
        odpowiedzi: [
            { text: "CZŁOWIEK", points: 34 },
            { text: "ILOŚĆ UWAG", points: 22 },
            { text: "CENY RAM-U", points: 19 },
            { text: "INFLACJA", points: 13 },
            { text: "1 W DZIENNIKU", points: 12 }
        ]
    },
    {
        pytanie: "Trudny przedmiot w szkole?",
        multiplier: 1,
        odpowiedzi: [
            { text: "MATEMATYKA", points: 49 },
            { text: "LEKCJE ZAWODOWE", points: 22 },
            { text: "JĘZYK POLSKI", points: 11 },
            { text: "FIZYKA", points: 9 }
        ]
    }
];