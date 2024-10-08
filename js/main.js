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
let etatPlateau = ['','','','','','','','',''];

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
    
    //Met à jour l'état du plateau, qui représente le plateau de jeu. Elle assigne la valeur de currentPlayer (qui peut être 'X' ou 'O') à l'index spécifié par clickedCellIndex, indiquant ainsi que cette case a été occupée par le joueur actuel. Cela modifie le tableau pour refléter le coup effectué et permet au jeu de suivre les mouvements des joueurs et de déterminer les conditions de victoire
    etatPlateau[clickedCellIndex] = currentPlayer;
    /* Met à jour le contenu texte de l'élément de la cellule cliquée (clickedCell). Elle remplace le texte actuel de cette cellule par le symbole du joueur actuel, qui peut être 'X' ou 'O', indiquant ainsi le mouvement effectué par le joueur. Cela permet à l'utilisateur de visualiser immédiatement quel symbole a été placé dans la case, rendant l'état du jeu clair et interactif. */
    clickedCell.textContent = currentPlayer;

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