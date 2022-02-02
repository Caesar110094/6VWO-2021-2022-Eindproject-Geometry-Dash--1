class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = 20;
    this.h = 20;
    this.vy = 0;
    this.gravity = 0.2;
  }

  drawPlayer(color) {
    fill(color);
    rect(this.x, this.y, this.w, this.h);

    this.vy += this.gravity;

    this.y += this.vy;

    if (this.y > 380) {
      this.vy = 0;
      this.y = 380;
    }

    if (this.y < 0) {
      this.vy = 0;
      this.y = 0;
    }
  }
}