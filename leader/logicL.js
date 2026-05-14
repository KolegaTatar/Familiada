
const peer = new Peer();
let conn;
let isConnecting = false;

peer.on('open', id => {
    console.log('Gotowy. ID:', id);
    connectToHost();
});

peer.on('error', err => {
    if (err.type === 'peer-unavailable') {
        handleDisconnect();
    }
});

function connectToHost() {
    if (isConnecting) return;
    isConnecting = true;
    
    conn = peer.connect('familiada-rezyser-zsk', { reliable: true });
    
    conn.on('open', () => {
        isConnecting = false;
        const dot = document.getElementById('conn-dot');
        const text = document.getElementById('conn-text');
        dot.classList.add('online');
        text.innerText = 'POŁĄCZONO';
        text.style.color = '#2ecc71';
    });

    conn.on('data', data => {
        const now = new Date();
        document.getElementById('last-sync').innerText = now.toLocaleTimeString();

        let state = (typeof data === 'string') ? JSON.parse(data) : data;

        if (state.type === 'SHOW_INSTRUCTION') {
            document.getElementById('instruction-content').innerHTML = state.text;
            document.getElementById('instruction-modal').style.display = 'flex';
        } else if (state.type === 'CHAT_MSG') {
            showChat(state.text);
        } else {
            updateUI(state);
        }
    });

    conn.on('close', () => handleDisconnect());
    conn.on('error', () => handleDisconnect());
}

function handleDisconnect() {
    isConnecting = false;
    const dot = document.getElementById('conn-dot');
    const text = document.getElementById('conn-text');
    dot.classList.remove('online');
    text.innerText = 'SZUKAM...';
    text.style.color = '#e74c3c';
    setTimeout(connectToHost, 2000);
}

let chatTimeout = null;
let chatActive = false;

function showChat(text) {
    const p = document.getElementById('chat-popup');
    const msg = document.getElementById('chat-msg');
    const tBox = document.getElementById('host-timer-box');

    msg.innerText = text;
    p.style.display = 'block';
    tBox.style.display = 'none'; 
    chatActive = true;

    if (chatTimeout) clearTimeout(chatTimeout);

    chatTimeout = setTimeout(() => {
        p.style.display = 'none';
        chatActive = false;
        chatTimeout = null;
    }, 15000); 
}


function showInstructionLocally() {
    const instructionHTML = `
        <div style="text-align:left; font-size: 16px; line-height: 1.5;">
            <h2 style="color:var(--gold); margin-top:0; text-align:center;">SZYBKA INSTRUKCJA</h2>
            <br>
            <b style="color:var(--blue);">I. WEJŚCIE DRUŻYN</b><br>
            - Wychowawcy po stronie prawej (niebieskiej)<br>
            - Uczniowie po stronie lewej (czerwonej)<br><br>
            <b style="color:var(--blue);">II. PODSTAWY</b><br>
            - Ankietowaliśmy 100 osób z młodszych klas I-IV (1 osoba = 1 pkt).<br>
            - Zadając im pytania <b>o życiu szkolnym i codziennym</b>.<br>
            - W każdej rundzie na tablicy znajduje się <b>od 3 do 6 ukrytych odpowiedzi</b>.<br>
            - Rozegrane zostanie <b>6 rund standardowych oraz runda finałowa</b>.<br>

            <b style="color:var(--blue);">III. RUNDY 1–6 (Standardowe)</b><br>
            - <b>Takie same</b> zasady, <b>jak w normalnej Familiadzie</b>.<br>
            - Punktacja: <b>Rundy 1-3 (x1), Rundy 4-5 (x2), Runda 6 (x3)</b>.<br>
            - <i>Pojedynek przy pulpicie:</i> Osoba z każdej drużyny. Kto pierwszy, ten odpowiada. Kto z nich poda wyżej punktowane hasło, decyduje ("Gramy" czy "Oddajemy").<br>
            - <i>Gra zespołowa:</i> Odpowiadamy "gęsiego", nie wolno sobie podpowiadać.<br>
            - <i>Skuchy i Kradzież:</i> Trzy iksy (XXX) oznaczają koniec szans. Przeciwnicy naradzają się i Kapitan podaje 1 hasło. Jeśli trafią - kradną całą pulę z tej rundy!<br><br>

            <b style="color:var(--blue);">IV. WIELKI FINAŁ (Runda 7)</b><br>
            - Obie drużyny grają w tym samym czasie.<br>
            - Piszemy CZYTELNE odpowiedzi <b>na kartkach</b>.<br>
            - Czas: <b>45 sekund</b> na 5 pytań.<br>
            - <i>Przegrany kończy z niczym:</i> Drużyna z większą sumą punktów wygrywa i jej wynik z kartki jest mnożony x2, a następnie dodany do konta. Przegrany dostaje 0 pkt.<br><br>

            <b style="color:var(--blue);">V. ŻART PROWADZĄCEGO</b><br>
        </div>
    `;
    document.getElementById('instruction-content').innerHTML = instructionHTML;
    document.getElementById('instruction-modal').style.display = 'flex';
}

