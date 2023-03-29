export class RandomWalker {
    constructor(canvas) {
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.width = 5;
        this.height = 5;
        this.step = 5;
        this.canvas = canvas;
        this.canvasCtx = canvas.getContext('2d');;
    }
    
    walk() {
        const MAX_ITERATIONS = 100000;

        for(let i = 0; i < MAX_ITERATIONS; i++){
            // 1 - Cima
            // 2 - Direita
            // 3 - Baixo
            // 4 - Esquerda
            let direction = Math.floor(4 * Math.random());

            switch(direction){
                case 0:
                    if(this.y - this.step > 0){
                        this.y -= this.step;
                    }
                    break;
                case 1:
                    if(this.x + this.step < this.canvas.width){
                        this.x += this.step;
                    }
                    break;
                case 2:
                    if(this.y + this.step < this.canvas.height){
                        this.y += this.step;
                    }
                    break;
                case 3:
                    if(this.x - this.step > 0){
                        this.x -= this.step;
                    }
                    break;
            }

            this.draw();
        }
    }

    draw() {
        this.canvasCtx.fillStyle = 'white';
        this.canvasCtx.fillRect(this.x, this.y, this.width, this.height);
    }
}