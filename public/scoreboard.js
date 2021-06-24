class Scoreboard{
    constructor(){
        this.board = $("#scoreboard");
    }
    
    update(players){
        this.board.empty();
        let charDiv = players.map((player) => {
            return $("<div>", {
                class:"text-center bg-gray-500 bg-opacity-20 shadow-xl flex flex-col justify-center"
            })
                .append(
                    $("<p>", {
                        class:"center px-2",
                        text:player.score,
                    }),
                    $("<p>", {
                        class:"center px-2 bg-gray-800 bg-opacity-20",
                        text:player.name,
                    })
                )
        })
        this.board.append(charDiv);
    }
}