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
    
    this.forewardAnimation = [];
    this.forewardAnimationFrameLength = 30;

    this.jumpAnimation = [];
    this.jumpAnimationFrameLength = 30;
    
    this.currentImage = null;
    this.currentIndex = 0;
    this.currentTimer = 0;
  }

  preload() {
    this.forewardAnimation.push(loadImage('Pictures/Player/Foreward/Foreward 1.png'));
    this.forewardAnimation.push(loadImage('Pictures/Player/Foreward/Foreward 2.png'));
    this.forewardAnimation.push(loadImage('Pictures/Player/Foreward/Foreward 3&7.png'));
    this.forewardAnimation.push(loadImage('Pictures/Player/Foreward/Foreward 4.png'));
    this.forewardAnimation.push(loadImage('Pictures/Player/Foreward/Foreward 5.png'));
    this.forewardAnimation.push(loadImage('Pictures/Player/Foreward/Foreward 6.png'));
    this.forewardAnimation.push(loadImage('Pictures/Player/Foreward/Foreward 3&7.png'));
    this.forewardAnimation.push(loadImage('Pictures/Player/Foreward/Foreward 8.png'));
    this.currentImage = this.forewardAnimation[0];

    this.jumpAnimation.push(loadImage('Pictures/Player/Jump/Jump 1.png'));
    this.jumpAnimation.push(loadImage('Pictures/Player/Jump/Jump 2.png'));
    this.jumpAnimation.push(loadImage('Pictures/Player/Jump/Jump 3.png'));
    this.jumpAnimation.push(loadImage('Pictures/Player/Jump/Jump 4.png'));
    this.jumpAnimation.push(loadImage('Pictures/Player/Jump/Jump 5.png'));
    this.jumpAnimation.push(loadImage('Pictures/Player/Jump/Jump 6.png'));
    this.currentImage = this.jumpAnimation[0];
  }
  
  drawPlayer(color) {
    fill(color);
    rect(this.x, this.y, this.w, this.h);
    image(this.currentImage, this.x, this.y, this.w, this.h);

    if (this.currentTimer <= 0) {
      this.currentTimer = this.forewardAnimationFrameLength;
      this.currentIndex += 1;
      if (this.currentIndex >= this.forewardAnimation.length) {
        this.currentIndex = 0;
      }
      this.currentImage = this.forewardAnimation[this.currentIndex];
    }
    this.currentTimer -= 1;
    
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