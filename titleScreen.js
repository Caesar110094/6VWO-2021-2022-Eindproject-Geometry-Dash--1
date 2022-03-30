class titleScreen {
  draw() {
    text("Druk op [SPACE] verder gaan om te beginnen", 50, 50);

    return 1;
  }

  keyPressed() {
    if (keyCode == 32) {
      return 0;
    }

    return 1;
  }
}