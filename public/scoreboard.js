class Scoreboard{
    constructor(){
        this.board = $("#scoreboard");
    }
    
    update(players){
        this.board.empty();
        let charDiv = players.map((player) => {
            return $("<div>", {
                class:"text-center flex flex-col justify-center"
            })
                .append(
                    $("<p></p>", {
                        class:"center",
                        text:player.score,
                    }),
                    $("<p></p>", {
                        class:"center",
                        text:player.name,
                    })
                )
        })
        this.board.append(charDiv);
    }
}