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
  
function buildSplash() {
    splashScreen = buildDOM(`
    <main class="spalash">
        <h1>Trapped</h1>
        <img class="penguin" width="100" src="http://www.pngall.com/wp-content/uploads/2016/03/Penguin-PNG-File.png" alt="" />
        <button class="start">Start</button>
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
                    <p class="lives">3</p>
                </div>
                <div class="pointSec">
                    <p class="pointsTe">Points: </p>
                    <p class="points">0</p>
                </div>
                <canvas width="640px" height="480px">
                </canvas>
            </wrapper>
        </main>
    `)
    document.body.prepend(gameScreen);

    var canvasElement = document.querySelector('canvas');
    liveElement  = document.querySelector('p.lives')
    pointsElement = document.querySelector('p.points')

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
        <main>
            <h1>Game over</h1>
            <button>RESTART</button>
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