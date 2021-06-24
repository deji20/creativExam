class Scoreboard{
    constructor(){
        this.board = $("#scoreboard");
    }
    
    update(players){
        this.board.empty();
        let charDiv = players.map((player) => {
            return $("<div>", {
                class:"text-center bg-gray-500 bg-opacity-20 shadow-xl rounded-full flex flex-col justify-center"
            })
                .append(
                    $("<p>", {
                        class:"center px-10",
                        text:player.score,
                    }),
                    $("<p>", {
                        class:"center px-10 bg-gray-800 bg-opacity-20 rounded-b-full",
                        text:player.name,
                    })
                )
        })
        this.board.append(charDiv);
    }
}