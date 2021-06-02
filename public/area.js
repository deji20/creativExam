const Engine=Matter.Engine,
Render=Matter.Render,
Runner=Matter.Runner,
Events=Matter.Events,
World=Matter.World,
Composite=Matter.Composite;

const area = 5000;

let player;
let engine;
let render;

$(document).ready(() => {
    setup()
    setControls();
    let score = scoreboard();

    render.canvas.height=$(window).height();
    render.canvas.width=$(window).width();
    render.options.height=$(window).height();
    render.options.width=$(window).width();

    Events.on(engine, "collisionStart", (colided) => {
        bodyA = colided.pairs[0].bodyA;
        bodyB = colided.pairs[0].bodyB;
        
        if(bodyA.label === "player" || bodyB.label === "player"){
            Render.stop(render)
            clearInterval(score);
        }
    })
});

function setup(){
    engine = Engine.create();
    engine.world.gravity.y=0;
    var gridBackground = Bodies.rectangle(0, 0, area, {
        isStatic: true,
        isSensor: true,
        collisionFilter:{
            group:-1
        },
        render: {
            sprite: {
                texture: "assets/grid.png",
                xScale: 10,
                yScale:10
            }
        }
    });
    World.add(engine.world, gridBackground);

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

    player=new Character(400, 400, 3);
    const arena = new Arena(area, 200);

    Composite.add(engine.world, [player.body, arena.createWalls()]);

    Render.run(render);
    Engine.run(engine);

    setInterval(arena.spawnAsteroid, 300)
    gameloop();
}

function gameloop(){
    ctx = render.context;

    function update(){
        Engine.update(engine);
        Render.lookAt(render, player.body, {x:700, y:700})
        checkKeys();
        requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}

function scoreboard(){
    let modifier = 1;
    let score = 0;
    time = 0;
    return setInterval(() => {
        score += 1 * modifier;
        $("#scoreboard").text(score)
        if(time%60 === 0){
            modifier++;
        }
    }, 1000)
}

let keys=[];
function setControls(){
    $(document).on("keydown", (event) => {
        if(event.key === "e"){
            player.shoot()
        }
        keys[event.key]=true;
    })
    $(document).on("keyup", (event) => {
        keys[event.key]=false;
    })
}
function checkKeys(){
    let speed = 0.1
    if(keys["w"]) player.move(speed);
    if(keys["d"]) player.rotate(speed);
    if(keys["a"]) player.rotate(-speed);
    if(keys["s"]) player.move(-speed);
}

var drawGrid = function(w, h) {
    const ctx = render.canvas.context;
    render.canvas.width;
    render.canvas.height;
    
    var data = '<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"> \
        <defs> \
            <pattern id="smallGrid" width="8" height="8" patternUnits="userSpaceOnUse"> \
                <path d="M 8 0 L 0 0 0 8" fill="none" stroke="gray" stroke-width="0.5" /> \
            </pattern> \
            <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse"> \
                <rect width="80" height="80" fill="url(#smallGrid)" /> \
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="gray" stroke-width="1" /> \
            </pattern> \
        </defs> \
        <rect width="100%" height="100%" fill="url(#smallGrid)" /> \
    </svg>';
    
    img.onload = function () {
      ctx.drawImage(img, 0, 0);
      DOMURL.revokeObjectURL(url);
    }
    img.src = url;
}