'use strict'

function Message(canvasElement, text){
    this.canvasElement = canvasElement;
    this.ctx = this.canvasElement.getContext('2d');
    this.x = this.canvasElement.width /2 - 200;
    this.y = this.canvasElement.height /2 +30;
    this.text = text;
}

Message.prototype.draw = function() {
    this.ctx.font ='120px Permanent Marker';
    this.ctx.fillStyle = 'white'
    this.ctx.fillText(this.text, this.x, this.y);
}