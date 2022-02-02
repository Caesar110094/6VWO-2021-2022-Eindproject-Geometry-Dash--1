class DeadScreen {
  draw() {
    text("Game Over Druk op [SPACE] verder gaan", 50, 50);

    return 1;
  }

  keyPressed() {
    if (keyCode == 32) {
      return 0;
    }

    return 1;
  }
}