class Block {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = 25;
    this.h = 25;
  }

  draw() {
    fill("green");
    rect(this.x, this.y, this.w, this.h);

    this.x -= 5;
  }

  checkCollision(player) {
  }
}