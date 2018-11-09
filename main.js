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
    var instructionButton;
    
  
function buildSplash() {
    splashScreen = buildDOM(`
    <main class="mainsplash">
        <div class="splash">
        <h1 class="firstH1">Trapped</h1>
            <div class=startall>
                <img class="penguin" width="100" src="http://www.pngall.com/wp-content/uploads/2016/03/Penguin-PNG-File.png" alt="" />
                <button class="start hvr-shutter-out-horizontal">play</button>
                <button class="rules shutter-out-horizontal">rules</button>
                <div class="rules hidden">
                    <div class="first-row">
                        <div class="arr-left">
                        <i class="fas fa-angle-left"></i>
                        </div>
                        <div class="rules-ping">
                            <img width="50" src="./images/penguin.png" alt="" />
                        </div>
                        <div class="arr-right">
                        <i class="fas fa-angle-right"></i>
                        </div>
                    </div>
                    <div class="en-point">
                        <div class="rul-points">
                            <img class="coct1" width="20" src="./images/cocstail.png" alt="" />
                            <img class="coct2" width="20" src="./images/coctail2.png" alt="" />
                            <img class="coct3" width="20" src="./images/coctail3.png" alt="" />
                        </div>
                        <p class="Pluspoint">+1 point</p>
                        <p class="minpoint">-1 point</p>
                        <img class="bomb" width="40" src="./images/bomb3.png" alt="" />
                    </div>
                    <div class="rules-box">
                        <p class="dis-box">5 sec.</p>
                        <img class="box-im-rulws" width="50" src="./images/box.png" alt="" />
                        <p class="gameov-box">Game over</p>
                    </div>
                </div>
            </div>
        </div>
    </main>
    `)
  
    document.body.prepend(splashScreen);

    var hideSection  = function (event){
        event.stopPropagation();
        rulesSec.classList.toggle('hidden');
    }
  
    startButton = document.querySelector('button.start');
    startButton.addEventListener('click', destroySplash);
    instructionButton = document.querySelector('button.rules');
    instructionButton.addEventListener('click', hideSection);

    var rulesSec = document.querySelector('div.rules');



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
            <audio autoplay="autoplay"><source src="./sound/game3.mp3" type="audio/mpeg" /></audio>
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
        <main class="oversplash">
            <div class="over">
                <h1 class="gameover">Game over</h1>
                <button class="over hvr-wobble-horizontal">RESTART</button>
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