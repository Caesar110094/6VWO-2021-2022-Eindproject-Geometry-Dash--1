class JumpOrb {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = 50;
    this.h = 50;
    this.vx = 5;
    this.image = loadImage("Pictures/Objects/Slime block.png");
  }

  draw(camera) {
    fill('rgba(255,255,0,0.75)');
    noStroke();
    //rect(this.x - camera.x, this.y - camera.y, this.w, this.h);
    circle(this.x - camera.x + this.w / 2, this.y - camera.y + this.h / 2, this.w / 2);
    
    this.x -= this.vx;
  }

  checkCollision(player) {
    if (player.x < this.x + this.w &&
        player.x + player.w > this.x &&
        player.y + player.h >= this.y &&
        player.y < this.y + this.h) {
      return true;
    }
    else {
      return false;
    }
  }
}