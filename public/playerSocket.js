class PlayerSocket{

    constructor(name){
        this.socket = io();
        this.socket.emit("initPlayer", name);

        this.socket.on("playerCreated", (name) => {
            player = new Player(name, 10, 10);

            this.socket.on("shoot", (name) => {
                Composite.add(arena.board, opponents[name].shoot(10));
            })
            
            this.socket.on("newBoard", (map) => {
                if(arena.currentMap) Composite.remove(arena.board, arena.currentMap);
                arena.currentMap = arena.createMap(map)
                for(let key in opponents){
                    Composite.add(arena.currentMap, opponents[key].body);
                }
                !player.alive && toggleModal();
                player.alive = true;
                Composite.add(arena.currentMap, player.body);
                Composite.add(arena.board, arena.currentMap);
            })
    
            this.socket.on("scores", (playerScores) => {
                scoreboard.update(playerScores);
            })
            
            this.socket.on("updatePlayerList", (self, opponentList) => {
                opponentList.forEach((name) => opponents[name] = new Player(name, 10, 10));
            })
            
            this.socket.on("updateOpponent", (name, x,y,angle) => {
                if(opponents[name]){
                    Body.setPosition(opponents[name].body, {x, y});
                    Body.setAngle(opponents[name].body, angle);
                }
            })
    
            this.socket.on("dead", (name) => {
                if(player.name === name){
                    Composite.remove(arena.currentMap, player.body);
                    toggleModal($("<p>", {
                        class:"p-10 text-6xl bg-black rounded-xl text-white bg-opacity-20",
                        text:"Oops You Died!"
                    }))
                    player.alive = false;
                }else{
                    let dead = opponents[name];
                    Composite.remove(arena.currentMap, dead.body);
                }
            })
        })
    }

    shoot(){
        this.socket.emit("shoot");    
    }
    hit(playerName){
        this.socket.emit("hit", playerName);
    }
    scores(){
        this.socket.emit("scores");
    }

    findGame(){
        this.socket.emit("findGame");
    }

    update(x,y, angle){
        this.socket.emit("update", x, y, angle);
    }

    getPlayers(){
        this.socket.emit("listPlayers");
    }
}
