const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Planet {
  x;
  y;
  pX;
  pY;
  size;
  atmosphere;
  radius;
  alfha;
  constructor(x, y, size, atmosphere = 'red', radius = 50) {
    this.pX = x;
    this.pY = y;
    this.atmosphere = atmosphere;
    this.radius = radius;
    this.size = size;
    this.alfha = 0;
  }

  move(){
    this.x = this.radius * Math.sin(this.alfha) + this.pX;
    this.y = this.radius * Math.cos(this.alfha) + this.pY;
    this.alfha += (0.1 * Math.PI) / 180;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.atmosphere;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
}

const planets = [
  new Planet(200, 200, 30, 'red', 150),
  new Planet(200, 200, 50, 'blue', 50),
  new Planet(200, 200, 70, 'green', 200),
  new Planet(200, 200, 10, 'yellow', 100),
]

let planet;

const render = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const planetIndex in planets) {
    let planet = planets[planetIndex];
    planet.move();
    planet.render(ctx);
  }
  window.requestAnimationFrame(render);
};

window.requestAnimationFrame(render);