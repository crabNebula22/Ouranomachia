// The boardgame.io client
import { Client } from 'boardgame.io/client';
import { Ouranomachia } from './Game';

// Board Circles
const centerX = 0;
const centerY = 0;
const outerRadius = 350;
const midRadius = 300;
const innerRadius = 250;

class OuranomachiaClient {
  constructor() {
    this.client = Client({ game: Ouranomachia });
    this.client.start();
    this.createBoard();
    this.client.subscribe(state => this.update(state));
  }

  createBoard() {
    const canvas = document.getElementById('board');
    const ctx = canvas.getContext('2d');
    ctx.translate(400,400); // put 0,0 in the middle of the canvas
    ctx.save();
    //ctx.rotate(-Math.PI / 2); // put 0 degrees at the top
    //ctx.fillStyle = 'red';
    //ctx.fillRect(10, 10, 100, 50);
    //ctx.fillStyle = 'blue';
    // Outer Circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, outerRadius, 0, Math.PI * 2);
    ctx.stroke();
    // Mid/Degree Circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, midRadius, 0, Math.PI * 2);
    ctx.stroke();
    // Inner Circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, innerRadius, 0, Math.PI * 2);
    ctx.stroke();
    // Segment into 12 Zodiacs (30 degrees)
    for (let i = 0; i <= 360; i += 30) {
      const angleInRadians = i * Math.PI / 180;
      const innerX = centerX + innerRadius * Math.cos(angleInRadians);
      const innerY = centerY + innerRadius * Math.sin(angleInRadians);
      const outerX = centerX + outerRadius * Math.cos(angleInRadians);
      const outerY = centerY + outerRadius * Math.sin(angleInRadians);

      ctx.beginPath();
      ctx.moveTo(innerX, innerY);
      ctx.lineTo(outerX, outerY);
      ctx.stroke();
    }
    // Draw 5 degree marks
    const tickLength5degree = 10;
    for (let i = 0; i <= 360; i += 5) {
      const angleInRadians = i * Math.PI / 180;
      const innerX = centerX + (midRadius - tickLength5degree) * Math.cos(angleInRadians);
      const innerY = centerY + (midRadius - tickLength5degree) * Math.sin(angleInRadians);
      const outerX = centerX + (midRadius + tickLength5degree) * Math.cos(angleInRadians);
      const outerY = centerY + (midRadius + tickLength5degree) * Math.sin(angleInRadians);

      ctx.beginPath();
      ctx.moveTo(innerX, innerY);
      ctx.lineTo(outerX, outerY);
      ctx.stroke();
    }
    // Draw 5 degree marks
    const tickLength1degree = 5;
    for (let i = 0; i <= 360; i += 1) {
      const angleInRadians = i * Math.PI / 180;
      const innerX = centerX + (midRadius - tickLength1degree) * Math.cos(angleInRadians);
      const innerY = centerY + (midRadius - tickLength1degree) * Math.sin(angleInRadians);
      const outerX = centerX + (midRadius + tickLength1degree) * Math.cos(angleInRadians);
      const outerY = centerY + (midRadius + tickLength1degree) * Math.sin(angleInRadians);

      ctx.beginPath();
      ctx.moveTo(innerX, innerY);
      ctx.lineTo(outerX, outerY);
      ctx.stroke();
    }
    // Draw half degree marks
    const tickLengthhalfdegree = 2;
    for (let i = 0; i <= 720; i += 1) {
      const angleInRadians = i / 2.0 * Math.PI / 180;
      const innerX = centerX + (midRadius - tickLengthhalfdegree) * Math.cos(angleInRadians);
      const innerY = centerY + (midRadius - tickLengthhalfdegree) * Math.sin(angleInRadians);
      const outerX = centerX + (midRadius + tickLengthhalfdegree) * Math.cos(angleInRadians);
      const outerY = centerY + (midRadius + tickLengthhalfdegree) * Math.sin(angleInRadians);

      ctx.beginPath();
      ctx.moveTo(innerX, innerY);
      ctx.lineTo(outerX, outerY);
      ctx.stroke();
    }
    // Draw the Zodiac signs
    const state = this.client.getInitialState();
    const G = state.G;
    const signOffsetDegrees = 15 - 90; // 15, middle of sign. -90, because canvas 0 is at 90.
    const signOffsetRadius = 30;
    ctx.font = "24px serif";
    for (let i = 0; i < 12; i += 1) {
      const angleInRadians = (i * 30 + signOffsetDegrees) * Math.PI / 180;
      const innerX = centerX + (midRadius - signOffsetRadius) * Math.cos(angleInRadians);
      const innerY = centerY + (midRadius - signOffsetRadius) * Math.sin(angleInRadians);
      const outerX = centerX +    (midRadius + signOffsetRadius) * Math.cos(angleInRadians);
      const outerY = centerY + (midRadius + signOffsetRadius) * Math.sin(angleInRadians);

      ctx.fillText(G.signs[i].codePoint, innerX, innerY);
      ctx.fillText(G.signs[(i + 6)%12].codePoint, outerX, outerY);
    }
    // Setup initial transform for the planets canvas element.
    const planetsCanvas = document.getElementById('planets');
    const planetsCtx = planetsCanvas.getContext('2d');
    planetsCtx.translate(planetsCanvas.width / 2, planetsCanvas.height / 2); // put 0,0 in the middle of the canvas
    planetsCtx.save();
    // Draw the planets in their intitial positions
    this.drawPlanets(state);
  }

  drawPlanets(state) {
    const canvas = document.getElementById('planets');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(-1 * canvas.width / 2, -1 * canvas.height / 2, canvas.width, canvas.height);
    ctx.font = "36px serif";
    ctx.fillStyle = state.G.playerColor[0];
    // Draw the planets in their intitial positions
    ctx.fillStyle = state.G.playerColor[0];
    state.G.playerPlanets[0].forEach((planet) => {
      this.drawPlanet(ctx, planet);
    })
    ctx.fillStyle = state.G.playerColor[1];
    state.G.playerPlanets[1].forEach((planet) => {
      this.drawPlanet(ctx, planet);
    })
  }

  drawPlanet(ctx, planet) {
    //ctx.fillText("\u2642", 100, 100); 
    let radius = innerRadius;
    if (planet.playerID == 1) {
      radius = midRadius;
    }
    radius += 20;
    // Canvas circles are drawn using radians, so we have to convert
    // from degrees. Also, zero radians/degrees is not at the top, but
    // 90 degrees from the top at the right/east.
    const angleInRadians = (planet.position - 90) * Math.PI / 180;
    let planetX = centerX + (radius) * Math.cos(angleInRadians);
    let planetY = centerY  + (radius) * Math.sin(angleInRadians);
    // FIXME fonts are easy to quickly draw, but not easy to draw precicely centered.
    // use the textMetrics to calculate the position or change to sprites/images.
    ctx.fillText(planet.iconCharCode, planetX, planetY);
    // Debugging
    let planetSymbolMetrics = ctx.measureText(planet.iconCharCode);
    console.log(planetSymbolMetrics);
    ctx.strokeRect(planetX, planetY + planetSymbolMetrics.actualBoundingBoxDescent, planetSymbolMetrics.width, -planetSymbolMetrics.actualBoundingBoxAscent - planetSymbolMetrics.actualBoundingBoxDescent);
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(planetX, planetY);
    ctx.stroke();

  }

  update(state) {
    console.log("update(state)");
    // Draw the pieces
    this.drawPlanets(state);
  }

}

const app = new OuranomachiaClient();
