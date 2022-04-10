class Block {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = 50;
    this.h = 50;
    this.vx = 5;
    this.image = loadImage("Pictures/Objects/Slime block.png");
  }



  draw(camera) {
    image(this.image, this.x - camera.x, this.y - camera.y, this.w, this.h);

    this.x -= this.vx;
  }

  checkVerticalCollision(player) {
    if (player.x + player.w > this.x && player.x + player.w < this.x + this.w) {
      return true;
    }
    else if (player.x > this.x && player.x < this.x + this.w) {
      return true;
    }
    else {
      return false;
    }
  }

  checkHorizontalCollision(player) {
    if (player.y + player.h > this.y && player.y + player.h < this.y + this.h) {
      return true;
    }
    else if (player.y > this.y && player.y < this.y + this.h) {
      return true;
    }
    else {
      return false;
    }
  }

  checkCollision(player) {
    if (this.checkVerticalCollision(player) && this.checkHorizontalCollision(player)) {
      return true;
    }
    else {
      return false;
    }
  }
}