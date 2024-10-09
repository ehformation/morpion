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
            name: this.pseudo,
            symbol: "O",
            timeRemaining: this.time
        }
        this.currentPlayer = this.firstPlayer == 'joueur' ? 'X' : 'O';
        this.render();
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
            <div id="plateau">
            </div>
        </div>`;
    }
}