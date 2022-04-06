class Spike {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = 50;
    this.h = 50;
    this.image = loadImage("Pictures/Objects/Spikes.png");
  }

  draw() {
    image(this.image,this.x, this.y, this.w, this.h);

    this.x -= 5;
  }

  checkCollision(player) {
    if (player.x < this.x + this.w &&
        player.x + player.w > this.x &&
        player.y < this.y + this.h &&
        player.h + player.y > this.y) {
      return true;
    }
    else {
      return false;
    }
  }
}