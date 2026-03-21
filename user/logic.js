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
    if(!data) return;

    const intro = document.getElementById('intro-screen');
    const game = document.getElementById('game-screen');
    const win = document.getElementById('win-screen');
    const blackout = document.getElementById('blackout');

    // 1. Obsługa szybkiego przejścia (Transitioning)
    if (data.transitioning) {
        if (blackout) blackout.style.opacity = "1";
        return; // Czekamy aż reżyser wyłączy transitioning
    } 

    // 2. Wybór aktywnego ekranu
    if (data.isGameOver) { 
        switchScreen(win);
        document.getElementById('win-team-name').innerText = data.winner; 
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

    // 3. Wyłączenie blackoutu po zakończeniu operacji
    if (blackout && !data.transitioning) {
        blackout.style.opacity = "0";
    }
}

// Zmieniona nazwa, żeby nie kolidowała z animacjami systemowymi
function switchScreen(target) {
    const screens = [
        document.getElementById('intro-screen'), 
        document.getElementById('game-screen'), 
        document.getElementById('win-screen')
    ];

    screens.forEach(s => {
        if (s === target) {
            s.style.display = 'flex';
            s.style.opacity = '1';
        } else {
            s.style.display = 'none';
            s.style.opacity = '0';
        }
    });
}

function updateBoard(data) {
    const qD = document.getElementById('question-display');
    const narada = document.getElementById('narada-box');

    // Pytanie
    if (qD) {
        qD.innerText = data.showQuestion ? data.currentQuestion : "";
        qD.style.opacity = data.showQuestion ? "1" : "0";
    }

    // Narada
    if (narada) {
        if(data.showNarada && ((data.strikes1 === 2 && data.activeTeam === 1) || (data.strikes2 === 2 && data.activeTeam === 2))) {
            const opponentName = data.activeTeam === 1 ? data.name2 : data.name1;
            narada.innerText = `DRUŻYNA ${opponentName} SIĘ NARADZA!`;
            narada.style.display = 'block';
        } else { 
            narada.style.display = 'none'; 
        }
    }

    // Wyniki i nazwy
    document.getElementById('n1').innerText = data.name1;
    document.getElementById('n2').innerText = data.name2;
    document.getElementById('s1').innerText = data.score1.toString().padStart(3, '0');
    document.getElementById('s2').innerText = data.score2.toString().padStart(3, '0');
    document.getElementById('pot').innerText = data.pot.toString().padStart(3, '0');
    
    // Iksy (Strikes)
    document.getElementById('str1').innerText = "X".repeat(data.strikes1);
    document.getElementById('str2').innerText = "X".repeat(data.strikes2);

    // Podświetlenie aktywnej drużyny
    document.getElementById('box-left').style.boxShadow = data.activeTeam === 1 ? "0 0 50px #ff3333" : "none";
    document.getElementById('box-right').style.boxShadow = data.activeTeam === 2 ? "0 0 50px #3333ff" : "none";

    // Tablica odpowiedzi
    const grid = document.getElementById('ans-grid');
    if (grid) {
        grid.innerHTML = '';
        data.answers.forEach((ans, i) => {
            const div = document.createElement('div');
            div.className = `ans-row ${ans.revealed ? '' : 'hidden'}`;
            div.setAttribute('data-index', i + 1);
            div.innerHTML = `<span>${ans.text}</span><span>${ans.points}</span>`;
            grid.appendChild(div);
        });
    }
}

window.onload = () => { 
    drawIntro(); 
    update(); 
};

window.addEventListener('storage', update);