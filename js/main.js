let gameRules = document.getElementById('game-rules');
let gameHome = document.getElementById('game-home');
let gameSettings = document.getElementById('game-settings');
let game = document.getElementById('game');
let plateau = document.getElementById('plateau');

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

function cellClick(event){
    let clickedCell = event.target;
    let clickedCellId = clickedCell.id;
    let clickedCellIndex = parseInt(clickedCellId.substring(1));
}

function createPlateau(){
    for (let index = 0; index < 9; index++) {
        /*Création d'une cellule (cell) :

        let cell = document.createElement('div'); : À chaque itération de la boucle, cette ligne crée un nouvel élément <div> dans le DOM (Document Object Model).
        document.createElement('div') appelle la méthode createElement de l'objet document, qui génère un nouvel élément HTML de type <div>. Cela est utilisé pour représenter une case sur le plateau de jeu du morpion. */

        let cell = document.createElement('div');
        cell.id = "c" + (index + 1);
        cell.addEventListener('click', cellClick);
        /*
        Ajout de la cellule au plateau :

        plateau.appendChild(cell); : Cette ligne ajoute la nouvelle cellule (cell) à un élément parent appelé plateau.
        plateau doit être une référence à un élément du DOM (par exemple, une <div> qui sert de conteneur pour le plateau de jeu). La méthode appendChild ajoute cell à la fin de la liste des enfants de plateau.
        Cela signifie que chaque fois qu'une nouvelle cellule est créée, elle est ajoutée au plateau, ce qui construit progressivement la grille du jeu. */
        plateau.appendChild(cell)
    }
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

    createPlateau();

}

buttonOpenGameRules.addEventListener('click', openGameRules);

buttonOpenGameHome.addEventListener('click', openGameHome);

buttonOpenGameSettings.addEventListener('click', openGameSettings);

buttonCloseGameSettings.addEventListener('click', closeGameSettings);

buttonOk.addEventListener('click', startGame);