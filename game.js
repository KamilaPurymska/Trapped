'use strict'

function Game(){
    this.updateAll();
    this.clearAll();
    this.drawAll();
}

Game.prototype.start = function (){

}

Game.prototype.startLoop = function(){
    setTimeout(function(){
        this.gameOverCallback();
    }.bind(this), 5000)
}

Game.prototype.updateAll = function(){

}

Game.prototype.clearAll = function(){

}

Game.prototype.drawAll = function(){
    
}







//Game.prototype.finishGame = function(){
 //   this.gameOverCallback();
//}