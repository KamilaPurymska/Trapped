'use strict'

function Player(canvasElement, initialPostionPlayer){
    this.x = initialPostionPlayer.x;
    this.y = initialPostionPlayer.y;
    this.size = 100;
    this.speed = 5;
    this.lives = 10;
    this.direction = 0; 
    this.canvasElement = canvasElement;
    this.ctx = this.canvasElement.getContext('2d');
    this.image = new Image();
    this.image.src = './images/penguin.png';
}

    Player.prototype.setDirection = function(direction){
        this.direction = direction;
    }

    Player.prototype.draw = function(){
        
        //this.image = document.querySelector('img.playerPenguin').getAttribute('src')
        this.ctx.drawImage(this.image, this.x, this.y - this.size, this.size, this.size);
        //this.ctx.fillRect(this.x, this.y - this.size / 2, this.size, this.size)

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
        var collisionTop = obsticle.y + obsticle.size > this.y - this.size;
        var collisionBottom = obsticle.y < this.y;
        var collisionRight = obsticle.x < this.x + this.size ;
        var collisionLeft = obsticle.x + obsticle.size  > this.x;

        if (collisionTop && collisionRight && collisionLeft && collisionBottom){
            return true;
        }
        return false;
    }

    Player.prototype.collisionWithPoints = function(point){
        var collisionTop = point.y + point.size > this.y - this.size;
        //var collisionBottom = point.y + point.size > this.y;
        var collisionRight = point.x < this.x + this.size ;
        var collisionLeft = point.x + point.size  > this.x;

        return  collisionTop && collisionRight && collisionLeft
    }

   Player.prototype.collisionWithBox = function(box){
        var collisionRight = box.x < this.x + this.size;
        var collisionTop = box.y + box.size > this.y - this.size;
        var collisionLeft = box.x + box.size  > this.x;

        return collisionRight && collisionLeft && collisionTop
   }