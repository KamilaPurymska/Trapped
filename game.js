'use strict'

function Game(canvasElement){
    this.player = null;
    this.obsticles = [];
    this.points = [];
    this.box =[];
    this.score = 0;
    this.gameOver = false;
    this.level = 1;
    this.canvasElement = canvasElement;

    this.obsticleRate;
    this.obsticleSpeed;
    this.pointsRate;
    this.poitsSpeed; 
    this.boxRate;

    this.initialPostionPlayer = {
        x: this.canvasElement.width / 2,
        y: this.canvasElement.height
    }
    
        
    }


Game.prototype.start = function () {

    this.ctx = this.canvasElement.getContext('2d');
   
    this.startLoop();
    
    setTimeout(function () {
        this.level++; 

    }.bind(this), 5000);
   
}


Game.prototype.startLoop = function(){

    this.player = new Player(this.canvasElement, this.initialPostionPlayer);
    this.obsticles.push(new Obsticle(this.canvasElement, this.obsticleSpeed))
    this.points.push(new Points(this.canvasElement, this.poitsSpeed))
   // this.box.push(new Box(this.canvasElement))

    this.handleKeyDown = function (event){
        if (event.key === 'ArrowLeft') {
            this.player.setDirection(-1)
            } else if(event.key === 'ArrowRight'){
                this.player.setDirection(1);
            }
        }.bind(this)

    
    document.addEventListener('keydown', this.handleKeyDown);


    var loop = function (){ 
        
       if(Math.random() > this.obsticleRate){
           this.obsticles.push(new Obsticle(this.canvasElement, this.obsticleSpeed));
        }

        if(Math.random() > this.pointsRate){
            this.points.push(new Points(this.canvasElement, this.poitsSpeed));
         }

        if (this.level === 2){ 
            if(Math.random() > this.boxRate){
                this.box.push(new Box(this.canvasElement));
            }
         }

        this.chceckCollisions();
        this.updateAll();
        this.clearAll();
        this.drawAll();
        this.checkLevels();
        
        
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
    this.box.filter(function(box){
        return box.inCanvas(); 
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
    this.box.forEach(function(box){
        box.draw();
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

      this.points.forEach(function(point, index){
          if(this.player.collisionWithPoints(point)){
            this.score++;
            this.points.splice(index, 1);
            this.pointsGained(this.score);
          }
      }.bind(this));

    }

Game.prototype.onLiveLost = function(callback) {
    this.lostLives = callback
}

Game.prototype.onPointsGained = function(callback){
    this.pointsGained = callback;
}

Game.prototype.checkLevels = function(){
    if (this.level === 1){
        this.poitsSpeed = 5;
        this.obsticleSpeed = 4;

        this.pointsRate = 0.985;
        this.obsticleRate = 0.99;

    }else if (this.level === 2){
        this.poitsSpeed = 7;
        this.obsticleSpeed = 6;

        this.pointsRate = 0.975;
        this.obsticleRate = 0.969;
        this.boxRate = 0.99
    }
}