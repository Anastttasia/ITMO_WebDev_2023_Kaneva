import { PlanetRender } from "./render";

class Planet {
  x;
  y;
  center;
  radius;
  alfha;
  isMoving;
  speed;
  PlanetRender;
  constructor(center, speed = 0.1, radius = 50,  PlanetRender) {
    this.center = center;
    this.speed = speed;
    this.radius = radius;
    this.alfha = 0;
    this.isMoving = speed !== 0;
    this.position = new Position(center.x, center.y);
    this.PlanetRender = PlanetRender;
  }

  move() {
    if (this.isMoving) {
      this.position.x = this.radius * Math.sin(this.alfha) + this.center.x;
      this.position.y = this.radius * Math.cos(this.alfha) + this.center.y;
      this.alfha += (this.speed * Math.PI) / 180;
    }
  }

  render(ctx) {
    this.PlanetRender.render(ctx, this.position);
  }
}

class Earht extends Planet {
  moon;
  constructor(center) {
    super(center, 0.4, 100, new PlanetRender(30, '#1C1289'));
    this.moon = new Planet(this.position, 1.3, 50, new PlanetRender(10,'#CFB80E'));
  }

  move(){
    super.move();
    this.moon.move();
  }
  render(ctx){
    super.render(ctx);
    ctx.beginPath();
    ctx.fillStyle = '#026A0B';
    ctx.arc(this.position.x, this.position.y, 15, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    this.moon.render(ctx);
  }
}

class Position {
  x;
  y;
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

export { Planet, Position, Earht }