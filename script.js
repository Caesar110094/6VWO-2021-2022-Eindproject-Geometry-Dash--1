var gameScreen, deadScreen, winScreen, titleScreen;
var playerData;

/*
0 = GameScreen
1 = DeadScreen
2 = WinScreen
3 = TitleScreen
*/
var currentScreen = 3;
var newScreen = 3;

function preload() {
  playerData = getItem("Player");
  if (playerData == null) {
    playerData = new PlayerData();
  }
  else {
    if (playerData.levelsAttempts == null) {
      playerData.levelsAttempts.push(-1);
    }
    if (playerData.levelsFinished == null) {
      playerData.levelsFinished.push(-1);
    }
  }
  
  titleScreen = new TitleScreen(playerData);
  gameScreen = new GameScreen(titleScreen, playerData);
  deadScreen = new DeadScreen();
  winScreen = new WinScreen();

  gameScreen.preload();
  winScreen.preload();
  titleScreen.preload();
  //fg = loadImage("ForegroundFloor.png");
}

function setup() {
  createCanvas(600, 400);

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
    else if (currentScreen == 3) {
      titleScreen.setup();
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
  else if (currentScreen == 2) {
    newScreen = winScreen.keyPressed();
  }
  else {
    newScreen = titleScreen.keyPressed();
  }

  if (keyCode == 82) {
    removeItem("Player");
    console.log(101);
  }
}