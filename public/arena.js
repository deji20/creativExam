const sides = ["top", "bottom", "right","left"];

class Arena{
    constructor(scale){
        let startX, startY = 0;

        this.size = 1900*scale;
        let visibleBoard =  Bodies.rectangle(0, 0, this.size, this.size, {
            isStatic: true,
            isSensor:true,
            render: {
                sprite: {
                    texture: "assets/background.png",
                    xScale:scale,
                    yScale:scale,
                }
            },
        });
        let boardFrame = Bodies.rectangle(0, 0, this.size, this.size, {
            isStatic: true,
            isSensor: true,
            collisionFilter:-1,
            render: {
                fillStyle: 'rgba(100,0,255,0.2)',
                strokeStyle: 'blue',
                lineWidth: 10,
            },
            
        });
        
        this.board = Composite.create({
            bodies:[boardFrame, visibleBoard]}
        )
    }

    createWall(x, y, height, width, label="wall"){
        return Bodies.rectangle(x,y,width, height, {
            isStatic:true,
            friction:0,
            frictionStatic:0,
            restitution:1,
            label:label,
            render:{
                fillStyle:"white"
            },
        });
    }
    createSquare(x, y, size,label = "square"){
        let topWall = this.createWall(x, y-size/2, 10, size, "top");
        let rightWall = this.createWall(x+size/2, y, size, 10, "right");
        let bottomWall = this.createWall(x, y+size/2, 10, size, "bottom");
        let leftWall = this.createWall(x-size/2, y, size, 10, "left");
        return Composite.create({
            label:label,
            bodies:[
                topWall,
                bottomWall,
                rightWall,
                leftWall,
            ]
        })
    }

    generateMaze(gridSize){
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
                if(y === 0 && gridSize < x) continue;
                if(y === 0){
                    map[x][y][bias[1]] = 0;
                }else if(y != 0 && x === gridSize - 1){
                    map[x][y][bias[0]] = 0;
                }else{
                    let random = Math.random();
                    map[x][y][bias[Math.floor(random*2)]] = 0;
                    if(random > 0.9){
                        random = Math.random()
                        map[x][y][["left", "bottom"][Math.floor(random*2)]] = 0;
                    }
                }
                removeAdjacent(x,y)
            };
        }
        return map;
    }

    createMap(map){
        let maze = Composite.create();
        let wallSize = this.size/map.length
        const sideDimensions = { 
            "top":(x, y, size) => this.createWall(x, y-size/2, 10, size, "top"),
            "right": (x, y, size) => this.createWall(x+size/2, y, size, 10, "right"),
            "bottom": (x, y, size) => this.createWall(x, y+size/2, 10, size, "bottom"),
            "left": (x, y, size) => this.createWall(x-size/2, y, size, 10, "left")
        };

        for(let y = 0; y < map.length; y++){
            for(let x = 0; x < map.length; x++){
                sides.forEach((side) => {
                    map[x][y][side] && Composite.add(maze, sideDimensions[side](x*wallSize - this.size/2 + wallSize/2, y*wallSize - this.size/2 + wallSize/2, wallSize));
                });
            }
        }
        return maze;
    }
}