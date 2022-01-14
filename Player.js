class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vy = 0;
    this.gravity = 0.2;
  }

  drawPlayer() {
    fill("red");
    circle(this.x, this.y, 10)

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