var gameScreen;
var deadScreen;

/*
0 = GameScreen
1 = DeadScreen
*/
var currentScreen = 0;
var newScreen = 0;

function setup() {
  createCanvas(500, 400);

  gameScreen = new GameScreen();
  gameScreen.setup();

  deadScreen = new DeadScreen();
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