const LIGHT_INTENSITY = 20
const LIGHT_FADE_INTENSITY = 0.7
const LIGHT_BEANS_ANGLE_STEP = 1000

const canvasLight = document.getElementById('canvas-light')
const canvasImage = document.getElementById('canvas-image')
const canvasBlend = document.getElementById('canvas-blend')
const ctxLight = canvasLight.getContext('2d')
const ctxImage = canvasImage.getContext('2d')
const ctxBlend = canvasBlend.getContext('2d')

const w = 500
const h = 500

canvasLight.width = w
canvasLight.height = h

canvasImage.width = w
canvasImage.height = h

canvasBlend.width = w
canvasBlend.height = h

// Pintar Canvas de Preto
ctxLight.beginPath()
ctxLight.fillStyle = "black"
ctxLight.rect(0, 0, w, h)
ctxLight.fill()

ctxImage.beginPath()
ctxImage.fillStyle = "black"
ctxImage.rect(0, 0, w, h)
ctxImage.fill()

ctxBlend.beginPath()
ctxBlend.fillStyle = "black"
ctxBlend.rect(0, 0, w, h)
ctxBlend.fill()


// Desenhar origem
ctxLight.translate(w / 2, h / 2)
ctxLight.beginPath()
ctxLight.fillStyle = "white"
ctxLight.arc(0, 0, 3, 0, 2 * Math.PI)
ctxLight.fill()

function drawLightPixel(x, y) {
    const dx = Math.abs(x)
    const dy = Math.abs(y)

    const yellow = 255 * LIGHT_INTENSITY / ((dx + dy) * LIGHT_FADE_INTENSITY)

    ctxLight.beginPath()
    ctxLight.fillStyle = `rgb(${yellow}, ${yellow}, 0)`
    ctxLight.rect(x, y, 1, 1)
    ctxLight.fill()
}

function lightBean(x0, y0, x1, y1) {
    x0 |= 0 
    y0 |= 0
    x1 |= 0 
    y1 |= 0 

    var dx = Math.abs(x1 - x0)
    var dy = Math.abs(y1 - y0)
    var sx = (x0 < x1) ? 1 : -1
    var sy = (y0 < y1) ? 1 : -1
    var err = dx - dy
 
    while(!((x0 === x1) && (y0 === y1))) {
        drawLightPixel(x0, y0)
 
        var e2 = 2 * err

        if (e2 > -dy) { 
            err -= dy 
            x0  += sx 
        }

        if (e2 < dx) { 
            err += dx 
            y0  += sy 
        }
    }
}

function light() {
    const step = Math.PI / LIGHT_BEANS_ANGLE_STEP
    let angle
    
    for(angle = 0; angle < 2 * Math.PI; angle += step){
        lightBean(0, 0, w * Math.cos(angle), h * Math.sin(angle))
    }
}

function image(src){
    const img = new Image()
    img.src = src
    img.crossOrigin = "anonymous";
    
    img.addEventListener("load", () => {
        canvasImage.width = img.width;
        canvasImage.height = img.height;
        
        ctxImage.drawImage(img, 0, 0, canvasImage.width, canvasImage.height);
        blend()
    })
}

function softLight(top, bottom) {
    top = top / 255,
    bottom = bottom / 255;

    const sl = ((1 - 2 * bottom) * Math.pow(top, 2)) + 2 * bottom * top

    return Math.round(sl * 255)
}

function blend() {
    const lght = ctxLight.getImageData(0, 0, canvasLight.width, canvasLight.height)
    const img = ctxImage.getImageData(0, 0, canvasImage.width, canvasImage.height)
    const blnd = ctxBlend.getImageData(0, 0, canvasBlend.width, canvasBlend.height)

    for (let y = 0; y < canvasBlend.height; y++) {
        for (let x = 0; x < canvasBlend.width; x++) {
            const index = (y * canvasBlend.width + x) * 4

            blnd.data[index] = softLight(img.data[index], lght.data[index])
            blnd.data[index + 1] = softLight(img.data[index + 1], lght.data[index + 1])
            blnd.data[index + 2] = softLight(img.data[index + 2], lght.data[index + 2])
        }
    }
    const blendedImage = new ImageData(blnd.data, canvasBlend.width, canvasBlend.height)

    ctxBlend.putImageData(blendedImage, 0, 0)
}

light()
image('lamp.jpg')