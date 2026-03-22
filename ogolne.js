const roundsData = [
    {
        pytanie: "Więcej niż jeden przedmiot znajdziemy w piórniku?",
        multiplier: 1,
        odpowiedzi: [
            { text: "DŁUGOPIS", points: 38 },
            { text: "OŁÓWEK", points: 25 },
            { text: "GUMKA", points: 15 },
            { text: "LINIJKA", points: 12 },
            { text: "TEMPERÓWKA", points: 10 }
        ]
    },
    {
        pytanie: "Co robimy zaraz po przebudzeniu?",
        multiplier: 1,
        odpowiedzi: [
            { text: "OTWIERAMY OCZY", points: 40 },
            { text: "PRZECIĄGAMY SIĘ", points: 22 },
            { text: "WYŁĄCZAMY BUDZIK", points: 18 },
            { text: "IDZIEMY DO ŁAZIENKI", points: 12 },
            { text: "PIJEMY KAWĘ", points: 8 }
        ]
    },
    {
        pytanie: "Zwierzę na literę 'K'?",
        multiplier: 1,
        odpowiedzi: [
            { text: "KOT", points: 45 },
            { text: "KOŃ", points: 25 },
            { text: "KROWA", points: 15 },
            { text: "KANGUR", points: 10 },
            { text: "KOZA", points: 5 }
        ]
    },
    {
        pytanie: "Co dodajemy do herbaty?",
        multiplier: 1,
        odpowiedzi: [
            { text: "CUKIER", points: 42 },
            { text: "CYTRYNA", points: 30 },
            { text: "MIÓD", points: 15 },
            { text: "MLEKO", points: 8 },
            { text: "SOK", points: 5 }
        ]
    },
    {
        pytanie: "Popularna dyscyplina sportowa z piłką?",
        multiplier: 1,
        odpowiedzi: [
            { text: "PIŁKA NOŻNA", points: 50 },
            { text: "SIATKÓWKA", points: 20 },
            { text: "KOSZYKÓWKA", points: 15 },
            { text: "PIŁKA RĘCZNA", points: 10 },
            { text: "TENIS", points: 5 }
        ]
    },
    {
        pytanie: "Co można znaleźć w lesie?",
        multiplier: 1,
        odpowiedzi: [
            { text: "DRZEWA", points: 40 },
            { text: "GRZYBY", points: 30 },
            { text: "ZWIERZĘTA", points: 15 },
            { text: "MECH", points: 10 },
            { text: "JAGODY", points: 5 }
        ]
    },
    {
        pytanie: "Element stroju zimowego?",
        multiplier: 1,
        odpowiedzi: [
            { text: "CZAPKA", points: 35 },
            { text: "SZALIK", points: 25 },
            { text: "RĘKAWICZKI", points: 20 },
            { text: "KURTKA", points: 15 },
            { text: "KOZAKI", points: 5 }
        ]
    },
    {
        pytanie: "Państwo sąsiadujące z Polską?",
        multiplier: 1,
        odpowiedzi: [
            { text: "NIEMCY", points: 38 },
            { text: "CZECHY", points: 22 },
            { text: "SŁOWACJA", points: 18 },
            { text: "UKRAINA", points: 12 },
            { text: "LITWA", points: 10 }
        ]
    },
    {
        pytanie: "Co kupujemy w piekarni?",
        multiplier: 1,
        odpowiedzi: [
            { text: "CHLEB", points: 55 },
            { text: "BUŁKI", points: 25 },
            { text: "DROŻDŻÓWKI", points: 12 },
            { text: "PĄCZKI", points: 5 },
            { text: "BAGIETKI", points: 3 }
        ]
    },
    {
        pytanie: "Część twarzy?",
        multiplier: 1,
        odpowiedzi: [
            { text: "NOS", points: 35 },
            { text: "OCZY", points: 30 },
            { text: "USTA", points: 20 },
            { text: "CZOŁO", points: 10 },
            { text: "POLICZKI", points: 5 }
        ]
    },
    {
        pytanie: "Gdzie wyjeżdżamy na wakacje?",
        multiplier: 2,
        odpowiedzi: [
            { text: "NAD MORZE", points: 45 },
            { text: "W GÓRY", points: 35 },
            { text: "NA MAZURY", points: 12 },
            { text: "ZA GRANICĘ", points: 8 }
        ]
    },
    {
        pytanie: "Czym możemy podróżować?",
        multiplier: 2,
        odpowiedzi: [
            { text: "SAMOCHÓD", points: 40 },
            { text: "POCIĄG", points: 30 },
            { text: "SAMOLOT", points: 20 },
            { text: "AUTOBUS", points: 10 }
        ]
    },
    {
        pytanie: "Co kojarzy się z latem?",
        multiplier: 2,
        odpowiedzi: [
            { text: "SŁOŃCE", points: 50 },
            { text: "UPAŁ", points: 25 },
            { text: "WAKACJE", points: 15 },
            { text: "LODY", points: 10 }
        ]
    },
    {
        pytanie: "Płyn do picia niebędący wodą?",
        multiplier: 2,
        odpowiedzi: [
            { text: "SOK", points: 42 },
            { text: "KAWA", points: 28 },
            { text: "HERBATA", points: 20 },
            { text: "MLEKO", points: 10 }
        ]
    },
    {
        pytanie: "Urządzenie AGD w kuchni?",
        multiplier: 2,
        odpowiedzi: [
            { text: "LODÓWKA", points: 45 },
            { text: "KUCHENKA", points: 30 },
            { text: "ZMYWARKA", points: 15 },
            { text: "CZAJNIK", points: 10 }
        ]
    },
    {
        pytanie: "Co można czytać?",
        multiplier: 3,
        odpowiedzi: [
            { text: "KSIĄŻKA", points: 60 },
            { text: "GAZETA", points: 30 },
            { text: "KOMIKS", points: 10 }
        ]
    },
    {
        pytanie: "Kolor tęczy?",
        multiplier: 3,
        odpowiedzi: [
            { text: "CZERWONY", points: 45 },
            { text: "NIEBIESKI", points: 35 },
            { text: "ŻÓŁTY", points: 20 }
        ]
    },
    {
        pytanie: "Dzień tygodnia na literę 'P'?",
        multiplier: 3,
        odpowiedzi: [
            { text: "PONIEDZIAŁEK", points: 55 },
            { text: "PIĄTEK", points: 45 }
        ]
    },
    {
        pytanie: "Co nosimy na ręku?",
        multiplier: 3,
        odpowiedzi: [
            { text: "ZEGAREK", points: 65 },
            { text: "BRANSOLETKA", points: 25 },
            { text: "PIERŚCIONEK", points: 10 }
        ]
    },
    {
        pytanie: "Sławny polski astronom?",
        multiplier: 3,
        odpowiedzi: [
            { text: "MIKOŁAJ KOPERNIK", points: 95 },
            { text: "HEWELIUSZ", points: 5 }
        ]
    }
];