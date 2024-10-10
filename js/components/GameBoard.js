export default class GameBoard extends HTMLElement {

    constructor(){
        super();
        this.attachShadow({ mode:'open' });
        this.board = ['','','','','','','','',''];
        this.currentPlayer = 'X';
        this.players = {}; //name, symbole, timeRemaining
        this.time = 0;
        this.timer = null;
    }

    connectedCallback() {
        this.initGame();
    }

    /* La méthode statique observedAttributes() spécifie que l'attribut 'pseudo' doit être surveillé pour les changements. Lorsque cet attribut change, la méthode attributeChangedCallback est appelée et met à jour this.pseudo avec la nouvelle valeur. */

    static get observedAttributes(){
        return ['pseudo', 'time', 'first-player'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if(name == "pseudo")
            this.pseudo = newValue;
        if(name == "time")
            this.time = newValue;
        if(name == "first-player")
            this.firstPlayer = newValue;
    }

    initGame() {
        this.players["X"] = {
            name: this.pseudo,
            symbol: "X",
            timeRemaining: this.time
        }
        this.players["O"] = {
            name: 'Ordi',
            symbol: "O",
            timeRemaining: this.time
        }
        this.currentPlayer = this.firstPlayer == 'joueur' ? 'X' : 'O';
        this.render();
    }
    initTime() {
        this.players['X'].timeRemaining = this.time
        this.players['O'].timeRemaining = this.time
    }
    startTimer(){
        this.initTime();
        this.editTimeForplayers();
    
        this.timer = setInterval( () => {
            let thePlayer = this.players[this.currentPlayer];
            /* this.player['O'] */
            if(thePlayer.timeRemaining > 0){
                thePlayer.timeRemaining--;
                this.editTimeForplayers();
            }else{
                alert("Temps écoulé ! C'est au tour de l'autre joueur.");
                this.switchPlayer();
                if(this.currentPlayer == 'O'){
                    this.computerPlay();
                }
            }
        } , 1000);
    
    }

    stopTimer(){
        clearInterval(this.timer)
    }

    editTimeForplayers(){
        this.shadowRoot.getElementById('player-1-time').textContent = `00:${this.players['X'].timeRemaining}`
        /**
         * 00:29
         */
        this.shadowRoot.getElementById('player-2-time').textContent = `00:${this.players['O'].timeRemaining}`
        /**
         * 00:29
         */
    }

    handleCellClick(index) {
        //Si this.board[3] est different de ''
        if(this.board[index] != ''){
            return;
        }
        
        this.board[index] = this.currentPlayer;
        /* this.board[0] = "X"
         Cle | Valeur
         0   |  X
         3   |  O

        */
        
        this.updateCell(index);
        //this.updateCell(0)
        
        if(this.checkingWinner()) {
            alert(`Le joueur ${this.players[this.currentPlayer].name} a gagné`);
            this.endGame();
        } else if (!this.board.includes("")){
            alert('Egalité');
            this.endGame();
        }else{
            this.switchPlayer();
            if(this.currentPlayer == 'O'){
                this.computerPlay();
            }
        }
    }

    endGame(){
        this.stopTimer();
        setTimeout(() => {
            this.replaceWith(document.createElement('game-home'));
        }, 2000);
    }

    updateCell(index){
        const cell = this.shadowRoot.querySelector(`game-cell[number="${index}"]`);
        /* on récupère la cellule sur le html d'en bas (dans la fonction render() ) grace a son attribut number="0" */
        cell.setAttribute("value", this.board[index]);
        /* A cette cellule ou lui attribut la valeur : this.board[0] 
           A la fin de cette fonction on aura 
           <game-cell number="0" value="X"></game-cell>
        */
    }

    checkingWinner(){
        let winCombinations = [
            [0,1,2],
            [0,3,6],
            [6,7,8],
            [2,5,8],
            [0,4,8],
            [2,4,6],
            [1,4,7],
            [3,4,5],
        ];
    
        for (let combinaison of winCombinations) {
            let [a, b, c] = combinaison;
            /*1er Passage de la boucle : on récupère les valeurs a, b, c de la première ligne de  winCombinations donc : 
            a = 0, b = 1, c = 2 */
            
            if(this.board[a] && this.board[a] == this.board[b] && this.board[a] == this.board[c]){
                 /*1er Passage de la boucle : on teste si 
                 this.board[0] existe et si this.board[0] est égale à this.board[1] et si this.board[0] est égale à this.board[2] 
                 this.board[0] = "X"
                 this.board[1] = ""
                 */
            
                return true; //Une combinaison gagnante a ete trouvé
            }
        }
 
        return false; //Aucune combinaison gagnante n'a ete trouvé
    }

    switchPlayer() {
        this.stopTimer();
        this.currentPlayer = this.getOtherPlayer();
        //this.currentPlayer = O;
        this.startTimer();
    }

    getOtherPlayer(){
        //"X" === "X" => "O"
        return this.currentPlayer === 'X' ? 'O' : 'X';
    }

    computerPlay() {
       
        //Savoir quelles numeros de cases sont vides 
        let emptyCellNumbers = [];
        for (let [index, cell] of this.board.entries()) {
            
            if(cell == ''){
                emptyCellNumbers.push(index);
            } 
        }
        
        //Choisir au hasard un numero de case 
        if(emptyCellNumbers.length > 0 ){
            const randomNumber = emptyCellNumbers[Math.floor(Math.random() * emptyCellNumbers.length)];
            //3 est choisis au hasard dans les case qui reste de this.board
            
            //Lancer le click sur cette case en utilisant handleCellClick
            setTimeout(() => {
                this.handleCellClick(randomNumber);
                //this.handleCellClick(3)
            }, 1000);
            
        }
    }

    render() {
        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="css/style.css">
        <div id="game">
            <header>
                <div id="game-opponent">
                    <div class="flex justify-center gap20">
                        <!-- Opposant 1 -->
                        <div class="flex gap20">
                            <div>
                                <div class="pseudo" id="player-1-pseudo">${this.players['X'].name}</div>
                                <div class="time" id="player-1-time">00:${this.players['X'].timeRemaining}</div>
                            </div>
                            <div class="avatar">
                                <img src="image/user.png" alt="">
                            </div>
                        </div>
                        <!-- Opposant 2 -->
                        <div class="flex gap20">
                            <div>
                                <div class="pseudo">${this.players['O'].name}</div>
                                <div class="time" id="player-2-time">00:${this.players['O'].timeRemaining}</div>
                            </div>
                            <div class="avatar">
                                <img src="image/robot.png" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div id="plateau"></div>
        </div>`;
        this.renderBoard();
        if (this.currentPlayer == 'O') {
            this.computerPlay();
        }
    }

    renderBoard(){
        const board = this.shadowRoot.getElementById('plateau');
        board.innerHTML = ''
        this.board.forEach((cellValue, index ) => {
            const cell = document.createElement('game-cell');
            cell.setAttribute("number", index);
            cell.setAttribute("value", cellValue);
            cell.parentBoard = this;
            board.appendChild(cell);
        })
    }
}