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

    startTimer(){
        this.editTimeForplayers();
    
        this.timer = setInterval( () => {
            let thePlayer = this.players[this.currentPlayer];
            if(thePlayer.timeRemaining > 0){
                thePlayer.timeRemaining--;
                this.editTimeForplayers();
            }else{
                alert("Temps écoulé ! C'est au tour de l'autre joueur.");
                this.switchPlayer();
            }
        } , 1000);
    
    }

    stopTimer(){
        clearInterval(this.timer)
    }

    editTimeForplayers(){
        this.shadowRoot.getElementById('player-1-time').textContent = `00:${this.players['X'].timeRemaining}`
        this.shadowRoot.getElementById('player-2-time').textContent = `00:${this.players['O'].timeRemaining}`
    }

    handleCellClick(index) {
        if(this.board[index] != ''){
            return;
        }
        
        this.board[index] = this.currentPlayer;
        this.updateCell(index);

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
        cell.setAttribute("value", this.board[index]);
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
            
            if(this.board[a] && this.board[a] == this.board[b] && this.board[a] == this.board[c]){
                return true; //Une combinaison gagnante a ete trouvé
            }
        }
 
        return false; //Aucune combinaison gagnante n'a ete trouvé
    }

    switchPlayer() {
        this.stopTimer();
        this.currentPlayer = this.getOtherPlayer();
        this.startTimer();
    }

    getOtherPlayer(){
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
            
            //Lancer le click sur cette case en utilisant handleCellClick
            setTimeout(() => {
                this.handleCellClick(randomNumber);
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