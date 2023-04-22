export class Dither {
    constructor(src) {
        this.img = new Image()
        this.img.crossOrigin = "anonymous";
        this.img.src = src;
    }

    static floyd(src) {
        const dither = new Dither(src);
        
        dither.img.addEventListener("load", () => {
            const imageElement = document.getElementById('img');
            const canvas = document.getElementById('canvas');
            const ctx = canvas.getContext('2d');

            canvas.width = imageElement.width;
            canvas.height = imageElement.height;

            ctx.drawImage(imageElement, 0, 0, canvas.width, canvas.height);

            const image = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const imageWidth = image.width;

            for (let y = 0; y < canvas.height; y++) {
                for (let x = 0; x < canvas.width; x++) {
                    const index = (y * imageWidth + x) * 4;

                    const oldR = image.data[index];
                    const oldG = image.data[index + 1];
                    const oldB = image.data[index + 2];

                    const gray = (oldR + oldG + oldB) / 3;
 
                    const newPixel = gray < 128 ? 0 : 255;
    
                    const error = gray - newPixel;

                    image.data[index] = image.data[index + 1] = image.data[index + 2] = newPixel;
    
                    image.data[index + 4] += error * 7 / 16;
                    image.data[index + imageWidth * 4 - 4] += error * 3 / 16;
                    image.data[index + imageWidth * 4] += error * 5 / 16;
                    image.data[index + imageWidth * 4 + 4] += error * 1 / 16;

                }
            }
            const ditheredImage = new ImageData(image.data, canvas.width, canvas.height)

            ctx.putImageData(ditheredImage, 0, 0);
        })
    }
}