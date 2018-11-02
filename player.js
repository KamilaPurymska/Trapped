'use strict'

function Player(canvasElement, initialPostionPlayer){
    this.x = initialPostionPlayer.x;
    this.y = initialPostionPlayer.y;
    this.size = 40;
    this.speed = 5;
    this.direction = 0; 
    this.canvasElement = canvasElement;
    this.ctx = this.canvasElement.getContext('2d');
}

    Player.prototype.setDirection = function(direction){
        this.direction = direction;
    }

    Player.prototype.draw = function(){
        this.ctx.fillRect(this.x, this.y - this.size / 2, this.size, this.size)

    }

    Player.prototype.update = function(){
        this.x += this.speed * this.direction
    }

    Player.prototype.CollisationsWithObsicles = function(){

    }