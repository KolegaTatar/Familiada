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
    if (!data) {
        location.reload();
        return;
    }

    const allAudios = document.querySelectorAll('audio');
    const introSnd = document.getElementById('snd-intro');

    // --- 1. GLOBALNE WYCISZENIE ---
    if (data.isMuted) {
        allAudios.forEach(a => {
            a.pause();
            a.muted = true;
        });
    } else {
        allAudios.forEach(a => a.muted = false);
    }

    // --- 2. OBSŁUGA KOMENDY STOP ---
    if (data.lastSound && data.lastSound.id === 'stop' && data.lastSound.time > lastPlayedTimestamp) {
        allAudios.forEach(a => {
            a.pause();
            a.currentTime = 0;
        });
        lastPlayedTimestamp = data.lastSound.time;
        return; 
    }

    // --- 3. EFEKTY DŹWIĘKOWE (OK, X, WIN) ---
    if (!data.isMuted && data.lastSound && data.lastSound.time > lastPlayedTimestamp) {
        const s = document.getElementById('snd-' + data.lastSound.id);
        if (s) {
            // Zatrzymujemy inne efekty, by się nie nakładały (oprócz intro)
            allAudios.forEach(a => { if(a.id !== 'snd-intro') { a.pause(); a.currentTime = 0; } });
            
            s.play().catch(e => console.log("Odblokuj audio kliknięciem"));
        }
        lastPlayedTimestamp = data.lastSound.time;
    }

    // --- 4. MUZYKA INTRO ---
    if (introSnd && !data.isMuted) {
        if (data.showIntro && !data.isGameOver) {
            if (introSnd.paused) {
                introSnd.currentTime = 0;
                introSnd.play().catch(() => {});
            }
        } else {
            introSnd.pause();
            introSnd.currentTime = 0;
        }
    }

    // --- 5. EKRANY (switchScreen) ---
    const intro = document.getElementById('intro-screen');
    const game = document.getElementById('game-screen');
    const win = document.getElementById('win-screen');
    const blackout = document.getElementById('blackout');

    if (data.transitioning) {
        if (blackout) blackout.style.opacity = "1";
        return;
    } 

    if (data.isGameOver) { 
        switchScreen(win);
        document.getElementById('win-team-name').innerText = data.winner || "-"; 
        document.getElementById('win-points').innerText = `${data.score1} : ${data.score2}`; 
    } 
    else if (data.showIntro) { 
        switchScreen(intro);
    } 
    else { 
        switchScreen(game);
        updateBoard(data); 
    }

    if (blackout && !data.transitioning) blackout.style.opacity = "0";
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