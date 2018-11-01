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
            <h1>me</h1>
            <canvas></canvas>
        </main>
    `)
document.body.prepend(gameScreen);

}

function destroyGameScreen(){
    gameScreen.remove();
    buildGameOverScreen();
}


}

window.addEventListener('load', main)