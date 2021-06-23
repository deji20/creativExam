const Board = require("./gamePieces/board");
const Player = require("./gamePieces/player");
let i = 0;
class Gameroom{
    constructor(connection, limit, players = []){
        this.name = `room${i++}`;
        this.connection = connection;
        this.board = new Board()
        this.players = players;
        this.limit = limit;
    }

    addPlayer(player){
        this.players.push(player);
    }
    
    killPlayer(name){
        let player = this.players.find((player) => player.name === name);
        player.alive = false;
        return player;
    }
    revivePlayer(name){
        let player = this.players.find((player) => player.name === name);
        player.alive = true;
        return player;
    }
    getAllPlayers(){
        return this.players.map(player => player.name);
    }
    getPlayer(socket){
        return this.players.find((p) => p.socket === socket);
    }
    get scores(){
        return this.players.map((p) => { return {name:p.name, score:p.score} });
    }
    get livingPlayers(){
        return this.players.filter((player) => player.alive)
    }

}

module.exports = Gameroom;