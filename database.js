const roundsData = [
    {
        pytanie: "Co najczęściej kładziemy na kanapkę?",
        multiplier: 1,
        odpowiedzi: [
            { text: "SER", points: 35 },
            { text: "SZYNKA", points: 30 },
            { text: "MASŁO", points: 20 },
            { text: "POMIDOR", points: 10 },
            { text: "SAŁATA", points: 5 }
        ]
    },
    {
        pytanie: "Zwierzę, które potrafi latać?",
        multiplier: 1,
        odpowiedzi: [
            { text: "PTAK", points: 40 },
            { text: "NIETOPERZ", points: 25 },
            { text: "MUCHA", points: 15 },
            { text: "MOTYL", points: 12 },
            { text: "PSZCZOŁA", points: 8 }
        ]
    },
    {
        pytanie: "Przedmiot niezbędny podczas deszczu?",
        multiplier: 1,
        odpowiedzi: [
            { text: "PARASOL", points: 50 },
            { text: "PŁASZCZ PRZECIWDESZCZOWY", points: 20 },
            { text: "KALOSZE", points: 15 },
            { text: "KAPTUR", points: 10 },
            { text: "CHUSTECZKI", points: 5 }
        ]
    },
    {
        pytanie: "Co robimy w kinie?",
        multiplier: 1,
        odpowiedzi: [
            { text: "OGLĄDAMY FILM", points: 45 },
            { text: "JEMY POPCORN", points: 25 },
            { text: "PIJEMY COLĘ", points: 15 },
            { text: "MILCZYMY", points: 10 },
            { text: "ŚPIMY", points: 5 }
        ]
    },
    {
        pytanie: "Warzywo, które jest podstawą zupy?",
        multiplier: 1,
        odpowiedzi: [
            { text: "MARCHEWKA", points: 38 },
            { text: "ZIEMNIAK", points: 28 },
            { text: "PIETRUSZKA", points: 14 },
            { text: "SELER", points: 12 },
            { text: "CEBULA", points: 8 }
        ]
    },
    {
        pytanie: "Imię żeńskie na literę 'A'?",
        multiplier: 1,
        odpowiedzi: [
            { text: "ANNA", points: 42 },
            { text: "AGNIESZKA", points: 22 },
            { text: "ALICJA", points: 18 },
            { text: "AGATA", points: 10 },
            { text: "ALEKSANDRA", points: 8 }
        ]
    },
    {
        pytanie: "Urządzenie, które mamy w kieszeni?",
        multiplier: 1,
        odpowiedzi: [
            { text: "TELEFON", points: 55 },
            { text: "KLUCZE", points: 20 },
            { text: "PORTFEL", points: 15 },
            { text: "CHUSTECZKA", points: 7 },
            { text: "DROBNE", points: 3 }
        ]
    },
    {
        pytanie: "Co można robić nad jeziorem?",
        multiplier: 1,
        odpowiedzi: [
            { text: "PŁYWAĆ", points: 40 },
            { text: "ŁOWIĆ RYBY", points: 25 },
            { text: "OPALAĆ SIĘ", points: 20 },
            { text: "PŁYWAĆ ŁÓDKĄ", points: 10 },
            { text: "GRILLOWAĆ", points: 5 }
        ]
    },
    {
        pytanie: "Mebel, który znajdziemy w sypialni?",
        multiplier: 1,
        odpowiedzi: [
            { text: "ŁÓŻKO", points: 60 },
            { text: "SZAFA", points: 20 },
            { text: "STOLIK NOCNY", points: 10 },
            { text: "KOMODA", points: 7 },
            { text: "TOALETKA", points: 3 }
        ]
    },
    {
        pytanie: "Popularny owoc cytrusowy?",
        multiplier: 1,
        odpowiedzi: [
            { text: "POMARAŃCZA", points: 35 },
            { text: "CYTRYNA", points: 30 },
            { text: "MANDARYNKA", points: 20 },
            { text: "GREJPFRUT", points: 10 },
            { text: "LIMONKA", points: 5 }
        ]
    },
    {
        pytanie: "Czym możemy pisać?",
        multiplier: 2,
        odpowiedzi: [
            { text: "DŁUGOPIS", points: 45 },
            { text: "OŁÓWEK", points: 25 },
            { text: "PIÓRO", points: 20 },
            { text: "MARKER", points: 10 }
        ]
    },
    {
        pytanie: "Gdzie trzymamy pieniądze?",
        multiplier: 2,
        odpowiedzi: [
            { text: "PORTFEL", points: 50 },
            { text: "BANK", points: 30 },
            { text: "SKARPETA", points: 12 },
            { text: "SZAFA", points: 8 }
        ]
    },
    {
        pytanie: "Kwiat kojarzony z miłością?",
        multiplier: 2,
        odpowiedzi: [
            { text: "RÓŻA", points: 70 },
            { text: "TULIPAN", points: 15 },
            { text: "GOŹDZIK", points: 10 },
            { text: "FIOŁEK", points: 5 }
        ]
    },
    {
        pytanie: "Co kojarzy się z Bożym Narodzeniem?",
        multiplier: 2,
        odpowiedzi: [
            { text: "CHOINKA", points: 55 },
            { text: "PREZENTY", points: 25 },
            { text: "MIKOŁAJ", points: 12 },
            { text: "OPŁATEK", points: 8 }
        ]
    },
    {
        pytanie: "Część garderoby na nogi?",
        multiplier: 2,
        odpowiedzi: [
            { text: "SPODNIE", points: 40 },
            { text: "SKARPETY", points: 30 },
            { text: "BUTY", points: 20 },
            { text: "RAJSTOPY", points: 10 }
        ]
    },
    {
        pytanie: "Sztuciec używany do obiadu?",
        multiplier: 3,
        odpowiedzi: [
            { text: "WIDELEC", points: 45 },
            { text: "NÓŻ", points: 35 },
            { text: "ŁYŻKA", points: 20 }
        ]
    },
    {
        pytanie: "Co można znaleźć na plaży?",
        multiplier: 3,
        odpowiedzi: [
            { text: "PIASEK", points: 50 },
            { text: "WODA", points: 30 },
            { text: "MUSZELKI", points: 20 }
        ]
    },
    {
        pytanie: "Najpopularniejszy język obcy?",
        multiplier: 3,
        odpowiedzi: [
            { text: "ANGIELSKI", points: 75 },
            { text: "NIEMIECKI", points: 15 },
            { text: "HISZPAŃSKI", points: 10 }
        ]
    },
    {
        pytanie: "Instrument klawiszowy?",
        multiplier: 3,
        odpowiedzi: [
            { text: "PIANINO", points: 60 },
            { text: "FORTEPIAN", points: 30 },
            { text: "ORGANY", points: 10 }
        ]
    },
    {
        pytanie: "Polski skoczek narciarski?",
        multiplier: 3,
        odpowiedzi: [
            { text: "ADAM MAŁYSZ", points: 55 },
            { text: "KAMIL STOCH", points: 45 }
        ]
    }
];