let gameRules = document.getElementById('game-rules');
let gameHome = document.getElementById('game-home');
let gameSettings = document.getElementById('game-settings');
let game = document.getElementById('game');

let buttonOpenGameRules = document.getElementById('open-game-rules');
let buttonOpenGameHome = document.getElementById('open-game-home');
let buttonOpenGameSettings = document.getElementById('open-game-settings');
let buttonCloseGameSettings = document.getElementById('close-game-settings');
let buttonOk = document.getElementById('ok');

let pseudo, temps, first;
let currentPlayer = 'X';

function openGameRules(){
    gameRules.style.display = 'block';
    gameHome.style.display = 'none';
}
function openGameHome(){
    gameRules.style.display = 'none';
    gameHome.style.display = 'block';
}
function openGame(){
    gameHome.style.display = 'none';
    game.style.display = 'block';
}
function openGameSettings(){
    gameSettings.style.display = 'block';
}
function closeGameSettings(){
    gameSettings.style.display = 'none';
}

function startGame(){
    pseudo = document.getElementById('pseudo').value;
    first = document.getElementById('first').value;
    temps = document.getElementById('temps').value;

    if(pseudo == '' ){
        alert('Le pseudo est obligatoire');
        return;
    }
    // Initialiser le joueur actuel en fonction du choix sur le formulaire
    if(first == "ordi"){
        currentPlayer = 'O';
    }
    
    closeGameSettings();
    openGame();

}

buttonOpenGameRules.addEventListener('click', openGameRules);

buttonOpenGameHome.addEventListener('click', openGameHome);

buttonOpenGameSettings.addEventListener('click', openGameSettings);

buttonCloseGameSettings.addEventListener('click', closeGameSettings);

buttonOk.addEventListener('click', startGame);