function sendAlertToDirector() {
    if (conn && conn.open) {
        conn.send({ type: 'HOST_ALERT' });
        

        const btn = document.querySelector('.btn-alert');
        const oldText = btn.innerText;
        btn.innerText = "WYSŁANO!";
        btn.style.background = "#ffffff";
        btn.style.color = "#ff4444";
        
        setTimeout(() => {
            btn.innerText = oldText;
            btn.style.background = "#ff4444";
            btn.style.color = "white";
        }, 2000);
    } else {
        alert("⚠️ Brak połączenia z reżyserką!");
    }
}


function updateUI(state) {
    if (!state) return;

    document.getElementById('host-name-1').innerText = state.name1 || "LEWA";
    document.getElementById('host-name-2').innerText = state.name2 || "PRAWA";
    document.getElementById('host-score-1').innerText = state.score1 || 0;
    document.getElementById('host-score-2').innerText = state.score2 || 0;
    document.getElementById('host-str-1').innerText = "X".repeat(state.strikes1 || 0);
    document.getElementById('host-str-2').innerText = "X".repeat(state.strikes2 || 0);

    const box1 = document.getElementById('host-team-1');
    const box2 = document.getElementById('host-team-2');
    const statusText = document.getElementById('status-text');
    const naradaText = document.getElementById('narada-text');
    const list = document.getElementById('ans-zone');

    box1.className = "team-score-box";
    box2.className = "team-score-box";

    if (state.isGameOver) {
        document.getElementById('q-text').innerText = "KONIEC GRY!";
        statusText.innerText = "WYGRYWA: " + (state.winner || "---");
        statusText.style.color = "var(--gold)";
        naradaText.style.display = 'none';
        list.innerHTML = `
            <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; text-align:center; background: rgba(219, 177, 59, 0.1); border-radius: 15px; border: 2px solid var(--gold);">
                <div style="font-size: 24px; color: var(--gold); font-weight: bold; text-transform: uppercase;">Zwycięzcą zostaje:</div>
                <div style="font-size: 60px; color: white; font-weight: 900; text-shadow: 0 0 30px var(--gold); margin: 10px 0;">${state.winner || "---"}</div>
                <div style="font-size: 18px; color: #aaa;">GRATULACJE!</div>
            </div>
        `;
        return;
    } else {
        statusText.style.color = "var(--gold)"; 
    }

    if (state.showNarada) {
        let nText = "";
        let showNaradaAlert = false;
        if (state.activeTeam === 1 && state.strikes1 >= 2) {
            nText = `MOŻE SIĘ NARADZAĆ: ${state.name2}`;
            showNaradaAlert = true;
        } else if (state.activeTeam === 2 && state.strikes2 >= 2) {
            nText = `MOŻE SIĘ NARADZAĆ: ${state.name1}`;
            showNaradaAlert = true;
        }
        if (showNaradaAlert) {
            naradaText.innerText = nText;
            naradaText.style.display = 'block';
        } else {
            naradaText.style.display = 'none';
        }
    } else {
        naradaText.style.display = 'none';
    }

    const timerBox = document.getElementById('host-timer-box');
    const timerVal = document.getElementById('host-timer-val');
    const chatPopup = document.getElementById('chat-popup');

    if (state.timerActive && state.timerValue > 0 && !chatActive) {
        timerBox.style.display = 'block';
        chatPopup.style.display = 'none';
        timerVal.innerText = state.timerValue;
        timerBox.firstElementChild.style.background = state.timerValue <= 5 ? "#dbb13b" : "#ff3333";
    } else if (!chatActive) {
        timerBox.style.display = 'none';
    }

    if (state.isFinalPhase) {
        document.getElementById('st-round-label').innerText = "TRYB:";
        document.getElementById('st-round').innerText = "FINAŁ";
        document.getElementById('st-mult').innerText = "x2";
        document.getElementById('st-pot-label').innerText = "SUMY FINAŁU:";
        document.getElementById('st-pot').innerText = `L: ${state.finalScore1 || 0} | P: ${state.finalScore2 || 0}`;
        
        document.getElementById('q-text').innerText = "--- RUNDA FINAŁOWA ---";

        if (state.finalStartingTeam === 1) {
            box1.classList.add('active-red');
            statusText.innerText = "GRA: GRACZ 1";
        } else if (state.finalStartingTeam === 2) {
            box2.classList.add('active-blue');
            statusText.innerText = "GRA: GRACZ 2";
        }

        list.innerHTML = '';
        
        const headerRow = document.createElement('div');
        headerRow.style.display = 'flex';
        headerRow.style.gap = '15px';
        headerRow.style.marginBottom = '5px';
        headerRow.innerHTML = `
            <div style="flex:1; text-align:center; color:var(--red); font-weight:bold; font-size:16px; border-bottom: 2px solid var(--red); padding-bottom:5px;">GRACZ 1 (SUMA: ${state.finalScore1 || 0})</div>
            <div style="flex:1; text-align:center; color:var(--blue); font-weight:bold; font-size:16px; border-bottom: 2px solid var(--blue); padding-bottom:5px;">GRACZ 2 (SUMA: ${state.finalScore2 || 0})</div>
        `;
        list.appendChild(headerRow);

        (state.finalAnswers || []).forEach((ans, i) => {
            const qText = (state.finalQuestionsTexts && state.finalQuestionsTexts[i]) ? state.finalQuestionsTexts[i] : "...";
            const isActive = state.activeFinalQuestionIndex === i;

     
            const qDiv = document.createElement('div');
            qDiv.style.textAlign = 'center';
            qDiv.style.color = isActive ? 'var(--green)' : 'var(--gold-light)';
            qDiv.style.fontWeight = 'bold';
            qDiv.style.fontSize = '18px';
            qDiv.style.margin = '15px 0 8px 0';
            qDiv.style.textTransform = 'uppercase';
            if (isActive) qDiv.style.textShadow = '0 0 10px var(--green)';
            qDiv.innerText = `${i+1}. ${qText}`;
            list.appendChild(qDiv);


            if (state.finalTopAnswers && state.finalTopAnswers[i] && state.finalTopAnswers[i].length > 0) {
                const topAnsContainer = document.createElement('div');
                topAnsContainer.style.display = 'flex';
                topAnsContainer.style.justifyContent = 'center';
                topAnsContainer.style.gap = '6px';
                topAnsContainer.style.flexWrap = 'wrap';
                topAnsContainer.style.marginBottom = '10px';
                topAnsContainer.style.marginTop = '-4px';

                state.finalTopAnswers[i].forEach(ta => {
                    const taBadge = document.createElement('span');
                    taBadge.style.background = 'rgba(255, 255, 255, 0.04)';
                    taBadge.style.color = '#7a7a7a';
                    taBadge.style.fontSize = '12px';
                    taBadge.style.padding = '3px 8px';
                    taBadge.style.borderRadius = '6px';
                    taBadge.style.border = '1px solid rgba(255,255,255,0.06)';
                    taBadge.style.letterSpacing = '0.5px';
                    
                    const txt = ta.text !== undefined ? ta.text : (ta.answer || ta);
                    const pts = ta.points !== undefined ? ta.points : (ta.pts !== undefined ? ta.pts : '');
                    
                    taBadge.innerText = pts !== '' ? `${txt} - ${pts}` : txt;
                    topAnsContainer.appendChild(taBadge);
                });
                list.appendChild(topAnsContainer);
            }

      
            const ansContainer = document.createElement('div');
            ansContainer.style.display = 'flex';
            ansContainer.style.gap = '15px';
            ansContainer.style.marginBottom = '10px';

            const r1 = document.createElement('div');
            r1.className = `ans-row ${ans.p1RevPts ? 'revealed' : ''}`;
            r1.style.flex = '1'; r1.style.minHeight = '42px'; r1.style.fontSize = '16px'; r1.style.padding = '0 15px';
            if(isActive) r1.style.borderColor = 'rgba(46, 204, 113, 0.4)';
            const t1 = ans.p1Text || '...';
            const p1 = ans.p1Pts !== '' ? ans.p1Pts : '-';
            r1.innerHTML = `<span class="${ans.p1RevText ? 'visible' : 'dimmed'}">${t1}</span> <span class="${ans.p1RevPts ? 'visible' : 'dimmed'}">${p1}</span>`;
            ansContainer.appendChild(r1);

            const r2 = document.createElement('div');
            r2.className = `ans-row ${ans.p2RevPts ? 'revealed' : ''}`;
            r2.style.flex = '1'; r2.style.minHeight = '42px'; r2.style.fontSize = '16px'; r2.style.padding = '0 15px';
            if(isActive) r2.style.borderColor = 'rgba(46, 204, 113, 0.4)';
            const t2 = ans.p2Text || '...';
            const p2 = ans.p2Pts !== '' ? ans.p2Pts : '-';
            r2.innerHTML = `<span class="${ans.p2RevText ? 'visible' : 'dimmed'}">${t2}</span> <span class="${ans.p2RevPts ? 'visible' : 'dimmed'}">${p2}</span>`;
            ansContainer.appendChild(r2);

            list.appendChild(ansContainer);
        });

    } else {
        document.getElementById('st-round-label').innerText = "RUNDA:";
        document.getElementById('st-round').innerText = state.round || "-";
        document.getElementById('st-mult').innerText = 'x' + (state.multiplier || 1);
        document.getElementById('st-pot-label').innerText = "PULA RUNDY:";
        document.getElementById('st-pot').innerText = state.pot || 0;
        document.getElementById('q-text').innerText = state.currentQuestion || "---";

        if (state.activeTeam === 1) { 
            box1.classList.add('active-red'); 
            statusText.innerText = "GRA LEWA"; 
        }
        else if (state.activeTeam === 2) { 
            box2.classList.add('active-blue'); 
            statusText.innerText = "GRA PRAWA"; 
        }
        else { 
            statusText.innerText = "STARCIE (KTO 1)"; 
        }

        list.innerHTML = '';
        if (state.answers) {
            state.answers.forEach(a => {
                const div = document.createElement('div');
                div.className = `ans-row ${a.revealed ? 'revealed' : ''}`;
                div.innerHTML = `<span>${a.text}</span><span>${a.points}</span>`;
                list.appendChild(div);
            });
        }
    }
}
