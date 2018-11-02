'use strict'
function Obsticles(){
    this.canvasElement = canvasElement;
    this.ctx = this.canvasElement.getContext('2d');
    this.size = 40;
    this.y = -50;
    this.x = Math.floor(Math.random() * this.canvasElement.width);
}

Obsticles.prototype.draw = function(){
    this.ctx.fillRect(this.x, this.y    , this.size, this.size)
}

Obsticles.prototype.update = function(){

}