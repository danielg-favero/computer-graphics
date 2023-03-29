import { RandomWalker } from './RandomWalker.js'

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 1024;

ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height);

const walker = new RandomWalker(canvas);

walker.walk();