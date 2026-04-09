let lastPlayedTimestamp = 0;
let scrollPos = 0;
let lastFrameTime = 0;
let isScrolling = false;
let lastReset = 0;

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

    // GLOBALNE WYCISZENIE
    if (data.isMuted) {
        allAudios.forEach(a => {
            a.pause();
            a.muted = true;
        });
    } else {
        allAudios.forEach(a => a.muted = false);
    }

    // OBSŁUGA KOMENDY STOP
    if (data.lastSound && data.lastSound.id === 'stop' && data.lastSound.time > lastPlayedTimestamp) {
        allAudios.forEach(a => {
            a.pause();
            a.currentTime = 0;
        });
        lastPlayedTimestamp = data.lastSound.time;
        return; 
    }

    // EFEKTY DŹWIĘKOWE
    if (!data.isMuted && data.lastSound && data.lastSound.time > lastPlayedTimestamp) {
        const s = document.getElementById('snd-' + data.lastSound.id);
        if (s) {
            allAudios.forEach(a => { if(a.id !== 'snd-intro') { a.pause(); a.currentTime = 0; } });
            s.play().catch(e => console.log("Audio blocked"));
        }
        lastPlayedTimestamp = data.lastSound.time;
    }

    // MUZYKA INTRO
    if (introSnd && !data.isMuted) {
        if (data.showIntro && !data.isGameOver && !data.showOredzie) {
            if (introSnd.paused) {
                introSnd.currentTime = 0;
                introSnd.play().catch(() => {});
            }
        } else {
            introSnd.pause();
            introSnd.currentTime = 0;
        }
    }

  
    const intro = document.getElementById('intro-screen');
    const game = document.getElementById('game-screen');
    const win = document.getElementById('win-screen');
    const oredzie = document.getElementById('oredzie-screen');
    const blackout = document.getElementById('blackout');

    if (data.transitioning) {
        if (blackout) blackout.style.opacity = "1";
        return;
    } 

    if (data.isGameOver) { 
        switchScreen(win);
        document.getElementById('win-team-name').innerText = data.winner || "-"; 
        document.getElementById('win-points').innerText = `${data.score1} : ${data.score2}`; 
        isScrolling = false;
    } 
    else if (data.showOredzie) {
        switchScreen(oredzie);
        if (!isScrolling) {
            isScrolling = true;
            lastFrameTime = performance.now();
            requestAnimationFrame(animateScroll);
        }
    }
    else if (data.showIntro) { 
        switchScreen(intro);
        isScrolling = false;
    } 
    else { 
        switchScreen(game);
        updateBoard(data); 
        isScrolling = false;
    }

    if (data.scrollReset && data.scrollReset > lastReset) {
        scrollPos = 0;
        lastReset = data.scrollReset;
    }

    window.currentScrollSpeed = data.scrollSpeed || 40;

    if (blackout && !data.transitioning) blackout.style.opacity = "0";
}

function switchScreen(target) {
    const screens = [
        document.getElementById('intro-screen'), 
        document.getElementById('game-screen'), 
        document.getElementById('win-screen'),
        document.getElementById('oredzie-screen')
    ];

    screens.forEach(s => {
        if (!s) return;
        if (s === target) { 
            s.style.display = 'flex'; 
            setTimeout(() => { s.style.opacity = '1'; }, 20); 
        }
        else { 
            s.style.display = 'none'; 
            s.style.opacity = '0'; 
        }
    });
}

function animateScroll() {
    if (!isScrolling) return;

    const now = performance.now();
    const deltaTime = (now - lastFrameTime) / 1000;
    lastFrameTime = now;

    scrollPos += window.currentScrollSpeed * deltaTime;

    const container = document.getElementById('scroll-container');
    if (container) {
        container.style.transform = `translateY(-${scrollPos}px)`;
    }

    requestAnimationFrame(animateScroll);
}

function updateBoard(data) {
    const qDisplay = document.getElementById('question-display');
    if(qDisplay) {
        qDisplay.innerText = data.showQuestion ? data.currentQuestion : "";
        qDisplay.style.opacity = data.showQuestion ? "1" : "0";
    }

    // LOGIKA NARADY
    const narada = document.getElementById('narada-box');
    if (narada) {
        if (data.showNarada && ((data.strikes1 === 2 && data.activeTeam === 1) || (data.strikes2 === 2 && data.activeTeam === 2))) {
            const druzynaNaradzajaca = (data.activeTeam === 1) ? data.name2 : data.name1;
            narada.innerText = `Drużyna ${druzynaNaradzajaca} się naradza`;
            narada.classList.add('active');
        } else { 
            narada.classList.remove('active');
            setTimeout(() => {
                if (!narada.classList.contains('active')) narada.innerText = "";
            }, 500);
        }
    }

    // Punkty i nazwy
    document.getElementById('n1').innerText = data.name1;
    document.getElementById('n2').innerText = data.name2;
    document.getElementById('s1').innerText = data.score1.toString().padStart(3, '0');
    document.getElementById('s2').innerText = data.score2.toString().padStart(3, '0');
    document.getElementById('pot').innerText = data.pot.toString().padStart(3, '0');
    
    // Iksy
    document.getElementById('str1').innerText = "X".repeat(data.strikes1);
    document.getElementById('str2').innerText = "X".repeat(data.strikes2);

    // Podświetlenie ramek
    document.getElementById('box-left').style.boxShadow = data.activeTeam === 1 ? "0 0 50px #ff3333" : "none";
    document.getElementById('box-right').style.boxShadow = data.activeTeam === 2 ? "0 0 50px #3333ff" : "none";

    // Tablica odpowiedzi
    const grid = document.getElementById('ans-grid');
    if(grid) {
        grid.innerHTML = '';
        (data.answers || []).forEach((ans, i) => {
            const div = document.createElement('div');
            div.className = `ans-row ${ans.revealed ? '' : 'hidden'}`;
            div.setAttribute('data-index', i + 1);
            div.innerHTML = `<span>${ans.text}</span><span>${ans.points}</span>`;
            grid.appendChild(div);
        });
    }
}

window.onload = () => { drawIntro(); update(); };
window.addEventListener('storage', update);