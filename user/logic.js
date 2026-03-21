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

    if(data.showIntro) {
        document.getElementById('intro-screen').style.display = 'flex';
        document.getElementById('game-screen').style.display = 'none';
        document.body.classList.remove('game-mode');
    } else {
        document.getElementById('intro-screen').style.display = 'none';
        document.getElementById('game-screen').style.display = 'flex';
        document.body.classList.add('game-mode');

        const qD = document.getElementById('question-display');
        qD.innerText = data.showQuestion ? `${data.currentQuestion} (x${data.multiplier})` : "";
        qD.style.opacity = data.showQuestion ? "1" : "0";

        document.getElementById('n1').innerText = data.name1;
        document.getElementById('n2').innerText = data.name2;

        document.getElementById('s1').innerText = data.score1.toString().padStart(3, '0');
        document.getElementById('s2').innerText = data.score2.toString().padStart(3, '0');
        document.getElementById('pot').innerText = data.pot.toString().padStart(3, '0');
        document.getElementById('str1').innerText = "X".repeat(data.strikes1);
        document.getElementById('str2').innerText = "X".repeat(data.strikes2);

        const bL = document.getElementById('box-left');
        const bR = document.getElementById('box-right');
        
       
        bL.style.boxShadow = data.activeTeam === 1 ? "0 0 50px #ff3333" : "none";
        bL.style.borderColor = data.activeTeam === 1 ? "#ff3333" : "#333";
        bR.style.boxShadow = data.activeTeam === 2 ? "0 0 50px #3333ff" : "none";
        bR.style.borderColor = data.activeTeam === 2 ? "#3333ff" : "#333";

        const grid = document.getElementById('ans-grid');
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
window.onload = () => { drawIntro(); update(); };
window.addEventListener('storage', update);