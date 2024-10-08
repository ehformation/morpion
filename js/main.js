let gameRules = document.getElementById('game-rules');
let gameHome = document.getElementById('game-home');
let buttonOpenGameRules = document.getElementById('open-game-rules');

function openGameRules(){
    gameRules.style.display = 'block';
    gameHome.style.display = 'none';
}

buttonOpenGameRules.addEventListener('click', openGameRules);

