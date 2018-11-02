'use strict'

function Game(canvasElement){
    this.player = null;
    this.enemies = null;
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
   
    setTimeout(function () {
      this.finishGame();
    }.bind(this),2000);
   
   }


Game.prototype.startLoop = function(){

    this.player = new Player(this.canvasElement, this.initialPostionPlayer);
    this.handelKeyDown = function (event){
        if (event.key === 'ArrowLeft') {
            this.player.setDirection(-1)
            } else if(event.key === 'ArrowRight'){
                this.player.setDirection(1);
            }
        }.bind(this)
    
    document.addEventListener('keyDown', this.handelKeyDown);


    var loop = function (){ 
        
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

}

Game.prototype.clearAll = function(){

}

Game.prototype.drawAll = function(){
    this.player.draw();

}

Game.prototype.finishGame = function(){
    this.gameOver = true;
    this.gameOverCallback();
   
}

