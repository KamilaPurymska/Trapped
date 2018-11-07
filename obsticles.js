'use strict'
function Obsticle(canvasElement, obsticleSpeed){
    this.canvasElement = canvasElement;
    this.ctx = this.canvasElement.getContext('2d');
    this.size = 35;
    this.y = -50;
    this.speed = obsticleSpeed;
    this.image = new Image();
    this.image.src = './images/bomb3.png';
    this.x = Math.floor(Math.random() * (this.canvasElement.width-this.size))+this.size;
}

Obsticle.prototype.draw = function(){
    this.ctx.drawImage(this.image, this.x, this.y, this.size, this.size)
}

Obsticle.prototype.update = function(){
    this.y += this.speed;
}

Obsticle.prototype.inCanvas = function(){
    return this.y > -this.size; 
}   