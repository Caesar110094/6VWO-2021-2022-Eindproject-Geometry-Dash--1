var gameScreen, deadScreen, playerForward;

/*
0 = GameScreen
1 = DeadScreen
*/
var currentScreen = 0;
var newScreen = 0;

function preload() {
  console.log("preload..")

   playerForward = loadAnimation (
     "Pictures/Player (Sprites)/Foreward/Foreward 1.png",
     "Pictures/Player (Sprites)/Foreward/Foreward 2.png",
     "Pictures/Player (Sprites)/Foreward/Foreward 3&7.png",
     "Pictures/Player (Sprites)/Foreward/Foreward 4.png",
     "Pictures/Player (Sprites)/Foreward/Foreward 5.png",
     "Pictures/Player (Sprites)/Foreward/Foreward 6.png",
     "Pictures/Player (Sprites)/Foreward/Foreward 8.png");
  
  gameScreen = new GameScreen();
  deadScreen = new DeadScreen();

  gameScreen.preload();
  //fg = loadImage("ForegroundFloor.png");
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

// function keyPressed() {
//   if (currentScreen == 0) {
//     newScreen = gameScreen.keyPressed();
//   }
//   else {
//     newScreen = deadScreen.keyPressed();
//   }
// }