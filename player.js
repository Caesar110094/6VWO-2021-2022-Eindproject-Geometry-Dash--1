class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = 30;
    this.h = 30;
    this.vy = 0;
    this.gravity = 0.4;
    this.trueGround = 380;
    this.ground = this.trueGround;
  }

  drawPlayer(color) {
    fill(color);
    rect(this.x, this.y, this.w, this.h);

    this.vy += this.gravity;
    this.y += this.vy;
  }

  checkGround() {
    if (this.y + this.h > this.ground) {
      this.vy = 0;
      this.y = this.ground - this.h;
    }
  }

  onKeyPressed() {
    if (keyCode == 32 && this.y + this.h >= this.ground) {
      this.vy -= 10;
    }
  }
}