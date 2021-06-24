class Player{
    constructor(name, x, y){
        this.name = name;
        this.alive = true;
        this.size = 50;
        const mainBody = Bodies.polygon(x, y, 8, this.size, {
            label:"player",
            angle:Math.PI,
        });
        let gun = Bodies.rectangle(x+this.size/1.5, y, this.size*1.5, this.size/7, { 
            label:"player",
        });
        let barrel = Bodies.polygon(x, y, 6, this.size/2, {
            label:"player",
        });

        this.body = Body.create({
            label:name,
            parts:[mainBody, gun, barrel],
            mass:75,
            friction:1.0,
            frictionStatic:0.01,
            frictionAir:0.04
        });

        this.speed = 0.2;
        this.rotationSpeed = 0.06;
    }
    move(direction){
        let vectorHeading = {x:Math.cos(this.body.angle)  * direction * this.speed, y:Math.sin(this.body.angle) * direction * this.speed};
        Body.applyForce(this.body, this.body.position, vectorHeading);
    }
    rotate(direction){
        Body.rotate(this.body, this.rotationSpeed*direction, this.body.position);
    }
    explode(){
        this.body
    }

    shoot(speed){
        const vectorHeading = {x:Math.cos(this.body.angle) * speed, y:Math.sin(this.body.angle) * speed};
        const startDistance = 120/speed
        const bullet = Bodies.circle(this.body.position.x + vectorHeading.x*startDistance, this.body.position.y + vectorHeading.y*startDistance, 25, {
            restitution:1,
            inertia:Infinity,
            frictionStatic:0,
            friction:0,
            frictionAir:0,
            mass:75,
            render:{
                fillStyle:"blue",
            },
            label: "bullet",
        });
        Body.applyForce(bullet, bullet.position, vectorHeading);
        return bullet;
    }
}