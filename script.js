var gameScreen, deadScreen, winScreen;

/*
0 = GameScreen
1 = DeadScreen
2 = WinScreen
*/
var currentScreen = 0;
var newScreen = 0;

function preload() {
  gameScreen = new GameScreen();
  deadScreen = new DeadScreen();
  winScreen = new WinScreen();

  gameScreen.preload();
  //fg = loadImage("ForegroundFloor.png");
}

function setup() {
  createCanvas(600, 400);

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
  else if (currentScreen == 1) {
    newScreen = deadScreen.draw();
  }
  else {
    newScreen = winScreen.draw();
  }
}

function keyPressed() {
  if (currentScreen == 0) {
    newScreen = gameScreen.keyPressed();
  }
  else if (currentScreen == 1) {
    newScreen = deadScreen.keyPressed();
  }
  else {
    newScreen = winScreen.keyPressed();
  }
}