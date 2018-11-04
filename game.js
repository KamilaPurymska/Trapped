'use strict'

function Game(canvasElement){
    this.player = null;
    this.obsticles = [];
    this.points = [];
    this.score = 0;
    this.gameOver = false;
    this.canvasElement = canvasElement;
    this.initialPostionPlayer = {
        x: this.canvasElement.width / 2,
        y: this.canvasElement.height
    }
    
        
    }


Game.prototype.start = function () {

    this.ctx = this.canvasElement.getContext('2d');
   
    this.startLoop();
   
   
   }


Game.prototype.startLoop = function(){

    this.player = new Player(this.canvasElement, this.initialPostionPlayer);
    this.obsticles.push(new Obsticle(this.canvasElement))
    this.points.push(new Points(this.canvasElement))

    this.handleKeyDown = function (event){
        if (event.key === 'ArrowLeft') {
            this.player.setDirection(-1)
            } else if(event.key === 'ArrowRight'){
                this.player.setDirection(1);
            }
        }.bind(this)

    
    document.addEventListener('keydown', this.handleKeyDown);


    var loop = function (){ 
        
       if(Math.random() > 0.97){
           this.obsticles.push(new Obsticle(this.canvasElement));
        }

        if(Math.random() > 0.96){
            this.points.push(new Points(this.canvasElement));
         }

        this.chceckCollisions();
        this.updateAll();
        this.clearAll();
        this.drawAll();
        
        if (!this.gameOver) {
            requestAnimationFrame(loop);
          }
    
    }.bind(this)
    
    loop();
}

Game.prototype.onGameOverCallback = function(callback){
    this.gameOverCallback = callback;
}


Game.prototype.updateAll = function(){
    this.player.update();
    this.obsticles.forEach(function(obsticle){
        obsticle.update();
    })
    this.points.forEach(function(point){
        point.update();
    })

}

Game.prototype.clearAll = function(){
    this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
    this.obsticles.filter(function(obsticle){
        return obsticle.inCanvas(); 
    })
    this.points.filter(function(point){
        return point.inCanvas(); 
    })
}

Game.prototype.drawAll = function(){
    this.player.draw();
    this.obsticles.forEach(function(obsticle){
        obsticle.draw();
    })
    this.points.forEach(function(point){
        point.draw();
    })

}

Game.prototype.finishGame = function(){
    this.gameOver = true;
    this.gameOverCallback();
}

Game.prototype.chceckCollisions = function(){
    this.obsticles.forEach(function(obsticle, index) {
        if (this.player.collisionWithObsicles(obsticle)) {
            this.player.lives--;
            this.lostLives(this.player.lives);
          this.obsticles.splice(index, 1);
        
        if(!this.player.lives){
            this.gameOver = true;
            this.finishGame();
        }
        }
      }.bind(this)); 
      
    }

Game.prototype.onLiveLost = function(callback) {
    this.lostLives = callback
}

