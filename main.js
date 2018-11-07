'use strict'

function buildDOM(html) {
    var div = document.createElement('div');
    div.innerHTML = html;
    return div.children[0];
  }


  function main() {

    var splashScreen;
    var gameScreen;
    var startButton;
    var gameOverScreen;
    var restartButton;
    var liveElement;
    var pointsElement;
    var audioElement;
  
function buildSplash() {
    splashScreen = buildDOM(`
    <main class="mainsplash">
        <div class="splash">
            <h1>Trapped</h1>
            <img class="penguin" width="100" src="http://www.pngall.com/wp-content/uploads/2016/03/Penguin-PNG-File.png" alt="" />
            <button class="start">Play</button>
        </div>
    </main>
    `)
  
    document.body.prepend(splashScreen);
  
    startButton = document.querySelector('button.start');
    startButton.addEventListener('click', destroySplash);
}
buildSplash();


function destroySplash(){
    splashScreen.remove();
    startButton.removeEventListener('click', destroySplash);
    
    buildGameScreen();
}


function buildGameScreen(){
    gameScreen = buildDOM(`
        <main>
            <div class="wrapper">
                <div class="livesSec">
                    <p class="livesTe">Lives: </p>
                    <p class="lives">5</p>
                </div>
                <div class="pointSec">
                    <p class="pointsTe">Points: </p>
                    <p class="points">0</p>
                </div>
                <canvas width="640px" height="480px">
                </canvas>
            </div>
            <audio class="sound"><source type="audio/mpeg" /></audio>
        </main>
    `)
    document.body.prepend(gameScreen);

    var canvasElement = document.querySelector('canvas');
    liveElement  = document.querySelector('p.lives')
    pointsElement = document.querySelector('p.points')
    audioElement = document.querySelector('.sound');
    audioElement.src = './sound/game.mp3';

    var game = new Game(canvasElement);

    game.start();

    game.onGameOverCallback(destroyGameScreen);
    game.onLiveLost(updateLives);
    game.onPointsGained(updatePoints);

    function updateLives(lives) {
        liveElement.innerText = lives;
    }

    function updatePoints(points){
        pointsElement.innerText = points;
    }

}


function destroyGameScreen(){
    gameScreen.remove();
    buildGameOverScreen();
    
}


function buildGameOverScreen(){
    gameOverScreen = buildDOM(`
        <main class="oversplash">
            <div class="over">
                <h1>Game over</h1>
                <button class="over">RESTART</button>
            </div>
        </main>
    `)
    document.body.prepend(gameOverScreen);

    restartButton = document.querySelector('button')
    restartButton.addEventListener('click', destroyGameOverScreen)
}

function destroyGameOverScreen(){
    gameOverScreen.remove();
    restartButton.removeEventListener('click', destroyGameOverScreen)
    buildGameScreen();
}








}

window.addEventListener('load', main)