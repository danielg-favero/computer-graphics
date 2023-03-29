import { PerlinNoise } from './PerlinNoise.js'

const perlin = new PerlinNoise();

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 1024;

const GRID_SIZE = 4;
const RESOLUTION = 128;
const COLOR_SCALE = 255;

let pixel_size = canvas.width / RESOLUTION;
let num_pixels = GRID_SIZE / RESOLUTION;

for (let y = 0; y < GRID_SIZE; y += num_pixels / GRID_SIZE){
    for (let x = 0; x < GRID_SIZE; x += num_pixels / GRID_SIZE){
        let v = parseInt(perlin.get(x, y) * COLOR_SCALE);
        ctx.fillStyle = `rgb(${v}, ${v}, ${v})`;
        ctx.fillRect(
            x / GRID_SIZE * canvas.width,
            y / GRID_SIZE * canvas.width,
            pixel_size,
            pixel_size
        );
    }
}

export default canvas