import { Planet } from "./src/solar-system";
import { Position } from "./src/solar-system";
import { Earht } from "./src/solar-system";
import { PlanetRender } from "./src/render";

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const centerPosition = new Position(canvas.width / 2, canvas.height / 2);

const sun = new Planet(centerPosition, 0, 150, new PlanetRender(15, '#FFAF1C'));
const earth = new Earht(sun.position);

const planets = [
  sun,
  earth,
  new Planet(sun.position, 0.3,  200, new PlanetRender(30, '#9D1F2A')),
  new Planet(sun.position, 0.4, 300, new PlanetRender(50, '#566662' )),
]

let planet;

const render = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const planetIndex in planets) {
    planet = planets[planetIndex];
    planet.move();
    planet.render(ctx);
  }
  window.requestAnimationFrame(render);
};
window.requestAnimationFrame(render);