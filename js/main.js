let gameRules = document.getElementById('game-rules');
let gameHome = document.getElementById('game-home');
let gameSettings = document.getElementById('game-settings');

let buttonOpenGameRules = document.getElementById('open-game-rules');
let buttonOpenGameHome = document.getElementById('open-game-home');
let buttonOpenGameSettings = document.getElementById('open-game-settings');
let buttonCloseGameSettings = document.getElementById('close-game-settings');

function openGameRules(){
    gameRules.style.display = 'block';
    gameHome.style.display = 'none';
}
function openGameHome(){
    gameRules.style.display = 'none';
    gameHome.style.display = 'block';
}
function openGameSettings(){
    gameSettings.style.display = 'block';
}
function closeGameSettings(){
    gameSettings.style.display = 'none';
}

buttonOpenGameRules.addEventListener('click', openGameRules);

buttonOpenGameHome.addEventListener('click', openGameHome);

buttonOpenGameSettings.addEventListener('click', openGameSettings);

buttonCloseGameSettings.addEventListener('click', closeGameSettings);