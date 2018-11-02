'use strict'
function Obsticle(canvasElement){
    this.canvasElement = canvasElement;
    this.ctx = this.canvasElement.getContext('2d');
    this.size = 40;
    this.y = -50;
    this.x = Math.floor(Math.random() * this.canvasElement.width);
}

Obsticle.prototype.draw = function(){
    this.ctx.fillRect(this.x - this.size / 2, this.y, this.size, this.size)
}

Obsticle.prototype.update = function(){
    this.y += 5;
}

Obsticle.prototype.inCanvas = function(){
    //return this.y > -this.size; 
}