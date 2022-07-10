import modelState from './model.js';

export default class Particle {
    constructor(x, y, radius, red, green, blue, imagePosX, imagePosY) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.color = `rgb(${red}, ${green}, ${blue})`;
        this.initX = x;
        this.initY = y;
        this.positionX = Math.floor((x - imagePosX) / 3);
        this.positionY = Math.floor((y - imagePosY) / 3);
        this.imagePosX = imagePosX;
        this.imagePosY = imagePosY;
        this.speed = Math.random() * 2 + 0.5;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    mouseHoverDetection() {
        let dx = modelState.mouseEvent.x - this.x;
        let dy = modelState.mouseEvent.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const forceX = dx / distance;
        const forceY = dy / distance;
        const maxDistance = modelState.mouseEvent.radius;
        const force = (maxDistance - distance) / maxDistance;
        return [dx, dy, distance, forceX, forceY, force];
    }

    mouseDragUpdate(ctx) {
        let [dx, dy, distance, forceX, forceY, force] = this.mouseHoverDetection();

        if (modelState.distMode === 'attraction')
            force = -force;

        if (distance < modelState.mouseEvent.radius) {
            this.x -= forceX * force * modelState.distSpeed
            this.y -= forceY * force * modelState.distSpeed

        } else {

            if (this.x !== this.initX) {
                dx = this.initX - this.x;
                this.x += dx / (41 - modelState.distRetain * 4)
            }

            if (this.y !== this.initY) {
                dy = this.initY - this.y;
                this.y += dy / (41 - modelState.distRetain * 4)
            }

            if (dx < 0.5 && dx > -0.5) this.x = this.initX;
            if (dy < 0.5 && dy > -0.5) this.y = this.initY;
        }
        this.draw(ctx);
    }

    particleRainUpdate(ctx) {
        if (modelState.rainMode === 'full') {
            this.x += this.speed * modelState.rainVelocityX / 20;
            this.y += this.speed * modelState.rainVelocityY / 20;
        } else {
            this.x += Math.random() * modelState.rainVelocityX / 20 +
            modelState.rainVelocityX > 0 ? 1 : -1;

            this.y += Math.random() * modelState.rainVelocityY / 20 +
            modelState.rainVelocityY > 0 ? 1 : -1;
        }


        this.positionX = Math.floor((this.x - this.imagePosX) / 3)
        this.positionY = Math.floor((this.y - this.imagePosY) / 3)
        this.red = modelState.imageData.data[this.positionY * modelState.imageData.width * 4 + this.positionX * 4];
        this.green = modelState.imageData.data[this.positionY * modelState.imageData.width * 4 + this.positionX * 4 + 1];
        this.blue = modelState.imageData.data[this.positionY * modelState.imageData.width * 4 + this.positionX * 4 + 2];
        this.color = `rgb(${this.red}, ${this.green}, ${this.blue})`;

        if (this.x > modelState.imageData.width * 3 + this.imagePosX) {
            this.x = this.imagePosX;

            if (modelState.rainMode === 'full' || modelState.stripsType === 'vertical')
                this.y = Math.random() * modelState.imageData.height * 3 + this.imagePosY;

        } else if (this.x < this.imagePosX) {
            this.x = modelState.imageData.width * 3 + this.imagePosX;

            if (modelState.rainMode === 'full' || modelState.stripsType === 'vertical')
                this.y = Math.random() * modelState.imageData.height * 3 + this.imagePosY;
        }

        if (this.y > modelState.imageData.height * 3 + this.imagePosY) {
            this.y = this.imagePosY;

            if (modelState.rainMode === 'full' || modelState.stripsType === 'horizontal')
                this.x = Math.random() * modelState.imageData.width * 3 + this.imagePosX;
        } else if (this.y < this.imagePosY) {
            this.y = modelState.imageData.height * 3 + this.imagePosY;

            if (modelState.rainMode === 'full' || modelState.stripsType === 'horizontal')
                this.x = Math.random() * modelState.imageData.width * 3 + this.imagePosX;
        }

        let [_, __, distance, forceX, forceY, force] = this.mouseHoverDetection();

        if (modelState.distMode === 'attraction')
            force = -force;

        if (distance < modelState.mouseEvent.radius) {
            this.x -= forceX * force * modelState.distSpeed
            this.y -= forceY * force * modelState.distSpeed
        }
        this.draw(ctx);
    }
}
