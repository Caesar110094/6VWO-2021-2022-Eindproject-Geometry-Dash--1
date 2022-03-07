var gameScreen;
var deadScreen;

/*
0 = GameScreen
1 = DeadScreen
*/
var currentScreen = 0;
var newScreen = 0;

function preload() {
  gameScreen = new GameScreen();
  deadScreen = new DeadScreen();

  gameScreen.preload();
}

function setup() {
  createCanvas(500, 400);

  gameScreen.setup();
}

function draw() {
  background(225);
  
  if (currentScreen != newScreen) {
    currentScreen = newScreen;

    if (currentScreen == 0) {
      gameScreen.setup();
    }
    else {
    }
  }

  if (currentScreen == 0) {
    newScreen = gameScreen.draw();
  }
  else {
    newScreen = deadScreen.draw();
  }
}

function keyPressed() {
  if (currentScreen == 0) {
    newScreen = gameScreen.keyPressed();
  }
  else {
    newScreen = deadScreen.keyPressed();
  }
}