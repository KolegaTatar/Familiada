function getInit() {
        return { 
            showIntro: true, showQuestion: false, activeTeam: 0, duelPhase: true, showNarada: false, isGameOver: false, 
            winner: null, name1: "LEWA", name2: "PRAWA", score1: 0, score2: 0, pot: 0, strikes1: 0, strikes2: 0, 
            answers: [], currentQuestion: "", multiplier: 1, isMuted: false, scoreLimit: 300, lastSound: { id: null, time: 0 },
            volume: 1.0,
            isFinalPhase: false,
            finalStartingTeam: 1,
            activeFinalQuestionIndex: 0, 
            finalAnswers: Array(5).fill(null).map(() => ({ 
                p1Text: '', p1Pts: '', p1RevText: false, p1RevPts: false, 
                p2Text: '', p2Pts: '', p2RevText: false, p2RevPts: false 
            })),
            finalScore1: 0,
            finalScore2: 0,
            finalScoresAdded: false
        };
    }

    let state = JSON.parse(localStorage.getItem('familiada_state')) || getInit();
    if(typeof state.isFinalPhase === 'undefined') {
        const fresh = getInit();
        state.isFinalPhase = fresh.isFinalPhase;
        state.finalAnswers = fresh.finalAnswers;
        state.finalScore1 = fresh.finalScore1;
        state.finalScore2 = fresh.finalScore2;
        state.finalStartingTeam = fresh.finalStartingTeam;
    }
    if(typeof state.activeFinalQuestionIndex === 'undefined') state.activeFinalQuestionIndex = 0;
    
    if(state.volume === undefined) state.volume = 1.0;
    if(state.showIntro === undefined) state.showIntro = true;
    if(state.showQuestion === undefined) state.showQuestion = false;
    if(state.finalScoresAdded === undefined) state.finalScoresAdded = false;

    let serialWriter;
    let timerValue = 10;
    let timerInterval = null;
    let currentRoundNumber = "-";
    let buzzerLocked = false;
    let conn;
    let heartbeatInterval;
    sync();

    const peer = new Peer('familiada-rezyser-zsk');
    peer.on('open', id => console.log('Reżyserka gotowa!'));
    peer.on('connection', c => {
        conn = c;
        updateTabletStatus(true);
        conn.on('open', () => conn.send(prepareStateForTablet()));
        conn.on('data', data => {
            if (data.type === 'HOST_ALERT') {
                const box = document.getElementById('host-alert-box');
                box.style.display = 'block';
                box.classList.add('flash-alert');
            }
        });

        conn.on('close', () => updateTabletStatus(false));
        conn.on('error', () => updateTabletStatus(false));
    });

    document.addEventListener('DOMContentLoaded', () => {
        const chatInput = document.getElementById('chat-input');
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') { sendChat(); chatInput.blur(); }
        });
        render();
    });

    function updateTabletStatus(isOnline) {
        const light = document.getElementById('tablet-light');
        const text = document.getElementById('tablet-text');
        if (isOnline) { light.className = "status-light status-online"; text.innerText = "POŁĄCZONY"; text.style.color = "var(--green)"; }
        else { light.className = "status-light status-offline"; text.innerText = "SZUKAM..."; text.style.color = "white"; }
    }

    function updateArduinoStatus(isConnected) {
        const light = document.getElementById('arduino-light');
        const text = document.getElementById('arduino-text');
        if (isConnected) { light.className = "status-light status-online"; text.innerText = "POŁĄCZONE ✅"; text.style.color = "var(--green)"; }
        else { light.className = "status-light status-offline"; text.innerText = "ODŁĄCZONE"; text.style.color = "white"; }
    }

    function prepareStateForTablet() {
        let finalQ = "--- RUNDA FINAŁOWA ---";
        let finalQuestionsTexts = [];
        let finalTopAnswers = [];
        
        if (state.isFinalPhase && typeof finalData !== 'undefined') {
            if (finalData[state.activeFinalQuestionIndex]) {
                finalQ = "AKTUALNIE CZYTASZ PYTANIE " + (state.activeFinalQuestionIndex + 1);
            }
            for(let i=0; i<Math.min(finalData.length, 5); i++) {
                finalQuestionsTexts.push(finalData[i].pytanie);

                if (finalData[i].odpowiedzi) {

                    let sortedAns = [...finalData[i].odpowiedzi].sort((a, b) => b.points - a.points);
                    finalTopAnswers.push(sortedAns);
                } else {
                    finalTopAnswers.push([]);
                }
            }
        }

        return { 
            ...state, 
            round: currentRoundNumber.replace(/[^0-9]/g, '') || 1, 
            teamNameL: state.name1, 
            teamNameR: state.name2,
            displayFinalQuestion: finalQ,
            finalQuestionsTexts: finalQuestionsTexts,
            finalTopAnswers: finalTopAnswers 
        };
    }

    function sync() {
        if (state.isFinalPhase) {
            let s1 = 0, s2 = 0;
            if (!state.finalScoresAdded) {
                for(let i=0; i<5; i++) {
                    if(!state.finalAnswers[i]) continue;
                    const q = (typeof finalData !== 'undefined' && finalData[i]) ? finalData[i] : null;
                    const mult = q ? (q.multiplier || 1) : 1;
                    if (state.finalAnswers[i].p1RevPts) s1 += parseInt(state.finalAnswers[i].p1Pts || 0) * mult;
                    if (state.finalAnswers[i].p2RevPts) s2 += parseInt(state.finalAnswers[i].p2Pts || 0) * mult;
                }
            }
            state.finalScore1 = s1;
            state.finalScore2 = s2;
        }

        localStorage.setItem('familiada_state', JSON.stringify(state));
        render();
        if (conn && conn.open) conn.send(prepareStateForTablet());
    }

    function changeVolume(val) {
        state.volume = parseFloat(val);
        document.querySelectorAll('audio').forEach(a => a.volume = state.volume);
        sync();
    }

    function quickChat(msg) { if (conn && conn.open) conn.send({ type: 'CHAT_MSG', text: msg }); }
    function sendChat() {
        const input = document.getElementById('chat-input');
        if (input.value.trim() !== "" && conn && conn.open) {
            conn.send({ type: 'CHAT_MSG', text: input.value });
            input.value = "";
        }
    }
    
    function sendInstruction() {
        const instructionHTML = `
            <div style="text-align:left; font-size: 16px; line-height: 1.5;">
                <h2 style="color:var(--gold); margin-top:0; text-align:center;">📖 SZYBKA INSTRUKCJA</h2>
                <br>
                <b style="color:var(--blue);">I. PODSTAWY</b><br>
                - Ankietowaliśmy 100 osób z młodszych klas I-IV (1 osoba = 1 pkt).<br>
                - Zadając im pytania <b>o życiu szkolnym i codziennym</b>.<br>
                - W każdej rundzie na tablicy znajduje się <b>od 3 do 6 ukrytych odpowiedzi</b>.<br>
                - Rozegrane zostanie <b>6 rund standardowych oraz runda finałowa</b>.<br>

                <b style="color:var(--blue);">II. RUNDY 1–6 (Standardowe)</b><br>
                - <b>Takie same</b> zasady, <b>jak w normalnej Familiadzie</b>.<br>
                - Punktacja: <b>Rundy 1-3 (x1), Rundy 4-5 (x2), Runda 6 (x3)</b>.<br>
                - <i>Pojedynek przy pulpicie:</i> Osoba z każdej drużyny. Kto pierwszy, ten odpowiada. Kto z nich poda wyżej punktowane hasło, decyduje ("Gramy" czy "Oddajemy").<br>
                - <i>Gra zespołowa:</i> Odpowiadamy "gęsiego", nie wolno sobie podpowiadać.<br>
                - <i>Skuchy i Kradzież:</i> Trzy iksy (XXX) oznaczają koniec szans. Przeciwnicy naradzają się i Kapitan podaje 1 hasło. Jeśli trafią - kradną całą pulę z tej rundy!<br><br>

                <b style="color:var(--blue);">III. WIELKI FINAŁ (Runda 7)</b><br>
                - Obie drużyny grają w tym samym czasie.<br>
                - Piszemy CZYTELNE odpowiedzi <b>na kartkach</b>.<br>
                - Czas: <b>45 sekund</b> na 5 pytań.<br>
                - <i>Przegrany kończy z niczym:</i> Drużyna z większą sumą punktów wygrywa i jej wynik z kartki jest mnożony x2, a następnie dodany do konta. Przegrany dostaje 0 pkt.
            </div>
        `;
        if (conn && conn.open) {
            conn.send({ type: 'SHOW_INSTRUCTION', text: instructionHTML });
            alert("Instrukcja została pomyślnie wysłana na ekran prowadzącego!");
        } else {
            alert("Błąd: Prowadzący nie jest podłączony do systemu!");
        }
    }

    function toggleTimer() {
        const btn = document.getElementById('btn-timer-start');
        if (timerInterval) {
            stopTimerLogic();
        } else {
            state.timerActive = true; 
            btn.innerText = "STOP"; btn.className = "red btn-on";
            sync();
            timerInterval = setInterval(() => {
                timerValue--;
                if (timerValue <= 0) {
                    timerValue = 0; stopTimerLogic(); playSound('');
                    setTimeout(resetTimer, 1000); 
                }
                updateTimerDisplay(); 
            }, 1000);
        }
    }

    function stopTimerLogic() {
        clearInterval(timerInterval);
        timerInterval = null;
        state.timerActive = false; 
        const btn = document.getElementById('btn-timer-start');
        if (btn) { btn.innerText = "START"; btn.className = "blue"; }
        sync();
    }

    function updateTimerDisplay() {
        const display = document.getElementById('timer-display');
        display.innerText = timerValue;
        state.timerValue = timerValue;
        
        localStorage.setItem('familiada_state', JSON.stringify(state));
        if (conn && conn.open) conn.send(prepareStateForTablet());

        if (timerValue <= 5 && timerValue > 0) {
            display.style.color = "var(--red)"; display.style.transform = "scale(1.1)";
        } else {
            display.style.color = "white"; display.style.transform = "scale(1)";
        }
    }

    function resetTimer() {
        clearInterval(timerInterval);
        timerInterval = null;
        timerValue = 10; 
        state.timerValue = 10;
        state.timerActive = false; 
        const btn = document.getElementById('btn-timer-start');
        if(btn) { btn.innerText = "START"; btn.className = "blue"; }
        updateTimerDisplay(); sync(); 
    }

    async function initSerial() {
        if (!("serial" in navigator)) { alert("Twoja przeglądarka nie wspiera Serial API. Użyj Chrome lub Edge."); return; }
        if (serialWriter) return;
        try {
            const port = await navigator.serial.requestPort();
            await port.open({ baudRate: 9600 });
            serialWriter = port.writable.getWriter();
            updateArduinoStatus(true);
            startHeartbeat();
            const encoder = new TextEncoder();
            await serialWriter.write(encoder.encode("S"));
            sync();
            const decoder = new TextDecoder();
            const reader = port.readable.getReader();
            while (true) {
                const { value, done } = await reader.read();
                if (done) { stopHeartbeat(); reader.releaseLock(); break; }
                const clean = decoder.decode(value).trim().toUpperCase();
                if (clean.includes("L")) triggerBuzzer(1);
                else if (clean.includes("P")) triggerBuzzer(2);
            }
        } catch (e) { console.error("Błąd połączenia:", e); updateArduinoStatus(false); stopHeartbeat(); }
    }

    async function sendToArduino(cmd) {
        if (serialWriter) {
            try {
                const encoder = new TextEncoder();
                await serialWriter.write(encoder.encode(cmd));
            } catch (err) { console.error("Błąd wysyłania:", err); }
        }
    }

    window.addEventListener('keydown', e => {
        if (document.activeElement.tagName === "INPUT" || document.activeElement.tagName === "SELECT") return;
        if (e.code === "Space") { e.preventDefault(); resetBuzzers(); }
        if (e.key === "1") triggerBuzzer(1);
        if (e.key === "2") triggerBuzzer(2);
    });

    function handleDropdownKey(e, inputElem) {
        const dd = inputElem.nextElementSibling;
        if (!dd || !dd.classList.contains('custom-dropdown') || dd.style.display === 'none') return;

        const items = Array.from(dd.getElementsByClassName('dropdown-item')).filter(el => el.style.display !== 'none');
        if (items.length === 0) return;

        let currentIndex = items.findIndex(el => el.classList.contains('keyboard-selected'));

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (currentIndex >= 0) items[currentIndex].classList.remove('keyboard-selected');
            if (currentIndex < items.length - 1) currentIndex++;
            items[currentIndex].classList.add('keyboard-selected');
            items[currentIndex].scrollIntoView({ block: 'nearest' });
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (currentIndex > 0) {
                items[currentIndex].classList.remove('keyboard-selected');
                currentIndex--;
                items[currentIndex].classList.add('keyboard-selected');
                items[currentIndex].scrollIntoView({ block: 'nearest' });
            }
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (currentIndex >= 0 && currentIndex < items.length) {
                const fullText = items[currentIndex].querySelector('.item-text').innerText;
                inputElem.value = fullText;


                const clickEvent = new MouseEvent('mousedown', {
                    view: window,
                    bubbles: true,
                    cancelable: true
                });
                items[currentIndex].dispatchEvent(clickEvent);
                

                inputElem.blur();
            } else {
                dd.style.display = 'none';
                inputElem.blur();
            }
        }
    }


    function triggerBuzzer(team) {
        const isTestRound = (currentRoundNumber === "RUNDA TESTOWA (R0)");

        if (currentRoundNumber === "-") return;
        if (buzzerLocked || state.isFinalPhase) return;
        
        if (!isTestRound && state.showIntro) {
            state.showIntro = false;
        }

        buzzerLocked = true;
        
        if (team === 1) { 
            document.getElementById('buzzer-1').classList.add('buzzer-active-1'); 
            setActive(1); 
        } else { 
            document.getElementById('buzzer-2').classList.add('buzzer-active-2'); 
            setActive(2); 
        }
        
        if (isTestRound && state.showIntro) {
        } else {
            state.showQuestion = true;
            playSound('correct');
        }

        if (isTestRound) {
            setTimeout(() => resetBuzzers(), 1500);
        }
        
        sync();
    }

    function resetBuzzers() {
        buzzerLocked = false;
        document.getElementById('buzzer-1').classList.remove('buzzer-active-1');
        document.getElementById('buzzer-2').classList.remove('buzzer-active-2');
        setActive(0);
    }

    function setRound(idx) {
        if (typeof roundsData !== 'undefined' && roundsData[idx]) {
            const r = roundsData[idx];
            if (idx === 0) {
            currentRoundNumber = "RUNDA TESTOWA (R0)";
            } else {
                currentRoundNumber = "RUNDA " + idx;
            }
            state.isFinalPhase = false;
            state.answers = r.odpowiedzi.map(a => ({ ...a, revealed: false }));
            state.currentQuestion = r.pytanie;
            state.multiplier = r.multiplier;
            state.activeTeam = 0; state.strikes1 = 0; state.strikes2 = 0; state.pot = 0;
            
            state.showQuestion = false;

            resetBuzzers();
            sync();
        }
    }

    function selectAnswer(index) {
        if (state.activeTeam === 0) return;
        let ans = state.answers[index];
        if (!ans.revealed) {
            ans.revealed = true;
            state.pot += (ans.points * state.multiplier);
            playSound('correct');
            if (state.answers.every(a => a.revealed)) {
                const teamToReward = state.activeTeam;
                setTimeout(() => { if (state.pot > 0) assign(teamToReward); }, 1200);
            }
            sync();
        }
    }

    function undoAnswer(index) {
        let ans = state.answers[index];
        if (ans.revealed) {
            state.pot -= (ans.points * state.multiplier);
            if (state.pot < 0) state.pot = 0;
            ans.revealed = false;
            sync();
        }
    }

    function startFinal() {
        if(!confirm("Czy chcesz wejść w Tryb Finału? Plansza zostanie wyczyszczona.")) return;
        state.isFinalPhase = true;
        state.showQuestion = false;
        state.showIntro = false;
        
        state.strikes1 = 0;
        state.strikes2 = 0;
        state.pot = 0;
        
        state.finalScore1 = 0;
        state.finalScore2 = 0;
        state.finalScoresAdded = false; 
        state.finalStartingTeam = 1;
        state.activeFinalQuestionIndex = 0;
        state.finalAnswers = Array(5).fill(null).map(() => ({ 
            p1Text: '', p1Pts: '', p1RevText: false, p1RevPts: false, 
            p2Text: '', p2Pts: '', p2RevText: false, p2RevPts: false 
        }));
        currentRoundNumber = "FINAŁ";
        
        playSound('przed_final');
        sync();
    }

    function startSecondFinalRound() { playSound('po_1_f'); }

    function endFinalMode() {
        if(!confirm("Wyjść z finału BEZ dodawania punktów? (Żadne punkty nie zostaną przekazane)")) return;
        state.isFinalPhase = false;
        sync();
    }

    function endFinalAndAddScores() {
        if(!confirm("Dopisać punkty ZWYCIĘZCY do głównego wyniku? Zwycięzca otrzyma x2 swoich punktów z finału, przegrany 0.")) return;
        
        if (state.finalScore1 > state.finalScore2) {
            let bonus = state.finalScore1 * 1;
            alert(`🎉 Drużyna LEWA wygrywa finał (${state.finalScore1} > ${state.finalScore2})! Zgarnia bonus: ${bonus} pkt! Przegrani otrzymują 0.`);
            state.score1 += bonus;
        } else if (state.finalScore2 > state.finalScore1) {
            let bonus = state.finalScore2 * 1;
            alert(`🎉 Drużyna PRAWA wygrywa finał (${state.finalScore2} > ${state.finalScore1})! Zgarnia bonus: ${bonus} pkt! Przegrani otrzymują 0.`);
            state.score2 += bonus;
        } else {
            alert(`REMIS w finale (${state.finalScore1} = ${state.finalScore2})! Żadna drużyna nie otrzymuje punktów bonusowych.`);
        }

        state.finalScoresAdded = true; 
        sync();
    }

    function handleInputFocus(team, qIndex, inputType = 'text') {
        let needsSync = false;
        
        if (state.activeTeam !== team || state.finalStartingTeam !== team) {
            state.activeTeam = team;
            state.finalStartingTeam = team;
            needsSync = true;
            sendToArduino(team.toString());
            
            const btnLeft = document.getElementById('b1');
            const btnNeutral = document.getElementById('b0');
            const btnRight = document.getElementById('b2');
            if(btnLeft && btnNeutral && btnRight) {
                btnLeft.className = "gray"; btnNeutral.className = "gray"; btnRight.className = "gray";
                if (team === 1) btnLeft.className = "active-red-team";
                else if (team === 2) btnRight.className = "active-blue-team";
            }
            
            const stAct = document.getElementById('st-act');
            if(stAct) stAct.innerText = team === 1 ? state.name1 : state.name2;
            
            const btn1 = document.getElementById('btn-final-start-1');
            const btn2 = document.getElementById('btn-final-start-2');
            if(btn1 && btn2) {
                if (team === 1) { btn1.className = 'active-red-team'; btn2.className = 'gray'; }
                else { btn1.className = 'gray'; btn2.className = 'active-blue-team'; }
            }
        }

        if (qIndex !== undefined && state.activeFinalQuestionIndex !== qIndex) {
            state.activeFinalQuestionIndex = qIndex;
            needsSync = true;
        }

        if (needsSync) {
            if (conn && conn.open) conn.send(prepareStateForTablet());
            localStorage.setItem('familiada_state', JSON.stringify(state));
            renderFinal(); 
            
            setTimeout(() => {
                const targetId = inputType === 'text' ? `final-input-${qIndex}-${team}` : `final-pts-${qIndex}-${team}`;
                const inputToFocus = document.getElementById(targetId);
                if (inputToFocus) {
                    inputToFocus.focus();

                    if (inputType === 'text') {
                        const valLen = inputToFocus.value.length;
                        inputToFocus.setSelectionRange(valLen, valLen);
                    }
                }
            }, 10);
        }
    }

    function showDropdown(inputElem, qIndex, player) {
        const dd = document.getElementById(`dd-${qIndex}-${player}`);
        if (!dd) return;
        
        let html = '';
        const q = (typeof finalData !== 'undefined' && finalData[qIndex]) ? finalData[qIndex] : null;
        
        if (q && q.odpowiedzi) {
            q.odpowiedzi.forEach(o => {
                html += `<div class="dropdown-item" onmousedown="selectDropdownOption(${qIndex}, ${player}, '${o.text}', ${o.points})">
                            <span class="item-text">${o.text}</span>
                            <span class="item-pts">${o.points} pkt</span>
                            </div>`;
            });
        }
        html += `<div class="dropdown-item" onmousedown="selectDropdownOption(${qIndex}, ${player}, '❌ BŁĄD', 0)">
                    <span class="item-text item-error">❌ BŁĄD</span>
                    <span class="item-pts">0 pkt</span>
                    </div>`;
                    
        dd.innerHTML = html;
        dd.style.display = 'block';
        filterDropdown(inputElem); 
    }

    function filterDropdown(inputElem) {
        const dd = inputElem.nextElementSibling;
        if(!dd || !dd.classList.contains('custom-dropdown')) return;
        const filter = inputElem.value.toLowerCase();
        const items = dd.getElementsByClassName('dropdown-item');
        
        for (let item of items) {
            item.classList.remove('keyboard-selected');
            
            const text = item.querySelector('.item-text').innerText.toLowerCase();
            if (text.includes(filter)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        }
    }

    function hideDropdownDelayed(inputElem) {
        setTimeout(() => {
            const dd = inputElem.nextElementSibling;
            if(dd && document.body.contains(dd)) dd.style.display = 'none';
        }, 200);
    }

    function selectDropdownOption(qIndex, player, text, pts) {
        state.finalAnswers[qIndex][`p${player}Text`] = text;
        state.finalAnswers[qIndex][`p${player}Pts`] = pts.toString();
        
        const dd = document.getElementById(`dd-${qIndex}-${player}`);
        if(dd) dd.style.display = 'none';

        sync(); 
    }

    function handleFinalTextChange(i, player, val, isTyping = false) {
        if(!isTyping) {
            state.finalAnswers[i]['p' + player + 'Text'] = val;
        }
        
        if (val === "❌ BŁĄD") {
            state.finalAnswers[i]['p' + player + 'Pts'] = "0";
        } else if (val.trim() !== "") {
            if (typeof finalData !== 'undefined' && finalData[i] && finalData[i].odpowiedzi) {
                const match = finalData[i].odpowiedzi.find(o => o.text.toLowerCase() === val.toLowerCase().trim());
                if (match) {
                    state.finalAnswers[i]['p' + player + 'Pts'] = match.points.toString();
                }
            }
        }
        if(!isTyping) sync(); 
    }

    function updateFinal(i, field, val) {
        state.finalAnswers[i][field] = val;
        sync();
    }

    function toggleFinalRev(i, field) {
        state.finalAnswers[i][field] = !state.finalAnswers[i][field];
        if (state.finalAnswers[i][field]) {
            if (field.includes('Pts')) {
                const ptsField = field.replace('RevPts', 'Pts');
                const pts = parseInt(state.finalAnswers[i][ptsField] || 0);
                if (pts > 0) playSound('correct');
                else playSound('wrong');
            } else if (field.includes('Text')) {
                playSound('check');
            }
        }
        sync();
    }

    function renderFinal() {
        const fContainer = document.getElementById('final-questions-container');
        if (!fContainer) return;
        if (!state.isFinalPhase) return; 

        let html = '';
        
        if (typeof finalData !== 'undefined' && finalData.length > 0) {
            for(let i=0; i<Math.min(finalData.length, 5); i++) {
                const q = finalData[i];
                if(!state.finalAnswers[i]) continue;
                const ans = state.finalAnswers[i];

                const i1Style = ans.p1Text ? 'background: rgba(46, 204, 113, 0.2); border: 1px solid var(--green);' : 'border: 1px solid #666;';
                const i2Style = ans.p2Text ? 'background: rgba(46, 204, 113, 0.2); border: 1px solid var(--green);' : 'border: 1px solid #666;';
                const activeBorder = state.activeFinalQuestionIndex === i ? 'border-left: 4px solid var(--green); background: rgba(0,0,0,0.8);' : 'border-left: 4px solid #f1c40f; background: rgba(0,0,0,0.5);';

                html += `
                <div style="${activeBorder} padding: 12px; border-radius: 6px; margin-bottom: 10px; transition: 0.3s;">
                    <div style="font-size:13px; color:var(--gold); margin-bottom:8px; font-weight:bold;">PYTANIE ${i+1}: ${q.pytanie}</div>
                    
                    <div style="display:flex; gap:10px;">
                        
                        <div class="player-box player-box-1" style="flex:1; border-radius: 6px; padding: 10px;">
                            <div style="font-size:11px; text-align:center; margin-bottom:8px; background: var(--red); color: white; padding: 4px; border-radius: 3px; font-weight: bold;">GRACZ 1 (Lewa)</div>
                            
                            <div style="display: flex; gap: 5px; margin-bottom: 8px;">
                                <div style="position: relative; flex: 3; margin-bottom:0;">
                                    <input type="text" 
                                            id="final-input-${i}-1"
                                            value="${ans.p1Text}" 
                                            onfocus="handleInputFocus(1, ${i}, 'text'); showDropdown(this, ${i}, 1)"
                                            onblur="hideDropdownDelayed(this)"
                                            oninput="filterDropdown(this); handleFinalTextChange(${i}, 1, this.value, true)"
                                            onchange="handleFinalTextChange(${i}, 1, this.value, false)"
                                            onkeydown="handleDropdownKey(event, this)"
                                            placeholder="Wybierz / wpisz" 
                                            style="width: 100%; padding:8px; font-size:12px; margin-bottom:0; box-sizing:border-box; ${i1Style}">
                                    <div class="custom-dropdown" id="dd-${i}-1"></div>
                                </div>
                                
                                <input type="number" id="final-pts-${i}-1" value="${ans.p1Pts}" onfocus="handleInputFocus(1, ${i}, 'pts')" onchange="updateFinal(${i}, 'p1Pts', this.value)" placeholder="Pkt" style="flex: 1; background: rgba(0,0,0,0.6); border: 1px solid #555; border-radius: 4px; color: var(--gold); font-weight: bold; font-size: 14px; text-align: center; margin-bottom: 0; padding: 0;">
                            </div>

                            <div style="display:flex; gap:4px;">
                                <button onclick="toggleFinalRev(${i}, 'p1RevText')" class="${ans.p1RevText ? 'green' : 'gray'}" style="flex:1; padding:10px 4px; font-size:10px;">TREŚĆ</button>
                                <button onclick="toggleFinalRev(${i}, 'p1RevPts')" class="${ans.p1RevPts ? 'green' : 'gray'}" style="flex:1; padding:10px 4px; font-size:10px;">PKT</button>
                            </div>
                        </div>

                        <div class="player-box player-box-2" style="flex:1; border-radius: 6px; padding: 10px;">
                            <div style="font-size:11px; text-align:center; margin-bottom:8px; background: var(--blue); color: white; padding: 4px; border-radius: 3px; font-weight: bold;">GRACZ 2 (Prawa)</div>
                            
                            <div style="display: flex; gap: 5px; margin-bottom: 8px;">
                                <div style="position: relative; flex: 3; margin-bottom:0;">
                                    <input type="text" 
                                            id="final-input-${i}-2"
                                            value="${ans.p2Text}" 
                                            onfocus="handleInputFocus(2, ${i}, 'text'); showDropdown(this, ${i}, 2)"
                                            onblur="hideDropdownDelayed(this)"
                                            oninput="filterDropdown(this); handleFinalTextChange(${i}, 2, this.value, true)"
                                            onchange="handleFinalTextChange(${i}, 2, this.value, false)"
                                            onkeydown="handleDropdownKey(event, this)"
                                            placeholder="Wybierz / wpisz" 
                                            style="width: 100%; padding:8px; font-size:12px; margin-bottom:0; box-sizing:border-box; ${i2Style}">
                                    <div class="custom-dropdown" id="dd-${i}-2"></div>
                                </div>
                                
                                <input type="number" id="final-pts-${i}-2" value="${ans.p2Pts}" onfocus="handleInputFocus(2, ${i}, 'pts')" onchange="updateFinal(${i}, 'p2Pts', this.value)" placeholder="Pkt" style="flex: 1; background: rgba(0,0,0,0.6); border: 1px solid #555; border-radius: 4px; color: var(--gold); font-weight: bold; font-size: 14px; text-align: center; margin-bottom: 0; padding: 0;">
                            </div>

                            <div style="display:flex; gap:4px;">
                                <button onclick="toggleFinalRev(${i}, 'p2RevText')" class="${ans.p2RevText ? 'green' : 'gray'}" style="flex:1; padding:10px 4px; font-size:10px;">TREŚĆ</button>
                                <button onclick="toggleFinalRev(${i}, 'p2RevPts')" class="${ans.p2RevPts ? 'green' : 'gray'}" style="flex:1; padding:10px 4px; font-size:10px;">PKT</button>
                            </div>
                        </div>

                    </div>
                </div>`;
            }
        } else {
                html = '<p style="color:red; font-size:12px; text-align:center;">Brak danych "finalData" w pliku zsk.js!</p>';
        }
        fContainer.innerHTML = html;
        
        document.getElementById('final-sum-1').innerText = state.finalScore1;
        document.getElementById('final-sum-2').innerText = state.finalScore2;
        
        const btn1 = document.getElementById('btn-final-start-1');
        const btn2 = document.getElementById('btn-final-start-2');
        if (btn1 && btn2) {
            if (state.finalStartingTeam === 1) {
                btn1.className = 'active-red-team'; btn2.className = 'gray';
            } else if (state.finalStartingTeam === 2) {
                btn1.className = 'gray'; btn2.className = 'active-blue-team';
            }
        }
    }

    function render() {
        const colSystem = document.getElementById('col-system');
        const colContent = document.getElementById('col-content');
        const viewRegular = document.getElementById('view-regular');
        const viewFinal = document.getElementById('view-final');

        if (state.isFinalPhase) {
            viewRegular.style.display = 'none';
            viewFinal.style.display = 'flex';
            colSystem.style.flex = '1';
            colContent.style.flex = '3';
            document.getElementById('st-final-ind').innerText = "WŁĄCZONY";
            document.getElementById('st-final-ind').style.color = "var(--green)";
            
            const winBtnReg = document.getElementById('btn-force-win-reg');
            if(winBtnReg) winBtnReg.closest('.card').style.display = 'none';
            
            renderFinal();
        } else {
            viewRegular.style.display = 'flex';
            viewFinal.style.display = 'none';
            colSystem.style.flex = '1';
            colContent.style.flex = '2'; 
            document.getElementById('st-final-ind').innerText = "WYŁ";
            document.getElementById('st-final-ind').style.color = "white";
            
            const winBtnReg = document.getElementById('btn-force-win-reg');
            if(winBtnReg) winBtnReg.closest('.card').style.display = 'block';
        }

        const boxLogo = document.getElementById('box-logo');
        const chkLogo = document.getElementById('chk-logo');
        chkLogo.checked = state.showIntro;
        if(state.showIntro) {
            boxLogo.style.background = 'rgba(255,255,255,0.9)';
            boxLogo.style.color = '#000';
        } else {
            boxLogo.style.background = 'rgba(0,0,0,0.2)';
            boxLogo.style.color = '#fff';
        }

        const boxQuestion = document.getElementById('box-question');
        const chkQuestion = document.getElementById('chk-question');
        chkQuestion.checked = state.showQuestion;
        if(state.showQuestion) {
            boxQuestion.style.background = 'rgba(0,140,186,0.8)';
            boxQuestion.style.color = '#fff';
        } else {
            boxQuestion.style.background = 'rgba(0,0,0,0.2)';
            boxQuestion.style.color = '#fff';
        }

        if (document.activeElement.id !== 'in-s1') document.getElementById('in-s1').value = state.score1;
        if (document.activeElement.id !== 'in-s2') document.getElementById('in-s2').value = state.score2;
        if (document.activeElement.id !== 'in-n1') document.getElementById('in-n1').value = state.name1;
        if (document.activeElement.id !== 'in-n2') document.getElementById('in-n2').value = state.name2;
        
        if (document.activeElement.id !== 'in-volume') document.getElementById('in-volume').value = state.volume;

        const btnLeft = document.getElementById('b1');
        const btnNeutral = document.getElementById('b0');
        const btnRight = document.getElementById('b2');
        btnLeft.className = "gray"; btnNeutral.className = "gray"; btnRight.className = "gray";
        if (state.activeTeam === 1) btnLeft.className = "active-red-team";
        else if (state.activeTeam === 2) btnRight.className = "active-blue-team";
        else btnNeutral.className = "btn-on";
        
        document.getElementById('st-act').innerText = state.activeTeam === 0 ? "-" : (state.activeTeam === 1 ? state.name1 : state.name2);
        document.getElementById('st-pot').innerText = state.pot;
        document.getElementById('st-mult').innerText = `x${state.multiplier}`;
        document.getElementById('st-strikes').innerText = `${state.strikes1}:${state.strikes2}`;
        document.getElementById('q-round-label').innerText = currentRoundNumber;
        document.getElementById('q-text-label').innerText = state.currentQuestion || "Wybierz rundę...";
        
        const container = document.getElementById('answers-container');
        container.innerHTML = '';
        if (state.answers && !state.isFinalPhase) {
            state.answers.forEach((ans, i) => {
                const row = document.createElement('div');
                row.style.display = 'flex'; row.style.gap = '6px';
                const b = document.createElement('button');
                b.className = ans.revealed ? "green" : "gray";
                b.style.flex = "1"; b.style.textAlign = "left";
                b.innerHTML = `<span style="font-size: 13px;">${ans.text}</span> <span style="float:right; font-size:13px;">${ans.points} pkt</span>`;
                if (!ans.revealed) b.onclick = () => selectAnswer(i);
                row.appendChild(b);
                if (ans.revealed) {
                    const lockBtn = document.createElement('button');
                    lockBtn.innerHTML = "🔓"; lockBtn.className = "red"; lockBtn.style.width = "60px"; lockBtn.style.fontSize = "10px";
                    lockBtn.onclick = () => undoAnswer(i);
                    row.appendChild(lockBtn);
                }
                container.appendChild(row);
            });
        }
        
        const btnMute = document.getElementById('btn-mute');
        btnMute.innerText = state.isMuted ? "🔇 DŹWIĘKI: WYCISZONE" : "🔊 DŹWIĘKI: WŁĄCZONE";
        btnMute.className = state.isMuted ? "mute-active" : "gray";
        
        const naradaBox = document.getElementById('narada-settings');
        if (state.showNarada) naradaBox.classList.add('narada-active'); else naradaBox.classList.remove('narada-active');
        
        let n = "WYŁ.";
        if (state.showNarada) {
            if (state.strikes1 === 3 && state.activeTeam === 1) n = `DLA ${state.name2}`;
            else if (state.strikes2 === 3 && state.activeTeam === 2) n = `DLA ${state.name1}`;
            else n = "CZEKA NA 3X";
        }
        document.getElementById('st-nar').innerText = n;
        
        const winBtns = [document.getElementById('btn-force-win-reg'), document.querySelector('#view-final .blue[onclick="forceWin()"]')];
        winBtns.forEach(winBtn => {
            if(winBtn) {
                if (state.score1 >= state.scoreLimit || state.score2 >= state.scoreLimit) winBtn.classList.add('ready-to-win');
                else winBtn.classList.remove('ready-to-win');
            }
        });
    }

    function updateManualScore(team) {
        if (team === 1) state.score1 = parseInt(document.getElementById('in-s1').value) || 0;
        else state.score2 = parseInt(document.getElementById('in-s2').value) || 0;
        sync();
    }

    function modifyStrike(team, val) {
        if (team === 1) state.strikes1 = (val === 0) ? 0 : Math.max(0, state.strikes1 + val);
        else state.strikes2 = (val === 0) ? 0 : Math.max(0, state.strikes2 + val);
        sync();
    }

    function handleError() {
        if (state.activeTeam === 0 && !state.isFinalPhase) return;
        playSound('wrong');
        if(!state.isFinalPhase) {
            if (state.activeTeam === 1) state.strikes1++; else state.strikes2++;
        }
        sync();
    }

    function assign(n) { 
        if (n === 1) state.score1 += state.pot; else state.score2 += state.pot; 
        state.pot = 0; state.strikes1 = 0; state.strikes2 = 0; state.activeTeam = 0; 
        resetBuzzers(); 
        
        playSound('przed_r');

        sync(); 
    }
    
    function submitSettings() { 
        state.name1 = document.getElementById('in-n1').value || "LEWA"; 
        state.name2 = document.getElementById('in-n2').value || "PRAWA"; 
        sync(); 
    }
    
    function toggleIntro() { state.showIntro = document.getElementById('chk-logo').checked; sync(); }
    function toggleQuestion() { state.showQuestion = document.getElementById('chk-question').checked; sync(); }
    
    function setActive(n) { state.activeTeam = n; sendToArduino(n.toString()); sync(); }
    function toggleMasterMute() { state.isMuted = !state.isMuted; sync(); }

    function playSound(id) { 
        if (!state.isMuted) { 
            state.lastSound = { id: 'stop', time: Date.now() }; 
            sync();
            setTimeout(() => {
                state.lastSound = { id: id, time: Date.now() }; 
                sync();
            }, 50);
        } 
    }

    function stopAllSounds() { state.lastSound = { id: 'stop', time: Date.now() }; sync(); }
    function updateNaradaVisibility() { state.showNarada = document.getElementById('chk-narada').checked; sync(); }
    function updateLimit() { state.scoreLimit = parseInt(document.getElementById('in-limit').value) || 300; sync(); }
    
    function startGame() { 
        if (confirm("Start gry zwykłej? Finał zostanie wyłączony, plansza zwykła wyczyszczona.")) { 
            state.isFinalPhase = false;
            state.score1 = 0; state.score2 = 0; state.pot = 0; state.strikes1 = 0; state.strikes2 = 0; 
            state.isGameOver = false; state.showIntro = false; state.showQuestion = true; 
            if (typeof roundsData !== 'undefined') setRound(0); 
            sync(); 
        } 
    }

    function fullRestart() { document.getElementById('restart-modal').style.display = 'flex'; }
    function closeRestartModal() { document.getElementById('restart-modal').style.display = 'none'; }

    function confirmFullRestart() {
        stopAllSounds();
        const baseState = getInit();
        baseState.name1 = state.name1; baseState.name2 = state.name2; baseState.isMuted = state.isMuted;
        state = baseState; currentRoundNumber = "-";
        resetBuzzers(); closeRestartModal(); sync();
    }

    function revealAllRemaining() { state.answers.forEach(a => a.revealed = true); sync(); }
    function forceWin() { state.winner = state.score1 >= state.score2 ? state.name1 : state.name2; state.isGameOver = true; playSound('win'); sync(); }
    
    function toggleCard(headerElement) { headerElement.closest('.card').classList.toggle('collapsed'); }
    function startHeartbeat() {
        if (heartbeatInterval) clearInterval(heartbeatInterval);
        heartbeatInterval = setInterval(() => { sendToArduino("."); }, 1500);
    }

    function stopHeartbeat() { clearInterval(heartbeatInterval); serialWriter = null; updateArduinoStatus(false); }

    window.onload = () => {
    if (typeof roundsData !== 'undefined') {
        const list = document.getElementById('rounds-list');
        roundsData.forEach((r, i) => {
            const b = document.createElement('button');
            
            if (i === 0) {
                b.innerText = `R0 TEST (x${r.multiplier})`;
                b.style.background = "#aaa"; 
            } else {
                b.innerText = `R${i} (x${r.multiplier})`;
            }
            
            b.onclick = () => setRound(i);
            b.style.padding = "10px 4px";
            b.style.fontSize = "11px";
            list.appendChild(b);
        });
    }
    render();
};