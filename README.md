
# Trapped

## Description
The Trapped project is a simple game where the goal is to score 15 points in order to win the game.
There are three types of obsticles falling from the top of the canvas (randomly): "good" ones - giving the points, "bad" ones - reducing lifes, and the third ones reducing a game area width if they are not catched.
Player is moving left and right to avoid enemies or catch the alliances. Game finishes when: the player socores 15 poins - win, runs out of lifes or trapped between walls - lose.


## MVP (DOM - CANVAS)
CANVAS - The MVP would be the easiest version of the game: a player with one kind of obsticles - enemies. 


## Backlog
<ul>
<li>Three types of obsticles</li>
<li>Third obsticle reducing the width</li>
<li>"Item" - type of obsticle removing the third obsticle from canvas.</li>
<li>Lifes in the game screen</li>
<li>Third screen "win screen"</li>
<li>Pause</li>
<li>Music</li>
<li>Design</li>
<li>Poins result on the "win screen"</li>



## Data structure
Main.js
- buildSplash();
- destroySplash();
- buildGameScreen();
- destroyGameScreen();
- buildGameOverScreen();
- buildWinScreen();


game.js

- score
- start(){
    - buildDOM;
    - getCanvasCotext;
    - startLoop();
}
- startLoop()
    - loop();
- updateAll();
- cleanAll();
- drawAll();
- finishGame();
- gameOverCallback();
- checkCollision();


player.js

- update();
- draw();
- setDirection()
- x;
- y;
- size;
- direction
- speed
- checkCollisationsWithObsticles


obsticles.js

- update();
- draw();
- x
- y
- size




## States y States Transitions
Definition of the different states and their transition (transition functions)

- splashScreen();
    - buildSplash();
    - addEventListener(startGame) - click
- gameScreen
    - destroySplash();
    - destroyGameOver();
    - buildGameScreen();
    - create new Game();
- gameoverScreen
    - destroyGame();
    - buildGameOver()
    -addEventListener(gameScreen)       
//- winScreen
    - destroyGame();
    - buildWin();//

## Task
- create js files
- Main - buildDom
- Main - buildSplash
- Main - addEventListener
- Main - destroySplash
- Main - buildDom - for game
- Game - TimeOut test
- Main - GameOver
- Main - destroy Game
- Main - GameOver RESTART
- Main - removeGameOver
- Game - addEventListener
- Game - loop
- Game - clear
- Game - create player
- Player - create
- Player - directions
- Player - collision with walls
- Game - create enemies
- Enemy - create
- Enemy - position
- Enemy - movement
- Game - player and enemies position
- Enemy - check if still on the screen
- Game - collision + remove
- Game - gameOver 


## Links


### Trello
[Link url](https://trello.com)


### Git
URls for the project repo and deploy
[Link Repo](https://github.com/KamilaPurymska/Trapped)
[Link Deploy](https://kamilapurymska.github.io/Trapped/)


### Slides
URls for the project presentation (slides)
[Link Slides.com](https://slides.com/kamilapurymska/deck)
