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
    this.message = '';

    this.obsticleRate;
    this.obsticleSpeed;
    this.pointsRate;
    this.poitsSpeed; 
    this.boxRate;
    this.boxSpeed;

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

    this.handleKeyDown = function (event){
        if (event.key === 'ArrowLeft') {
            this.player.setDirection(-1)
            } else if(event.key === 'ArrowRight'){
                this.player.setDirection(1);
            }
        }.bind(this)
    
    document.addEventListener('keydown', this.handleKeyDown);

    this.soundEnemy = new Audio("./sound/NFF-thud.wav");
    this.soundBox = new Audio("./sound/NFF-explode.wav");
    this.soundPoint = new Audio("./sound/NFF-yahoo.wav");

    var intervalId = setInterval(function () {
        this.level++; 
        this.message = new Message(this.canvasElement, 'Level ' + this.level)
        
        setTimeout(function() {
            this.message = null;
        }.bind(this), 2000)

    }.bind(this), 10000);
    

    var loop = function (){ 
        
       if(Math.random() > this.obsticleRate){
           this.obsticles.push(new Obsticle(this.canvasElement, this.obsticleSpeed));
        }

        if(Math.random() > this.pointsRate){
            this.points.push(new Points(this.canvasElement, this.poitsSpeed));
         }

        if (this.level === 2 || this.level === 3 || this.level === 4 || this.level === 5){ 
            if(Math.random() > this.boxRate){
                this.box.push(new Box(this.canvasElement, this.boxSpeed));
            }
         }

        this.chceckCollisions();
        this.updateAll();
        this.clearAll();
        this.drawAll();
        this.checkLevels();
        
        if(this.level >=5) {
            clearInterval(intervalId);
            this.finishGame();
        }
        
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
    this.box.forEach(function(box){
        box.update();
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
    if (this.message) {
        this.message.draw()

    }

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
            this.soundEnemy.play();
            this.soundEnemy.volume = 0.5;
        
            if(!this.player.lives){
                this.gameOver = true;
                this.finishGame();
            }
        }
      }.bind(this)); 

      this.points.forEach(function(point, index){
          if(this.player.collisionWithPoints(point)){
            this.score++;
            this.soundPoint.play();
            this.soundPoint.volume = 0.5;
            this.points.splice(index, 1);
            this.pointsGained(this.score);
          }
      }.bind(this));

     this.box.forEach(function(box, index){
          if(this.player.collisionWithBox(box)){
            this.soundBox.play();
            this.soundBox.volume = 0.5;
            setTimeout(function () {
                this.gameOver = true;
                this.finishGame();;
            }.bind(this), 100)
            
          } else {
            console.log('not collision')
            setTimeout(function () {
                this.box.splice(index, 1);
            }.bind(this), 3500)
          }
      }.bind(this))

    }

Game.prototype.onLiveLost = function(callback) {
    this.lostLives = callback
}

Game.prototype.onPointsGained = function(callback){
    this.pointsGained = callback;
}

Game.prototype.checkLevels = function(){
    if (this.level === 1){
        this.poitsSpeed = 4;
        this.obsticleSpeed = 3;

        this.pointsRate = 0.988;
        this.obsticleRate = 0.985;

    }else if (this.level === 2){
        this.poitsSpeed = 6;
        this.obsticleSpeed = 7;
        this.boxSpeed = 9;

        this.pointsRate = 0.98;
        this.obsticleRate = 0.972;
        this.boxRate = 0.9975;
    } else if (this.level === 3){
        this.poitsSpeed = 8;
        this.obsticleSpeed = 8;
        this.boxSpeed = 10;

        this.pointsRate = 0.98;
        this.obsticleRate = 0.969;
        this.boxRate = 0.997;
    } else if (this.level === 4){
        this.poitsSpeed = 10;
        this.obsticleSpeed = 8;
        this.boxSpeed = 10;

        this.pointsRate = 0.98;
        this.obsticleRate = 0.965;
        this.boxRate = 0.997;
    }else if (this.level === 5){
        this.poitsSpeed = 10;
        this.obsticleSpeed = 8;
        this.boxSpeed = 10;

        this.pointsRate = 0.975;
        this.obsticleRate = 0.963;
        this.boxRate = 0.997;
}
}