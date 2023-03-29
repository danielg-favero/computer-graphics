import canvas from './draw.js'

var image = canvas.toDataURL();

var aDownloadLink = document.createElement('a');

aDownloadLink.download = 'perlin_noise.png';

aDownloadLink.href = image;

aDownloadLink.click();