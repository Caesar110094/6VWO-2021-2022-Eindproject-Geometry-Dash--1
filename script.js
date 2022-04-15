var gameScreen, deadScreen, winScreen, titleScreen;

/*
0 = GameScreen
1 = DeadScreen
2 = WinScreen
3 = TitleScreen
*/
var currentScreen = 3;
var newScreen = 3;

function preload() {
  gameScreen = new GameScreen();
  deadScreen = new DeadScreen();
  winScreen = new WinScreen();
  titleScreen = new TitleScreen();

  gameScreen.preload();
  winScreen.preload();
  //fg = loadImage("ForegroundFloor.png");
}

function setup() {
  createCanvas(600, 400);

  gameScreen.setup();
  titleScreen.setup();
}

function draw() {
  background(225);

  noSmooth();
  
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
  else if (currentScreen == 2) {
    newScreen = winScreen.draw();
  }
  else {
    newScreen = titleScreen.draw();
  }
}

function keyPressed() {
  if (currentScreen == 0) {
    //newScreen = gameScreen.keyPressed();
  }
  else if (currentScreen == 1) {
    newScreen = deadScreen.keyPressed();
  }
  else {
    newScreen = winScreen.keyPressed();
  }
}