class WinScreen {
  constructor() {
    this.backgroundWinImage = null;
  }
  
  preload() {
    this.backgroundWinImage = loadImage('Pictures/Layers/WinBackground.png');
  }
  
  draw() {
    image(this.backgroundWinImage, 0, 0, (673/248) * height, height);
    fill('black');
    rect(0, height - 32, width, 32);
    fill('white');
    textSize(16);
    textAlign(CENTER, CENTER);
    text("Jij hebt gewonnen! Druk op SPACE", 0, height - 32, width, 32);

    return 2;
  }

  keyPressed() {
    if (keyCode == 32) {
      return 0;
    }

    return 2;
  }
}