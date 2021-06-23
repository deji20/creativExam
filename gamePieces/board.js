const sides = ["top", "bottom", "right","left"];
let i = 0;

class Board{
    constructor(){
        this.map;
    }

    generateMap(gridSize){
        const opposite = {"top":"bottom", "bottom":"top", "right":"left", "left":"right"};
        const adjacentCell = {"top": {y:-1, x:0}, "bottom":{y:1, x:0}, "right":{y:0, x:1}, "left":{y:0, x:-1}}

        let map = [];
        for(let x = 0; x < gridSize; x++){
            map[x] = [];
            for(let y = 0; y < gridSize; y++){
                map[x][y] = {"top":1, "bottom":1, "right":1, "left":1};
            }
        }


        let removeAdjacent = (x,y) => {
            let removedSides = sides.filter((side) => !map[x][y][side]);
            removedSides.forEach((side) => {
                const adjacent = adjacentCell[side];
                x += adjacent.x;
                y += adjacent.y;
                if(x < map.length && x >= 0 && y < map.length && y >= 0){
                    map[x][y][opposite[side]] = 0;
                }
            });
        }

        let bias = ["top", "right"]; 
        for(let y = 0; y < gridSize; y++){
            for(let x = 0; x < gridSize; x++){
                if(y === 0 && x === gridSize - 1) continue;
                if(y === 0){
                    map[x][y][bias[1]] = 0;
                }else if(y != 0 && x === gridSize - 1){
                    map[x][y][bias[0]] = 0;
                }else{
                    let random = Math.random();
                    map[x][y][bias[Math.floor(random*2)]] = 0;
                    if(random > 0.9 && x != 0 && y != gridSize -1){
                        random = Math.random()
                        map[x][y][["left", "bottom"][Math.floor(random*2)]] = 0;
                    }
                }
                removeAdjacent(x,y)
            };
        }
        this.map = map;
        return map;
    }
}


module.exports = Board;