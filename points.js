'use strict'
function Points(canvasElement){
    this.canvasElement = canvasElement;
    this.ctx = this.canvasElement.getContext('2d');
    this.size = 20;
    this.y = -50;
    this.x = Math.floor(Math.random() * this.canvasElement.width);
}

Points.prototype.draw = function(){
    this.ctx.fillRect(this.x - this.size / 2, this.y, this.size, this.size)
}

Points.prototype.update = function(){
    this.y += 5;
}

Points.prototype.inCanvas = function(){
    return this.y > -this.size; 
}