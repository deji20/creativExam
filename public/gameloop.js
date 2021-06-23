const Engine=Matter.Engine,
Bodies=Matter.Bodies,
Body=Matter.Body,
Render=Matter.Render,
Grid=Matter.Grid,
Runner=Matter.Runner,
Events=Matter.Events,
World=Matter.World,
Composite=Matter.Composite;

const opponents = {};
const arena = new Arena(2);
const scoreboard = new Scoreboard()
let player;

let playerSocket;
let engine;
let render;

function joinGame(name){
    setup()
    playerSocket = new PlayerSocket(name);
    playerSocket.findGame();
    playerSocket.getPlayers();
    playerSocket.socket.emit("nextGame");
    setControls();
    setEvents();

    render.canvas.height=$(window).height();
    render.canvas.width=$(window).width();
    render.options.height=$(window).height();
    render.options.width=$(window).width();
};

function setup(){

    engine = Engine.create();
    engine.gravity.y=0;

    render = Render.create({
        element:$("#game")[0],
        engine:engine,
        options:{
            wireframes:false,
        },
    });

    $(window).on("resize", () => {
        render.canvas.height=$(window).height();
        render.canvas.width=$(window).width();
        render.options.height=$(window).height();
        render.options.width=$(window).width();
    })

    Composite.add(engine.world, arena.board);

    Render.run(render);
    Matter.Runner.run(engine);
    gameloop();
}

function gameloop(){
    ctx = render.context;

    function update(){
        Engine.update(engine);
        if(player){
            Render.lookAt(render, player.body, {x:1000, y:1000})
            player.alive && checkKeys();
            playerSocket.update(player.body.position.x, player.body.position.y, player.body.angle);
        }
        requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}

let keys=[];
function setControls(){
    $(document).on("keydown", (event) => {
        if(event.key === "e" && player.alive){
            Composite.add(arena.board, player.shoot(10));
            playerSocket.shoot();
        }
        keys[event.key]=true;
    })
    $(document).on("keyup", (event) => {
        keys[event.key]=false;
    })
}

function setEvents(){
    Events.on(arena.board, "afterAdd", (e) => {
        if(e.object.label === "bullet"){
            setTimeout(() => Composite.remove(e.source, e.object), 7000);
        }
    });

    Events.on(engine, "collisionStart", (e) => {
        let pair = e.pairs[0];
        let labelPair = [pair.bodyA.label, pair.bodyB.label];
        if(labelPair.includes("player") && labelPair.includes("bullet")){
            if(pair.bodyA.label === "player"){
                playerSocket.hit(pair.bodyA.parent.label);
                Composite.remove(arena.board, pair.bodyA.parent);
                Composite.remove(arena.board, pair.bodyB);
            }else{
                playerSocket.hit(pair.bodyB.parent.label);
                Composite.remove(arena.board, pair.bodyB.parent);
                Composite.remove(arena.board, pair.bodyA);
            }
        }
    })

}
function checkKeys(){
    if(keys["w"]) player.move(1);
    if(keys["d"]) player.rotate(1);
    if(keys["a"]) player.rotate(-1);
    if(keys["s"]) player.move(-1);
    if(keys[" "]) player.boost(); 
}