class WinScreen {
  draw() {
    text("Jij hebt gewonnen! Druk op [SPACE]", 50, 50);

    return 2;
  }

  keyPressed() {
    if (keyCode == 32) {
      return 0;
    }

    return 2;
  }
}