class Spike {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = 50;
    this.h = 50;
  }

  draw() {
    fill("red");
    rect(this.x, this.y, this.w, this.h);

    this.x -= 2;
  }

  checkCollision(player) {
    if (player.x < block.x + block.w && player.x + player.w > block.x
      && player.y > block.y && player.y + player.h < block.y + block.h) {
      return true;
    }
    else {
      return false;
    }
  }

}