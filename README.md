# 📺 Familiada ZSK – Interaktywny System Teleturniejowy / Interactive Game Show System

[PL] System stworzony na potrzeby uroczystości **Zakończenia Maturzystów 2026 w Zespole Szkół Komunikacji w Poznaniu**.  
[EN] A system created for the **2026 Graduation Ceremony at the Technical School of Communication (ZSK) in Poznań**.

---

## 📂 Struktura projektu / Project Structure

```text
FAMILIADA/
├── apps/
│   ├── admin/
│   │   ├── admin.html
│   │   ├── logicA.js
│   │   └── styleA.css
│   ├── leader/
│   │   ├── leader.html
│   │   ├── logicL.js
│   │   └── styleL.css
│   ├── user/
│   │   ├── audio/
│   │   ├── index.html
│   │   ├── logic.js
│   │   └── styles.css
│   ├── peerjs.min.js
│   └── zsk.js
├── docs/
│   ├── Familiada - instrukcja i przebieg gry.pdf
│   └── Finał odpowiedzi - lista.pdf
├── hardware/
│   └── buttons_system/
│       └── buttons_system.ino
└── README.md


## 🇵🇱 Wersja Polska (Polish Version)

### 🚀 O projekcie
System programowo-sprzętowy zaprojektowany do przeprowadzenia starcia „Nauczyciele kontra Uczniowie”. Projekt odniósł ogromny sukces podczas inauguracji zakończenia roku – zebrał entuzjastyczne recenzje za płynność działania i autentyczny klimat telewizyjnej "Familiady".

### 🛠️ Jak to działa?
Projekt opiera się na architekturze P2P (Peer-to-Peer), co oznacza, że urządzenia komunikują się bezpośrednio ze sobą bez zewnętrznego serwera.
* **Wymagania przeglądarki:**  System został zoptymalizowany i przetestowany wyłącznie pod przeglądarkę Google Chrome. W innych przeglądarkach funkcje sprzętowe i sieciowe mogą nie działać prawidłowo.
* **Synchronizacja Live:** Zmiany wprowadzone przez Reżysera natychmiast pojawiają się na tablicy wyników i tablecie Prowadzącego.
* **Hardware:** Fizyczne przyciski (buzzery) podłączone przez Arduino blokują system po wykryciu pierwszej odpowiedzi (kto pierwszy, ten lepszy).
* **Audio:** Pełna ścieżka dźwiękowa (intro, poprawne odpowiedzi, błędy).

### 📱 Moduły
1.  **Widok Widza (`index.html`):** Tablica wyświetlana na rzutniku.
2.  **Reżyserka (`admin.html`):** Centrum sterowania punktami, rundami i dźwiękiem.
3.  **Panel Prowadzącego (`leader.html`):** Widok mobilny z podglądem pytań i odpowiedzi.

### ⚙️ Instrukcja uruchomienia
1.  **Kolejność otwierania:** * Najpierw otwórz `admin.html` (musi być hostem sesji).
    * Następnie otwórz `index.html` oraz `leader.html`.
2.  **Arduino:** Podłącz buzzery do komputera z panelem reżysera i kliknij ikonę portu szeregowego (Serial), aby połączyć hardware.
3.  **Internet:** Wymagany do działania biblioteki PeerJS.

---

## 🇺🇸 English Version

### 🚀 About the Project
A software and hardware system designed for the "Teachers vs. Students" game show. Developed for the 2026 Graduation Ceremony, it received fantastic feedback for its professional execution and engaging gameplay.

### 🛠️ How it Works
The system uses P2P (Peer-to-Peer) architecture for real-time communication between devices without a backend server.
* **Browser Compatibility:**  This system is optimized and tested strictly for Google Chrome. Features may fail on other browsers due to specific hardware and network API requirements.
* **Live Sync:** Real-time updates between the Director, the Host, and the Audience display.
* **Hardware Integration:** Physical buzzers connected via Arduino ensure fair "fastest finger first" mechanics using the Web Serial API.
* **Atmosphere:** Integrated sound effects and animations for an authentic TV experience.

### 📱 Modules
1.  **Audience View (`index.html`):** The main scoreboard displayed on the projector.
2.  **Director's Panel (`admin.html`):** The control center for scoring, rounds, and audio.
3.  **Host Panel (`leader.html`):** A mobile-friendly view for the host with question/answer previews.

### ⚙️ Setup Instructions
1.  **Opening Order:** * Open `admin.html` first (it acts as the session host).
    * Then open `index.html` and `leader.html`.
2.  **Arduino Connection:** Connect your buzzer hardware to the Director's PC. Click the "Serial" icon in the admin panel to pair the device.
3.  **Connectivity:** An internet connection is required to load the PeerJS library.

---

## 📂 Dokumentacja / Documentation
Więcej szczegółów technicznych i zasad gry znajduje się w plikach PDF w repozytorium:
* `Familiada - instrukcja i przebieg gry.pdf`
* `Finał odpowiedzi - lista.pdf`

---
**Autor / Author:** [Wiktor Tatarynowicz](https://github.com/KolegaTatar)  
*Technical Programmer & Full-stack Developer*