'use strict'

function Box(canvasElement){
    this.canvasElement = canvasElement;
    this.ctx = this.canvasElement.getContext('2d');
    this.size = 60;
    this.y = this.canvasElement.height -this.size;
    this.image = new Image();
    this.image.src = './images/box.png';
    this.x = Math.floor(Math.random() * this.canvasElement.width - this.size);
}

Box.prototype.draw = function(){
    this.ctx.drawImage(this.image, this.x, this.y, this.size, this.size)
}   

Box.prototype.update = function(){
    
}

Box.prototype.inCanvas = function(){
    return this.y > -this.size; 
}   