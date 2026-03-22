let lastPlayedTimestamp = 0;


function drawIntro() {
    const canvas = document.getElementById('pixel-canvas');
    if(!canvas) return;
    canvas.innerHTML = '';
    const logoMap = [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,1,1,0,1,1,1,0,1,0,1,0,1,0,1,0,0,0,1,0,1,1,1,0,1,1,0,0,1,1,1],
        [1,0,0,0,1,0,1,0,1,1,1,0,1,0,1,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
        [1,1,0,0,1,1,1,0,1,0,1,0,1,0,1,0,0,0,1,0,1,1,1,0,1,0,1,0,1,1,1],
        [1,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
        [1,0,0,0,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1,0,1,0,1,0,1,1,0,0,1,0,1],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,1,1,1,0,1,0,1,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,1,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,1,1,1,0,1,0,1,0,0,0,0,0,0,0,0,0]
    ];
    logoMap.forEach(row => row.forEach(p => {
        const d = document.createElement('div');
        d.className = 'pixel' + (p === 1 ? ' on' : '');
        canvas.appendChild(d);
    }));
}
function update() {
    const data = JSON.parse(localStorage.getItem('familiada_state'));
    
    // Jeśli brak danych (np. po localStorage.clear()), wymuszamy stan początkowy wizualnie
    if (!data) {
        lastPlayedTimestamp = 0; // Resetujemy czas dźwięków
        location.reload(); // Najbezpieczniejsza opcja przy pełnym resecie
        return;
    }

    const introSnd = document.getElementById('snd-intro');
    const intro = document.getElementById('intro-screen');
    const game = document.getElementById('game-screen');
    const win = document.getElementById('win-screen');
    const blackout = document.getElementById('blackout');

    // --- 1. OBSŁUGA DŹWIĘKÓW (EFEKTY) ---
    if (data.lastSound && data.lastSound.time > lastPlayedTimestamp) {
        const s = document.getElementById('snd-' + data.lastSound.id);
        if (s) {
            s.currentTime = 0;
            s.play().catch(e => console.log("Interakcja wymagana do odtworzenia audio"));
        }
        lastPlayedTimestamp = data.lastSound.time;
    }

    // --- 2. OBSŁUGA MUZYKI INTRO (LOOP) ---
    if (introSnd) {
        // Graj intro tylko gdy showIntro jest true i gra się nie skończyła
        if (data.showIntro && !data.isGameOver) {
            if (introSnd.paused) {
                introSnd.currentTime = 0; // Start od początku przy resecie/wejściu
                introSnd.play().catch(() => {});
            }
        } else {
            // W każdym innym przypadku stopujemy intro
            introSnd.pause();
            introSnd.currentTime = 0;
        }
    }

    // --- 3. OBSŁUGA EKRANÓW I PRZEJŚĆ (BLACKOUT) ---
    if (data.transitioning) {
        if (blackout) blackout.style.opacity = "1";
        // Nie wychodzimy z funkcji, by tło pod blackoutem mogło się załadować w tle
    } 

    if (data.isGameOver) { 
        switchScreen(win);
        document.getElementById('win-team-name').innerText = data.winner || "-"; 
        document.getElementById('win-points').innerText = `${data.score1} : ${data.score2}`; 
    } 
    else if (data.showIntro) { 
        switchScreen(intro);
        document.body.classList.remove('game-mode'); 
    } 
    else { 
        switchScreen(game);
        document.body.classList.add('game-mode'); 
        updateBoard(data); 
    }

    // Zdjęcie zasłony tylko gdy reżyser skończył transycję
    if (blackout && !data.transitioning) {
        blackout.style.opacity = "0";
    }
}

function switchScreen(target) {
    const screens = [
        document.getElementById('intro-screen'), 
        document.getElementById('game-screen'), 
        document.getElementById('win-screen')
    ];

    screens.forEach(s => {
        if (!s) return;
        if (s === target) { 
            s.style.display = 'flex'; 
            // Mały delay dla opacity, aby display:flex zdążył zaskoczyć przed animacją
            setTimeout(() => { s.style.opacity = '1'; }, 20); 
        }
        else { 
            s.style.display = 'none'; 
            s.style.opacity = '0'; 
        }
    });
}
function switchScreen(target) {
    const screens = [document.getElementById('intro-screen'), document.getElementById('game-screen'), document.getElementById('win-screen')];
    screens.forEach(s => {
        if (s === target) { 
            s.style.display = 'flex'; 
            setTimeout(() => s.style.opacity = '1', 50); 
        }
        else { 
            s.style.display = 'none'; 
            s.style.opacity = '0'; 
        }
    });
}

function updateBoard(data) {
    document.getElementById('question-display').innerText = data.showQuestion ? data.currentQuestion : "";
    document.getElementById('question-display').style.opacity = data.showQuestion ? "1" : "0";

    const narada = document.getElementById('narada-box');
    if(data.showNarada && ((data.strikes1 === 2 && data.activeTeam === 1) || (data.strikes2 === 2 && data.activeTeam === 2))) {
        narada.innerText = `DRUŻYNA ${data.activeTeam === 1 ? data.name2 : data.name1} SIĘ NARADZA!`;
        narada.style.display = 'block';
    } else { 
        narada.style.display = 'none'; 
    }

    document.getElementById('n1').innerText = data.name1;
    document.getElementById('n2').innerText = data.name2;
    document.getElementById('s1').innerText = data.score1.toString().padStart(3, '0');
    document.getElementById('s2').innerText = data.score2.toString().padStart(3, '0');
    document.getElementById('pot').innerText = data.pot.toString().padStart(3, '0');
    document.getElementById('str1').innerText = "X".repeat(data.strikes1);
    document.getElementById('str2').innerText = "X".repeat(data.strikes2);

    document.getElementById('box-left').style.boxShadow = data.activeTeam === 1 ? "0 0 50px #ff3333" : "none";
    document.getElementById('box-right').style.boxShadow = data.activeTeam === 2 ? "0 0 50px #3333ff" : "none";

    const grid = document.getElementById('ans-grid');
    grid.innerHTML = '';
    (data.answers || []).forEach((ans, i) => {
        const div = document.createElement('div');
        div.className = `ans-row ${ans.revealed ? '' : 'hidden'}`;
        div.setAttribute('data-index', i + 1);
        div.innerHTML = `<span>${ans.text}</span><span>${ans.points}</span>`;
        grid.appendChild(div);
    });
}

window.onload = () => { drawIntro(); update(); };
window.addEventListener('storage', update);