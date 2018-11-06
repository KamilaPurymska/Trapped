'use strict'
function Points(canvasElement, poitsSpeed){
    this.canvasElement = canvasElement;
    this.ctx = this.canvasElement.getContext('2d');
    this.size = 40;
    this.y = -50;
    this.speed = poitsSpeed
    this.image = new Image();
    this.pointsImages = ["./images/cocstail.png" , "./images/coctail2.png", "./images/coctail3.png"]
    this.image.src = this.randomImage();
    this.x = Math.floor(Math.random() * this.canvasElement.width);
}

Points.prototype.draw = function(){
    this.ctx.drawImage(this.image, this.x, this.y, this.size, this.size)
}

Points.prototype.update = function(){
    this.y += this.speed;
}

Points.prototype.inCanvas = function(){
    return this.y > -this.size; 
}

Points.prototype.randomImage = function(){
    var randIm = Math.floor(Math.random() * this.pointsImages.length)
    return this.pointsImages[randIm];
}