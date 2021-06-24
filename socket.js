const Gameroom = require("./gameroom");
const Player = require("./gamePieces/player");

module.exports = (server) => {
    const io = require("socket.io")(server);
    let gamerooms = [];

    io.on("connection", (socket) => {
        let player;
        let room;

        socket.on("initPlayer", (name) => {
            player = new Player(name, 0, socket);
            socket.emit("playerCreated", name);
        })

        socket.on("disconnect", () => {
            if(room) room.players = room.players.filter((p) => p != player);
        })

        socket.on("findGame", () => {
            room = gamerooms.find(room => room.players.length < room.limit)
            if(!room){
                room = new Gameroom(io, 4);
                gamerooms.push(room);
            }
            socket.join(room.name);
            room.addPlayer(player);
        })

        socket.on("listPlayers", () => {
            room.players.forEach((player) => {
                player.socket.emit("updatePlayerList", player.name, room.getAllPlayers(player).filter((p) => p != player.name));
            })
        });

        socket.on("update", (x, y, angle) => {
            room && socket.to(room.name).emit("updateOpponent", player.name, x, y, angle);
        });

        socket.on("shoot", () => {
            room && socket.to(room.name).emit("shoot", player.name);
        })

        socket.on("nextGame", () => io.to(room.name).emit("newBoard", room.board.generateMap(Math.floor(Math.random() * 12 + 1))));

        socket.on("scores", () => room && socket.emit("scores", room.scores));

        socket.on("hit", (name) => {
            room.killPlayer(name);
            player.socket.emit("dead", name);

            let remaining = room.livingPlayers;
            if(remaining.length <= 1){
                setTimeout(() => {
                    remaining[0] && remaining[0].score++;
                    socket.emit("scores", room.scores);
                    io.to(room.name).emit("newBoard", room.board.generateMap(Math.floor(Math.random() * 12 + 1)));
                    room.players.forEach(p => room.revivePlayer(p.name));
                }, 3000);
            }
        })
    })
}