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
  
function buildSplash() {
    splashScreen = buildDOM(`
    <main>
        <h1>Trapped</h1>
        <button>Start</button>
    </main>
    `)
  
    document.body.prepend(splashScreen);
  
    startButton =document.querySelector('button');
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
            <p>Score: </p>
            <canvas></canvas>
        </main>
    `)
document.body.prepend(gameScreen);
setTimeout(function() {
    destroyGameScreen()
  }, 5000)
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