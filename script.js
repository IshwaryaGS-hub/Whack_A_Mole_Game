const board = document.getElementById('board');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');

    let score = 0;
    let activeIdx = -1;
    let moleInterval = null;
    let gameTimer = null;
    let timeLeft = 30;
    const holes = [];

    function createHoles(){
      board.innerHTML = '';
      for(let i=0;i<9;i++){
        const hole = document.createElement('div');
        hole.className = 'hole';
        hole.dataset.index = i;
        hole.addEventListener('click', ()=> {
          if(parseInt(hole.dataset.index) === activeIdx){
            score++;
            scoreEl.textContent = score;
            // remove mole immediately
            clearActive();
          }
        });
        board.appendChild(hole);
        holes.push(hole);
      }
    }

    function clearActive(){
      if(activeIdx >= 0){
        holes[activeIdx].innerHTML = '';
        activeIdx = -1;
      }
    }

    function spawnMole(){
      clearActive();
      const idx = Math.floor(Math.random()*9);
      activeIdx = idx;
      const mole = document.createElement('div');
      mole.className = 'mole';
      holes[idx].appendChild(mole);
    }

    function startGame(){
      resetState();
      moleInterval = setInterval(spawnMole, 800);
      gameTimer = setInterval(()=>{
        timeLeft--;
        timeEl.textContent = timeLeft;
        if(timeLeft <= 0) stopGame();
      },1000);
    }

    function stopGame(){
      clearInterval(moleInterval);
      clearInterval(gameTimer);
      clearActive();
      activeIdx = -1;
    }

    function resetState(){
      score = 0;
      scoreEl.textContent = score;
      timeLeft = 30;
      timeEl.textContent = timeLeft;
      clearActive();
      clearInterval(moleInterval);
      clearInterval(gameTimer);
    }

    startBtn.addEventListener('click', startGame);
    stopBtn.addEventListener('click', stopGame);

    createHoles();
