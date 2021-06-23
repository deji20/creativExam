class Player{
    constructor(name, x, y){
        this.name = name;
        this.alive = true;
        this.size = 50;
        const mainBody = Bodies.polygon(x, y, 3, this.size, {
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
            mass:100,
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
        let vectorHeading = {x:Math.cos(this.body.angle) * speed, y:Math.sin(this.body.angle) * speed};
        let bullet = Bodies.circle(this.body.position.x + vectorHeading.x*10, this.body.position.y + vectorHeading.y*10, 25, {
            restitution:1,
            frictionStatic:1,
            friction:1,
            frictionAir:0,
            mass:100,
            render:{
                fillStyle:"blue",
            },
            label: "bullet",
        });
        Body.applyForce(bullet, bullet.position, vectorHeading);
        return bullet;
    }
}