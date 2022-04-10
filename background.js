class Background {
  constructor() {
    this.backgroundImage = null;
    this.vx = -5;
    this.x = 0;
  }

  preload() {
    this.backgroundImage = loadImage('Pictures/Layers/Background.png');
  }

  draw() {
    image(this.backgroundImage, this.x, 0);
    image(this.backgroundImage, this.x + 673, 0);
    this.x += this.vx;
    if (this.x <= -673) {
      this.x = 0;
    }
  }
}