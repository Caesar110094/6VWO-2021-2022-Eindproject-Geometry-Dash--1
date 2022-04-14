class JumpPad {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = 50;
    this.h = 50;
    this.vx = 5;
    this.collisionHeight = 5;
    this.image = loadImage("Pictures/Objects/Slime block.png");
    this.osc = new p5.Oscillator(300);
  }

  playJumpPadSound(){
    this.osc.start();
    this.osc.amp(0.3);
    this.osc.freq(600);
    this.osc.freq(650, 0.1);
    this.osc.amp(0, 0.2, 0.1);
  }
    
  draw(camera) {
    fill('yellow');
    rect(this.x - camera.x, this.y + this.h - this.collisionHeight - camera.y, this.w, this.collisionHeight);
    //image(this.image,this.x, this.y, this.w, this.h);

    this.x -= this.vx;
  }

  checkCollision(player) {
    if (player.x < this.x + this.w &&
        player.x + player.w > this.x &&
        player.y + player.h >= this.y + this.h - this.collisionHeight &&
        player.y < this.y + this.h) {
      this.playJumpPadSound();
      return true;
    }
    else {
      return false;
    }
  }
}