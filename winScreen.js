class WinScreen {

  preload() {
    this.backgroundWinImage = loadImage('Pictures/Layers/WinBackground.png');
  }

  setup() {
    bg = loadImage('this.backgroundWinImage')
  }
  
  draw() {
    text("Jij hebt gewonnen! Druk op [SPACE]", 50, 50);
    background(bg);

    return 2;
  }

  keyPressed() {
    if (keyCode == 32) {
      return 0;
    }

    return 2;
  }
}