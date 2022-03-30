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

  preload() {
    playerForeward = loadAnimation ("Pictures/Player (Sprites)/Foreward/Foreward 1.png","Pictures/Player (Sprites)/Foreward/Foreward 2.png","Pictures/Player(Sprites)/Foreward/Foreward 3&7.png","Pictures/Player (Sprites)/Foreward/Foreward 4.png","Pictures/Player (Sprites)/Foreward/Foreward 5.png","Pictures/Player (Sprites)/Foreward/Foreward 6.png","Pictures/Player (Sprites)/Foreward/Foreward 8.png");
    playerJump = loadAnimation ("Pictures/Player (Sprites)/Foreward/Foreward 1.png","Pictures/Player (Sprites)/Jump/Jump 1.png","Pictures/Player (Sprites)/Jump/Jump 2.png","Pictures/Player (Sprites)/Jump/Jump 3.png","Pictures/Player (Sprites)/Jump/Jump 4.png","Pictures/Player (Sprites)/Jump/Jump 5.png","Pictures/Player (Sprites)/Jump/Jump 6.png","Pictures/Player (Sprites)/Foreward/Foreward 1.png");
    playerDeath =  loadAnimation ("Pictures/Player (Sprites)/Foreward/Foreward 5.png","Pictures/Player (Sprites)/Foreward/Foreward 6.png","Pictures/Player (Sprites)/Death/Death 1.png","Pictures/Player (Sprites)/Death/Death 2.png","Pictures/Player (Sprites)/Death/Death 3.png","Pictures/Player (Sprites)/Death/Death 4.png");
    
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