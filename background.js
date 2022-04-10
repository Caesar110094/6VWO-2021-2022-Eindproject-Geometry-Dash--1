class Background {
  constructor() {
    this.backgroundImage = null;
    this.vx = -5;
    this.x = 0;
  }

  preload() {
    this.backgroundImage = loadImage('Pictures/Layers/Background.png');
  }

  draw(camera) {
    image(this.backgroundImage, this.x, -camera.y);
    image(this.backgroundImage, this.x + 673, -camera.y);
    this.x += this.vx;
    if (this.x <= -673) {
      this.x = 0;
    }
  }
}