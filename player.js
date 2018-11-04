'use strict'

function Player(canvasElement, initialPostionPlayer){
    this.x = initialPostionPlayer.x;
    this.y = initialPostionPlayer.y;
    this.size = 40;
    this.speed = 5;
    this.lives = 3;
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
        if (this.x <= - (this.size /2)  ) {
            this.setDirection(1);
          }
           if (this.x >= this.canvasElement.width - this.size / 2) {
            this.setDirection(-1);
          }
        this.x += this.speed * this.direction
    }

   /* Player.prototype.move = function(){
        this.x += this.speed * this.direction
    } */

    Player.prototype.collisionWithObsicles = function(obsticle){
        var collisionTop = obsticle.y < this.y + this.size;
        var collisionBottom = obsticle.y + obsticle.size > this.y;
        var collisionRight = obsticle.x < this.x + this.size ;
        var collisionLeft = obsticle.x + obsticle.size  > this.x;

        return  collisionTop && collisionRight && collisionLeft && collisionBottom
    }

    Player.prototype.collisionWithPoints = function(point){
        var collisionTop = point.y < this.y + this.size;
        var collisionBottom = point.y + point.size > this.y;
        var collisionRight = point.x < this.x + this.size ;
        var collisionLeft = point.x + point.size  > this.x;

        return  collisionTop && collisionRight && collisionLeft && collisionBottom
    }

    