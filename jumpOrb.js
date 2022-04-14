 class JumpOrb {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = 50;
    this.h = 50;
    this.vx = 5;
    
    this.animation = [];
    this.animationFrameLength = 10;

    this.animation.push(loadImage('Pictures/Orb/Orb_1.png'));
    this.animation.push(loadImage('Pictures/Orb/Orb_2.png'));
    this.animation.push(loadImage('Pictures/Orb/Orb_3.png'));
    this.animation.push(loadImage('Pictures/Orb/Orb_4.png'));
    this.animation.push(loadImage('Pictures/Orb/Orb_4.png'));
    this.animation.push(loadImage('Pictures/Orb/Orb_3.png'));
    this.animation.push(loadImage('Pictures/Orb/Orb_2.png'));
    this.animation.push(loadImage('Pictures/Orb/Orb_1.png'));

    this.currentTimer = this.animationFrameLength;
    this.currentIndex = 0;
  }

  draw(camera) {
    fill('rgba(255,255,0,0.75)');
    noStroke();
    //rect(this.x - camera.x, this.y - camera.y, this.w, this.h);
    //circle(this.x - camera.x + this.w / 2, this.y - camera.y + this.h / 2, this.w);
    image(this.animation[this.currentIndex], this.x - camera.x + this.w / 2, this.y - camera.y + this.h / 2, this.w, this.h);
    
    this.x -= this.vx;

    this.currentTimer -= 1;
    if (this.currentTimer <= 0) {
      this.currentTimer = this.animationFrameLength;
      
      this.currentIndex++;
      if (this.currentIndex >= this.animation.length) {
        this.currentIndex = 0;
      }
    }
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