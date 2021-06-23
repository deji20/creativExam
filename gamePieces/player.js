class Player{
    constructor(name, score, socket){
        this.name = name;
        this.score = score;
        this.socket = socket;
        this.alive = true;
    }
    valueOf(){
        return this.name;
    }
}

module.exports = Player;